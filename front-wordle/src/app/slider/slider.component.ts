import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider'

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [MatSliderModule ],
  template: `
  <mat-slider min="4" max="7" step="1" showTickMarks discrete
  [displayWith]="formatLabel">
    <input matSliderThumb>
  </mat-slider>
`,
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  formatLabel(value:number):string {
    switch (value) {
      case 4:
        return  "Fácil";
      
      case 5:
        return "Normal";
      case 6:
        return "Difícil";
      case 7:
        return "+Difícil";
      default:
        break;
    }
    return "";
  }
}
