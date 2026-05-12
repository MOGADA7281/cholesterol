import { Component, inject, OnInit } from '@angular/core';
import { Data } from '../data';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

@Component({
  selector: 'app-history',
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History implements OnInit {

  private readonly data = inject(Data);

  chart: any;

  readings: any[] = [];
  sortedReadings: any[] = [];

  datess: any[] = [];
  valTotal: number[] = [];
  valLDL: number[] = [];
  valHDL: number[] = [];
  valTriglycerides: number[] = [];

  ngOnInit(): void {
    this.loadChart();
  }

  // ✅ LOAD + BUILD CHART
  loadChart() {
    this.readings = this.data.getReadings();

    this.sortedReadings = [...this.readings].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    this.datess = this.sortedReadings.map(r => r.date);
    this.valTotal = this.sortedReadings.map(r => r.total);
    this.valLDL = this.sortedReadings.map(r => r.ldl);
    this.valHDL = this.sortedReadings.map(r => r.hdl);
    this.valTriglycerides = this.sortedReadings.map(r => r.triglycerides);

    const config: any = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Total Cholesterol',
            data: this.datess.map((date, i) => ({ x: date, y: this.valTotal[i] }))
          },
          {
            label: 'LDL',
            data: this.datess.map((date, i) => ({ x: date, y: this.valLDL[i] }))
          },
          {
            label: 'HDL',
            data: this.datess.map((date, i) => ({ x: date, y: this.valHDL[i] }))
          },
          {
            label: 'Triglycerides',
            data: this.datess.map((date, i) => ({ x: date, y: this.valTriglycerides[i] }))
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                month: 'MMM yyyy'
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Cholesterol History'
          }
        }
      }
    };

    this.chart = new Chart('myChart', config);
  }

  // ✅ CLEAR HISTORY (FULL RESET)
  clearHistory() {
    localStorage.removeItem('readings'); // MUST match your Data service key

    // clear all in-memory data
    this.readings = [];
    this.sortedReadings = [];
    this.datess = [];
    this.valTotal = [];
    this.valLDL = [];
    this.valHDL = [];
    this.valTriglycerides = [];

    // destroy old chart
    if (this.chart) {
      this.chart.destroy();
    }

    // rebuild empty chart
    this.loadChart();
  }

  // ✅ EXPORT HISTORY
  exportHistory() {
    const readings = this.data.getReadings();

    const text = JSON.stringify(readings, null, 2);

    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'cholesterol-history.json';
    a.click();

    URL.revokeObjectURL(url);
  }
}