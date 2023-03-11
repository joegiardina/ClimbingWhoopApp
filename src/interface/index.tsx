export type ExerciseType = any

export interface WorkoutComponentInterface {
  name: string,
  min: number,
  max: number,
  exercises?: Array<any>,
}

export interface WorkoutInterface {
  exertion?: string,
  components?: Array<WorkoutComponentInterface>,
}