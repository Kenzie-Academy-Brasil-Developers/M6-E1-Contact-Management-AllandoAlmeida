import axios from 'axios';

export const useViaCepService = () => {
    const getAddress = async (cep: string) => {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        return {
            street: response.data.logradouro,
            zipCode: cep,
            district: response.data.bairro,
            locality: response.data.localidade,
            state: response.data.uf
        };
    };
    return getAddress;
};

/* 
cep correios

const axios = require('axios');

// Função para obter um token JWT
async function getToken() {
  try {
    const tokenUrl = 'https://h-apigateway.conectagov.estaleiro.serpro.gov.br/oauth2/jwt-token';
    const clientId = 'seuClientId'; // Substitua pelo seu Client ID
    const clientSecret = 'seuClientSecret'; // Substitua pelo seu Client Secret
    const grantType = 'client_credentials';

    const response = await axios.post(tokenUrl, {
      grant_type: grantType,
      client_id: clientId,
      client_secret: clientSecret,
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter token:', error.message);
    throw error;
  }
}

// Função para pesquisar CEP
async function pesquisarCEP(cep) {
  try {
    const token = await getToken();
    const apiUrl = `https://h-apigateway.conectagov.estaleiro.serpro.gov.br/api-cep/v1/consulta/cep/${cep}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Ou faça o que precisar com os dados do CEP
  } catch (error) {
    console.error('Erro na pesquisa de CEP:', error.message);
    throw error;
  }
}

// Exemplo de uso
const cepParaPesquisar = '12345-678'; // Substitua pelo CEP desejado
pesquisarCEP(cepParaPesquisar)
  .then((result) => {
    console.log('Resultado da pesquisa:', result);
  })
  .catch((error) => {
    console.error('Erro geral:', error.message);
  });

*/