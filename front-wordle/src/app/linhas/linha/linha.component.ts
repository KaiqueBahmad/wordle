import { Component, Input, ViewChildren, QueryList, Output, EventEmitter} from '@angular/core';
import { QuadradoComponent } from './quadrado/quadrado.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-linha',
  standalone: true,
  imports: [QuadradoComponent, NgFor],
  template: `
    <div id="linha" >
      <app-quadrado *ngFor="let i of range" [endereco]="[this.numLinha, i]" [ativo]="ativa"
      (eventoClickQuadrado)="receberClickBotoes($event)" (eventoCriacao)="registrarLetra($event)"
      (eventoProximo)="passarProProximo($event)" (eventoVoltar)="passarPraTraz($event)" ></app-quadrado>
    </div>
  `,
  styleUrl: './linha.component.css'
})
export class LinhaComponent {
  //Indica qual linha você é de 0 até n (quantidade de tentivas permitidas);
  @Input() numLinha!:number;
  @Input() ativa!:boolean;
  @Output() eventoLinhaCriada = new EventEmitter<LinhaComponent>();
  public quadrados:QuadradoComponent[] = [] ;
  public range:number[] = [0, 1, 2, 3, 4]
  constructor() {

  }

  //Registra a letra que acabou de ser criada
  registrarLetra(qdd:QuadradoComponent) {
    this.quadrados.push(qdd)
    if (this.quadrados.length == this.range.length) {
      this.eventoLinhaCriada.emit(this)
    }
  }
  
  //Desabilita a espera por letra de todos os Quadrados;
  //Exceto o que foi clicado;
  receberClickBotoes(indexQdd:number[]) {
    for (let letra of this.quadrados) {
      if (letra.endereco != indexQdd) {
        letra.esperandoLetra = false;
      }
    }
  }
  //Esse evento ocorre após o usuário digitar uma letra num
  //quadrado, quando isso acontece o proxímo quadrado se torna
  //o quadrado esperando por letra
  passarPraTraz(indexQdd:number) {
    if (indexQdd == 0) {
      this.quadrados[indexQdd].ativo = true;
      this.quadrados[indexQdd].esperandoLetra = true;
      return;
    }
    this.quadrados[indexQdd-1].ativo = true;
    this.quadrados[indexQdd-1].esperandoLetra = true;
    // this.quadrados[indexQdd-1].bloquearUmaLetra = true;
  }
  passarProProximo(indexQdd:number) {
    if (indexQdd >= this.range.length -1 ) {
      this.quadrados[indexQdd].ativo = true;
      this.quadrados[indexQdd].esperandoLetra = true;
      return;
    }
    this.quadrados[indexQdd+1].ativo = true;
    this.quadrados[indexQdd+1].esperandoLetra = true;
    this.quadrados[indexQdd+1].bloquearUmaLetra = true;


  }

}
