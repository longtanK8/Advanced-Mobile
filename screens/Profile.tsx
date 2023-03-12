import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet as ReactStyle, RefreshControl } from 'react-native';
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


type HomeScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'Home'
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export const ProfileScreen = ({ navigation }: HomeScreenProps) => {
	
	return (
		<SafeAreaView style={styles2.container}>
			<ProfilePage/>
		</SafeAreaView>
	);
};

export const ProfilePage = () => {
	const { globalVariable, setGlobalVariable } = useContext(AppContext);
	const [orders, setOrders] = useState();
	const [refreshing, setRefreshing] = React.useState(false);

	useEffect(() => {
		const getOrder = async() => {
			const data = await getOrdersByUserId(globalVariable.user.id);
			
			setOrders(data);
		}
		getOrder();
	}, [refreshing])

	

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

	console.log(JSON.stringify(globalVariable));
  const user = {
    name: globalVariable.user.fullName,
		userName: globalVariable.user.userName,
    email: globalVariable.user.email,
		phoneNumber: globalVariable.user.phoneNumber,
		yearOfBirth: globalVariable.user.yearOfBirth || "not given",
		gender: globalVariable.user.gender || "not given",
    picture: 'https://randomuser.me/api/portraits/men/1.jpg',
    orders: orders
  };

  return (
		<ScrollView contentContainerStyle={styles.scrollView}
		refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
		}>
			
			<View style={styles.container}>
				<View style={styles.header}>
					<Avatar
						size="large"
						rounded
						source={{ uri: user.picture }}
						containerStyle={{ marginBottom: 10 }}
					/>
					<Text style={styles.name}>{user.name}</Text>
					<Text style={styles.email}>{user.email}</Text>
				</View>

				<View style={styles.section}>
					<ListItem
						containerStyle={styles.listItemContainer}
						bottomDivider
						onPress={() => console.log('Edit profile pressed')}
					>
						<ListItem.Content>
							<ListItem.Title style={styles.listItemTitle}>
								Personal Information
							</ListItem.Title>
							<ListItem.Subtitle style={styles.listItemSubtitle}>
								<View style={styles.viewContainer}>
									<Text style={styles.leftText}>Username: </Text>
									<Text style={styles.rightText}>{user.userName}</Text>
								</View>
							</ListItem.Subtitle>
							<ListItem.Subtitle style={styles.listItemSubtitle}>
								<View style={styles.viewContainer}>
									<Text style={styles.leftText}>Gender: </Text>
									<Text style={styles.rightText}>{user.gender}</Text>
								</View>
							</ListItem.Subtitle>
							<ListItem.Subtitle style={styles.listItemSubtitle}>
								<View style={styles.viewContainer}>
									<Text style={styles.leftText}>Year Of Birth: </Text>
									<Text style={styles.rightText}>{user.yearOfBirth}</Text>
								</View>
							</ListItem.Subtitle>
							<ListItem.Subtitle style={styles.listItemSubtitle}>
								<View style={styles.viewContainer}>
									<Text style={styles.leftText}>Phone Number: </Text>
									<Text style={styles.rightText}>{user.phoneNumber}</Text>
								</View>
							</ListItem.Subtitle>
						</ListItem.Content>
						<ListItem.Chevron color="#bbb" />

					</ListItem>

					<ListItem
						// containerStyle={styles.listItemContainer}
						bottomDivider
						onPress={() => console.log('Order history pressed')}
					>
						<ListItem.Content>
							<ListItem.Title style={styles.listItemTitle}>
								Order History
							</ListItem.Title>
							<ListItem.Subtitle style={styles.listItemSubtitle}>
								View your past orders
							</ListItem.Subtitle>
						</ListItem.Content>
						<ListItem.Chevron color="#bbb" />
					</ListItem>
				</View>
				<ScrollView>
					<View>
						{user.orders && user.orders.map((order) => (
							<ListItem
								key={order.id}
								containerStyle={styles.listItemContainer}
								bottomDivider
								onPress={() => console.log(`Order ${order.id} pressed`)}
							>
								<ListItem.Content>
									<ListItem.Title style={styles.listItemTitle}>
										{order.restaurantName}
									</ListItem.Title>
									<ListItem.Subtitle style={styles.listItemSubtitle}>
									<View style={styles.viewContainer}>
										<Text style={styles.leftText}>Ordered By: </Text>
										<Text style={styles.rightText}>{order.userName}</Text>
									</View>
								</ListItem.Subtitle>
								<ListItem.Subtitle style={styles.listItemSubtitle}>
									<View style={styles.viewContainer}>
										<Text style={styles.leftText}>Total Dishes: </Text>
										<Text style={styles.rightText}>{order.totalItems}</Text>
									</View>
								</ListItem.Subtitle>
								<ListItem.Subtitle style={styles.listItemSubtitle}>
									<View style={styles.viewContainer}>
										<Text style={styles.leftText}>Total Price: </Text>
										<Text style={styles.rightText}>${order.totalPrice}</Text>
									</View>
								</ListItem.Subtitle>
								<ListItem.Subtitle style={styles.listItemSubtitle}>
									<View style={styles.viewContainer}>
										<Text style={styles.leftText}>Order Date: </Text>
										<Text style={styles.rightText}>{order.orderDate}</Text>
									</View>
								</ListItem.Subtitle>
								</ListItem.Content>
								<ListItem.Chevron color="#bbb" />
							</ListItem>
						)) || (
							<Text style={{fontSize: 20, textAlign: 'center', marginTop: 20}}>No orders to show</Text>
						)}
					</View>
				</ScrollView>
			</View>
		</ScrollView>
  );
}



const styles = ReactStyle.create({
	viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  leftText: {
    fontSize: 16,
		fontWeight: 'bold',
		// flex: 1
  },
  rightText: {
    fontSize: 16,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    backgroundColor: '#FED7CB',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    color: '#888',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#FC6D3F',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  listItemContainer: {
    height: 'auto',
		borderBottomColor: '#FED7CB',
		borderBottomWidth: 10,
    paddingHorizontal: 10,
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  listItemSubtitle: {
    color: '#888',
    fontSize: 14,
  },
	scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

const styles2 = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: COLORS.lightGray4,
	},
});