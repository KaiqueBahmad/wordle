import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LinhaComponent } from '../linhas/linha/linha.component';
import { QuadradoComponent } from '../linhas/linha/quadrado/quadrado.component';
import { Estados } from '../linhas/linha/quadrado/estados';
interface respostaVerificador {
  "verificacao":number[],
}

@Injectable({
  providedIn: 'root'
})
export class VerificadorService {
  private API_url: string = "http://localhost:3080/checar";
  private terminou:boolean = false;
  constructor(private httpClient:HttpClient) {
  }

  private tentativas = 0;

  testarPalavra(palavra:string, contadorTentativas:number[], linhas:LinhaComponent[]): void {
    if (this.terminou) {
      return;
    }
    let linha = linhas[contadorTentativas[0]];
    let url:string = this.API_url;
    let acertou:boolean = false;
    this.httpClient.post<respostaVerificador>(url, {"tentativa":palavra}).pipe(
      catchError(error => {
        const statusCode = error.status;
        return throwError(()=>{new Error(error)});
      })
    ).subscribe( (x:respostaVerificador) => {
      //Descobre se a palavra digitada está certa
      acertou = true;
      let lista:number[] = x.verificacao;
      lista.forEach(x=> {
        if (x != 1) {
          acertou = false;
        }
      })
      this.tentativas++;
      

      for (let index = 0; index < lista.length; index++) {
        let qdd:QuadradoComponent = linha.quadrados[index];
        switch (x.verificacao[index]) {
          case -1:
            qdd.estado = Estados.ERRADO;
            break;
          case 0:
            qdd.estado = Estados.TROCADA;
            break;
          case 1:
              qdd.estado = Estados.CORRETO;
              break;
          }
        }
        if (!acertou) contadorTentativas[0] = contadorTentativas[0] + 1; else return this.ganhar(linha);
        if (contadorTentativas[0] < linhas.length) {
          linhas[contadorTentativas[0]].quadrados[0].ativo = true;
          linhas[contadorTentativas[0]].quadrados[0].esperandoLetra = true;
        } else {
          this.terminar(linha);
        }  
      });
          
    } 
  
    terminar(linha: LinhaComponent) {
      this.terminou = true;
      linha.quadrados.forEach(x=>x.ativo=false);   
    }

  ganhar(linha: LinhaComponent) {
    this.terminar(linha);
  }
}
