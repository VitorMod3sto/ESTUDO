const express = require('express')
const router = express.Router()

// IMPORTANDO O CONTROLLER "Controlador de Autenticacao" (INTEREDIÁRIO)
const autenticacaoController = require('../controllers/autenticacaoController')

// IMPORTANDO O VALIDADOR "Validador de Autenticacao" (INTEREDIÁRIO)
const { validarUsuario, validarLogin } = require('../validators/autenticacaoValidator')

// ROTAS
router.post('/auth/registrar', validarUsuario, autenticacaoController.registrar)
router.post('/auth/login', validarLogin, autenticacaoController.login)

module.exports = router