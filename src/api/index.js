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

const get = async url => {
  const req = {};
  addSessionToken(req);
  const resp = await fetch(url, req);
  const text = await resp.text();
  if (resp.status >= 400) {
    throw new Error(text);
  }
  return JSON.parse(text);
};

const post = async (url, data) => {
  const req = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  addSessionToken(req);
  const resp = await fetch(url, req);
  const text = await resp.text();
  if (resp.status >= 400) {
    throw new Error(text);
  }
  return JSON.parse(text);
};

export const fetchPlan = () =>
  get('https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com/getPlan');

export const saveWorkout = data =>
  post('https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com/workout', {data});

export const auth = async ({username, password}) =>
  post('https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com/login', {
    username,
    password,
  });
export const createUser = async ({username, password, details}) =>
  post('https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com/createUser', {
    username,
    password,
    details,
  });
