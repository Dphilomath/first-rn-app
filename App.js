import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import Newroom from './assets/components/newroom';
import Home from './assets/components/home';
import Chatpage from "./assets/components/chatpage"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen options={{title:"New Room"}} name="Newroom" component={Newroom} />
        <Stack.Screen options={{title:"Chat Page"}} name="Chatpage" component={Chatpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App


