import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
    private students: Student[] = [
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
        return this.students.find(x => x.id === +id);
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
}
