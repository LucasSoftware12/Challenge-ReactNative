import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';
import UserDetailsScreen from './src/screens/UserDetails';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: 'white', // Cambia el color de fondo del encabezado
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Tu lista de contactos',
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: 'red', // Cambia el color de fondo del encabezado
            },
            headerTitleStyle: {
              color: 'white', // Cambia el color del título
            },
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{
            title: 'Contacto',
            headerStyle: {
              backgroundColor: 'red', // Cambia el color de fondo del encabezado
            },
            headerTitleStyle: {
              color: 'white', // Cambia el color del título
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
