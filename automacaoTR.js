const data = require("./data.js");
const { salvarArquivo, carregarArquivo, converterPdfTR } = require("./util.js");
const path = require("path")


const repositorioDestino = "./termoRecebimento";

for (let i = 0; i < data.length; i++) {
    const base = carregarArquivo("./termoRecebimento/baseTR.docx")
    const descricao = data[i].descricao;
    const valor = String(data[i].etapas[1].valor.toFixed(2)).replace(".", ",");
    const item = data[i].item;
    const numOs = i + 79;
    base.setData({ descricao, valor, numOs });

    try {
        base.render();
    } catch (error) {
        console.log(error);
    }
    const tituloArquivo = `Termo de Recebimento ${numOs} - ${descricao}`.replace(/\//g, " ");

    const arquivoSaida = path.join(repositorioDestino, `${tituloArquivo}.docx`);
    salvarArquivo(base, arquivoSaida);
    converterPdfTR(tituloArquivo);
}


console.log(path.join(__dirname, 'documento.docx'));


console.log('Documentos gerados com sucesso!');