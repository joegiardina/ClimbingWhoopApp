export type ExerciseType = any;

export interface WorkoutComponentInterface {
  name: string;
  min: number;
  max: number;
  exercises?: Array<any>;
}

export interface WorkoutInterface {
  exertion?: string;
  components?: Array<WorkoutComponentInterface>;
}

interface UserDetailsInterface {
  name: string;
}

export interface UserInterface {
  username?: string;
  details?: UserDetailsInterface;
  authenticated: boolean;
  token?: UserDetailsInterface;
}

export interface CardComponentInterface {
  exercise?: any;
  name?: string;
}
