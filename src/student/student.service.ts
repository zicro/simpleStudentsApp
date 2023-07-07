import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

@Injectable()
export class StudentService {
    /*private students: Student[] = [
        {
            id: 1,
            name: 'Student..',
            age: 36,
            address: ['morocco', 'Rabat'],
        },
        {
            id: 2,
            name: 'Owner..',
            age: 33,
            address: ['morocco', 'Taza'],
        }
    ];

    async findAll() {
        return this.students;
    }

    async findById(id:string) {
        const student = this.students.find(x => x.id === +id);
        if(!student)
            throw new HttpException(`This student id: ${id} does not exist`, HttpStatus.NOT_FOUND);
        return student;
    }

    async create(createStudent:any) {
        this.students.push(createStudent);
        return "Student created successfully";
    }

    async update(id:string, updateStudent:any) {
        this.remove(id);
        this.create(updateStudent);

        return "Student updated successfully";
    }

    remove(id:string) {
        const rmvStudent = this.students.findIndex(x => x.id === +id);
        if (rmvStudent >= 0) {
            return this.students.splice(rmvStudent, 1);
        }
    }

    // Methods for students DTO
    async createDTO(createStudentDto:any) {
        this.students.push(createStudentDto);
        return "Student created successfully";
    }

    async updateDTO(id:string, updateStudent:any) {
        this.remove(id);
        this.create(updateStudent);

        return "Student updated successfully";
    }*/

    // Working with postgres DB
    constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>){

    }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async findById(id:number): Promise<Student> {
        const student = await this.studentRepository.findOne({
            where: {id}
        });
        if(!student)
            throw new HttpException(`This student id: ${id} does not exist`, HttpStatus.NOT_FOUND);
        return student;
    }

    async create(createStudentDto:CreateStudentDto) {
        const student = this.studentRepository.create({
            ...createStudentDto
        })
        return this.studentRepository.save(student);
    }

    async update(id:string, updateStudentDto:UpdateStudentDto) {
        const student = await this.studentRepository.preload({
            id:+id,
            ...updateStudentDto
        });

        if(!student)
            throw new NotFoundException(`Student ${id} not found`);
        
        return this.studentRepository.save(student);
    }

    async remove(id:string) {
        await this.studentRepository.delete(id);
    }


}
