const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Datos de ejemplo
const cursos = [
  { id: 1, nombre: 'Matemáticas Básicas', profesor: 'Ana García', estudiantes: 45 },
  { id: 2, nombre: 'Programación JavaScript', profesor: 'Carlos López', estudiantes: 32 },
  { id: 3, nombre: 'Historia del Arte', profesor: 'María Rodríguez', estudiantes: 28 }
];

const usuarios = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', tipo: 'estudiante' },
  { id: 2, nombre: 'Ana García', email: 'ana@email.com', tipo: 'profesor' },
  { id: 3, nombre: 'Carlos López', email: 'carlos@email.com', tipo: 'profesor' }
];

//GET: RUTA PRINCIPAL
app.get('/', (req, res) =>{
    res.json({
        message: '🚀 Bienvenido a la Plataforma Educativa',
        version: '1.0.0',
        endpoints: [
        'GET  /cursos',
        'GET  /cursos/:id', 
        'POST /cursos',
        'GET  /usuarios',
        'GET  /usuarios/:id',
        'POST /usuarios',
        'GET  /health'
        ]
    });
});

//HEALTH CHECK
app.get('/health', (req, res) =>{
    res.json({
        status: 'healthy',
        service: 'plataforma-educativa',
        timestamp: new Date().toISOString()
    });
});

//GET: CURSOS
app.get('/cursos', (req, res) =>{
    res.json({
        success: true,
        data: cursos,
        total: cursos.length
    });
});

//GET CURSOS POR ID
app.get('/cursos/:id', (req, res) =>{

    const cursoID = parseInt(req.params.id);

    if(isNaN(cursoID)){
        res.json({
            success: false,
            message: "El id ingresado no es válido"
        });
    }

    const cursoElegido = cursos.find(l => l.id === cursoID);

    if(!cursoElegido){
        res.status(400).json({
            success: false,
            message: "No se ha encontrado ningún curso con ese ID"
        });
    }

    res.json({
        success: true,
        data: cursoElegido
    });
});

//POST CURSOS
app.post('/cursos', (req, res) =>{

    const { nombre, profesor} = req.body;

    if(!nombre || !profesor){
        return res.status(400).json({
            success: false,
            error: "El nombre del curso y el profesor son obligatorios"
        });
    }

    const Nuevocurso = {
        id: cursos.length + 1,
        nombre, 
        profesor, 
        estudiantes: 0,
        fechaCreacion: new Date.toISOString()
    };

    cursos.push(Nuevocurso);

    res.status(201).json({
        success: true,
        message: "El curso se ha registrado",
        data: Nuevocurso
    });
});

//GET USUARIOS
app.get('/usuarios', (req, res) =>{
    res.json({
        success: true,
        data: usuarios,
        total: usuarios.length
    });
});

//GET USUARIO POR ID
app.get('/usuarios/:id', (req, res) =>{
    const usuarioID = parseInt(req.params.id);

    if(isNaN(usuarioID)){
        res.json({
            success: false,
            message: "El ID ingresado no es válido"
        });
    }

    const usuarioEncontrado = usuarios.find(l => l.id === usuarioID);

    if(!usuarioEncontrado){
        res.status(400).json({
            success: false,
            message: "No se ha encontrado ninún usuario con ese ID"
        });
    }

    res.json({
        success: true,
        data: usuarioEncontrado
    });
});

//POST CREAR NUEVO USUARIO
app.post('/usuarios', (req, res) =>{
    const {nombre, email, tipo = "Estudiante"} = req.body;

    if(!nombre || !email){
        return res.status(400).json({
            success: false,
            message: "El nombre y correo son obligatorios"
        });
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre, 
        email,
        tipo,
        fechaRegistro: new Date().toISOString()
    }

    usuarios.push(nuevoUsuario);

    res.status(201).json({
        success: true,
        message: "Usuario creado exitosamente",
        data: nuevoUsuario
    });
})

//INICIAR SERVIDOR
app.listen(PORT, () =>{
    console.log(`🎯 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📚 Plataforma Educativa API lista para usar`);
});

module.exports = app;