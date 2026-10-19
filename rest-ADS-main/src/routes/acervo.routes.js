
const express = require('express')
const acervoController = require('../controllers/acervo.controller')

const router = express.Router()

router.get('/', acervoController.listar)
router.get('/:id', acervoController.buscarPorId)
router.post('/', acervoController.criar)
router.put('/:id', acervoController.atualizar)
router.delete('/:id', acervoController.remover)

module.exports = router
