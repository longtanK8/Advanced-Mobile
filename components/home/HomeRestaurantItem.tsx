import React, { useState } from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text
} from 'react-native';
import { AppStyles } from '../../AppStyles';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { affordable, expensive, fairPrice } from '../../dummy-data';
import { CurrentLocation, Restaurant } from '../../types';
import { TouchableWithoutFeedback, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

type HomeRestaurantItemProps = {
  item: Restaurant;
  onPress: (item: Restaurant) => void;
};

export const HomeRestaurantItem = ({ item, onPress }: HomeRestaurantItemProps) => {
  const [liked, setLiked] = useState(false);
  const [scale, setScale] = useState(new Animated.Value(1));
  const handlePress = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View style={styles.itemWrapper}>
        <Image
          source={item.photo}
          resizeMode="cover"
          style={styles.itemImage}
        />
        {/* Restaurant average delivery duration */}
        <View style={styles.itemLabel}>
          <Text style={{...FONTS.h4}}>{item.duration}</Text>
        </View>
      </View>
      {/* Restaurant name */}
      <Text style={{...FONTS.body2, fontWeight: '700'}}>{item.name}
        <TouchableWithoutFeedback onPress={handlePress}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <FontAwesomeIcon style={{marginLeft: 5}} icon={liked ? solidIcons.faHeart : faHeart } size={25} color={liked ? 'red' : 'black'}/>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Text>
      {/* Restaurant rating */}
      <View style={styles.itemRatingContainer}>
        {/* Rating */}
        <Image source={icons.star} style={styles.itemRatingImage} />
        <Text style={styles.itemRatingText}>{item.rating}</Text>
        {/* Restaurant categories */}
        <View style={styles.itemCategoriesContainer}>
          {/* Categories */}
          {item.categoryNames?.map((category, index) => (
            <View style={styles.itemCategory} key={item.categories[index]}>
              <Text style={{...FONTS.body3}}>{category}</Text>
              <Text style={styles.categorySeparator}>{'\u25cf'}</Text>
            </View>
          ))}
          {/* Price */}
          {[affordable, fairPrice, expensive].map(
            (priceRating: number, index: number) => (
              <Text
                key={`${index}-${priceRating}`}
                style={{
                  ...FONTS.body3,
                  color:
                    priceRating <= item.priceRating
                      ? COLORS.black
                      : COLORS.darkgray,
                }}>
                $
              </Text>
            ),
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding * 2,
  },
  itemWrapper: {
    marginBottom: SIZES.padding,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
  },
  itemLabel: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: SIZES.width * 0.3,
    backgroundColor: COLORS.white,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    ...AppStyles.shadow,
  },
  itemRatingContainer: {
    marginTop: SIZES.padding,
    flexDirection: 'row',
  },
  itemRatingImage: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
    marginRight: 10,
  },
  itemRatingText: {
    ...FONTS.body3, 
    marginRight: 10,
  },
  itemCategoriesContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  itemCategory: {
    flexDirection: 'row',
  },
  categorySeparator: {
    color: COLORS.darkgray,
    textAlignVertical: 'center',
    marginHorizontal: 10,
  },
  hearIcon: {
    flexDirection: 'row',
  },
});
