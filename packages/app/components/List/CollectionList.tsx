import {ListItem, Icon, Chip} from '@rneui/base';
import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Button} from 'react-native-paper';

import {useReduxDispatch, useReduxSelector} from '../../../shared/redux';
import {
  fetchSets,
  selectAllSets,
  selectCurrentCollection,
  deleteSet,
  deleteParts,
  completeSet,
} from '../../../shared/redux/collection';

import {Set} from '../../../shared/types/types';
import AvatarBadge from '../UI/AvatarBadge';

export default function CollectionList({pressSet}: CollectionListProps) {
  const currentCollection = useReduxSelector(selectCurrentCollection);
  const allSets = useReduxSelector(selectAllSets);
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(fetchSets());
    console.log('fetchSet CollectionList');
  }, [currentCollection, dispatch]);

  return (
    <View>
      <FlatList
        contentContainerStyle={{paddingBottom: 120}}
        data={allSets}
        renderItem={({item}) => <Item set={item} onPress={pressSet} />}
        numColumns={1}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
function Item({set, onPress}: ItemProps) {
  const dispatch = useReduxDispatch();
  const deleteSetHandler = (deletedSet: Set) => {
    dispatch(deleteSet(deletedSet.id));
    dispatch(deleteParts(deletedSet.idParts));
  };
  const completeSetHandler = (setToBeCompleted: Set) => {
    dispatch(completeSet(setToBeCompleted));
  };
  const numberMissing = set.quantityParts - set.quantityCollectorParts;
  let badgeColor;
  let badgeText;
  const isCompleted = set.quantityCollectorParts === set.quantityParts;
  const quantityText = set.quantityCollectorParts + '/' + set.quantityParts;
  if (isCompleted) {
    badgeColor = 'success';
    badgeText = 'complete';
  } else {
    badgeColor = 'error';
    badgeText = set.quantityParts - set.quantityCollectorParts + ' missing';
  }

  return (
    <View>
      <ListItem.Swipeable
        bottomDivider
        rightContent={reset => (
          <Button onPress={() => deleteSetHandler(set)}>
            <Icon
              color="red"
              size={40}
              name="delete"
              iconStyle={{marginTop: 50}}
            />
          </Button>
        )}>
        <AvatarBadge
          size={80}
          bottom={30}
          isCompleted={isCompleted}
          imageUrl={set.imageUrl}
          numberMissing={numberMissing}
        />
        <ListItem.Content onPress={() => onPress}>
          <ListItem.Title style={{fontWeight: 'bold'}}>
            {set.idLego}{' '}
            <ListItem.Subtitle style={{fontWeight: '200'}}>
              {set.name}
            </ListItem.Subtitle>
          </ListItem.Title>

          <ListItem.Subtitle style={{fontWeight: '100'}}>
            {quantityText}
          </ListItem.Subtitle>

          <Chip
            title="Complete this Set"
            disabled={isCompleted}
            icon={{
              name: 'check',
              type: 'font-awesome',
              size: 10,
            }}
            onPress={() => completeSetHandler(set)}
            type="outline"
            containerStyle={{marginVertical: 5}}
          />
          <Chip
            title="View parts"
            icon={{
              name: 'toy-brick',
              type: 'material-community',
              size: 15,
            }}
            onPress={() => onPress(set)}
            type="solid"
            containerStyle={{marginVertical: 5}}
          />
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    </View>
  );
}

type CollectionListProps = {
  pressSet: (set: Set) => void;
};

type ItemProps = {
  set: Set;
  onPress: (set: Set) => void;
};
