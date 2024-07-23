import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'filter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  selectedradiobtn:string = 'all';

  @Output()
  selectedradiobtnchanged: EventEmitter<string> = new EventEmitter<string>();
  
  taskservice:TaskService=inject(TaskService);
  onselectedradiobtnchanged(){
    this.selectedradiobtnchanged.emit(this.selectedradiobtn);
    this.taskservice.filter(this.selectedradiobtn);
  }
}