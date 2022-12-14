import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CollectionScreen from './screens/CollectionScreen';
import SetScreen from './screens/SetScreen';
import PartsScreen from './screens/PartsScreen';
import IncompletePartsScreen from './screens/IncompletePartsScreen';
import LoginScreen from './screens/LoginScreen';

import {Button} from '@react-native-material/core';
import {signOut} from 'firebase/auth';
import {auth} from '@react-monorepo/shared/redux/services/firebase/firebaseConfig.web';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigatorStack() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen
        name="My Collection"
        component={CollectionScreen}
        options={({navigation}) => ({
          headerBackVisible: false,
          headerRight: () => (
            <Button
              onPress={() =>
                signOut(auth).then(() => {
                  // Sign-out successful.
                  navigation.navigate('Login');
                })
              }
              title="Logout"
              color="#fff"
            />
          ),
        })}
      />
      <RootStack.Screen name="Set" component={SetScreen} />
      <RootStack.Screen name="Parts" component={PartsScreen} />
      <RootStack.Screen
        name="Incomplete Parts"
        component={IncompletePartsScreen}
      />
    </RootStack.Navigator>
  );
}
export type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  CollectionScreen: undefined;
  SetScreen: undefined;
  PartsScreen: undefined;
};
