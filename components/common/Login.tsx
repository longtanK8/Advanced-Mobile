import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AppContext from '../../AppContext';
import { GetLatitude, GetLongitude } from '../../location';

const LoginForm = ({ navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
	const [userList, setUserList] = useState();
	const [passwordCorrect, setPasswordCorrect] = useState(true);
	const [refresh, setRefresh] = useState(false);
  const { globalVariable, setGlobalVariable } = useContext(AppContext);

  const [location, setLocation] = useState();

 
  const getLocation = async() => {
    let logitude = await GetLongitude();
    let latitude = await GetLatitude();
    setLocation({"longitude": logitude, "latitude": latitude });
  }

  // getLocation();

  const getUserList = () => {
		// useEffect(() => {
			// fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://delivery-food-379309-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
        )
      ).json();
      await getLocation();

      console.log(parseToArray(data));

      // set state when the data received
      setUserList(parseToArray(data));
    };

    const parseToArray = (data:String) => {
      let dataArray = Object.keys(data).map(function(index){
          let dataItem = data[index];
          dataItem.externalId = index;
          // do something with person
          return dataItem;
      });
      return dataArray;
    }

    dataFetch();
		// }, []);
	}

	// getUserList();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Here you can update your data or trigger a refresh
      getUserList();
      setPasswordCorrect(true);
      setRefresh(!refresh);
      // if(globalVariable){
      //   if(!globalVariable.location){
      //     getLocation();
      //   }
      // }
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = () => {
		if(userList){
			userList.forEach(user => {
				if((user.userName.toLowerCase() == email.toLowerCase() || user.email.toLowerCase() == email.toLowerCase()) && user.password == password){
          setGlobalVariable({
            ...globalVariable,
            "user":user,
            "location": location
          });
          console.log(JSON.stringify(location));
					navigation.navigate('Home');
				}else{
					setPasswordCorrect(false);
				}
			});
		}
    
    
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
			{!passwordCorrect && (
				<Text style={{color: 'red'}}>
					Username or Password is incorrect
				</Text>
			)}
			
      <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
        <Text style={styles.registerLink}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginForm;