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
      <Stack.Navigator
       screenOptions={{
        headerStyle: {
          backgroundColor: '#847db0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} 
      initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen options={{title:"New Room"}} name="Newroom" component={Newroom} />
        <Stack.Screen options={({ route }) => ({ title: route.params.chatRoom+" Chatroom" })} name="Chatpage" component={Chatpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App


