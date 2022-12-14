import {Surface, Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useReduxDispatch, useReduxSelector} from '../../../shared/redux';
import {
  selectAddSetStatus,
  setAddSetStatus,
} from '../../../shared/redux/collection';
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import {useGetSetByIdLegoQuery} from '@react-monorepo/shared/redux/services/rebrickable/rebrickable.web';
import AddSet from './AddSet';

const SetSearchResult = ({setIdLego}: SetSearchResultProps) => {
  const {data, isLoading, error} = useGetSetByIdLegoQuery(setIdLego + '-1');
  console.log(data);
  const addSetStatus = useReduxSelector(selectAddSetStatus);
  const dispatch = useReduxDispatch();
  console.log('error');
  console.log(error);
  return (
    <View style={styles.container}>
      {error && (
        <Text>
          {'set number: ' + setIdLego + ' ' + error.data.detail}[{error.status}]
        </Text>
      )}

      {isLoading && <ActivityIndicator />}
      {!error && data && (
        <>
          <Snackbar
            style={styles.snackbar}
            visible={addSetStatus === 'fulfilled'}
            onDismiss={() => {}}
            duration={2000}
            action={{
              label: 'OK',
              onPress: () => {
                dispatch(setAddSetStatus('none'));
              },
            }}>
            <Text>{setIdLego} was added to collection.</Text>
          </Snackbar>
          <Text variant="h5">{data?.set_num}</Text>
          <Text variant="h6">{data?.name}</Text>
          <Text variant="body1">{data?.num_parts} parts</Text>
          <Surface elevation={2} category="medium">
            <Image source={{uri: data?.set_img_url}} style={styles.stretch} />
          </Surface>
          {addSetStatus === 'pending' && <ActivityIndicator />}
          {addSetStatus !== 'pending' && <AddSet previewSet={data} />}
        </>
      )}
    </View>
  );
};

type SetSearchResultProps = {
  setIdLego: string;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
    alignItems: 'center',
  },
  stretch: {
    width: 350,
    height: 350,
    margin: 10,
    resizeMode: 'contain',
  },
  snackbar: {
    backgroundColor: 'azure',
    color: 'white',
  },
});

export default SetSearchResult;
