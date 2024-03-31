//Modelo para leitura dos dados de dicionário
const fs = require('node:fs/promises');
const path = require('path');
const baseDir = path.resolve('.');

exports.getPalavraDeHoje = (tamanho) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(path.resolve(baseDir,'dados','palavras_de_hoje.txt'), 'utf-8').then(
                (res, rej) => {
                    dados = res.split("\n");
                    palavraExiste = false;
                    dados.forEach(palavra => {
                        if (palavra.length === tamanho) {
                            palavraExiste = true;
                            return resolve(palavra);
                        }
                    });
                    if (!palavraExiste) {
                        return resolve("")
                    }
                }
            );
        }
    );
}

exports.checarPalavraExiste = (palavra) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(path.resolve(baseDir,'..','dados','ordenado.txt'),'utf-8').then(
                (dados)=>{
                    getRangeTamanho(palavra.length).then(
                        (res,rej)=>{
                            [inicio, fim] = res;
                            let i = inicio;
                            dados = dados.split("\n")
                            while (i < fim) {
                                if (dados[i].toUpperCase() === palavra.toUpperCase()) {
                                    return resolve(true);
                                }
                                i++;
                            }
                            return resolve(false);
                        }
                    );
                },
                (err)=>{
                    reject(err);
                }
            )
        }
    );    
}

//Descobre onde começa e termina as palavras de um tamanho
exports.getRangeTamanho = (tamanho) => {
    tamanho = String(tamanho);
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                path.resolve(baseDir,'..','dados','indexes.txt'),
                'utf-8'
            ).then(
                (indices) => {
                    indices = indices.split("\n");
                    let i = 0;

                    while (i < indices.length) {
                        [indice, start] = indices[i].split(';');
                        if (tamanho === indice) {
                            if (i + 1 < indices.length) {
                                return resolve([Number(start), Number(indices[i+1].split(";")[1])]);
                            } else {
                                return resolve([Number(start), -1]);
                            }
                        }
                        i++;
                    }
                    return resolve([-1, -1])
                }
            )
        }
    );
}

// exports.getPalavraDeHoje = getPalavraDeHoje;