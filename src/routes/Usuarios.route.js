const { Router } = require("express");
const router = Router();
const UsuarioCtrl = require("../controllers/Usuarios.controllers");

router.post("/crear", UsuarioCtrl.crearUsuario);
router.post("/login", UsuarioCtrl.login);
router.get("/listar", UsuarioCtrl.listarUsuarios);
router.get("/listar/:id", UsuarioCtrl.listarId);
router.delete("/eliminar/:id", UsuarioCtrl.eliminarUsuario);
router.put("/actualizar/:id", UsuarioCtrl.actualizarUsuario);
router.get("/buscar/:nombre", UsuarioCtrl.buscarUsuario);

module.exports = router;
