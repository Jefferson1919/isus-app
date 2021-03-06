/* eslint-disable import/no-cycle */
import {
  salvarDados, pegarDados, removerDados
} from './armazenamento';
import { autenticar, pegarTokenDeAcesso } from '../apis/apiKeycloak';
import { navigate } from '../routes/rootNavigation';

async function autenticarComIdSaude(email, senha) {
  try {
    const response = await autenticar(email, senha);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function salvarDadosDeCadastro(dados) {
  await salvarDados('cadastro-usuario', dados);
}

async function pegarDadosDeCadastro() {
  const resultado = await pegarDados('cadastro-usuario');
  return resultado;
}

async function pegarTokenDoUsuarioNoStorage() {
  const token = await pegarDados('token_usuario');
  return token;
}

async function salvarTokenDoUsuarioNoStorage(token) {
  await salvarDados('token_usuario', token);
}

async function excluirTokenDoUsuarioNoStorage() {
  await removerDados('token_usuario');
}

async function atualizarTokenDeAcessoDoUsuario() {
  try {
    const token = await pegarTokenDoUsuarioNoStorage();
    const resultado = await pegarTokenDeAcesso(token.refresh_token);
    if (!resultado.sucesso) {
      await excluirTokenDoUsuarioNoStorage();
      navigate('LOGIN');
    }
    const { mensagem } = resultado;
    await salvarTokenDoUsuarioNoStorage(mensagem);
  } catch (err) {
    console.log(err);
  }
}


export {
  autenticarComIdSaude,
  salvarTokenDoUsuarioNoStorage,
  pegarTokenDoUsuarioNoStorage,
  excluirTokenDoUsuarioNoStorage,
  salvarDadosDeCadastro,
  pegarDadosDeCadastro,
  atualizarTokenDeAcessoDoUsuario
};
