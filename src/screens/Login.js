import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
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
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);

  let bearerToken = '';

  const loginData = {
    username: username,
    password: password,
  };

  useEffect(() => {
    validateUserCredentials(username, password);
  }, [username, password]);

  const handleLogin = async () => {
    setLoading(true);
    await axios
      .post('https://staging-api.tracknerd.io/v1/auth/login', loginData)
      .then(res => {
        console.log(res);
        bearerToken = res?.data?.token;
        if (!!rememberMe) {
          setItemToLocalStorage(bearerToken);
        }
        setShowErrorMessage(false);
        navigation.replace('Home', {bearerToken});
      })
      .catch(() => {
        setShowErrorMessage(true);
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

  const validateUserCredentials = (username, password) => {
    if (username == '' || password == '') {
      setDisableLogin(true);
    } else {
      setDisableLogin(false);
    }
  };

  return (
    <View style={styles.loginPageContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#576cd6'} />
      <Text style={styles.welcome}>Welcome</Text>
      <View style={styles.usernameContainer}>
        <Image style={styles.loginIcon} source={user} resizeMode="contain" />
        <TextInput
          style={styles.username}
          onChangeText={val => {
            setUserName(val);
          }}
          value={username}
          placeholder={'Username'}
        />
      </View>
      <View style={styles.usernameContainer}>
        <Image style={styles.loginIcon} source={lock} resizeMode="contain" />
        <TextInput
          style={styles.username}
          onChangeText={val => {
            setPassword(val);
          }}
          value={password}
          placeholder={'Password'}
        />
      </View>
      {showErrorMessage && (
        <Text style={styles.errorMessage}>Username or Password Incorrect</Text>
      )}
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
        disabled={disableLogin}
        onPress={() => {
          handleLogin();
        }}
        style={styles.submitButton}>
        {!!loading ? (
          <LottieView
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
