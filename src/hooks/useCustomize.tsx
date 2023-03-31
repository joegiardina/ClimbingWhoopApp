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
  const query = useQuery({
    queryKey: 'data',
    queryFn: api.fetchInitialData,
  });

  const saveCustomExercise = useCallback(async (data: ExerciseInterface) => {
    await api.saveCustomExercise(data);
    query.refetch();
  }, []);

  const saveWorkout = useCallback(async (data: WorkoutInterface) => {
    await api.saveWorkout(data);
    query.refetch();
  }, []);

  const deleteWorkout = useCallback(async (data: WorkoutInterface) => {
    await api.deleteWorkout(data);
    query.refetch();
  }, []);

  useEffect(() => {
    if (query.data && !query.isFetching) {
      setExerciseList(query.data.exercises as ExerciseInterfaceList);
      setWorkoutList(query.data.workouts as WorkoutInterfaceList);
      setPropertyList(query.data.props as PropertyList);
    }
  }, [query.isFetching, query.status]);

  return {
    ready: !query.isLoading,
    isError: query.isError,
    context: {
      exerciseList,
      propertyList,
      componentList,
      workoutList,
      updateExercises: setExerciseList,
      updateProperties: setPropertyList,
      updateComponents: setComponentList,
      saveCustomExercise,
      saveWorkout,
      deleteWorkout,
    },
  };
};

export default useCustomize;
