import React from 'react';
import {Text} from 'react-native-paper';
import {selectIncompleteParts} from '../../../shared/redux/collection';
import {useReduxSelector} from '../../../shared/redux';

const CountSetsIncomplete = () => {
  const numberSets = useReduxSelector(selectIncompleteParts);

  return (
    <Text variant="titleMedium">
      {'You have ' + numberSets.length + ' sets incomplete'}
    </Text>
  );
};

export default CountSetsIncomplete;
