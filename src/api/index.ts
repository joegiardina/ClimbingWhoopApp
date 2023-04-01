import {
  ExerciseInterface,
  UserDetailsInterface,
  WorkoutInterface,
} from '../interface';

const BASE_URL = 'https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com';

const SESSION_HEADER_NAME = 'x-cwa-session';

type Headers = {
  'content-type'?: string;
  [SESSION_HEADER_NAME]?: string;
};

type ReqType = RequestInit & {
  method?: 'get' | 'post' | 'delete' | undefined;
  headers?: Headers;
  body?: Object;
};

type AuthInputType = {
  username: string;
  password: string;
  details?: string;
};

let token: string;
export function getToken() {
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
  try {
    const resp = await fetch(url, req);
    const text = await resp.text();
    if (resp.status >= 400) {
      throw new Error(text);
    }
    console.log('request', resp.status, req.method, url);
    return text;
  } catch (e) {
    console.log('request error', e, req.method, url);
  }
};

const get = async (path: string) => {
  const url = `${BASE_URL}${path}`;
  const req: ReqType = {method: 'get'};
  addSessionToken(req);
  return getRespText(url, req);
};

const del = async (path: string) => {
  const url = `${BASE_URL}${path}`;
  const req: ReqType = {method: 'delete'};
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
export const fetchWorkouts = () => getJson('/completedWorkouts');
export const fetchTodaysWorkout = () => getJson('/workoutToday');
export const fetchExercises = () => getJson('/exercises');
export const fetchExerciseProps = () => getJson('/exerciseProps');
export const saveCustomExercise = (data: ExerciseInterface) =>
  post('/exercise', {data});
export const saveCompletedWorkout = (data: WorkoutInterface) =>
  post('/completeWorkout', {data});
export const saveWorkout = (data: WorkoutInterface) => post('/workout', {data});
export const deleteWorkout = (data: WorkoutInterface) =>
  del(`/workout?id=${data.id}`);
export const fetchCustomWorkouts = () => getJson('/workouts');
export const fetchInitialData = () => getJson('/init');
export const saveUser = (details: UserDetailsInterface) =>
  post('/user', {details});

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
