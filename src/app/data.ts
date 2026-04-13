import { Injectable } from '@angular/core';

type Reading = {
  total: number;
  ldl: number;
  hdl: number;
  triglycerides: number;
  date: string;
  source: 'generated' | 'manual';
};

@Injectable({
  providedIn: 'root',
})
export class Data {
  
  private readings: Reading[] = [];

  constructor() {
    // load from local storage when app starts
    const saved = localStorage.getItem('cholesterolData');
    if (saved) {
      this.readings = JSON.parse(saved);
    }
  }

  getReadings() {
    return this.readings;
  }

  hasData() {
    return this.readings.length > 0;
  }

  latestReading() {
    return this.readings[this.readings.length - 1];
  }

  addReading(reading: Reading) {
    this.readings.push(reading);
    localStorage.setItem('cholesterolData', JSON.stringify(this.readings));
  }
}
