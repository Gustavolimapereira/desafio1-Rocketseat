import fs from 'fs';
import { parse } from 'csv-parse';
import axios from 'axios';

const csvFilePath = './csv/dadosCSV.csv';

// Configuração da requisição para a rota POST /tasks
const createTask = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/tasks', data);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

// Leitura do arquivo CSV
fs.createReadStream(csvFilePath)
  .pipe(parse({ columns: true }))
  .on('data', (row) => {
    // Para cada linha do CSV, chame a função createTask
    createTask(row);
  })
  .on('end', () => {
    console.log('Importação concluída!');
  })
  .on('error', (error) => {
    console.error('Erro durante a importação do CSV:', error.message);
  });
