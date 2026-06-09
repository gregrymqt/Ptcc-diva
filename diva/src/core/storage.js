/* ================================================
   STORAGE.JS — Responsável por salvar e buscar
   dados no localStorage do navegador.

   O localStorage funciona como um "caderno" do
   navegador: ele guarda informações mesmo depois
   que o usuário fecha a aba.
   ================================================ */


/* --------------------------------------------------
   FUNÇÕES GENÉRICAS
   Essas funções servem para qualquer tipo de dado.
   -------------------------------------------------- */

/* Lê um dado salvo no localStorage pelo nome (chave).
   Se não encontrar nada, retorna o valorPadrao. */
function getStorageData(chave, valorPadrao) {
  // Se valorPadrao não foi passado, usa null como padrão
  if (valorPadrao === undefined) {
    valorPadrao = null;
  }

  // Tenta buscar o dado pelo nome da chave
  var dado = localStorage.getItem(chave);

  // Se não encontrou nada, retorna o valor padrão
  if (!dado) {
    return valorPadrao;
  }

  // Tenta converter o texto salvo de volta para objeto JavaScript
  try {
    return JSON.parse(dado);
  } catch (erro) {
    console.error("Erro ao ler o dado salvo: " + chave, erro);
    return valorPadrao;
  }
}

/* Salva um dado no localStorage.
   Converte o dado para texto antes de salvar,
   porque o localStorage só aceita texto. */
function setStorageData(chave, dado) {
  localStorage.setItem(chave, JSON.stringify(dado));
}


/* --------------------------------------------------
   FUNÇÕES DE USUÁRIOS
   Usadas para criar, buscar, atualizar e deletar
   usuários cadastrados na aplicação.
   -------------------------------------------------- */

// Nome da chave onde a lista de usuários fica salva
var CHAVE_USUARIOS = "usuarios";

/* Busca e retorna a lista completa de usuários salvos.
   Se não houver nenhum usuário, retorna uma lista vazia. */
function getUsers() {
  return getStorageData(CHAVE_USUARIOS, []);
}

/* Salva a lista completa de usuários no localStorage.
   Função interna — usada pelas outras funções abaixo. */
function saveUsers(usuarios) {
  setStorageData(CHAVE_USUARIOS, usuarios);
}

/* Adiciona um novo usuário à lista de usuários.
   Recebe um objeto com os dados do usuário (nome, email, senha...). */
export function createUser(usuario) {
  // Pega a lista atual de usuários
  var usuarios = getUsers();

  // Adiciona o novo usuário no final da lista
  usuarios.push(usuario);

  // Salva a lista atualizada
  saveUsers(usuarios);
}

/* Procura e retorna um usuário pelo e-mail.
   Se não encontrar, retorna null. */
export function findUserByEmail(email) {
  var usuarios = getUsers();

  // Percorre a lista de usuários um por um
  for (var i = 0; i < usuarios.length; i++) {
    // Se o e-mail bater, retorna esse usuário
    if (usuarios[i].email === email) {
      return usuarios[i];
    }
  }

  // Se não encontrou nenhum, retorna null
  return null;
}

/* Atualiza os dados de um usuário existente pelo e-mail.
   Recebe o e-mail do usuário e os novos dados a atualizar. */
export function updateUser(email, novosDados) {
  var usuarios = getUsers();
  var usuariosAtualizados = [];

  // Percorre todos os usuários
  for (var i = 0; i < usuarios.length; i++) {
    var usuario = usuarios[i];

    // Se encontrou o usuário pelo e-mail, atualiza os dados
    if (usuario.email === email) {
      // Copia os dados antigos e sobrescreve com os novos
      var usuarioAtualizado = {};

      // Copia cada propriedade do usuário antigo
      for (var propriedade in usuario) {
        usuarioAtualizado[propriedade] = usuario[propriedade];
      }

      // Sobrescreve com os novos dados recebidos
      for (var novaProp in novosDados) {
        usuarioAtualizado[novaProp] = novosDados[novaProp];
      }

      usuariosAtualizados.push(usuarioAtualizado);
    } else {
      // Se não é o usuário que queremos, mantém como está
      usuariosAtualizados.push(usuario);
    }
  }

  // Salva a lista com o usuário atualizado
  saveUsers(usuariosAtualizados);
}

/* Remove um usuário da lista pelo e-mail. */
export function deleteUser(email) {
  var usuarios = getUsers();
  var usuariosRestantes = [];

  // Percorre todos os usuários
  for (var i = 0; i < usuarios.length; i++) {
    // Adiciona na lista apenas os usuários que NÃO são o que queremos deletar
    if (usuarios[i].email !== email) {
      usuariosRestantes.push(usuarios[i]);
    }
  }

  // Salva a lista sem o usuário deletado
  saveUsers(usuariosRestantes);
}

/* Exporta as funções genéricas para que outros
   arquivos possam usá-las para salvar qualquer dado. */
export { getStorageData, setStorageData };