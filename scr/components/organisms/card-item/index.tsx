import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import tw from 'tailwind-rn';

import Card from '../card';
import {CardItemProps} from './typings';

const CardItem: FC<CardItemProps> = ({user}): JSX.Element => {
  return (
    <Card id={user.id}>
      <Card.Body>
        <Image
          style={tw('absolute top-0 h-full w-full rounded-xl')}
          source={{uri: user.photoUrl}}
        />
      </Card.Body>
      <Card.Footer>
        <View>
          <Text style={tw('text-xl font-bold')}>
            {user.firstName} {user.lastName}
          </Text>
          <Text>{user.occupation}</Text>
        </View>
        <Text style={tw('text-2xl font')}>{user.age}</Text>
      </Card.Footer>
    </Card>
  );
};

export default CardItem;
