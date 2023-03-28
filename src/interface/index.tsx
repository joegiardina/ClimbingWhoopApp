export type PropertyType = {
  name: string;
  type: string;
};

export type PropertyList = Array<PropertyType>;

export type ExerciseInterface = {
  name: string;
  properties: Array<PropertyType>;
};

export type ExerciseInterfaceList = Array<ExerciseInterface>;

export type WorkoutComponentInterface = {
  name: string;
  min?: number;
  max?: number;
  exercises?: Array<any>;
};

export type WorkoutComponentList = Array<WorkoutComponentInterface>;

export interface WorkoutInterface {
  name: string;
  id: string;
  exertion?: string;
  components: Array<WorkoutComponentInterface>;
}

export type WorkoutInterfaceList = Array<WorkoutInterface>;

interface UserDetailsInterface {
  name: string;
}

export interface UserInterface {
  username?: string;
  details?: UserDetailsInterface;
  authenticated: boolean;
  token?: string;
}
