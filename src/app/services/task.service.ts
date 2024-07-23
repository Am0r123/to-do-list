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
    // console.log(this.tasks)
  }
  tasks
  getall(){
    return this.tasks;
  }
  filter(rb){
    // alert(this.rb)
    if(rb === 'all')
      this.tasks = this.tasks;
    if(rb === 'true')
      this.tasks =  this.tasks.filter((val)=>{return val.status === 'completed'})
    if(rb === 'false')
      this.tasks =  this.tasks.filter((val)=>{return val.status === 'uncomplete'})
  }
}
