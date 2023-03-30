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
  updateComponents: (input: WorkoutComponentList) => void;
  updateProperties: (input: PropertyList) => void;
  saveCustomWorkout: (input: WorkoutInterface) => void;
  saveCustomExercise: (input: ExerciseInterface) => void;
}

export const CustomizeContext = createContext<CustomizeContextInterface>({
  propertyList: [],
  exerciseList: [],
  componentList: [],
  workoutList: [],
  updateComponents: (input: WorkoutComponentList) => {},
  updateProperties: (input: PropertyList) => {},
  saveCustomWorkout: (input: WorkoutInterface) => {},
  saveCustomExercise: (input: ExerciseInterface) => {},
});

export const useCustomizeContext = () => {
  const customizeContext = useContext(CustomizeContext);
  return customizeContext;
};
