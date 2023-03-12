import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const WelcomeScreen = () => {
	const [activeSpinner, setActiveSpinner] = useState(false);
	// setTimeout(() => {
	// 	setActiveSpinner(true)
	// }, 1000);

	setTimeout(() => {
		setActiveSpinner(!activeSpinner)
	}, 2000);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/paradise-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Paradise Foodcourt</Text>
      <Text style={styles.subtitle}>Your enjoyable moments are our golden pleasure</Text>
			{activeSpinner && (
				<View style={styles.spinnerContainer}>
					<ActivityIndicator size="large" color="#0000ff" />
					<Text>Initializing data...</Text>
				</View>
			)}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
	spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
  },
});

export default WelcomeScreen;