export type PropertyType = {
  name: string;
  type: string;
};

export type PropertyList = Array<PropertyType>;

export type ExerciseType = {
  name: string;
  properties: Array<PropertyType>;
};

export type ExerciseList = Array<ExerciseType>;

export type WorkoutComponentInterface = {
  name: string;
  min: number;
  max: number;
  exercises?: Array<any>;
};

export type WorkoutComponentList = Array<WorkoutComponentInterface>;

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
