const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const empresaController = require("../controllers/EmpresaController");
const pessoaController = require("../controllers/PessoaController");
const lancamentoController = require("../controllers/LancamentoController");
const authUser = require("../middlewares/auth_user");
const authAdmin = require("../middlewares/auth_admin");
const loginController = require("../controllers/LoginController");

router.post("/login", loginController.login);

router.post("/user", authAdmin, userController.insert);
router.get("/users", authAdmin, userController.selectAll);
router.get("/user/:id", authAdmin, userController.selectUserById);
router.delete("/user/:id", authAdmin, userController.delete);
router.put("/user/:id", authAdmin, userController.update);

router.post("/empresa", authUser, empresaController.insert);
router.get("/empresas", empresaController.selectAll);
router.get("/empresa/:id", empresaController.selectById);
router.delete("/empresa/:id", empresaController.delete);
router.put("/empresa/:id", empresaController.update);

router.post("/pessoa", pessoaController.insert);
router.get("/pessoas", pessoaController.selectAll);
router.get("/pessoa/:id", pessoaController.selectById);
router.delete("/pessoa/:id", pessoaController.delete);
router.put("/pessoa/:id", pessoaController.update);

router.post("/lancamento", lancamentoController.insert);
router.get("/lancamentos", lancamentoController.selectAll);
router.get("/lancamento/:id", lancamentoController.selectById);
router.delete("/lancamento/:id", lancamentoController.delete);
router.put("/lancamento/:id", lancamentoController.update);

module.exports = router;
