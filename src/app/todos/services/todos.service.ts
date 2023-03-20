import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TodoInterface } from '../types/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);

  addTodo(text : string ): void {
    const newTodo : TodoInterface = {
      text,
      isCompleted : false,
      id: Math.random().toString(16)
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo]
    this.todos$.next(updatedTodos);
  }
}