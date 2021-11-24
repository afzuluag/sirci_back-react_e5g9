const mongoose = require("mongoose");
const { Schema } = mongoose;

const PeliculaSchema = new Schema({
  nombre: String,
  formato: String,
  clasificacion: String,
  puntaje: String,
  reparto: String,
  sinopsis: String,
  url_caratula: String,
  activo: { type: Boolean, default: false },
});

module.export = mongoose.model("Pelicula", PeliculaSchema);
