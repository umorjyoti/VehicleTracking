import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import axios from 'react-native-axios';
import {check, lock, user} from '../constants/image';
import styles from './styles';

const Login = ({navigation}) => {
  const [username, setUserName] = useState('ganesh@arvee.co.in');
  const [password, setPassword] = useState('tracknerd@123');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  let bearerToken = '';

  const loginData = {
    username: username,
    password: password,
  };

  const handleLogin = () => {
    setLoading(true);
    console.log(loading);
    axios
      .post('https://staging-api.tracknerd.io/v1/auth/login', loginData)
      .then(res => {
        console.log(res);
        bearerToken = res?.data?.token;
        if (!!rememberMe) {
          setItemToLocalStorage(bearerToken);
        }
        navigation.replace('Home', {bearerToken});
      });
    setLoading(false);
  };

  const onPressRememberME = () => {
    setRememberMe(!rememberMe);
  };

  const setItemToLocalStorage = async token => {
    await AsyncStorage.setItem('token', token);
    console.log(AsyncStorage.getItem('token'));
  };

  return (
    <View style={styles.loginPageContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#576cd6'} />
      <Text style={styles.welcome}>Welcome</Text>
      <View style={styles.usernameContainer}>
        <Image style={styles.loginIcon} source={user} resizeMode="contain" />
        <TextInput
          style={styles.username}
          onChangeText={setUserName}
          value={username}
          placeholder={'Username'}
        />
      </View>
      <View style={styles.usernameContainer}>
        <Image style={styles.loginIcon} source={lock} resizeMode="contain" />
        <TextInput
          style={styles.username}
          onChangeText={setPassword}
          value={password}
          placeholder={'Password'}
        />
      </View>
      <View style={styles.rememberMe}>
        <TouchableOpacity onPress={onPressRememberME} style={styles.checkbox}>
          {rememberMe && (
            <Image
              style={styles.checkMark}
              resizeMode="contain"
              source={check}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember Me</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleLogin()}
        style={styles.submitButton}>
        {!!loading ? (
          <AnimatedLottieView
            source={require('../assets/json/loginLoading.json')}
            autoPlay
            loop
            style={styles.loginLoading}
          />
        ) : (
          <Text style={styles.submitButonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
