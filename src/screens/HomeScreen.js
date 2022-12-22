import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  SectionList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import axios from 'react-native-axios';

const HomeScreen = ({navigation, route}) => {
  const [vehicleData, setVehicleData] = useState([]);

  const {bearerToken} = route.params;

  let config = {
    headers: {
      Authorization: 'Bearer ' + bearerToken,
    },
  };

  const getVehicles = () => {
    axios
      .get(
        'https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles',
        config,
      )
      .then(res => {
        console.log(res);
        res?.data?.data?.map(element => {
          element?.vehicles?.map(vehicle => vehicleData.push(vehicle));
        });
        setVehicleData([...vehicleData]);
        console.log(vehicleData);
      });
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const onPressVehicle = item => {
    navigation?.navigate('VehicleDetailPage', {item});
  };

  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index}
        data={vehicleData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => onPressVehicle(item)}>
              <Text>{item?.type}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;
