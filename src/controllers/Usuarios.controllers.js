const UsuarioCtrl = {};

const Usuario = require("../models/Usuarios.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

UsuarioCtrl.crearUsuario = async (req, res) => {
  const {
    nombre,
    apellido,
    email,
    clave,
    telefono,
    direcion,
    genero,
    ciudad,
    fcumpleanos,
    fcreacion,
    admin,
  } = req.body;

  const NuevoUsuario = new Usuario({
    nombre,
    apellido,
    email,
    clave,
    telefono,
    direcion,
    genero,
    ciudad,
    fcumpleanos,
    fcreacion,
    admin,
  });

  const correoUsuario = await Usuario.findOne({ email: email });

  if (correoUsuario) {
    res.json({
      mensaje: "El correo ya existe",
    });
  } else {
    NuevoUsuario.clave = await bcrypt.hash(clave, 10);
    const token = jwt.sign({ _id: NuevoUsuario._id }, "Secreta");
    await NuevoUsuario.save();

    res.json({
      mensaje: "Bienvenido",
      id: NuevoUsuario._id,
      nombre: NuevoUsuario.nombre,
      token,
    });
  }
};

module.exports = UsuarioCtrl;
