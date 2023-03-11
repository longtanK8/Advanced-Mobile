import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from './navigation/tabs';
import { HomeScreen, RestaurantScreen, OrderDeliveryScreen } from './screens';
import { LogBox, View, Text } from "react-native";
import LoginForm from './components/common/Login';
import RegisterForm from './components/common/Register';
// import { database } from './DatabaseConnector';
// import { Text } from 'react-native-svg';

// const dataRef = database.ref('path/to/data');

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const Stack = createStackNavigator();

export const App = () => {
  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
  });

  if(!loaded){
    return null
  }
  return (
    // <LoadingComponent/>
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
  );
};


const TestComponent = () => {
const [data, setData] = useState();

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://delivery-food-379309-default-rtdb.asia-southeast1.firebasedatabase.app/customers.json"
        )
      ).json();

      console.log(parseToArray(data)[0]);

      // set state when the data received
      setData(parseToArray(data));
    };

    const parseToArray = (data:String) => {
      let dataArray = Object.keys(data).map(function(index){
          let dataItem = data[index];
          // do something with person
          return dataItem;
      });
      return dataArray;
    }

    dataFetch();
  }, []);

  if(!data){
    return (
        <View>
          <Text>...</Text>
        </View>
      )
  }
  return (
    <View>
      <Text>{data[0].email}</Text>
      <Text>{data[0].email}</Text>
      <Text>{data[0].email}</Text>
      <Text>{data[0].email}</Text>
      <Text>{data[0].email}</Text>
      <Text>{data[0].email}</Text>
    </View>
  )
//   const customers = getCustomers();
//   if(!customers){
//     return (
//     <View>
//       <Text>No Customers...</Text>
//     </View>
//     )
//   }
//   return (
//     <View>
//       <Text>{customers}</Text>
//     </View>
//   )
}

export default App;