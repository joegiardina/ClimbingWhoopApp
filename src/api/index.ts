import {ExerciseInterface, WorkoutInterface} from '../interface';

const BASE_URL = 'https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com';

const SESSION_HEADER_NAME = 'x-cwa-session';

type Headers = {
  'content-type'?: string;
  [SESSION_HEADER_NAME]?: string;
};

type ReqType = RequestInit & {
  method?: 'get' | 'post' | undefined;
  headers?: Headers;
  body?: Object;
};

type AuthInputType = {
  username: string;
  password: string;
  details?: string;
};

let token: string;
function getToken() {
  return token;
}

export function updateToken(value: string) {
  token = value;
}

function addSessionToken(req: ReqType) {
  const token = getToken();
  if (token) {
    req.headers = req.headers || {};
    req.headers[SESSION_HEADER_NAME] = token;
  }
}

const getRespText = async (url: string, req: ReqType) => {
  const resp = await fetch(url, req);
  const text = await resp.text();
  if (resp.status >= 400) {
    throw new Error(text);
  }
  return text;
};

const get = async (path: string) => {
  const url = `${BASE_URL}${path}`;
  const req: ReqType = {};
  addSessionToken(req);
  return getRespText(url, req);
};

const getJson = async (path: string) => {
  const text = await get(path);
  return JSON.parse(text);
};

const post = async (path: string, data: any) => {
  const url = `${BASE_URL}${path}`;
  const req: ReqType = {
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
export const fetchExerciseProps = () => getJson('/exerciseProps');
export const saveCustomExercise = (data: ExerciseInterface) =>
  post('/exerciseCustom', {data});
export const saveWorkout = (data: WorkoutInterface) => post('/workout', {data});
export const saveCustomWorkout = (data: WorkoutInterface) =>
  post('/workoutCustom', {data});
export const fetchCustomWorkouts = () => getJson('/workoutsCustom');

export const auth = async ({username, password}: AuthInputType) =>
  post('/login', {username, password});

export const createUser = async ({
  username,
  password,
  details,
}: AuthInputType) =>
  post('/createUser', {
    username,
    password,
    details,
  });
