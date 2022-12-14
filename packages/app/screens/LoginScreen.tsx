import React from 'react';
import {View} from 'react-native';
import UserAuthentification from '../components/UserAuthentification';
import {REACT_APP_REBRICKABLE_API_KEY} from '@env';

export default function ({navigation}: any) {
  const goToCollection = () => {
    navigation.navigate('My Collection');
  };
  console.log('key');
  console.log(REACT_APP_REBRICKABLE_API_KEY);
  return (
    <View>
      <UserAuthentification current="login" redirect={goToCollection} />
    </View>
  );
}
