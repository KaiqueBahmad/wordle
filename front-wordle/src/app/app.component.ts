import { Meta } from '@angular/platform-browser';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LinhasComponent } from './linhas/linhas.component';
import { TecladoComponent } from './teclado/teclado.component';
import { VerificadorService } from './verificador/verificador.service';
import { LinhaComponent } from './linhas/linha/linha.component';
import { Estados } from './linhas/linha/quadrado/estados';
import { SliderComponent } from './slider/slider.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LinhasComponent, TecladoComponent, SliderComponent],
  template: `
  <div id="body">

    <app-slider></app-slider>
    <app-linhas [tentativas]="contadorTentativas[0]" (eventoWordleCarregado)="guardarLinhas($event)" ></app-linhas>
    <app-teclado></app-teclado>
  </div>
  <router-outlet />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wordle-front';
  public contadorTentativas = [0];
  constructor(private testador:VerificadorService) {}
  private linhas:LinhaComponent[] = [];
  guardarLinhas(linhas: LinhaComponent[]) {
    this.linhas = linhas;
  }

  @HostListener('document:keydown', ['$event'])
  tentar(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.testar();
    }
  }

  testar():void {
    let palavra = "";
    this.linhas[this.contadorTentativas[0]].quadrados.forEach(x => {
      palavra += x.letra;
    });
    this.testador.testarPalavra(palavra, this.contadorTentativas, this.linhas);    
  }

}



