import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';

type HeaderProps = {
  leftIcon: any;
  rightIcon: any;
  headerText?: string;
  leftPress?: Function;
};

export const Header = ({ leftIcon, rightIcon, headerText, leftPress }: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.headerImageContainer}
          onPress={() => !!leftPress && leftPress()}
        >
          <Image
            source={require('../../assets/images/paradise-logo.png')}
            resizeMode="contain"
            style={{width:50}}
          />
        </TouchableOpacity>

        <View style={styles.headerLocationContainer}>
          <View style={styles.headerLocationTextWrapper}>
            <Text style={{...FONTS.h3}}>{headerText}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.headerRightImageContainer} onPress={() => {navigation.navigate("OrderHistory")}}>
          <Image
            source={rightIcon}
            resizeMode="contain"
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 50,
  },
  headerImageContainer: {
    width: 50,
    paddingLeft: SIZES.padding * 2,
    justifyContent: 'center',
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  headerLocationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLocationTextWrapper: {
    width: '70%',
    height: '100%',
    backgroundColor: "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
  headerRightImageContainer: {
    width: 50,
    paddingRight: SIZES.padding * 2,
    justifyContent: 'center',
  },
});
