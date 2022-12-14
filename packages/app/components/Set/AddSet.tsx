import {Button} from '@react-native-material/core';
import React from 'react';
import {StyleSheet} from 'react-native';

import {useReduxDispatch} from '../../../shared/redux';
import {addSet} from '../../../shared/redux/collection';

import {RebrickableSet} from '../../../shared/redux/services/rebrickable/type';
const AddSet = ({previewSet}: AddSetProps) => {
  const dispatch = useReduxDispatch();

  return (
    <Button
      style={styles.buttonAdd}
      title="Add SET"
      onPress={() => {
        dispatch(addSet(previewSet));
      }}
    />
  );
};

type AddSetProps = {
  previewSet: RebrickableSet;
};
const styles = StyleSheet.create({
  buttonAdd: {
    margin: 15,
  },
});

export default AddSet;
