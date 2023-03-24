const BASE_URL = 'https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com';

let token;
function getToken() {
  return token;
}

export function updateToken(value) {
  token = value;
}

function addSessionToken(req) {
  const token = getToken();
  if (token) {
    req.headers = req.headers || {};
    req.headers['x-cwa-session'] = token;
  }
}

const getRespText = async (url, req) => {
  const resp = await fetch(url, req);
  const text = await resp.text();
  if (resp.status >= 400) {
    throw new Error(text);
  }
  return text;
}

const get = async path => {
  const url = `${BASE_URL}${path}`;
  const req = {};
  addSessionToken(req);
  return getRespText(url, req);
};

const getJson = async path => {
  const text = await get(path);
  return JSON.parse(text);
}

const post = async (path, data) => {
  const url = `${BASE_URL}${path}`;
  const req = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  addSessionToken(req);
  const text = await getRespText(url, req);
  return JSON.parse(text);
};

export const fetchPlan = () => getJson('/getPlan');
  
export const fetchWorkouts = () => getJson('/workouts');

export const fetchTodaysWorkout = () => getJson('/workoutToday');

export const fetchExercises = () => getJson('/exercises');
  
export const saveWorkout = data => post('/workout', {data});

export const auth = async ({username, password}) => post('/login', {username, password});

export const createUser = async ({username, password, details}) =>
  post('/createUser', {
    username,
    password,
    details,
  });
