/*CRUD LOCAL STORAGE*/

const STORAGE_KEY = "usuarios";

/*PEGAR TODOS USUÁRIOS*/
export function getUsers() {

  const users = localStorage.getItem(STORAGE_KEY);

  return users ? JSON.parse(users) : [];

}

/*SALVAR TODOS USUÁRIOS*/
function saveUsers(users) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(users)
  );

}

/*CRIAR USUÁRIO*/
export function createUser(user) {

  const users = getUsers();

  users.push(user);

  saveUsers(users);

}

/*BUSCAR USUÁRIO POR EMAIL*/
export function findUserByEmail(email) {

  const users = getUsers();

  return users.find(
    user => user.email === email
  );

}

/*ATUALIZAR USUÁRIO*/
export function updateUser(email, updatedData) {

  const users = getUsers();

  const updatedUsers = users.map(user => {

    if(user.email === email){

      return {
        ...user,
        ...updatedData
      };

    }

    return user;

  });

  saveUsers(updatedUsers);

}

/*DELETAR USUÁRIO*/
export function deleteUser(email) {

  const users = getUsers();

  const filteredUsers = users.filter(
    user => user.email !== email
  );

  saveUsers(filteredUsers);

}