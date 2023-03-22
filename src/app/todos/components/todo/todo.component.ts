import { Component, Input } from '@angular/core';
import { TodoInterface } from 'app/todos/types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {

  //the "!" means that 
  //There is a property called todoProps with a type of TodoInterface | undefined.
  // It starts with a value of undefined. But every time I get or set that property, 
  //I want to treat it as type TodoInterface.
  @Input('todo') todoProps!: TodoInterface ;

}
