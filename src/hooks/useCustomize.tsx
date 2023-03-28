import {useState, useEffect, useCallback} from 'react';
import {useQuery} from 'react-query';
import * as api from '../api';
import {
  WorkoutComponentList,
  PropertyList,
  WorkoutInterfaceList,
  WorkoutInterface,
  ExerciseInterface,
  ExerciseInterfaceList,
} from '../interface';

const useCustomize = () => {
  const [exerciseList, setExerciseList] = useState<ExerciseInterfaceList>([]);
  const [propertyList, setPropertyList] = useState<PropertyList>([]);
  const [componentList, setComponentList] = useState<WorkoutComponentList>([]);
  const [workoutList, setWorkoutList] = useState<WorkoutInterfaceList>([]);
  const exercisesQuery = useQuery('allExercises', api.fetchExercises);
  const propertiesQuery = useQuery('allProperties', api.fetchExerciseProps);
  const workoutsQuery = useQuery('allWorkouts', api.fetchCustomWorkouts);

  const saveCustomExercise = async (data: ExerciseInterface) => {
    await api.saveCustomExercise(data);
    exercisesQuery.refetch();
  };

  const saveCustomWorkout = async (data: WorkoutInterface) => {
    await api.saveCustomWorkout(data);
    workoutsQuery.refetch();
  };

  useEffect(() => {
    if (exercisesQuery.data && !exercisesQuery.isFetching) {
      setExerciseList(exercisesQuery.data as ExerciseInterfaceList);
    }
  }, [exercisesQuery.isFetching, exercisesQuery.status]);

  useEffect(() => {
    if (propertiesQuery.data && !propertiesQuery.isFetching) {
      setPropertyList(propertiesQuery.data as PropertyList);
    }
  }, [propertiesQuery.isFetching, propertiesQuery.status]);

  useEffect(() => {
    if (workoutsQuery.data && !workoutsQuery.isFetching) {
      setWorkoutList(workoutsQuery.data as WorkoutInterfaceList);
    }
  }, [workoutsQuery.isFetching, workoutsQuery.status]);

  return {
    ready:
      !exercisesQuery.isLoading &&
      !propertiesQuery.isLoading &&
      !workoutsQuery.isLoading,
    context: {
      exerciseList,
      propertyList,
      componentList,
      workoutList,
      updateExercises: setExerciseList,
      updateProperties: setPropertyList,
      updateComponents: setComponentList,
      saveCustomExercise,
      saveCustomWorkout,
    },
  };
};

export default useCustomize;
