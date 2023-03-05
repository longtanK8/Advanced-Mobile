import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button, PermissionsAndroid} from 'react-native';
import Geolocation, { getCurrentPosition } from 'react-native-geolocation-service';
// Function to get permission for location
import * as Location from 'expo-location';
import { LocationSet } from "./types";
// Function to get permission for location

// const Welcome = () => {
//   const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

//   const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
//     'Wait, we are fetching you location...'
//   );

//   useEffect(() => {
//     CheckIfLocationEnabled();
//     GetCurrentLocation();
//   }, []);

//   const CheckIfLocationEnabled = async () => {
//     let enabled = await Location.hasServicesEnabledAsync();

//     if (!enabled) {
//       Alert.alert(
//         'Location Service not enabled',
//         'Please enable your location services to continue',
//         [{ text: 'OK' }],
//         { cancelable: false }
//       );
//     } else {
//       setLocationServiceEnabled(enabled);
//     }
//   };

//   const GetCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();

//     if (status !== 'granted') {
//       Alert.alert(
//         'Permission not granted',
//         'Allow the app to use location service.',
//         [{ text: 'OK' }],
//         { cancelable: false }
//       );
//     }

//     let { coords } = await Location.getCurrentPositionAsync();

//     if (coords) {
//       const { latitude, longitude } = coords;
//       let response = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude,
//       });
//     }
//   }
// }

// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Geolocation Permission',
//         message: 'Can we access your location?',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     console.log('granted', granted);
//     if (granted === 'granted') {
//       console.log('You can use Geolocation');
//       return true;
//     } else {
//       console.log('You cannot use Geolocation');
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };



const CurrentLocationSet = async () => {
  try{
    // let enabled = requestLocationPermission();
    // const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    //   'Wait, we are fetching you location...'
    // );

    // useEffect(() => {
    //   CheckIfLocationEnabled();
    //   GetCurrentLocation();
    // }, []);

    // const CheckIfLocationEnabled = async () => {
    //   const [isLocationServiceEnabled, setLocationServiceEnabled] = useState(false);
    //   let enabled = await Location.hasServicesEnabledAsync();

    //   if (!enabled) {
        
    //     Alert.alert(
    //       'Location Service not enabled',
    //       'Please enable your location services to continue',
    //       [{ text: 'OK' }],
    //       { cancelable: false }
    //     );
    //   } else {
    //     setLocationServiceEnabled(enabled);
    //     console.log(isLocationServiceEnabled);
    //   }
    // };

    // const GetCurrentLocation = async () => {
    // if(!enabled){

    // }
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      console.log(coords);
      let res = {longitude: longitude, latitude: latitude}
      return res;
    }else{
      return {longitude: 106.648054, latitude: 11.035141};
    }
    // }
    
    // return await GetCurrentLocation();
  }catch(e){
    console.log('Error: ',e)
    return {longitude: 106.648054, latitude: 11.035141};
  }
};

export const GetLongitude = async ():Promise<Number> => {
  let longitude = (await CurrentLocationSet()).longitude;
  return new Promise((resolve) => {
    resolve(longitude);
  });
}

export const GetLatitude = async ():Promise<Number> => {
  let latitude = (await CurrentLocationSet()).latitude;
  return new Promise((resolve) => {
    resolve(latitude);
  });
}

