import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { HomeMainCategories } from '../components/home/HomeMainCategories';
import { HomeRestaurantsList } from '../components/home/HomeRestaurantsList';
import { COLORS, icons } from '../constants';
import { CategoryData, CurrentLocation, Restaurant, RootTabParamList } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  categoryData,
  initialCurrentLocation,
  exactLocation,
  restaurantsWithCategories,
} from '../dummy-data';
import {
  GetLatitude, GetLongitude
} from '../location';
import { Header } from '../components/common/Header';

type HomeScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'Home'
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [restaurants, setRestaurants] = useState(restaurantsWithCategories);
  const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);
  const [isLoaded, setLoaded] = useState(false);

  function onSelectCategory(category: CategoryData) {
    const restaurantList = restaurantsWithCategories.filter((restaurant) =>
      restaurant.categories.includes(category.id),
    );
    setRestaurants(restaurantList);
    setSelectedCategory(category);
  }

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
      // console.log(currentLocation);
      // navigation.navigate('Restaurant', {
      //   item,
      //   currentLocation,
      // })
    }else{
      navigation.navigate('Restaurant', {
        item,
        currentLocation,
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={icons.nearby}
        rightIcon={icons.basket}
        headerText={currentLocation.streetName}
      />
      <HomeMainCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category: CategoryData) =>
          onSelectCategory(category)
        }
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
});
