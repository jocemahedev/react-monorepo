import {Stack} from '@react-native-material/core';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Part} from '../../../shared/types/types';
import {Button, Text} from 'react-native-paper';
import {
  completePart,
  decrementPart,
  incrementPart,
  updateParts,
} from '../../../shared/redux/set';
import {useReduxDispatch} from '../../../shared/redux';

const Quantity = ({part}: QuantityProps) => {
  const dispatch = useReduxDispatch();
  return (
    <Stack direction="row" style={styles.stackQuantity}>
      <Button
        onPress={() => {
          dispatch(decrementPart(part));
          dispatch(updateParts());
        }}
        icon="toy-brick-minus"
        compact={true}
      />
      <Text variant="bodySmall" style={styles.quantity}>
        {part.quantityCollectorPart} sur {part.quantityPart}
      </Text>
      <Button
        onPress={() => {
          dispatch(incrementPart(part));
          dispatch(updateParts());
        }}
        icon="toy-brick-plus"
        compact={true}
      />
      <Button
        onPress={() => {
          dispatch(completePart(part));
          dispatch(updateParts());
        }}
        icon="check-all"
        compact={true}
      />
    </Stack>
  );
};

type QuantityProps = {
  part: Part;
};

const styles = StyleSheet.create({
  stackQuantity: {
    backgroundColor: '#1EECE7',
    borderRadius: 6,
  },
  quantity: {
    paddingTop: 7,
  },
});

export default Quantity;
