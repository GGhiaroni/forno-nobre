import { toast } from "sonner";

const buscarCep = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      toast.error("CEP não encontrado! ⚠️");
      return null;
    }

    return data;
  } catch (error) {
    toast.error("Erro ao buscar o endereço! ⚠️", error);
    return null;
  }
};

export default buscarCep;
