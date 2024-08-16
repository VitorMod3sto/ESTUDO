// IMPORTANDO O MONGOOSE PARA USAR NA FUNÇÃO CRIAR AO VERIFICAR ID DA CATEGORIA
const mongoose = require('mongoose')

// IMPORTANDO SUBCATEGORIAS
const Subcategoria = require('../models/SubCategoria');

// CRIANDO SUBCATEGORIA
async function criar(req, res) {
    // recebendo dados da subcategoria
    const { nome, descricao, categoria } = req.body;
    // importação do Model da Categoria
    const Categoria = require('../models/categoria'); // ou o caminho para o seu model
    // verificando se o nome da subcategoria já está cadastrado
    const subcategoriaNome = await Subcategoria.findOne({ nome });
    if (subcategoriaNome) {
        return res.status(400).json({ mensagem: "Essa subcategoria já existe" });
    }

    // validação do ID da categoria
    if (!mongoose.Types.ObjectId.isValid(categoria)) {
        return res.status(400).json({ mensagem: "Categoria inválida" });
    }
    const categoriaId = categoria;

    // criando nova subcategoria
    const novaSubcategoria = new Subcategoria({
        nome,
        descricao,
        categoria
    });

    await novaSubcategoria.save();
    res.status(201).json({ mensagem: "Subcategoria cadastrada com sucesso!", novaSubcategoria });
}

//  BUSCANDO TODAS AS SUBCATEGORIAS
async function buscarTodos(req, res) {
    res.json(await Subcategoria.find().populate(['categoria']))
}

// BUSCANDO SUBCATEGORIA POR ID
async function buscarPorId(req, res) {
    const subcategoria = await Subcategoria.findById(req.params.id).populate(['categoria'])
    if (subcategoria) {
        res.json(subcategoria)
    } else {
        res.status(404).json({ mensagem: "subcategoria não encontrada" })
    }
}


// ATUALIZANDO SUBCATEGORIA
async function atualizar(req, res) {
    // obtendo ID da subcategoria
    const idSubcategoria = req.params.id;
  
    // obtendo a subcategoria atual
    const subcategoriaAtual = await Subcategoria.findById(idSubcategoria);
  
    // verificando se a subcategoria foi encontrada
    if (!subcategoriaAtual) {
      return res.status(404).json({ mensagem: 'Subcategoria não encontrada' });
    }
  
    // extraindo as novas informações da subcategoria
    const novoNome = req.body.nome;
    const novaDescricao = req.body.descricao;
    const categoriaId = req.body.categoria;
  
    // validação do ID da categoria
    if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
      return res.status(400).json({ mensagem: "Categoria inválida" });
    }
  
    // atualizando a subcategoria
    const subcategoriaAtualizada = await Subcategoria.findByIdAndUpdate(idSubcategoria, {
      nome: novoNome,
      descricao: novaDescricao,
      categoria: categoriaId
    }, { new: true });
  
    // verificando se a atualização deu certo
    if (!subcategoriaAtualizada) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar subcategoria' });
    }
  
    // retornando a subcategoria atualizada
    res.json({ mensagem: 'Subcategoria atualizada com sucesso!', subcategoriaAtualizada });
  }

// EXCLUINDO CATEGORIA
async function excluir(req, res) {
    const subcategoriaExcluida = await Subcategoria.findByIdAndDelete(req.params.id)
    if (subcategoriaExcluida) {
        res.json(
            {
                mensagem: "Subcategoria excluida com sucesso!",
                subcategoriaExcluida
            }
        )
    } else {
        res.status(404).json({ mensagem: "Subcategoria não encontrado!" })
    }
}

//  EXPORTANDO FUNÇÕES
module.exports = {
    criar,
    buscarTodos,
    atualizar,
    buscarPorId,
    excluir
}