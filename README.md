Pasos para correr el proyecto:

1- Instalar nodejs: https://nodejs.org/en/
2- Instalar Módulos con el comando: npm install
3- Comando para iniciar el proyecto: npm start
4- Importar colección de postman que se encuentra en la carpeta raíz del proyecto : Api-crypto.postman_collection.json

Rutas:

// Registrar un usuario, método POST localhost:3600/usuarios 
// Ejemplos
{
   "nombre" : "Franco",
   "apellido" : "García",
   "username" : "fjgfrancojg",
   "password" : "clave1234",
   "monedaPreferida": "Peso"
}

{
   "nombre" : "Franco2",
   "apellido" : "García2",
   "username" : "fjgfrancojg2",
   "password" : "clave1234",
   "monedaPreferida": "Peso"
}

// Login de usuario, método POST localhost:3600/auth
// Ejemplos
{
    "username":"fjgfrancojg",
    "password": "clave1234"
}

{
    "username":"fjgfrancojg2",
    "password": "clave1234"
}


// Crear criptomonedas método POST localhost:3600/criptomonedas
// Ejemplos
{
   "simbolo" : "ETH",
   "precioPeso" : "339362,05",
   "precioDolar" : "3441,93",
   "precioEuro" : "2935,32",
   "nombre" : "Ethereum",
   "imagen" : "data:image/jpeg;base64,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",
   "fecha": "2019-04-28T14:45:15"
}

 {
   "simbolo" : "฿",
   "precioPeso" : "4737747,12",
   "precioDolar" : "48203,80",
   "precioEuro" : "41119,32",
   "nombre" : "Bitcoin",
   "imagen" : "data:image/jpeg;base64,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",
   "fecha": "2019-04-28T14:45:15"
}

// Agregar criptomonedas al usuario, método PATH localhost:3600/usuarios/
// Ejemplos
{

  "criptomonedas": [ 
    { 
        "_id"  : "6149195feab7b30988bbb5b6",
        "precio": 339362.05,
        "nombre" : "Ethereum"
   },
    { 
        "_id"  : "614919c4eab7b30988bbb5bb",
        "precio" : 4737747.12,
        "nombre" : "Bitcoin"
    }
   ]
       
  
}

// Listar criptomonedas método GET localhost:3600/criptomonedas

// Listar criptomonedas del usuario método GET localhost:3600/getCriptomonedas/2   <--- N de criptomonedas

