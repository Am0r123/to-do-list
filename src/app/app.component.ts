import { Component, inject,OnInit } from '@angular/core';
import { TasksComponent } from './tasks/tasks.component';
import { FilterComponent } from './filter/filter.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TasksComponent,FormsModule,CommonModule,FilterComponent,
    HttpClientModule,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedradiobtn : string ='all';
  onfilterchanged(value :string){
    this.selectedradiobtn = value;
  }

  languages = ['en', 'es','ar'];
  private translate: TranslateService = inject(TranslateService);

  ngOnInit() {
    const defaultLanguage = 'en';
    this.translate.setDefaultLang(defaultLanguage);
    this.translate.use(defaultLanguage);
  }

  switch(lang: string='en') {
    this.translate.use(lang);
  }

  onSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.translate.use(target.value);
  }
}