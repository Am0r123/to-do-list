import { Component } from '@angular/core';
import { TasksComponent } from './tasks/tasks.component';
import { FilterComponent } from './filter/filter.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TasksComponent,FilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedradiobtn : string ='all';
  onfilterchanged(value :string){
    this.selectedradiobtn = value;
    console.log(value)
  }
}
