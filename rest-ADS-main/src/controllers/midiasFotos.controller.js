
const repository = require('../repositories/midiasFotos.repository')

async function listar(req, res, next) {
    try {
        const midias = await repository.listar()
        return res.status(200).json({
            total: midias.length,
            dados: midias
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ erro: 'ID inválido' })
        }

        const midia = await repository.buscarPorId(id)

        if (!midia) {
            return res.status(404).json({ erro: 'Mídia não encontrada' })
        }

        return res.status(200).json(midia)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        const { titulo, url, acervoId, pecaIds } = req.body

        if (
            typeof titulo !== 'string' || !titulo.trim() ||
            typeof url !== 'string' || !url.trim()
        ) {
            return res.status(400).json({
                erro: 'Título e URL da mídia são obrigatórios'
            })
        }

        const midia = await repository.criar({
            titulo: titulo.trim(),
            url: url.trim(),
            acervoId: acervoId == null ? null : Number(acervoId),
            pecaIds: Array.isArray(pecaIds)
                ? pecaIds.map(Number)
                : []
        })

        return res.status(201).json({
            mensagem: 'Mídia cadastrada com sucesso',
            dados: midia
        })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ erro: 'ID inválido' })
        }

        const { titulo, url, acervoId, pecaIds } = req.body

        if (
            typeof titulo !== 'string' || !titulo.trim() ||
            typeof url !== 'string' || !url.trim()
        ) {
            return res.status(400).json({
                erro: 'Título e URL da mídia são obrigatórios'
            })
        }

        const midia = await repository.atualizar(id, {
            titulo: titulo.trim(),
            url: url.trim(),
            acervoId: acervoId == null ? null : Number(acervoId),
            pecaIds: Array.isArray(pecaIds)
                ? pecaIds.map(Number)
                : []
        })

        if (!midia) {
            return res.status(404).json({ erro: 'Mídia não encontrada' })
        }

        return res.status(200).json({
            mensagem: 'Mídia atualizada com sucesso',
            dados: midia
        })
    } catch (erro) {
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ erro: 'ID inválido' })
        }

        const removida = await repository.remover(id)

        if (!removida) {
            return res.status(404).json({ erro: 'Mídia não encontrada' })
        }

        return res.status(204).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
