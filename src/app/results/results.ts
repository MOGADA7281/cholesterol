import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Data } from '../data';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  private readonly data = inject(Data);
  total: number | null = null;
  ldl: number | null = null;
  hdl: number | null = null;
  triglycerides: number | null = null;
  date: string = '';

  submit() {
    if (this.total === null || this.ldl === null || this.hdl === null || this.triglycerides === null || this.date === '') {
      alert('Please fill in all fields');
      return;
    }

    const read = {
      total: this.total,
      ldl: this.ldl,
      hdl: this.hdl,
      triglycerides: this.triglycerides,
      date: this.date,
      source: 'manual' as const,
    };

    this.data.addReading(read);
    this.resetForm()
    alert('Submitted successfully');


  }

  resetForm(){
  this.total = null;
  this.ldl = null;
  this.hdl = null;
  this.triglycerides = null;
  this.date = '';
  


  }





}
