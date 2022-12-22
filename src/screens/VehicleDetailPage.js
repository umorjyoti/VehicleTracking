import {firebase} from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const VehicleDetailPage = ({navigation, route}) => {
  const {item} = route?.params;
  const [location, setLocation] = useState();

  useEffect(() => {
    SubscribeToRealTimeData();
  }, []);

  const SubscribeToRealTimeData = async () => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDahAZLP3Fe68j9C-7ZT9i0nAqiQWXhs_4',
      authDomain: 'tracknerd-staging.firebaseapp.com',
      databaseURL: 'https://tracknerd-staging-default-rtdb.firebaseio.com',
      storageBucket: 'tracknerd-staging.appspot.com',
      appId: '1:847967007196:web:ae4df284f5560af4139f19',
      messagingSenderId: '1',
      projectId: '1:847967007196:web:ae4df284f5560af4139f19',
    };

    await firebase.initializeApp(firebaseConfig);

    const database = firebase.database();
    const vehicleRef = database.ref(
      `${item?.id}-${item?.registrationNumber}/location`,
    );

    vehicleRef.on('value', snapshot => {
      console.log('snap', snapshot);
      setLocation(snapshot?._snapshot?.value);
    });
  };

  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};

export default VehicleDetailPage;
