import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import {fetchExercises, fetchExerciseProps} from '../api';
import {ExerciseList, WorkoutComponentList, PropertyList} from '../interface';

const useCustomize = () => {
  const [exerciseList, setExerciseList] = useState<ExerciseList>([]);
  const [propertyList, setPropertyList] = useState<PropertyList>([]);
  const [componentList, setComponentList] = useState<WorkoutComponentList>([]);
  const exercisesQuery = useQuery('allExercises', fetchExercises);
  const propertiesQuery = useQuery('allProperties', fetchExerciseProps);

  useEffect(() => {
    if (exercisesQuery.isSuccess) {
      setExerciseList(exercisesQuery.data);
    }
  }, [exercisesQuery.isLoading]);

  useEffect(() => {
    if (propertiesQuery.isSuccess) {
      setPropertyList(propertiesQuery.data);
    }
  }, [propertiesQuery.isLoading]);

  return {
    ready: !exercisesQuery.isLoading && !propertiesQuery.isLoading,
    context: {
      exerciseList,
      propertyList,
      componentList,
      updateExercises: setExerciseList,
      updateProperties: setPropertyList,
      updateComponents: setComponentList,
    },
  };
};

export default useCustomize;
