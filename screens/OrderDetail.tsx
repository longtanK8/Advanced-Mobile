import React, { useContext, useEffect, useState } from 'react';

import { View, Image, StyleSheet as ReactStyle, RefreshControl, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import {
    SafeAreaView,
    StyleSheet,
  } from 'react-native';
import { HomeMainCategories } from '../components/home/HomeMainCategories';
import { HomeRestaurantsList } from '../components/home/HomeRestaurantsList';
import { COLORS, icons } from '../constants';
import { CategoryData, CurrentLocation, Restaurant, RootTabParamList } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AppContext from '../AppContext';
import { getOrdersByUserId } from '../DatabaseConnector';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  restaurantAvatar: string;
  restaurantName: string;
  restaurantRating: number;
  orderedDishes: { name: string, quantity: number, price: number }[];
}

type OrderDetailType = () => {
	id: string;
	restaurantName: string;
	orderDate: string,
	foodList: Food[];
	photo: any
}

type Food = () => {
	name: string;
	price: number;
	quantity: number;
}

const OrderDetailView: React.FC<Props> = ({
  restaurantAvatar,
  restaurantName,
  restaurantRating,
  orderedDishes
}) => {

  const totalDishes = orderedDishes.reduce((total, { quantity }) => total + quantity, 0);
  const totalPrice = orderedDishes.reduce((total, { price, quantity }) => total + price * quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: restaurantAvatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{restaurantName}</Text>
          <Text style={styles.rating}>{restaurantRating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.total}>Total: {totalDishes} dishes, ${totalPrice.toFixed(2)}</Text>
        <FlatList
          data={orderedDishes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.dish}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishQuantity}>x{item.quantity}</Text>
              <Text style={styles.dishPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export const OrderDetail = (orderHis:any, isFaded:boolean) => {
	const [fade, setFade] = useState(isFaded);
	
	let foodList:any[];
	orderHis.foodList && orderHis.foodList.forEach(e => {
		foodList.push({
			name: e.name,
			price: e.price,
			quantity: e.quantity
		})
	})

	return (
		<>
		{!fade &&
			(<SafeAreaView style={styles2.container}>
			<View style={{height: "auto"}}>
				<TouchableOpacity onPress={() => {setFade(true)}}></TouchableOpacity>
			</View>
			<OrderDetailView 
				restaurantAvatar={require('../assets/images/paradise-logo.png')}
				restaurantName={orderHis.restaurantName}
				restaurantRating={orderHis.rating}
				orderedDishes={foodList}
			/>
		</SafeAreaView>)
		}
		</>
	);
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16
  },
  info: {
    flex: 1
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4
  },
  rating: {
    fontSize: 16,
    color: '#999'
  },
  body: {
    flex: 1
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16
  },
  dish: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  dishName: {
    flex: 1,
    fontSize: 16
  },
  dishQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

const styles2 = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: COLORS.lightGray4,
	},
});