
const acervos = [
    {
        id: 1,
        nome: 'Acervo de Partituras Históricas',
        categoria: 'Partituras',
        colecao: 'Música Erudita',
        descricao: 'Coleção de partituras históricas do museu'
    }
]

let proximoId = 2

async function listar() {
    return acervos
}

async function buscarPorId(id) {
    return acervos.find(acervo => acervo.id === id) || null
}

async function criar(dados) {
    const novoAcervo = {
        id: proximoId++,
        nome: dados.nome,
        categoria: dados.categoria,
        colecao: dados.colecao,
        descricao: dados.descricao
    }

    acervos.push(novoAcervo)
    return novoAcervo
}

async function atualizar(id, dados) {
    const indice = acervos.findIndex(acervo => acervo.id === id)

    if (indice === -1) {
        return null
    }

    acervos[indice] = {
        ...acervos[indice],
        nome: dados.nome,
        categoria: dados.categoria,
        colecao: dados.colecao,
        descricao: dados.descricao
    }

    return acervos[indice]
}

async function remover(id) {
    const indice = acervos.findIndex(acervo => acervo.id === id)

    if (indice === -1) {
        return false
    }

    acervos.splice(indice, 1)
    return true
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
}
