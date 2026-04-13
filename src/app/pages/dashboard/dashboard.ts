import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Data } from '../../data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly data = inject(Data);
  readonly slideIndex = signal(0);
  readonly slides = computed(() => {
    const latest = this.data.latestReading();
    const hasData = this.data.hasData();

    return [
      {
        metric: 'total' as const,
        title: 'Total Cholesterol',
        value: hasData ? `${latest?.total ?? '-'} mg/dL` : 'No data',
        date: hasData ? this.formatDate(latest?.date ?? '-')   : 'No data'  
      },
      {
        metric: 'ldl' as const,
        title: 'LDL',
        value: hasData ? `${latest?.ldl ?? '-'} mg/dL` : 'No data',
        date: hasData ? this.formatDate(latest?.date ?? '-')   : 'No data'    
      },
      {
        metric: 'hdl' as const,
        title: 'HDL',
        value: hasData ? `${latest?.hdl ?? '-'} mg/dL` : 'No data',
        date: hasData ? this.formatDate(latest?.date ?? '-')   : 'No data'      
      },
      {
        metric: 'triglycerides' as const,
        title: 'Triglycerides',
        value: hasData ? `${latest?.triglycerides ?? '-'} mg/dL` : 'No data',
        date: hasData ? this.formatDate(latest?.date ?? '-')   : 'No data'      
      },
    ];
  });

  readonly stat = computed(() => {
    const latest = this.data.latestReading();
    if (!latest) return 'No data';
    return {
      total: this.status('total'),
      ldl: this.status('ldl'),
      hdl: this.status('hdl'),
      triglycerides: this.status('triglycerides'),
    };
  });


  hasData() {
    return this.data.hasData();
  }

  latestReading() {
    return this.data.latestReading();
  }

  plusSlides(n: number) {
    const totalSlides = this.slides().length;
    this.slideIndex.update((currentIndex) => {
      return (currentIndex + n + totalSlides) % totalSlides;
    });
  }

  putResults() {
    console.log('Put Results clicked');
  }


  currentSlide(n: number) {
    if (n < 0 || n >= this.slides().length) {
      return;
    }

    this.slideIndex.set(n);
  }


  formatDate(date: string | undefined) {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric' ,
      month: 'long',
      day: 'numeric'
    });  
  }



  status(metric: 'total' | 'ldl' | 'hdl' | 'triglycerides') {
    const latest = this.data.latestReading();
    if (!latest) return 'No data';
    if (metric === 'total') return latest.total < 200 ? 'Good' : 'Bad';
    if (metric === 'ldl') return latest.ldl < 100 ? 'Good' : 'Bad';
    if (metric === 'hdl') return latest.hdl >= 60 ? 'Good' : 'Bad';
    return latest.triglycerides < 150 ? 'Good' : 'Bad';
  }

}
