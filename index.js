require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Conectado a la DB");
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Servidor funcionado en puerto ${process.env.SERVER_PORT}`);
    });
  })
  .catch(error => console.log("Error al conectar a la DB:", error));