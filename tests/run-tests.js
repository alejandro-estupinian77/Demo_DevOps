const {testHealthCheck, testGetCursos} = require('./simple-test');

async function main(){
    console.log("Iniciando pruebas");

    try{
        await testHealthCheck();
        await testGetCursos();

        console.log("Pruebas completadas")
    }catch{
        console.log("Error en las pruebas");
        process.exit(1);
    }
}

main();