import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import tw from 'tailwind-rn';

import Card from '../card';

const CardNoResults: FC = (): JSX.Element => {
  return (
    <Card id={'0'}>
      <Card.Body>
        <View style={tw('flex-1 justify-center items-center')}>
          <Text style={tw('font-bold pb-5')}>No More Profiles</Text>
          <Image
            style={tw('h-20 w-full')}
            height={100}
            width={100}
            source={{uri: 'https://links.papareact.com/6gb'}}
          />
        </View>
      </Card.Body>
      <Card.Footer />
    </Card>
  );
};

export default CardNoResults;
