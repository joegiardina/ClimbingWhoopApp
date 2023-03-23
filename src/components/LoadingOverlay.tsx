import React from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';

const LoadingOverlay = () => {
  return (
    <SafeAreaView
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        zIndex: 2,
      }}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

export default LoadingOverlay;
