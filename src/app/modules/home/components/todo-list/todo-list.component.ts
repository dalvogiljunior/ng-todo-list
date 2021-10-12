import { JsonPipe } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';

///Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || "[]");

  constructor() { }

  ngDoCheck(): void {
this.setLocalStorage();
  }
  

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAll() {
    const confirm = window.confirm("Deseja realmente deletar tudo?");

    if (confirm)
      this.taskList = [];
  }

  public setEmitTaskList(event:string){
    this.taskList.push({checked:false, task: event});
  }

  public validationInput(event: string, index:number){
    if(!event.length){
      const confirm= window.confirm("Task está vazia, deseja Deletar?")
      if(confirm)
        this.taskList.splice(index, 1);
    }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first,last)=> Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }

}
