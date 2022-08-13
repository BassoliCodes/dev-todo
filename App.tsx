import * as React from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Home from './src/screens/Home';
import { TaskProvider } from './src/context/TaskContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <TaskProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} options={{ title: `Seja bem-vindo(a)!` }} />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </>
  );
}
