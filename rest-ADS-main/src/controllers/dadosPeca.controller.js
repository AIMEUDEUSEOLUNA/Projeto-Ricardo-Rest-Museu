
const repository = require('../repositories/dadosPeca.repository')

async function listar(req, res, next) {
    try {
        const pecas = await repository.listar()
        return res.status(200).json({
            total: pecas.length,
            dados: pecas
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

        const peca = await repository.buscarPorId(id)

        if (!peca) {
            return res.status(404).json({ erro: 'Peça não encontrada' })
        }

        return res.status(200).json(peca)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        const dados = req.body

        if (
            typeof dados.nome !== 'string' || !dados.nome.trim() ||
            typeof dados.tipo !== 'string' || !dados.tipo.trim()
        ) {
            return res.status(400).json({
                erro: 'Nome e tipo da peça são obrigatórios'
            })
        }

        const peca = await repository.criar({
            acervoId: Number(dados.acervoId) || 1,
            nome: dados.nome.trim(),
            tipo: dados.tipo.trim(),
            descricao: dados.descricao || '',
            autor: dados.autor || '',
            periodoProducao: dados.periodoProducao || '',
            origem: dados.origem || '',
            tecnicaMateriais: dados.tecnicaMateriais || '',
            dimensoesPeso: dados.dimensoesPeso || '',
            localizacao: dados.localizacao || '',
            status: dados.status || 'Catalogada',
            estadoConservacao: dados.estadoConservacao || '',
            formaChegada: dados.formaChegada || '',
            dataChegada: dados.dataChegada || null,
            midiaId: dados.midiaId == null ? null : Number(dados.midiaId)
        })

        return res.status(201).json({
            mensagem: 'Peça cadastrada com sucesso',
            dados: peca
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

        const dados = req.body

        if (
            typeof dados.nome !== 'string' || !dados.nome.trim() ||
            typeof dados.tipo !== 'string' || !dados.tipo.trim()
        ) {
            return res.status(400).json({
                erro: 'Nome e tipo da peça são obrigatórios'
            })
        }

        const peca = await repository.atualizar(id, {
            acervoId: Number(dados.acervoId) || 1,
            nome: dados.nome.trim(),
            tipo: dados.tipo.trim(),
            descricao: dados.descricao || '',
            autor: dados.autor || '',
            periodoProducao: dados.periodoProducao || '',
            origem: dados.origem || '',
            tecnicaMateriais: dados.tecnicaMateriais || '',
            dimensoesPeso: dados.dimensoesPeso || '',
            localizacao: dados.localizacao || '',
            status: dados.status || 'Catalogada',
            estadoConservacao: dados.estadoConservacao || '',
            formaChegada: dados.formaChegada || '',
            dataChegada: dados.dataChegada || null,
            midiaId: dados.midiaId == null ? null : Number(dados.midiaId)
        })

        if (!peca) {
            return res.status(404).json({ erro: 'Peça não encontrada' })
        }

        return res.status(200).json({
            mensagem: 'Peça atualizada com sucesso',
            dados: peca
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
            return res.status(404).json({ erro: 'Peça não encontrada' })
        }

        return res.status(204).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
