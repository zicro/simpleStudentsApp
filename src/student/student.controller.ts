import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

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
    /*@Get()
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

    // Methods for the student DTO

    @Post()
    CreateStudent(@Body() createStudentDTO: CreateStudentDto) {
        return this.studentService.create(createStudentDTO);
    }

    @Patch(':id')
    updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentService.update(id, updateStudentDto);
    }*/

    // Working with postgres database

    @Get()
    findAllStudent(){
        return this.studentService.findAll();
    }

    @Get(':id')
    findOneStudent(@Param('id') id: string){
        return this.studentService.findById(+id);
    }

    @Post()
    CreateStudent(@Body() createStudentDTO: CreateStudentDto) {
        return this.studentService.create(createStudentDTO);
    }

    @Patch(':id')
    updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentService.update(id, updateStudentDto);
    }

    @Delete(':id')
    removeStudent(@Param('id') id: string) {
        return this.studentService.remove(id);
    }


}
