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
