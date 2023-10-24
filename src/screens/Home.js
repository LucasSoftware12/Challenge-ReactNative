import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Icon} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({navigation}) => {
  const defaultPhoto =
    'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://www.mockachino.com/06c67c77-18c4-45/users')
      .then(response => {
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
          setLoading(false);
        } else {
          console.error(
            'La respuesta de la API no contiene un array de usuarios.',
          );
        }
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userLoggedIn');
    navigation.navigate('Login');
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <FlatList
          data={users}
          keyExtractor={item => item.contactId.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('UserDetails', {user: item})}>
              <View style={styles.userContainer}>
                <View style={styles.photo}>
                  <Image
                    source={{uri: item.photo || defaultPhoto}}
                    style={styles.userPhoto}
                  />
                  <Text style={styles.userName}>{item.name}</Text>
                </View>
                <Icon
                  name="chevron-right"
                  type="material"
                  color="red"
                  size={30}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  photo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default HomeScreen;
