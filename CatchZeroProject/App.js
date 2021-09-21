import{ useEffect } from 'react';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './src/screens/HomeScreen'
import GameScreen from './src/screens/GameScreen'

const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {
        SplashScreen.hide();
      }, []
  );

  return (
    <NavigationContainer
      >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Game" component={GameScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

