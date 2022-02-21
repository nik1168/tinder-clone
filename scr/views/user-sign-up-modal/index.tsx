import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'tailwind-rn';

import useAuth from '../../hooks/useAuth';
import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';

const UserSignUpModal = (): JSX.Element => {
  const {signInWithEmail} = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = name.length && email.length && password.length;

  const signUp = () => {
    setLoading(true);
    if (signInWithEmail) {
      signInWithEmail(email, password)
        .then(() => {
          setLoading(false);
          navigation.navigate(RootStackRouteNames.Home);
        })
        .catch(error => {
          setLoading(false);
          Alert.alert(error.message);
        });
    }
  };

  return (
    <View style={tw('absolute flex-1 relative items-center pt-1')}>
      <Image
        style={tw('h-20 w-full')}
        resizeMode="contain"
        source={{uri: 'https://links.papareact.com/2pf'}}
      />
      <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>Welcome!</Text>

      <Text style={tw('text-center p-4 font-bold text-red-400')}>
        Step-1: Your Name
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={tw('text-center p-2')}
        placeholder="Enter your name"
      />

      <Text style={tw('text-center p-4 font-bold text-red-400')}>
        Step-2: Your email
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={tw('text-center p-2')}
        keyboardType={'email-address'}
        placeholder="Enter your email"
      />

      <Text style={tw('text-center p-4 font-bold text-red-400')}>
        Step-3: Your Password
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={tw('text-center p-2')}
        placeholder="Enter your password"
        secureTextEntry
      />

      <TouchableOpacity
        disabled={!isFormValid || loading}
        onPress={signUp}
        style={[
          tw('w-64 p-3 rounded-xl absolute bottom-20 bg-red-400'),
          !isFormValid || loading ? tw('bg-gray-400') : tw('bg-red-400'),
        ]}>
        <Text style={tw('text-center text-white text-xl')}>Save Profile</Text>
        {loading ? <ActivityIndicator size="small" color={'white'} /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default UserSignUpModal;
