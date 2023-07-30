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

export interface UserDetailsInterface {
  name: string;
}

export interface UserInterface {
  username?: string;
  details?: UserDetailsInterface;
  authenticated: boolean;
  token?: string;
}

interface RecoveryScoreInterface {
  user_calibrating: Boolean;
  recovery_score: number;
  resting_heart_rate: number;
  hrv_rmssd_milli: number;
  spo2_percentage: number;
  skin_temp_celsius: number;
}

export interface RecoveryInterface {
  cycle_id: number;
  sleep_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  score_state: string;
  score: RecoveryScoreInterface;
}

export type RecoveryInterfaceList = Array<RecoveryInterface>;
