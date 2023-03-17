const get = async (url) => {
  const resp = await fetch(url);
  const text = await resp.text();
  if (resp.status >= 400) {
      throw new Error(text);
  }
  return JSON.parse(text);
}

const post = async (url, data) => {
  const resp = await fetch(url, {
    method: 'post',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(data),
  });
  const text = await resp.text();
  if (resp.status >= 400) {
      throw new Error(text);
  }
  return JSON.parse(text);
}

export const fetchPlan = () => get(`https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com/getPlan`);

export const postCompleted = (data) => post(`https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com/completed`, data);

// TODO: actually do auth here
export const auth = async (username, password) => ({name: 'Joey'});