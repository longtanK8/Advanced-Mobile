import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppContext from '../AppContext';
import { getOrdersByUserId } from '../DatabaseConnector';


const OrderPage = ({navigation}) => {
	const {globalVariable, setGlobalVariable} = useContext(AppContext);
	const [orders, setOrders] = useState();
	const [spinner, setSpinner] = useState(true);
  // useEffect(() => {
	// 	getOrdersByUserId(globalVariable.user.id)
	// },[navigation])
	useEffect(() => {
		const getOrder = async() => {
			const data = await getOrdersByUserId(globalVariable.user.id);
			
			setOrders(data);
			setSpinner(false);
		}
		getOrder();
	}, [navigation])
	
  return (
		<View>
			<ScrollView>
				{spinner && (
					<View style={styles.spinnerContainer}>
						<ActivityIndicator size="large" color="#0000ff" />
						<Text>Initializing data...</Text>
					</View>
				) || (
					<View style={styles.container}>
					<View style={styles.header}>
						<TouchableOpacity onPress={() => {navigation.navigate("Home")}}>
							<Image style={styles.returnButton} source={require('../assets/images/paradise-logo.png')} />
						</TouchableOpacity>
						<Text style={styles.title}>Order History</Text>
						<View style={{ width: 50 }} />
					</View>
					<View style={styles.ordersContainer}>
						{orders.map((order) => (
							<TouchableOpacity key={order.id} style={styles.order}>
								<View style={styles.orderDetails}>
									<Text style={styles.orderName}>{order.restaurantName}</Text>
									<Text style={styles.orderDate}>{order.orderDate}</Text>
								</View>
								<Text style={styles.orderTotal}>Total: ${order.totalPrice.toFixed(2)}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
				)}
			</ScrollView>
		</View>
  );
};

const styles = StyleSheet.create({
	spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: '#FFF9E1',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  returnButton: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ordersContainer: {
    flex: 1,
    padding: 20,
  },
  order: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  orderDetails: {
    flex: 1,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#888',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderPage;