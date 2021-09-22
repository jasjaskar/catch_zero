import{ useEffect } from 'react';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import GameScreen from './src/screens/GameScreen'
import ResultScreen from './src/screens/ResultScreen'
import { CommonProvider } from './src/Context/CommonContext';

const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {
        SplashScreen.hide();
      }, []
  );

  return (
    <CommonProvider>
    <NavigationContainer
      >
      <Stack.Navigator>
        <Stack.Screen name="Game" component={GameScreen} options={{headerShown:false}} />
        <Stack.Screen name="Result" component={ResultScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </CommonProvider>
  );
}

export default App;

