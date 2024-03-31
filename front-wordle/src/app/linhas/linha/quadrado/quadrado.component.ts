import { Component, Input, Output, EventEmitter, OnInit, HostListener} from '@angular/core';
import { Estados } from "./estados";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quadrado',
  standalone: true,
  imports: [NgIf],
  template: `
    <ng-container *ngIf="esperandoLetra && ativo">

      <div class="{{estado}} esperandoLetra" (keyup)="receberLetra($event)" (click)="comecarEspera()" >
        <p tabindex="0"  >{{letra}}</p>
      </div>

    </ng-container>
    <ng-container *ngIf="!esperandoLetra || !ativo">
      <div [className]="estado" (keyup)="receberLetra($event)" (click)="comecarEspera()" >
        <p>{{letra}}</p>
      </div>  
    </ng-container>`,
  styleUrl: './quadrado.component.css',
  preserveWhitespaces: true
})
export class QuadradoComponent implements OnInit {
  public estado:string = Estados.NULL;
  public esperandoLetra:boolean = false;
  public letra:string = ' ';
  public bloquearUmaLetra:boolean = false;
  @Input() ativo!:boolean;
  @Input() endereco!:number[];
  @Output() eventoClickQuadrado = new EventEmitter<number[]>();
  @Output() eventoCriacao = new EventEmitter<QuadradoComponent>();
  @Output() eventoProximo = new EventEmitter<number>();
  @Output() eventoVoltar = new EventEmitter<number>();
  //Recebe a letra se estiver esperando por uma
  @HostListener('document:keydown', ['$event'])
  receberLetra(event: KeyboardEvent) {
    this.esperandoLetra = this.ativo && this.esperandoLetra;
    if (!this.esperandoLetra) {
      return;
    }
    if (event.key === "Backspace") {
      this.ativo = false;
      this.esperandoLetra = false;
      // this.bloquearUmaLetra = false;
      this.eventoVoltar.emit(this.endereco[1]);
      return;
    }

    if (this.bloquearUmaLetra) {
      this.bloquearUmaLetra = false;
      return;
    }
    if (event.key.toUpperCase().match("^[A-Z]+$") && event.key.length == 1) {
      console.log('Tecla pressionada:', event.key.toUpperCase());
      this.letra = event.key.toUpperCase();
      this.esperandoLetra = false;
      this.eventoProximo.emit(this.endereco[1])
    }
  }
  
  //Avisa à linha que o quadrado foi criado e pode ser registrado;
  ngOnInit(): void {
    this.eventoCriacao.emit(this); 
  }
  //Ao clickar no quadrado ele começará a esperar por uma letra;
  comecarEspera() {
    if (!this.esperandoLetra && this.ativo) {
      this.eventoClickQuadrado.emit(this.endereco);
      this.esperandoLetra = true;
    }
  }
}