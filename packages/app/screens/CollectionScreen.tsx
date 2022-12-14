import {Button} from '@react-native-material/core';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import CollectionList from '../components/List/CollectionList';
import CountSets from '../components/Set/CountSets';
import {useReduxDispatch, useReduxSelector} from '../../shared/redux';
import {
  getIncompleteParts,
  selectAllSets,
  setCurrentIndexSet,
} from '../../shared/redux/collection';

import {Set} from '../../shared/types/types';
import {RootStackParamList} from '../AppNavigatorStack';

export default function ({navigation}: CollectionListScreenProps) {
  const dispatch = useReduxDispatch();
  const currentAllSets = useReduxSelector(selectAllSets);
  const onPressSet = (set: Set) => {
    dispatch(setCurrentIndexSet(set));
    navigation.navigate('Parts');
  };
  const onPressIncomplete = (allSets: Set[]) => {
    dispatch(getIncompleteParts(allSets));
    navigation.navigate('Incomplete Parts');
  };

  return (
    <>
      <View style={styles.container}>
        <CountSets />

        <Button
          title={'Search new set 👻'}
          onPress={() => navigation.navigate('Set')}
        />
        <Button
          style={{marginTop: 10}}
          title={'Get incomplete Parts'}
          onPress={() => onPressIncomplete(currentAllSets)}
        />
      </View>
      <CollectionList pressSet={onPressSet} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
export type CollectionListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PartsScreen'
>;
