import {createContext, useContext} from 'react';
import {
  WorkoutComponentList,
  ExerciseInterfaceList,
  ExerciseInterface,
  PropertyList,
  WorkoutInterfaceList,
  WorkoutInterface,
  RecoveryInterfaceList,
} from '../interface';

interface CustomizeContextInterface {
  propertyList: PropertyList;
  exerciseList: ExerciseInterfaceList;
  componentList: WorkoutComponentList;
  workoutList: WorkoutInterfaceList;
  recovery: RecoveryInterfaceList;
  ticklist: any;
  isWhoopConnected: Boolean;
  isMountainProjectConnected: Boolean;
  updateComponents: (_: WorkoutComponentList) => void;
  updateProperties: (_: PropertyList) => void;
  saveWorkout: (_: WorkoutInterface) => void;
  deleteWorkout: (_: WorkoutInterface) => void;
  saveCustomExercise: (_: ExerciseInterface) => void;
  deleteTicklist: () => void;
  updateTicklist: () => void;
}

export const CustomizeContext = createContext<CustomizeContextInterface>({
  propertyList: [],
  exerciseList: [],
  componentList: [],
  workoutList: [],
  recovery: [],
  ticklist: {},
  isWhoopConnected: false,
  isMountainProjectConnected: false,
  updateComponents: (_: WorkoutComponentList) => {},
  updateProperties: (_: PropertyList) => {},
  saveWorkout: (_: WorkoutInterface) => {},
  deleteWorkout: (_: WorkoutInterface) => {},
  saveCustomExercise: (_: ExerciseInterface) => {},
  deleteTicklist: () => {},
  updateTicklist: () => {},
});

export const useCustomizeContext = () => {
  const customizeContext = useContext(CustomizeContext);
  return customizeContext;
};
