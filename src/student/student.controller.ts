import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) { }

    /*@Get('list')
    findAllStudent(){
        return 'student list';
    }

    @Get(':id')
    findOneStudent(@Param('id') id: string){
        return 'student with id ' + id;
    }

    @Post()
    CreateStudent(@Body("name") body) {
        return body;
    }

    @Patch(':id')
    updateStudent(@Param('id') id: string, @Body() body) {
        return `Student with id ${id} was updated`;
    }

    @Delete(':id')
    removeStudent(@Param('id') id: string) {
        return `Student with id ${id} was removed`;
    }*/

    // Methods from the Student Service
    @Get()
    findAllStudent(){
        return this.studentService.findAll();
    }

    @Get(':id')
    findOneStudent(@Param('id') id: string){
        return this.studentService.findById(id);
    }

    @Post()
    CreateStudent(@Body() body) {
        return this.studentService.create(body);
    }

    @Patch(':id')
    updateStudent(@Param('id') id: string, @Body() body) {
        return this.studentService.update(id, body);
    }

    @Delete(':id')
    removeStudent(@Param('id') id: string) {
        return this.studentService.remove(id);
    }
}
