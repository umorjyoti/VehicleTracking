import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
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
};

export default Background;
