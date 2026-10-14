// Reprodução isolada das regras públicas observadas no projeto IoT.
// Não inicia o backend, não acessa banco e não altera o projeto original.
// Fontes e limites: estudo-regras-iot.md, na mesma pasta.
const assert=require('node:assert/strict');

// Regra presente em backend/route.js.
function classificarRouter(temperatura,qualidade_ar){
 if(temperatura>35||qualidade_ar>700)return 'critico';
 if(temperatura>28||qualidade_ar>400)return 'alerta';
 return 'normal';
}

// Regra presente em backend/rules.js.
function classificarModulo(temp,umidade,ar){
 if(temp>32||temp<10||umidade<30||umidade>80||ar>600)return 'critico';
 if((temp>27&&temp<=32)||(temp>=10&&temp<18)||(umidade>=30&&umidade<40)||(umidade>70&&umidade<=80)||(ar>=300&&ar<=600))return 'alerta';
 return 'normal';
}

const casos=[
 {nome:'Temperatura de 33 graus',temperatura:33,umidade:50,ar:100,router:'alerta',modulo:'critico'},
 {nome:'Umidade de 20 por cento',temperatura:25,umidade:20,ar:100,router:'normal',modulo:'critico'}
];
for(const caso of casos){
 const router=classificarRouter(caso.temperatura,caso.ar);
 const modulo=classificarModulo(caso.temperatura,caso.umidade,caso.ar);
 assert.equal(router,caso.router);
 assert.equal(modulo,caso.modulo);
 assert.notEqual(router,modulo);
 console.log(caso.nome+': router='+router+' | modulo='+modulo);
}
console.log('DIVERGENCIA_REPRODUZIDA: mesmas entradas, classificacoes diferentes.');
