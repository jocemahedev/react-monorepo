import React from 'react';
import {Text} from 'react-native-paper';
import {countSets} from '../../../shared/redux/collection';
import {useReduxSelector} from '../../../shared/redux';

const CountSets = () => {
  const numberSets = useReduxSelector(countSets);

  return (
    <Text variant="titleMedium">{'You have ' + numberSets + ' sets'}</Text>
  );
};

export default CountSets;
