const { Router } = require("express");
const router = Router();
const UsuarioCtrl = require("../controllers/Usuarios.controllers");

router.post("/crear", UsuarioCtrl.crearUsuario);

module.exports = router;
