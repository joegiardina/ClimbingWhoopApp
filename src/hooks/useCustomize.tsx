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
  RecoveryInterfaceList,
} from '../interface';

const useCustomize = () => {
  const [exerciseList, setExerciseList] = useState<ExerciseInterfaceList>([]);
  const [propertyList, setPropertyList] = useState<PropertyList>([]);
  const [componentList, setComponentList] = useState<WorkoutComponentList>([]);
  const [workoutList, setWorkoutList] = useState<WorkoutInterfaceList>([]);
  const [recovery, setRecovery] = useState<RecoveryInterfaceList>([]);
  const [ticklist, setTicklist] = useState<Array<any>>([]);
  const [isWhoopConnected, setIsWhoopConnected] = useState(false);
  const [isMountainProjectConnected, setIsMountainProjectConnected] =
    useState(false);
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

  const updateTicklist = useCallback(async () => {
    await api.updateTicklist('200998393');
    query.refetch();
  }, []);

  const deleteTicklist = useCallback(async () => {
    await api.deleteTicklist();
    query.refetch();
  }, []);

  useEffect(() => {
    if (query.data && !query.isFetching) {
      setIsWhoopConnected(query.data.user.isWhoopConnected);
      setIsMountainProjectConnected(query.data.user.isMountainProjectConnected);
      setExerciseList(query.data.exercises as ExerciseInterfaceList);
      setWorkoutList(query.data.workouts as WorkoutInterfaceList);
      setPropertyList(query.data.props as PropertyList);
      setComponentList(query.data.components as WorkoutComponentList);
      setTicklist(query.data.ticklist as any);
      setRecovery(query.data.recovery);
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
      recovery,
      ticklist,
      isWhoopConnected,
      isMountainProjectConnected,
      updateExercises: setExerciseList,
      updateProperties: setPropertyList,
      updateComponents: setComponentList,
      saveCustomExercise,
      saveWorkout,
      deleteWorkout,
      updateTicklist,
      deleteTicklist,
    },
  };
};

export default useCustomize;
