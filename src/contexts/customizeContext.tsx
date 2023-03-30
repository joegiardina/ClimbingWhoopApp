import {createContext, useContext} from 'react';
import {
  WorkoutComponentList,
  ExerciseInterfaceList,
  ExerciseInterface,
  PropertyList,
  WorkoutInterfaceList,
  WorkoutInterface,
} from '../interface';

interface CustomizeContextInterface {
  propertyList: PropertyList;
  exerciseList: ExerciseInterfaceList;
  componentList: WorkoutComponentList;
  workoutList: WorkoutInterfaceList;
  updateComponents: (_: WorkoutComponentList) => void;
  updateProperties: (_: PropertyList) => void;
  saveCustomWorkout: (_: WorkoutInterface) => void;
  saveCustomExercise: (_: ExerciseInterface) => void;
}

export const CustomizeContext = createContext<CustomizeContextInterface>({
  propertyList: [],
  exerciseList: [],
  componentList: [],
  workoutList: [],
  updateComponents: (_: WorkoutComponentList) => {},
  updateProperties: (_: PropertyList) => {},
  saveCustomWorkout: (_: WorkoutInterface) => {},
  saveCustomExercise: (_: ExerciseInterface) => {},
});

export const useCustomizeContext = () => {
  const customizeContext = useContext(CustomizeContext);
  return customizeContext;
};
