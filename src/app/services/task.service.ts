import { Injectable } from '@angular/core';
import { task } from '../../Models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { 
    let x = JSON.parse(localStorage.getItem('tasks')) as task[];
    if(x != null)
      this.tasks = x;
  }
  tasks;
  getall(){
    return this.tasks;
  }
  filter(radiobutton){
    if(radiobutton === 'all')
      this.tasks = this.tasks;
    else if(radiobutton === 'true')
      this.tasks =  this.tasks.filter((val)=>{return val.status === 'completed'})
    else
      this.tasks =  this.tasks.filter((val)=>{return val.status === 'uncomplete'})
  }
}