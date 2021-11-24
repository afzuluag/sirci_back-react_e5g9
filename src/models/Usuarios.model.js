const mongoose = require("mongoose");
const { Schema } = mongoose;

//Creacion de un Esquema

const UsuariosSchema = new Schema({
  nombre: String,
  apellido: String,
  email: String,
  clave: String,
  telefono: String,
  direcion: String,
  genero: String,
  ciudad: String,
  fcumpleanos: Date,
  fcreacion: Date,
  admin: Boolean,
});

//Convertir a modelo
module.exports = mongoose.model("Usuarios", UsuariosSchema);
