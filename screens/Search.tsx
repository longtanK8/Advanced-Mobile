import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeMainCategories } from '../components/home/HomeMainCategories';
import { HomeRestaurantsList } from '../components/home/HomeRestaurantsList';
import { COLORS, icons } from '../constants';
import { CategoryData, CurrentLocation, Restaurant, RootTabParamList } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  categoryData,
  restaurantData,
  initialCurrentLocation,
  exactLocation,
  restaurantsWithCategories,
} from '../dummy-data';
import {
  GetLatitude, GetLongitude
} from '../location';
import { Header } from '../components/common/Header';

type SearchScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'Search'
>;

type SearchScreenRouteProp = RouteProp<
  RootTabParamList,
  'Search'
>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};




export const SearchScreen = ({ navigation }: SearchScreenProps) => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);
  const [isLoaded, setLoaded] = useState(false);
  const [search, setSearch] = useState('');

  // function onSelectCategory(category: CategoryData) {
  //   const restaurantList = restaurantsWithCategories.filter((restaurant) =>
  //     restaurant.categories.includes(category.id),
  //   );
  //   setRestaurants(restaurantList);
  //   setSelectedCategory(category);
  // }

  const getLocation = async (item:Restaurant) => {
    let latitude:Number = 11.0397485;
    let longitude:Number = 106.6412255;
    if(!isLoaded){
      latitude = await GetLatitude();
      longitude = await GetLongitude();
    }
    const exactLocation: CurrentLocation = {
      streetName: 'Unknown St',
      gps: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    };
    console.log('exactLocation >>> ', exactLocation);
    if(longitude !== null && !isLoaded){
      setCurrentLocation(exactLocation);
      setLoaded(true);
      setTimeout(() => {
        console.log(currentLocation);
        navigation.navigate('Restaurant', {
          item,
          currentLocation,
        })
      }, 3000);
    }else{
      navigation.navigate('Restaurant', {
        item,
        currentLocation,
      })
    }
  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = restaurants.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setRestaurants(newData);
      setSearch(text);
    } else {
      setRestaurants(restaurantData);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={icons.nearby}
        rightIcon={icons.basket}
        headerText={currentLocation.streetName}
      />
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
      <HomeRestaurantsList
        restaurants={restaurants}
        onPress={(item) =>
          getLocation(item)
        }
      />
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: COLORS.lightGray4,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
