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
  TextInput,
} from 'react-native';
import axios from 'react-native-axios';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {faker} from '@faker-js/faker';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {search as searchIcon} from '../constants/image';
import LottieView from 'lottie-react-native';

const HomeScreen = ({navigation, route}) => {
  const [vehicleData, setVehicleData] = useState([]);
  const [vehicleDataDuplicate, setVehicleDataDuplicate] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  let bearerToken = route?.params && route?.params?.bearerToken;

  console.log(bearerToken);

  let config = {
    headers: {
      Authorization: 'Bearer ' + bearerToken,
    },
  };

  const getVehicles = async () => {
    setLoading(true);
    await axios
      .get(
        'https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles',
        config,
      )
      .then(res => {
        res?.data?.data?.map(element => {
          element?.vehicles?.map(vehicle => vehicleData.push(vehicle));
        });

        //adding fake vehicles using faker
        vehicleData?.map(item => {
          item.imageURL = faker?.image?.transport();
        });
        setVehicleData([...vehicleData]);
        setVehicleDataDuplicate([...vehicleData]);
      });
    setLoading(false);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const onPressVehicle = item => {
    navigation?.navigate('VehicleDetailPage', {item});
  };

  const handleSearch = val => {
    setSearch(val);
    if (val == '') {
      setVehicleData([...vehicleDataDuplicate]);
    } else {
      let tempArr = vehicleDataDuplicate?.filter(
        item =>
          item?.registrationNumber?.toLowerCase().indexOf(val?.toLowerCase()) >
          -1,
      );

      setVehicleData([...tempArr]);
    }
  };

  return (
    <View style={styles.homePageContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FAFAFA'} />
      <Text style={styles.header}>Vehicles</Text>

      <View style={styles.searchBar}>
        <Image
          style={styles.searchIcon}
          resizeMode="contain"
          source={searchIcon}
        />
        <TextInput
          placeholder="Search"
          onChangeText={val => handleSearch(val)}
          value={search}
          style={styles.searchInput}
        />
      </View>
      {!!loading ? (
        <LottieView
          source={require('../assets/json/loginLoading.json')}
          autoPlay
          loop
          style={styles.homeLoading}
        />
      ) : (
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
      )}
    </View>
  );
};

export default HomeScreen;
