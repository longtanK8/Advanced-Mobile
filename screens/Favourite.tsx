import React, { useState,useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
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
import AppContext from '../AppContext';

type FavouriteScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'Favourite'
>;

type FavouriteScreenRouteProp = RouteProp<
  RootTabParamList,
  'Favourite'
>;

type FavouriteScreenProps = {
  navigation: FavouriteScreenRouteProp;
};




export const FavouriteScreen = ({ navigation }: FavouriteScreenProps) => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);
  const { globalVariable, setGlobalVariable } = useContext(AppContext);
  const [isLoaded, setLoaded] = useState(false);
  const [like, setLike] = useState('');

  // function onSelectCategory(category: CategoryData) {
  //   const restaurantList = restaurantsWithCategories.filter((restaurant) =>
  //     restaurant.categories.includes(category.id),
  //   );
  //   setRestaurants(restaurantList);
  //   setSelectedCategory(category);
  // }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const favorites = globalVariable.user.favorites;
      const exactLocation: CurrentLocation = {
        streetName: 'Unknown St',
        gps: {
          latitude: globalVariable.location.latitude,
          longitude: globalVariable.location.longitude,
        },
      };
      setCurrentLocation(exactLocation);
      if(favorites){
        let returnData:Restaurant[] = [];
        favorites.forEach( fav => {
          restaurants.filter(res => res.id == fav.id).forEach(e => {
            returnData.push(e);
          });
        });
        setLikedRestaurants(returnData);
      }
    });
    return unsubscribe;
  }, [navigation])

  const getLocation = async (item:Restaurant) => {
    console.log(currentLocation);
    navigation.navigate('Restaurant', {
      item,
      currentLocation,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={icons.nearby}
        rightIcon={icons.basket}
        headerText={currentLocation.streetName}
      />
      {likedRestaurants && (
        <HomeRestaurantsList
          restaurants={likedRestaurants}
          onPress={(item) =>
            getLocation(item)
          }
        />
      )}
      {likedRestaurants.length == 0 &&
        (
          <View style={{height: "100%", backgroundColor: "#FFF9E1"}}>
            <Image
              source={require('../assets/images/paradise-logo.png')}
              style={styles.logo}
            />
            <Text style={{color: "#333", fontWeight: "bold", marginTop: 100, textAlign: "center", fontSize: 20}}>Opppsss... No Favorite Restaurants</Text>
          </View>
        )
      }
      
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
  logo: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});
