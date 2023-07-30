import {Linking} from 'react-native';
import {
  ExerciseInterface,
  UserDetailsInterface,
  WorkoutInterface,
} from '../interface';

const BASE_URL = 'https://vs7k2w1olc.execute-api.us-west-1.amazonaws.com';

const SESSION_HEADER_NAME = 'x-cwa-session';

const OAUTH_URL = `${BASE_URL}/oauth`;

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
  return text ? JSON.parse(text) : text;
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
  return text ? JSON.parse(text) : text;
};

// get saved completed workouts
export const fetchWorkouts = () => getJson('/completedWorkouts');
// get the saved workout for today's date
export const fetchTodaysWorkout = () => getJson('/workoutToday');
// save current workout
export const saveCompletedWorkout = (data: WorkoutInterface) =>
  post('/completeWorkout', {data});
// save a new custom workout
export const saveWorkout = (data: WorkoutInterface) => post('/workout', {data});
// delete a custom workout
export const deleteWorkout = (data: WorkoutInterface) =>
  del(`/workout?id=${data.id}`);
// get all custom workouts
export const fetchCustomWorkouts = () => getJson('/workouts');
// fetch custom exercises
export const fetchExercises = () => getJson('/exercises');
// fetch props used for creating exercises
export const fetchExerciseProps = () => getJson('/exerciseProps');
// save a custom exercise
export const saveCustomExercise = (data: ExerciseInterface) =>
  post('/exercise', {data});
// fetch whoop recovery data
export const fetchRecovery = () => get('/recovery');

// single endpoint for all initial data required by the app
export const fetchInitialData = () => getJson('/init');
// update user details
export const saveUser = (details: UserDetailsInterface) =>
  post('/user', {details});
// login
export const auth = async ({username, password}: AuthInputType) =>
  post('/login', {username, password});
// start oauth process
export const oauth = (token: string) =>
  Linking.openURL(`${OAUTH_URL}?token=${token}`);
// disconnect oauth
export const disconnectOAuth = () => get('/disconnect_oauth');

export const updateTicklist = userId => get(`/updateTicklist?userId=${userId}`);
export const deleteTicklist = () => del('/ticklist');

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
