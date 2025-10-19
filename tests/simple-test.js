const http = require('http');

function testHealthCheck(){
    return new Promise((resolve, reject) =>{
        http.get('http://localhost:3000/health', (res) =>{
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', ()=>{
                if(res.statusCode === 200){
                    console.log("PASÓ");
                    resolve(true);
                }else{
                    console.log("FALLÓ");
                    resolve(false);
                }
            });
        });
    });
}

function testGetCursos(){
    return new Promise((resolve, reject) =>{
        http.get('http://localhost:3000/cursos', (res) =>{
            let data = '';

            res.on('data', (chunk) =>{
                data += chunk;
            });

            res.on('end', () =>{
                if(res.statusCode === 200){
                    console.log("PASÓ");
                    resolve(true);
                }else{
                    console.log("FALLÓ");
                    resolve(false);
                }
            });
        }).on('error', (err)=>{
            console.log("ERROR");
            resolve(false);
        });
    });
}

//EJERCUTAR PRUEBAS
async function runTests(){
    console.log("Ejecutando pruebas...");

    const test1 = await testHealthCheck();
    const test2 = await testGetCursos();

    if(test1 && test2){
        console.log("Han pasado todas las pruebas");
        process.exit(0);
    }else{
        console.log("Algunas pruebas fallaron");
        process.exit(1);
    }
}

if(require.main === module){
    runTests();
}

module.exports = {testHealthCheck, testGetCursos};