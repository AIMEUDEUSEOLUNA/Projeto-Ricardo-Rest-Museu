
const pecas = [
    {
        id: 1,
        acervoId: 1,
        nome: 'Partitura histórica',
        tipo: 'Partitura',
        descricao: 'Partitura preservada pelo museu',
        autor: 'Autor desconhecido',
        periodoProducao: 'Século XX',
        origem: 'Acervo histórico',
        tecnicaMateriais: 'Papel e tinta',
        dimensoesPeso: '30 x 20 cm',
        localizacao: 'Reserva técnica',
        status: 'Catalogada',
        estadoConservacao: 'Bom',
        formaChegada: 'Doação',
        dataChegada: '2020-01-15',
        midiaId: null
    }
]

let proximoId = 2

async function listar() {
    return pecas
}

async function buscarPorId(id) {
    return pecas.find(peca => peca.id === id) || null
}

async function criar(dados) {
    const novaPeca = {
        id: proximoId++,
        ...dados
    }

    pecas.push(novaPeca)
    return novaPeca
}

async function atualizar(id, dados) {
    const indice = pecas.findIndex(peca => peca.id === id)

    if (indice === -1) return null

    pecas[indice] = {
        ...pecas[indice],
        ...dados,
        id
    }

    return pecas[indice]
}

async function remover(id) {
    const indice = pecas.findIndex(peca => peca.id === id)

    if (indice === -1) return false

    pecas.splice(indice, 1)
    return true
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
}
