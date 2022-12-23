import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ------------------Importing Screens------------------------
import Login from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
import VehicleDetailPage from './src/screens/VehicleDetailPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './src/screens/Background';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Background'}>
        <Stack.Screen name="Background" component={Background} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VehicleDetailPage" component={VehicleDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
