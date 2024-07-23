import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { task } from '../../Models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  title = 'To-Do-List';
  tasks:task[] = [];
  filteredtask:task[] = [];
  @Input()
  rb
  mindate
  form: FormGroup=new FormGroup({
    title: new FormControl(null,Validators.required),
    details: new FormControl(null,Validators.required),
    status: new FormControl(null),
    due: new FormControl(null,Validators.required)
  });
  taskser:TaskService = inject(TaskService);
  constructor(){
    let x = JSON.parse(localStorage.getItem('tasks')) as task[];
    if(x != null)
      this.tasks = x;

    // Set the minimum date to today
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    this.mindate = `${year}-${month}-${day}`;
  }
  onsubmit(){
    // console.log(this.form);
    console.log(this.form.get('title').value);
    let x=this.form.get('title').value;
    let y=this.form.get('details').value;
    let z=this.form.get('status').value;
    let m=this.form.get('due').value;
    console.log(m);
    // console.log(z);
    if(z === true)
      z='completed';
    else
      z='uncomplete';

    let t= new task(x,y,z,m);
    console.log(this.form.valid)
    this.tasks.push(t);
    this.form.reset();
    const v = JSON.stringify(this.tasks);
    localStorage.setItem('tasks',v);
    this.filteredtask = this.tasks;
  }
  del(index){
    this.tasks.splice(index, 1);
    const v = JSON.stringify(this.tasks);
    localStorage.setItem('tasks',v);
    this.filteredtask = this.tasks;
  }
  ngDoCheck(){
    // alert(this.rb)
    if(this.rb === 'all')
      this.filteredtask = this.tasks;
    if(this.rb === 'true')
      this.filteredtask =  this.tasks.filter((val)=>{return val.status === 'completed'})
    if(this.rb === 'false')
      this.filteredtask =  this.tasks.filter((val)=>{return val.status === 'uncomplete'})
  }
  errmes:string;
  checkdate(x:task)
  {
    let today = new Date(this.mindate);
    let n = new Date(x.due);
    if(x.due < this.mindate)
    {
      this.errmes = 'task is already due';
      return true;
    }
    if(x.due > this.mindate)
    {
      return false;
    }
    if(x.due === this.mindate)
    {
      this.errmes = 'task is due today';
      return true;
    }
    return false;
  }
  selectedTask: any | null = null;
  toggleDetails(t:task){
    this.isPopupVisible = !this.isPopupVisible;
    // if(this.selectedTask === t)
    //   this.selectedTask = null;
    // else
    this.selectedTask = t;
  }


  isPopupVisible = false;
}
