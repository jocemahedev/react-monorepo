import React from 'react';
import {Button} from 'react-native';
import IncompletePartsList from '../components/List/IncompletePartsList';
import {useReduxSelector} from '../../shared/redux';
import {selectIncompleteParts} from '../../shared/redux/collection';

export default function ({navigation}: any) {
  const incompleteParts = useReduxSelector(selectIncompleteParts);
  const goTo = () => {
    navigation.navigate('My Collection');
  };
  return (
    <>
      <IncompletePartsList incompleteParts={incompleteParts} />
      <Button onPress={() => goTo()} title={`Return to Collection`} />
    </>
  );
}
