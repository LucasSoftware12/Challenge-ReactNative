import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '@rneui/themed';
// import {Icon as Icons} from 'react-native-vector-icons/FontAwesome';
const UserDetailsScreen = ({route}) => {
  const defaultPhoto =
    'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';

  const {user} = route.params;

  const userDetails = [
    {
      key: 'Fecha de Nacimiento',
      value: user.birthDate,
      icon: 'perm-contact-calendar',
    },
    {key: 'Género', value: user.gender, icon: 'person'},
    {key: 'Teléfono', value: user.phone, icon: 'phone'},
    {key: 'Profesión', value: user.profesion, icon: 'book'},
    {key: 'Correo Electrónico', value: user.email, icon: 'mail'},
  ];
  const openWhatsAppChat = () => {
    Linking.openURL(`https://api.whatsapp.com/send?phone=${user.phone}`);
  };

  const callPhoneNumber = () => {
    const telLink = `tel:${user.phone}`;

    Linking.openURL(telLink)
      .then(data => {
        console.log('Llamada telefónica iniciada con éxito');
      })
      .catch(error => {
        console.error('Error al iniciar la llamada telefónica:', error);
      });
  };

  const openSMSApp = () => {
    const smsLink = `sms:${user.phone}`;
    Linking.openURL(smsLink)
      .then(data => {
        console.log('Aplicación de mensajes abierta con éxito');
      })
      .catch(error => {
        console.error('Error al abrir la aplicación de mensajes:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{uri: user.photo || defaultPhoto}}
          style={styles.userPhoto}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: 20,
        }}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
          }}>
          {user.name + ' '}
          {user.surnames}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          marginBottom: 20,
          paddingLeft: 110,
          paddingRight: 110,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <Icon name="phone" size={30} color="red" onPress={callPhoneNumber} />
        <Icon name="mail" size={30} color="red" onPress={openSMSApp} />
        <Icon
          name="phone"
          size={30}
          color="#25D366"
          onPress={openWhatsAppChat}
        />
      </View>
      <FlatList
        data={userDetails}
        renderItem={({item}) => (
          <View style={styles.item}>
            <View style={{flexDirection: 'row'}}>
              <Icon name={item.icon} size={25} color="#000" />
              <Text style={styles.key}>{item.key}:</Text>
            </View>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View>
        <TouchableOpacity>
          <View style={styles.deleteButton}>
            <Text style={styles.textButton}>Eliminar de mi lista</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  key: {
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 18,
  },
  separator: {
    height: 2, // Altura de la línea divisoria
    backgroundColor: '#ccc', // Color de la línea divisoria
    marginVertical: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
  },
  value: {
    fontSize: 15,
    marginRight: 10,
  },
});

export default UserDetailsScreen;
