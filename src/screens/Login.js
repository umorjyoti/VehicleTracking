import React, {useState} from 'react';
import {View, Text, TextInput, Touchable, TouchableOpacity} from 'react-native';
import axios from 'react-native-axios';

const Login = ({navigation}) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  let bearerToken = '';

  const loginData = {
    username: username,
    password: password,
  };

  const handleLogin = () => {
    axios
      .post('https://staging-api.tracknerd.io/v1/auth/login', loginData)
      .then(res => {
        console.log(res);
        bearerToken = res?.data?.token;
        navigation?.navigate('Home', {bearerToken});
      });
  };

  return (
    <View>
      <TextInput
        style={{borderWidth: 1}}
        onChangeText={setUserName}
        value={username}
      />
      <TextInput
        style={{borderWidth: 1}}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: 'yellow',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
