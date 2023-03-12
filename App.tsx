import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from './navigation/tabs';
import { HomeScreen, RestaurantScreen, OrderDeliveryScreen } from './screens';
import { LogBox, View, Text } from "react-native";
import LoginForm from './components/common/Login';
import "react-native-get-random-values";
import RegisterForm from './components/common/Register';
import AppContext from './AppContext';
import WelcomeScreen from './screens/Welcome';

// import { database } from './DatabaseConnector';
// import { Text } from 'react-native-svg';

// const dataRef = database.ref('path/to/data');

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const Stack = createStackNavigator();

export const App = () => {
  const [globalVariable, setGlobalVariable] = useState(null);
  const [welcome, setWelcome] = useState(true);
  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'MaterialIcons': require('./assets/fonts/MaterialIcons-Regular.ttf'),
  });


  if(!loaded){
    return null
  }

  setTimeout(() => {
    setWelcome(false);
  }, 4000);

  if(welcome){
    return <WelcomeScreen/>
  }
  return (
    <AppContext.Provider value={{ globalVariable, setGlobalVariable }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={"Login"}
        >
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Register" component={RegisterForm} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="OrderDelivery" component={OrderDeliveryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;