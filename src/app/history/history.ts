import { Component, inject } from '@angular/core';
import { Data } from '../data';
import{Chart, registerables} from 'chart.js'

Chart.register(...registerables);


@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  private readonly data = inject(Data);
  private newDate = this.generateDate();
  

 public  config: any = {
  type: 'line',
  data: {

    labels: [ this.newDate], 
    datasets: [
      {
       label: 'Total Cholesterol',
       data: this.data.getReadings().map(r => r.total)
    
       

      }
      
    ]

  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  },
};

chart: any;
ngOnInit(): void {
    this.chart = new Chart('myChart', this.config);
  }


  generate() {
    const read = {
      total: Math.floor(Math.random() * 300) + 100,
      ldl: Math.floor(Math.random() * 200) + 50,
      hdl: Math.floor(Math.random() * 100) + 20,
      triglycerides: Math.floor(Math.random() * 300) + 50,
      date: new Date().toISOString(),
      source: 'generated' as const,
    };

    this.data.addReading(read);
  }

  generateDate(){
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString();

  }





}
