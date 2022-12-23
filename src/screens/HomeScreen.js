import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  SectionList,
  Touchable,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import axios from 'react-native-axios';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {faker} from '@faker-js/faker';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation, route}) => {
  const [vehicleData, setVehicleData] = useState([]);
  let bearerToken = route?.params && route?.params?.bearerToken;

  console.log(bearerToken);

  let config = {
    headers: {
      Authorization: 'Bearer ' + bearerToken,
    },
  };

  const getVehicles = async () => {
    console.log('NEW', bearerToken);

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

        //adding fake vehicles using faker
        vehicleData?.map(item => {
          item.imageURL = faker?.image?.transport();
        });
        setVehicleData([...vehicleData]);
        console.log(vehicleData);
      });
  };
  // const getToken = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   console.log('ASDGFD', token);
  //   if (token) {
  //     bearerToken = JSON.parse(token);
  //   }
  // };
  // useLayoutEffect(() => {
  //   getToken();
  // }, []);

  useEffect(() => {
    getVehicles();
  }, []);

  const onPressVehicle = item => {
    navigation?.navigate('VehicleDetailPage', {item});
  };

  return (
    <View style={styles.homePageContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FAFAFA'} />
      <Text style={styles.header}>Vehicles</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        numColumns={2}
        data={vehicleData}
        contentContainerStyle={styles.flatlist}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                styles.cardContainer,
                {
                  marginRight:
                    index % 2 == 0
                      ? heightPercentageToDP(2)
                      : heightPercentageToDP(0),
                },
              ]}>
              <ImageBackground
                source={{uri: item?.imageURL}}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                style={styles.subContainer}>
                <Text style={styles.regNo}>{item?.registrationNumber}</Text>
              </ImageBackground>
              <Text style={styles.vehicleType}>{item?.type}</Text>
              <TouchableOpacity
                onPress={() => onPressVehicle(item)}
                style={styles.moreButton}>
                <Text style={styles.moreButtonText}>More</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;
