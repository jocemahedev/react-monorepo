import {Badge} from '@react-native-material/core';
import { ListItem} from '@rneui/base';
import React from 'react';
import {SafeAreaView, SectionList} from 'react-native';
import {MD3Colors} from 'react-native-paper';
import {IncompleteParts, Part, Set} from '../../../shared/types/types';
import CountSetsIncomplete from '../Set/CountSetsIncomplete';
import AvatarBadge from '../UI/AvatarBadge';

export const MISSING_TEXT = 'Missing parts';
const IncompletePartsList = ({incompleteParts}: IncompletePartsListProps) => {
  return (
    <SafeAreaView>
      <CountSetsIncomplete />

      <SectionList
        sections={incompleteParts}
        renderItem={({item, section}) => <Item part={item} set={section.set} />}
        renderSectionHeader={section => (
          <SectionItem set={section.section.set} />
        )}
      />
    </SafeAreaView>
  );
};
function Item({part, set}: ItemProps) {
  const numberMissing = part.quantityPart - part.quantityCollectorPart;
  return (
    <ListItem key={set.idParts + part.idElement + part.index} bottomDivider>
      <AvatarBadge
        size={60}
        isCompleted={false}
        imageUrl={part.imageUrl}
        numberMissing={numberMissing}
        bottom={2}
      />
      <ListItem.Content>
        <ListItem.Title>{part.name}</ListItem.Title>
        <ListItem.Subtitle>
          {part.quantityPart - part.quantityCollectorPart + ' ' + MISSING_TEXT}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Badge label="  " color={'#' + part.color.codeRgb} style={{top: 0}} />

    </ListItem>
  );
}
function SectionItem({set}: SectionItemProps) {
  const numberMissing = set.quantityParts - set.quantityCollectorParts;
  return (
    <ListItem
      key={set.id}
      bottomDivider
      containerStyle={{backgroundColor: MD3Colors.neutralVariant95}}>
      <AvatarBadge
        size={80}
        isCompleted={false}
        imageUrl={set.imageUrl}
        numberMissing={numberMissing}
        bottom={2}
      />
      <ListItem.Content>
        <ListItem.Title>{set.idLego}</ListItem.Title>
        <ListItem.Subtitle>{set.name}</ListItem.Subtitle>
        <ListItem.Subtitle>
          {set.quantityParts - set.quantityCollectorParts + ' ' + MISSING_TEXT}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

type ItemProps = {
  part: Part;
  set: Set;
};
type SectionItemProps = {
  set: Set;
};
type IncompletePartsListProps = {
  incompleteParts: IncompleteParts[];
};
export default IncompletePartsList;
