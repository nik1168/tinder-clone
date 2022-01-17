import {doc, serverTimestamp, setDoc} from '@firebase/firestore';
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

import {db} from '../../../firebase';
import useAuth from '../../hooks/useAuth';
import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';

const UserInfoModal = (): JSX.Element => {
  const {user} = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [image, setImage] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = image.length && age.length && job.length;

  const updateUserProfile = () => {
    setLoading(true);
    setDoc(doc(db, 'users', user?.uid ?? ''), {
      id: user?.uid,
      displayName: user?.displayName,
      photoURL: image,
      job,
      age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate(RootStackRouteNames.Home);
      })
      .catch(error => {
        Alert.alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={tw('flex-1 items-center pt-1')}>
      <Image
        style={tw('h-20 w-full')}
        resizeMode="contain"
        source={{uri: 'https://links.papareact.com/2pf'}}
      />
      <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>
        Welcome {user?.displayName}
      </Text>

      <Text style={tw('text-center p-4 font-bold text-red-400')}>
        Step-1: The profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={tw('text-center p-2')}
        placeholder="Enter a Profile Pic URL"
      />

      <Text style={tw('text-center p-4 font-bold text-red-400')}>
        Step-2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={tw('text-center p-2')}
        placeholder="Enter your occupation"
      />

      <Text style={tw('text-center p-4 font-bold text-red-400')}>
        Step-3: The age
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={tw('text-center p-2')}
        placeholder="Enter your age"
        keyboardType={'numeric'}
        maxLength={2}
      />

      <TouchableOpacity
        disabled={!isFormValid || loading}
        onPress={updateUserProfile}
        style={[
          tw('w-64 p-3 rounded-xl absolute bottom-10 bg-red-400'),
          !isFormValid || loading ? tw('bg-gray-400') : tw('bg-red-400'),
        ]}>
        <Text style={tw('text-center text-white text-xl')}>Save Profile</Text>
        {loading ? <ActivityIndicator size="small" color={'white'} /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default UserInfoModal;
