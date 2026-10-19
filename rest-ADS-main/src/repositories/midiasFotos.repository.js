
const midias = [
    {
        id: 1,
        titulo: 'Foto da partitura histórica',
        url: 'https://exemplo.com/partitura.jpg',
        acervoId: 1,
        pecaIds: [1]
    }
]

let proximoId = 2

async function listar() {
    return midias
}

async function buscarPorId(id) {
    return midias.find(midia => midia.id === id) || null
}

async function criar(dados) {
    const novaMidia = {
        id: proximoId++,
        ...dados
    }

    midias.push(novaMidia)
    return novaMidia
}

async function atualizar(id, dados) {
    const indice = midias.findIndex(midia => midia.id === id)

    if (indice === -1) return null

    midias[indice] = {
        ...midias[indice],
        ...dados,
        id
    }

    return midias[indice]
}

async function remover(id) {
    const indice = midias.findIndex(midia => midia.id === id)

    if (indice === -1) return false

    midias.splice(indice, 1)
    return true
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
}
