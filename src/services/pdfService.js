import pdfMake from 'pdfmake/build/pdfmake'
import './vfs_fonts'

// Configuração das fontes
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Bold.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-BoldItalic.ttf'
  }
}

// Estilos padrão
const defaultStyles = {
  header: {
    fontSize: 24,
    bold: true,
    margin: [0, 0, 0, 10],
    color: '#1a365d'
  },
  subheader: {
    fontSize: 16,
    bold: true,
    margin: [0, 10, 0, 5],
    color: '#2d3748'
  },
  tableHeader: {
    bold: true,
    fontSize: 12,
    color: 'white',
    fillColor: '#1a365d'
  },
  tableCell: {
    fontSize: 10
  },
  footer: {
    fontSize: 9,
    color: '#718096',
    alignment: 'center'
  }
}

// Função para gerar PDF de venda
export const generateSalePDF = (saleData) => {
  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    content: [
      // Cabeçalho
      {
        columns: [
          {
            width: 'auto',
            text: 'VIDRAÇARIA DOS ANJOS',
            style: 'header'
          },
          {
            width: '*',
            text: [
              { text: 'CNPJ: 12.345.678/0001-90\n', fontSize: 10 },
              { text: 'Tel: (11) 99999-9999\n', fontSize: 10 },
              { text: 'E-mail: contato@vidracariadosanjos.com.br', fontSize: 10 }
            ],
            alignment: 'right'
          }
        ],
        margin: [0, 0, 0, 20]
      },
      {
        text: 'TIPO: ' + (saleData.tipo.includes('BUDGET') ? 'ORÇAMENTO' : 'PEDIDO'),
        style: 'subheader',
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      {
        text: [
          { text: 'Nº do Documento: ', bold: true },
          { text: generateDocumentNumber() + '\n', color: '#1a365d' },
          { text: 'Data: ', bold: true },
          { text: formatDate(new Date()) + '\n', color: '#1a365d' },
          { text: 'Hora: ', bold: true },
          { text: formatTime(new Date()), color: '#1a365d' }
        ],
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      
      // Informações do cliente
      {
        text: 'DADOS DO CLIENTE',
        style: 'subheader',
        margin: [0, 0, 0, 10]
      },
      {
        columns: [
          {
            width: '*',
            text: [
              { text: 'Nome: ', bold: true },
              saleData.nome + '\n',
              { text: 'CPF: ', bold: true },
              saleData.cpf + '\n',
              { text: 'Telefone: ', bold: true },
              saleData.telefone + '\n',
              { text: 'CEP: ', bold: true },
              saleData.cep
            ]
          },
          {
            width: '*',
            text: [
              { text: 'Endereço: ', bold: true },
              saleData.endereco + ', ' + saleData.numero + '\n',
              { text: 'Bairro: ', bold: true },
              saleData.bairro + '\n',
              { text: 'Cidade: ', bold: true },
              saleData.cidade
            ]
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Tabela de itens
      {
        text: 'ITENS',
        style: 'subheader',
        margin: [0, 0, 0, 10]
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Qtd', style: 'tableHeader' },
              { text: 'Descrição', style: 'tableHeader' },
              { text: 'Medidas', style: 'tableHeader' },
              { text: 'Cor', style: 'tableHeader' },
              { text: 'Valor Unit.', style: 'tableHeader' },
              { text: 'Subtotal', style: 'tableHeader' }
            ],
            ...saleData.itens.map(item => [
              { text: item.quantidade, alignment: 'center' },
              item.material,
              { text: item.medidas, alignment: 'center' },
              { text: item.cor, alignment: 'center' },
              { text: formatCurrency(item.unitario), alignment: 'right' },
              { text: formatCurrency(item.subtotal), alignment: 'right' }
            ])
          ]
        },
        margin: [0, 0, 0, 20]
      },

      // Total
      {
        text: [
          { text: 'TOTAL: ', bold: true, fontSize: 14 },
          { text: formatCurrency(saleData.itens.reduce((acc, item) => acc + item.subtotal, 0)), fontSize: 14, color: '#1a365d' }
        ],
        alignment: 'right',
        margin: [0, 0, 0, 40]
      },

      // Espaço em branco para mover as assinaturas para baixo
      {
        text: '',
        margin: [0, 150, 0, 0]
      },

      // Rodapé com assinaturas
      {
        columns: [
          {
            width: '*',
            margin: [50, 0, 50, 0],
            text: [
              { text: 'Vendedor\n', bold: true, alignment: 'center', fontSize: 12 },
              { text: 'João Silva\n\n', alignment: 'center', fontSize: 11 },
              { text: '_________________________________\n', alignment: 'center', fontSize: 14 },
              { text: 'Assinatura', alignment: 'center', fontSize: 10, color: '#718096' }
            ]
          },
          {
            width: '*',
            margin: [50, 0, 50, 0],
            text: [
              { text: 'Cliente\n', bold: true, alignment: 'center', fontSize: 12 },
              { text: saleData.nome + '\n\n', alignment: 'center', fontSize: 11 },
              { text: '_________________________________\n', alignment: 'center', fontSize: 14 },
              { text: 'Assinatura', alignment: 'center', fontSize: 10, color: '#718096' }
            ]
          }
        ],
        margin: [0, 0, 0, 50]
      }
    ],
    styles: defaultStyles,
    defaultStyle: {
      font: 'Roboto',
      fontSize: 10
    },
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: [
              { text: 'Vidraçaria dos Anjos - CNPJ: 12.345.678/0001-90\n', style: 'footer' },
              { text: 'Rua Exemplo, 123 - Centro - São Paulo/SP - CEP: 01234-567\n', style: 'footer' },
              { text: 'Tel: (11) 99999-9999 - E-mail: contato@vidracariadosanjos.com.br', style: 'footer' }
            ],
            alignment: 'center'
          }
        ],
        margin: [40, 0]
      }
    }
  }

  // Gera e abre o PDF
  pdfMake.createPdf(docDefinition).open()
}

// Funções auxiliares
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('pt-BR')
}

const generateDocumentNumber = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${year}${month}${day}-${random}`
} 