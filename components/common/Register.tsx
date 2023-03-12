import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {v4 as uuidv4} from 'uuid';
import uuid from 'react-native-uuid'
import Toast from 'react-native-toast-message';

const RegisterForm = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [isCorrectRepeat, setCorrectRepeat] = useState(true);
  const [isRegisterable, setIsRegisterable] = useState(false);
  const [userList, setUserList] = useState();
  // const [newUser, setNewUser] = useState();
  const [refresh, setRefresh] = useState(false);

  const getUserList = () => {
		useEffect(() => {
			// fetch data
			const dataFetch = async () => {
				const data = await (
					await fetch(
						"https://delivery-food-379309-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
					)
				).json();
	
				console.log(parseToArray(data));
	
				// set state when the data received
				setUserList(parseToArray(data));
			};
	
			const parseToArray = (data:String) => {
				let dataArray = Object.keys(data).map(function(index){
						let dataItem = data[index];
						// do something with person
						return dataItem;
				});
				return dataArray;
			}
	
			dataFetch();
		}, []);
	}

  getUserList();

	useEffect(() => {
		setRefresh(!refresh);
	}, []);

  const handleRegister = () => {
    const user = {
      "id": uuid.v4(),
      "fullName": fullName,
      "userName": userName,
      "email": email,
      "password": password,
      "phoneNumber": phoneNumber,
      "gender": gender,
      "yearOfBirth": yearOfBirth
    };
    
    let doesUserExist = false;
    if(userList){
      
      userList.every(u => {
        if(u.userName == user.userName){
          ToastAndroid.showWithGravity("User name already exists!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          doesUserExist = true;
        }else if(u.email == user.email){
          ToastAndroid.showWithGravity("The email is alrealy regiestered!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          doesUserExist = true;
        }else if(u.phoneNumber == user.phoneNumber){
          ToastAndroid.showWithGravity("The phone number is alrealy regiestered!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          doesUserExist = true;
        }
        console.log(JSON.stringify(u) + ' Compared to \n' + JSON.stringify(user) + '>>>> does user exist? ' + doesUserExist);
        return !doesUserExist;
      })
    }

    if(!doesUserExist){
      fetch('https://delivery-food-379309-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    
      ToastAndroid.showWithGravity("User created successfully!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      navigation.navigate("Login");
    }
    
  }

  // const handleRegister = () => {
  //   console.log("pressed");
  //   console.log(isRegisterable);
  //   registerNewUser();
  //   // Handle registration logic here
  // };

  const checkRepeatPassword = (repeatPassword:string) => {
    setRepeatPassword(repeatPassword);
    if(repeatPassword == password){
      setCorrectRepeat(true);
      setIsRegisterable(true);
    }else{
      setCorrectRepeat(false);
      setIsRegisterable(false);
    }
  }

  const checkValidToRegister = () => {
    if(userName == '' || password == '' || phoneNumber == '' || fullName == '' || repeatPassword != password){
      setIsRegisterable(false);
    }else{
      setIsRegisterable(true);
    }
    console.log(isRegisterable);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="User Name *"
          onChangeText={(text) => {setUserName(text); checkValidToRegister()}}
          value={userName}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password *"
          onChangeText={(text) => {setPassword(text); checkValidToRegister()}}
          value={password}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Repeat Password *"
          onChangeText={(text) => checkRepeatPassword(text)}
          value={repeatPassword}
          secureTextEntry
        />
        {!isCorrectRepeat && (
          <Text style={{color: 'red', fontSize: 8}}>Repeated Password and Password must be the same</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Full Name *"
          onChangeText={(text) => {setFullName(text); checkValidToRegister()}}
          value={fullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number *"
          onChangeText={(text) => {setPhoneNumber(text); checkValidToRegister()}}
          value={phoneNumber}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Year of Birth"
          onChangeText={(text) => setYearOfBirth(text)}
          value={yearOfBirth}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Gender"
          onChangeText={(text) => setGender(text)}
          value={gender}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={!isRegisterable}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
          <Text style={styles.backLink}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
  backLink: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterForm;
