import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import PartsList from '../components/List/PartsList';

import QuantityParts from '../components/Set/QuantityParts';

import {useReduxSelector} from '../../shared/redux';

import {selectPartsByColorByCompleted} from '../../shared/redux/set';

export default function ({navigation}: any) {
  const goTo = () => {
    navigation.navigate('Collection');
  };
  const allParts = useReduxSelector(selectPartsByColorByCompleted);

  return (
    <>
      <View style={styles.container}>
        <QuantityParts />
      </View>
      <View>
        <PartsList parts={allParts} />
        <Button onPress={() => goTo()} title={`Return to Collection`} />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
