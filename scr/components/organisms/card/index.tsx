import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import tw from 'tailwind-rn';

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

const Body: FC = ({children}): JSX.Element => {
  return <>{children}</>;
};

const Footer: FC = ({children}): JSX.Element => {
  return (
    <View
      style={[
        tw(
          'absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl',
        ),
        styles.cardShadow,
      ]}>
      {children}
    </View>
  );
};

const Card: FC<{id: number}> & {
  Body: FC;
  Footer: FC;
} = ({id, children}) => {
  return (
    <View key={id} style={tw('relative bg-white h-3/4 rounded-xl')}>
      {children}
    </View>
  );
};

Card.Body = Body;
Card.Footer = Footer;

export default Card;
