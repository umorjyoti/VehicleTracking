import {firebase} from '@react-native-firebase/database';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {car} from '../constants/image';
import styles from './styles';

const VehicleDetailPage = ({navigation, route}) => {
  const {item} = route?.params;
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SubscribeToRealTimeData();
  }, [location?.latitude, location?.longitude]);

  const SubscribeToRealTimeData = async () => {
    setLoading(true);
    const firebaseConfig = {
      apiKey: 'AIzaSyDahAZLP3Fe68j9C-7ZT9i0nAqiQWXhs_4',
      authDomain: 'tracknerd-staging.firebaseapp.com',
      databaseURL: 'https://tracknerd-staging-default-rtdb.firebaseio.com',
      storageBucket: 'tracknerd-staging.appspot.com',
      appId: '1:847967007196:web:ae4df284f5560af4139f19',
      messagingSenderId: '1',
      projectId: '1:847967007196:web:ae4df284f5560af4139f19',
    };
    try {
      await firebase.initializeApp(firebaseConfig);
    } catch (e) {
      console.log(e);
    }

    const database = firebase.database();
    const vehicleRef = database.ref(
      `${item?.id}-${item?.registrationNumber}/location`,
    );

    vehicleRef.on('value', snapshot => {
      console.log('snap', snapshot);
      setLocation(snapshot?._snapshot?.value);
    });
    setLoading(false);
  };

  return (
    <View style={styles.detailPageContainer}>
      {loading ? (
        <LottieView
          source={require('../assets/json/loginLoading.json')}
          autoPlay
          loop
          style={styles.detailPageLoading}
        />
      ) : (
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location?.latitude ? location?.latitude : 13.036754,
              longitude: location?.longitude ? location?.longitude : 77.437224,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              draggable
              coordinate={{
                latitude: location?.latitude ? location?.latitude : 13.036754,
                longitude: location?.longitude
                  ? location?.longitude
                  : 77.437224,
              }}
              title="Location">
              <Image source={car} resizeMode="contain" style={styles.marker} />
            </Marker>
          </MapView>
        </View>
      )}
    </View>
  );
};

export default VehicleDetailPage;
