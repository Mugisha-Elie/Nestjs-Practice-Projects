import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks = [
    { id: '1', title: 'Learn Nestjs DI', description: 'Master IOC and decorators', completed: false },
    { id: '2', title: 'Build Task API', description: 'Practice CRUD Operations', completed: false },
  ];

  getAllTasks(search?: string, completed?: string) {
    let results = this.tasks;
    if (search) {
      results = results.filter((result) =>
        result.title.toLowerCase().includes(search.toLowerCase()) ||
        result.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      results = results.filter((result) => result.completed === isCompleted);
    }
    return results;
  }

  getTaskById(id: string) {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} was not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto) {
    if (!createTaskDto.title || createTaskDto.title.trim() === '') {
      throw new BadRequestException('Task title is required');
    }
    const newTask = {
      id: (this.tasks.length + 1).toString(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: false,
    }

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.getTaskById(id);
    
    if (updateTaskDto.title !== undefined) task.title = updateTaskDto.title;
    if (updateTaskDto.description !== undefined) task.description = updateTaskDto.description;
    if (updateTaskDto.completed !== undefined) task.completed = updateTaskDto.completed;

    return task;
  }

  deleteTask(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      const deletedTask = this.tasks[taskIndex];
      this.tasks.splice(taskIndex, 1);
      return deletedTask;
    }
    throw new NotFoundException(`Task with id: ${id} was not found`);
  }
}
