import {createContext, useContext} from 'react';
import {WorkoutComponentList, ExerciseList, PropertyList} from '../interface';

interface CustomizeContextInterface {
  propertyList: PropertyList;
  exerciseList: ExerciseList;
  componentList: WorkoutComponentList;
  updateExercises: (input: ExerciseList) => void;
  updateComponents: (input: WorkoutComponentList) => void;
  updateProperties: (input: PropertyList) => void;
}

export const CustomizeContext = createContext<CustomizeContextInterface>({
  propertyList: [],
  exerciseList: [],
  componentList: [],
  updateExercises: (input: ExerciseList) => {},
  updateComponents: (input: WorkoutComponentList) => {},
  updateProperties: (input: PropertyList) => {},
});

export const useCustomizeContext = () => {
  const customizeContext = useContext(CustomizeContext);
  return customizeContext;
};
