import {Avatar, Badge} from '@rneui/base';
import React from 'react';

const AvatarBadge = ({
  size,
  isCompleted,
  numberMissing,
  imageUrl,
  bottom,
}: AvatarBadgeProps) => {
  let badgeColor;
  let badgeText;
  if (isCompleted) {
    badgeColor = 'success';
    badgeText = 'complete';
  } else {
    badgeColor = 'error';
    badgeText = numberMissing + ' missing';
  }
  return (
    <>
      <Avatar rounded size={size} source={{uri: imageUrl}} />
      <Badge
        status={badgeColor}
        value={badgeText}
        containerStyle={{position: 'absolute', bottom: bottom, left: 20}}
      />
    </>
  );
};

type AvatarBadgeProps = {
  size: number;
  bottom: number;
  isCompleted: boolean;
  numberMissing: number;
  imageUrl: string;
};
export default AvatarBadge;
