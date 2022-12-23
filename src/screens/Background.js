import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {View} from 'react-native';

const Background = ({navigation}) => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.replace('Home', {bearerToken: token});
    } else {
      navigation.replace('Login');
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LottieView
        source={require('../assets/json/loginLoading.json')}
        autoPlay
        loop
        style={styles.splashScreen}
      />
    </View>
  );
};

export default Background;
