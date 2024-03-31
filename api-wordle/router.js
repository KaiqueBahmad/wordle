const express = require('express');
const router = express.Router();
const modelDicionario = require('./models/dicionario');

router.post("/checar/", (req, res) => {
	if (!req.body.tentativa) {
		return res.status(400).send("Nenhuma letra foi enviada.");
	}
	if (!/^[a-zA-Z]+$/.test(req.body.tentativa)) {
		return res.status(400).send("Somente letras são permitidas.");
	}
	let tamanho = req.body.tentativa.length;
	let response = {verificacao:[]};
	modelDicionario.getPalavraDeHoje(tamanho).then(
		(palavraDeHoje)=>{
			palavraDeHoje = palavraDeHoje.toUpperCase();
			req.body.tentativa = req.body.tentativa.toUpperCase();
			for (let i = 0; i < tamanho; i++) {
				statusLetra = -1 + (palavraDeHoje.includes(req.body.tentativa[i])) + (palavraDeHoje[i] == req.body.tentativa[i]);
				response.verificacao.push(statusLetra); 
			}
			return res.status(202).json(response);
		}
	)
	// if (req.body.tentativa == undefined) {
	// 	return res.json({acertou:false})'
	// }
	// if (req.body.tentativa?.toUpperCase() == palavras[5]) {
	// 	return res.json({acertou:true});
	// } else {
	// 	return res.json({acertou:false});
	// }
})
exports.router = router;
