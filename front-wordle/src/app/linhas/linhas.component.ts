import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LinhaComponent } from './linha/linha.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-linhas',
  standalone: true,
  imports: [LinhaComponent, NgFor],
  template: `
  <div>
    <app-linha *ngFor="let i of range" [numLinha]="i" [ativa]="i==tentativas" 
    (eventoLinhaCriada)="registrarLinha($event)"
    ></app-linha>
  </div>
    `,
  styleUrl: './linhas.component.css'
})
export class LinhasComponent {
  public range:number[] = [0, 1, 2, 3, 4]
  @Input() tentativas:number = 0;
  @Output() eventoWordleCarregado = new EventEmitter<LinhaComponent[]>();
  private linhas:LinhaComponent[] = [];
  
  registrarLinha(linha:LinhaComponent) {
    this.linhas.push(linha)    
    if (this.linhas.length == this.range.length) {
      this.eventoWordleCarregado.emit(this.linhas);    
      this.linhas[0].quadrados[0].ativo = true;
      this.linhas[0].quadrados[0].esperandoLetra = true;      
    }
  }
  

}
