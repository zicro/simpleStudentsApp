import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class StudentService {

    // Working with postgres DB
    constructor(
        @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
        @InjectRepository(Course) private readonly courseRepository: Repository<Course>
        ){

    }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find({
            relations:['courses']
        });
    }

    async findById(id:number): Promise<Student> {
        const student = await this.studentRepository.findOne({
            where: {id},
            relations:['courses']
        });
        if(!student)
            throw new HttpException(`This student id: ${id} does not exist`, HttpStatus.NOT_FOUND);
        return student;
    }

    async create(createStudentDto:CreateStudentDto) {
        const courses = await Promise.all(
            createStudentDto.courses.map(c => this.preloadCourseByName(c))
        )
        
        const student = this.studentRepository.create({
            ...createStudentDto, courses
        })
        return this.studentRepository.save(student);
    }

    async update(id:string, updateStudentDto:UpdateStudentDto) {
        const courses = updateStudentDto.courses && 
        (await Promise.all(
            updateStudentDto.courses.map(c => this.preloadCourseByName(c))
        ))

        const student = await this.studentRepository.preload({
            id:+id,
            ...updateStudentDto,
            courses
        });

        if(!student)
            throw new NotFoundException(`Student ${id} not found`);
        
        return this.studentRepository.save(student);
    }

    async remove(id:string) {
        await this.studentRepository.delete(id);
    }

    private async preloadCourseByName(name:string): Promise<Course>{
        const course = await this.courseRepository.findOne({
            where:{name}
        })

        if (course) {
            return course;
        }

        return this.courseRepository.create({name});
    }


}
