const { runTests } = require('./simple-test');

async function main() {
  console.log('🧪 EJECUTANDO SUITE DE PRUEBAS PARA CI/CD\n');
  
  try {
    const success = await runTests();
    if (success) {
      console.log('\n✅ CI/CD: TODAS LAS PRUEBAS PASARON EXITOSAMENTE');
      process.exit(0);
    } else {
      console.log('\n❌ CI/CD: ALGUNAS PRUEBAS FALLARON');
      process.exit(1);
    }
  } catch (error) {
    console.log('\n💥 CI/CD: ERROR EJECUTANDO PRUEBAS:', error.message);
    process.exit(1);
  }
}

// Solo ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { main };