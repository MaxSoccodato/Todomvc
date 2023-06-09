import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { TodosService } from "./services/todos.service";
import { TodosComponent } from "./components/todos/todos.component";
import { TodoComponent } from "./components/todo/todo.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from "./components/main/main.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: TodosComponent
  },
]

@NgModule({
  declarations: [TodosComponent, HeaderComponent, MainComponent, TodoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [TodosService]
})

export class TodosModule { }

