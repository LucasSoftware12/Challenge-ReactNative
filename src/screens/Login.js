import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      if (userLoggedIn === 'true') {
        navigation.navigate('Home');
      }
    };

    checkUserLoggedIn();
  }, [navigation]);

  const handleLogin = async () => {
    if (username === 'admin' && password === 'admin') {
      await AsyncStorage.setItem('userLoggedIn', 'true');
      navigation.navigate('Home');
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>LOG IN</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      {error ? (
        <Text style={{color: 'red'}}>Credenciales incorrectas</Text>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  customButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  loginText: {
    fontSize: 40,
    color: 'black',
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '80%',
    paddingLeft: 40,
  },
});

export default LoginScreen;
