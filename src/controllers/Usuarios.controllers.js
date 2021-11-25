const UsuarioCtrl = {};

const Usuario = require("../models/Usuarios.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Crear Usuario
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

//Listar Usuarios general
UsuarioCtrl.listarUsuarios = async (req, res) => {
  const respuesta = await Usuario.find();
  res.json(respuesta);
};

//Listar Usuario x Id
UsuarioCtrl.listarId = async (req, res) => {
  const id = req.params.id;
  const respuesta = await Usuario.findOne({ _id: id });
  res.json(respuesta);
};

//Eliminar Usuario x Id
UsuarioCtrl.eliminarUsuario = async (req, res) => {
  const id = req.params.id;
  await Usuario.findByIdAndRemove({ _id: id });
  res.json({
    mensaje: "Usuario Eliminado",
  });
};

//Actualizar Usuario x Id
UsuarioCtrl.actualizarUsuario = async (req, res) => {
  const id = req.params.id;
  await Usuario.findByIdAndUpdate({ _id: id }, req.body);
  res.json({
    mensaje: "Usuario Actualizado",
  });
};

//Buscar Usuario
UsuarioCtrl.buscarUsuario = async (req, res) => {
  const { nombre } = req.params;
  const respuesta = await Usuario.find({
    nombre: { $regex: ".*" + nombre + ".*" },
  });
  res.json(respuesta);
};

//Login Usuario
UsuarioCtrl.login = async (req, res) => {
  const { email, clave } = req.body;
  const usuario = await Usuario.findOne({ email: email });

  if (!usuario) {
    return res.json({
      mensaje: "El Email no esta registrado",
    });
  }

  const match = await bcrypt.compare(clave, usuario.clave);

  if (match) {
    const token = jwt.sign({ _id: usuario._id }, "Secreta");
    res.json({
      mensaje: "Iniciaste Sesion correctamente",
      id: usuario.id,
      nombre: usuario.nombre,
      token,
    });
  } else {
    res.json({
      mensaje: "Contraseña incorrecta",
    });
  }
};

module.exports = UsuarioCtrl;
