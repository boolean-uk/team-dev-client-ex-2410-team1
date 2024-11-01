import { API_URL } from './constants';

async function login(email, password) {
  return await post('login', { email, password }, false);
}

async function register(email, password) {
  await post('users', { email, password }, false);
  return await login(email, password);
}

async function createProfile(userId, firstName, lastName, username, githubUsername, mobile, bio) {
  return await patch(`users/${userId}`, {
    firstName,
    lastName,
    username,
    githubUsername,
    mobile,
    bio
  });
}

async function getPosts() {
  const res = await get('posts');
  return res.data.posts;
}

async function getCohortsById(cohortId) {
  const res = await get(`cohorts/${cohortId}/users`);
  return res.data;
}

async function getComments(id) {
  const res = await get(`posts/${id}/comments`);
  return res.data;
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth);
}

async function patchUserById(userId, data) {
  return await patch(`users/${userId}`, data);
}

async function get(endpoint, auth = true) {
  return await request('GET', endpoint, null, auth);
}

async function getAllUsers(name = '') {
  console.log('getting users with name,', name);
  const query = name ? `?name=${name}` : '';
  const res = await get(`users${query}`);
  return res.data;
}

async function getUserById(id) {
  return await get(`users/${id}`);
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method
  };

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    // eslint-disable-next-line dot-notation
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  return response.json();
}

export {
  login,
  getPosts,
  register,
  createProfile,
  getAllUsers,
  get,
  patchUserById,
  getUserById,
  getCohortsById,
  post,
  getComments
};
