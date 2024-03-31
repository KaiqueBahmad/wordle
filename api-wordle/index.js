const express = require('express');
const port = 3080;
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const Keycloak = require('keycloak-connect');
const session = require('express-session');
const router = require('./router').router;
var memoryStore = new session.MemoryStore();                       
var keycloak = new Keycloak({ store: memoryStore });
app.use(session({
    secret:'secretpassphrasesecreta',                         
    resave: false,                         
    saveUninitialized: true,                         
    store: memoryStore                       
}));
app.use(keycloak.middleware());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers","Content-Type")
	// res.header('Access-Control-Allow-Origin', 'http://192.168.0.110:4200');
	next();
});
app.use(router)
app.get("/t", keycloak.protect(),(req, res) => {
	res.send("Funcionando")
})
app.use( keycloak.middleware( { logout: '/'} ));

app.listen(port, () => {
	console.log("server rodando em http://localhost:"+port)
})
