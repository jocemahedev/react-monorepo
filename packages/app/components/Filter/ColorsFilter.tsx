import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Color} from '../../../shared/types/types';
import {Chip, Badge} from '@react-native-material/core';
import {useReduxDispatch} from '../../../shared/redux';
import {setCurrentColors} from '../../../shared/redux/set';
import {styles} from './Filter.styles';

export default function ColorsFilter({colors}: ColorsFilterProps) {
  const dispatch = useReduxDispatch();
  const [activeColors, setActiveColors] = useState<Color[]>([]);
  const getRGBColor = (color: Color): string => {
    if (color.name === 'White' || color.name === 'Trans-Clear') {
      return '#ccf2ff';
    }
    return '#' + color.codeRgb;
  };
  useEffect(() => {
    dispatch(setCurrentColors(activeColors));
  }, [dispatch, activeColors]);
  const colorHandler = (color: Color): void => {
    if (activeColors.find(activeColor => activeColor.id === color.id)) {
      setActiveColors(
        activeColors.filter(activeColor => activeColor.id !== color.id),
      );
    } else {
      setActiveColors([...activeColors, color]);
    }
  };
  const getLabelCheckedColor = (color: Color): string => {
    if (activeColors.find(activeColor => activeColor.id === color.id)) {
      return '✔️';
    }
    return ' ';
  };

  return (
    <ScrollView horizontal style={styles.filter}>
      {colors.map(color => (
        <TouchableOpacity key={color.id}>
          <Chip
            label={color.name}
            color={getRGBColor(color)}
            key={color.id}
            onPress={() => colorHandler(color)}>
            <Badge
              color={getRGBColor(color)}
              label={getLabelCheckedColor(color)}
            />
          </Chip>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
type ColorsFilterProps = {
  colors: Color[];
};
