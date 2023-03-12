import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { setOrder } from '../../DatabaseConnector';
import {v4 as uuidv4} from 'uuid';
import AppContext from '../../AppContext';


type RestaurantOrderSectionProps = {
  basketCount: number;
  restaurantName: string,
  total: number;
  placeOrder: () => void;
};

export const RestaurantOrderSection = ({
  basketCount,
  total,
  restaurantName,
  placeOrder,
}: RestaurantOrderSectionProps) => {
  const { globalVariable, setGlobalVariable } = useContext(AppContext);

  const createOrder = () => {
    console.log(restaurantName, total, basketCount);
    let order = {
      id: uuidv4(),
      userName: globalVariable.user.fullName,
      userId: globalVariable.user.id,
      orderDate: (new Date()).toLocaleDateString(),
      totalPrice: total,
      totalItems: basketCount,
      restaurantName: restaurantName
    }
    console.log(JSON.stringify(order));
    setOrder(order);
  }

  return total > 0 ? (
    <View style={styles.container}>
      <View style={styles.amountDetailsContainer}>
        <Text style={{...FONTS.h3}}>{basketCount} items in cart</Text>
        <Text style={{...FONTS.h3}}>${total.toFixed(2)}</Text>
      </View>
      <View style={styles.cardDetailsContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image source={icons.pin} resizeMode="contain" style={styles.image} />
          <Text style={styles.text}>Location</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={icons.master_card}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.text}>Exact Location</Text>
        </View>
      </View>

      {/* Order Button */}
      <View style={styles.orderButtonContainer}>
        <TouchableOpacity
          style={{ 
            ...styles.orderButton,
            ...total <= 0 ? styles.disabledOrderButton : { }
          }}
          disabled={total <= 0}
          onPress={() => {createOrder(), placeOrder()}}>
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  amountDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
    borderBottomColor: COLORS.lightGray2,
    borderBottomWidth: 1,
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  image: {
    width: 20,
    height: 20,
    tintColor: COLORS.darkgray,
  },
  text: {
    marginLeft: SIZES.padding,
    ...FONTS.h4,
  },
  orderButtonContainer: {
    padding: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButton: {
    width: SIZES.width * 0.85,
    height: 60,
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius / 1.5,
  },
  disabledOrderButton: {
    backgroundColor: COLORS.secondary,
  },
  orderButtonText: {
    color: COLORS.white,
    ...FONTS.h2,
  },
});