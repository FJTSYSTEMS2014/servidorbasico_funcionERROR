// importamos libreria
const express = require ('express');
// el numero de puerto 4000
const PORT = 4000;
// iniciamos nuestra aplicacion
const app = express ();
// utilizamos body parser
app.use (express.json ());

// para probar la funcion ERROR de JUAN clase4
app.post ('/api/ERRORS', (req, res) => {
  console.log ('Bandera: Entro a ERRORS');
  const name1 = req.body.name;
  const age1 = req.body.age;
  console.log (name1);
  console.log (age1);

  // verifica si hay errores ingresando name y age a la funcion validateUser()
  const errores = validateUser (name1, age1);

  // si hay error errores.lenght da un [objetc][object] y eso, es distindo de 0
  if (errores.length > 0) {
    // mensaje de error personalizado
    res.status (404).send ({
      Observaciones: 'Se detectaron problemas en envio de datos',
      errores,
    });
  } else {
    // mensaje OK personalizado
    res.status (200).send ({
      Observaciones: `No hay errores my Friends! `,
    });
  }
});

//mostramos informacion cuando se termine de cargar
app.listen (PORT, () => {
  console.info (`Escuchando en el puerto : ${PORT}`);
});

//funcion para verificar todo los  errores de edad y nombre
function validateUser (name, age) {
  const error = [];

  if (!age) {
    error.push ({
      field: 'age',
      message: 'Campo requerido --> Querido,No ingresaste la edad',
    });
  }
  if (isNaN (age)) {
    error.push ({
      field: 'age',
      message: `la edad ingresada:${age} --> No es un numero`,
    });
  }
  if (18 < age||age > 120) {
    error.push ({
      field: 'age',
      message: `la edad ingresada:${age} --> No esta entre 18 y 120`,
    });
  }
  if (!name) {
    error.push ({
      field: 'name',
      message: 'Campo requerido --> Querido, no ingresaste el nombre',
    });
  } else {
    if (name.length < 3) {
      error.push ({
        field: 'name',
        message: `El nombre ingresado:${name} --> Debe tener mas de 2 carácteres`,
      });
    }
  }

  return error;
}
