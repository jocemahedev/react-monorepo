import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {useReduxDispatch, useReduxSelector} from '../../../shared/redux';
import {
  updateQuantityCurrentSet,
  updateQuantitySet,
} from '../../../shared/redux/collection';
import {selectAllParts} from '../../../shared/redux/set';

export default function QuantityParts() {
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(updateQuantitySet(quantityCollectorParts));
    dispatch(updateQuantityCurrentSet(quantityCollectorParts));
  });
  const allQuantityParts = useReduxSelector(selectAllParts);
  const quantityCollectorParts = allQuantityParts.reduce(
    (tot, part) => tot + part.quantityCollectorPart,
    0,
  );
  const quantityParts = allQuantityParts.reduce(
    (tot, part) => tot + part.quantityPart,
    0,
  );
  return (
    <Text variant="titleMedium">
      {'You have ' +
        quantityCollectorParts +
        ' of ' +
        quantityParts +
        '  parts'}
    </Text>
  );
}
