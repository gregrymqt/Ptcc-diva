/* CRUD LOCAL STORAGE ASSÍNCRONO */

// Simula delay de rede (200ms)
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 200));

/* GENÉRICOS */
export async function getStorageData(key, defaultValue = null) {
  await simulateNetworkDelay();
  const data = localStorage.getItem(key);
  if (!data) return defaultValue;
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Falha crítica ao ler a chave ${key} do Storage.`, error);
    return defaultValue;
  }
}

export async function setStorageData(key, data) {
  await simulateNetworkDelay();
  localStorage.setItem(key, JSON.stringify(data));
}

/* USUÁRIOS */
const STORAGE_KEY = "usuarios";

/* PEGAR TODOS USUÁRIOS */
export async function getUsers() {
  return await getStorageData(STORAGE_KEY, []);
}

/* SALVAR TODOS USUÁRIOS */
async function saveUsers(users) {
  await setStorageData(STORAGE_KEY, users);
}

/* CRIAR USUÁRIO */
export async function createUser(user) {
  const users = await getUsers();
  users.push(user);
  await saveUsers(users);
}

/* BUSCAR USUÁRIO POR EMAIL */
export async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find(user => user.email === email);
}

/* ATUALIZAR USUÁRIO */
export async function updateUser(email, updatedData) {
  const users = await getUsers();
  const updatedUsers = users.map(user => {
    if (user.email === email) {
      return { ...user, ...updatedData };
    }
    return user;
  });
  await saveUsers(updatedUsers);
}

/* DELETAR USUÁRIO */
export async function deleteUser(email) {
  const users = await getUsers();
  const filteredUsers = users.filter(user => user.email !== email);
  await saveUsers(filteredUsers);
}