
const acervoRepository = require('../repositories/acervo.repository')

async function listar(req, res, next) {
    try {
        const acervos = await acervoRepository.listar()

        return res.status(200).json({
            total: acervos.length,
            dados: acervos
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                erro: 'ID inválido'
            })
        }

        const acervo = await acervoRepository.buscarPorId(id)

        if (!acervo) {
            return res.status(404).json({
                erro: 'Item do acervo não encontrado'
            })
        }

        return res.status(200).json(acervo)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        const { nome, categoria, colecao, descricao } = req.body

        if (
            typeof nome !== 'string' || !nome.trim() ||
            typeof categoria !== 'string' || !categoria.trim()
        ) {
            return res.status(400).json({
                erro: 'Nome e categoria são obrigatórios'
            })
        }

        const novoAcervo = await acervoRepository.criar({
            nome: nome.trim(),
            categoria: categoria.trim(),
            colecao: typeof colecao === 'string' ? colecao.trim() : '',
            descricao: typeof descricao === 'string' ? descricao.trim() : ''
        })

        return res.status(201).json({
            mensagem: 'Item do acervo cadastrado com sucesso',
            dados: novoAcervo
        })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                erro: 'ID inválido'
            })
        }

        const { nome, categoria, colecao, descricao } = req.body

        if (
            typeof nome !== 'string' || !nome.trim() ||
            typeof categoria !== 'string' || !categoria.trim()
        ) {
            return res.status(400).json({
                erro: 'Nome e categoria são obrigatórios'
            })
        }

        const acervo = await acervoRepository.atualizar(id, {
            nome: nome.trim(),
            categoria: categoria.trim(),
            colecao: typeof colecao === 'string' ? colecao.trim() : '',
            descricao: typeof descricao === 'string' ? descricao.trim() : ''
        })

        if (!acervo) {
            return res.status(404).json({
                erro: 'Item do acervo não encontrado'
            })
        }

        return res.status(200).json({
            mensagem: 'Item do acervo atualizado com sucesso',
            dados: acervo
        })
    } catch (erro) {
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                erro: 'ID inválido'
            })
        }

        const removido = await acervoRepository.remover(id)

        if (!removido) {
            return res.status(404).json({
                erro: 'Item do acervo não encontrado'
            })
        }

        return res.status(204).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
}
