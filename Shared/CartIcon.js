import React from 'react';
import {StyleSheet} from 'react-native';
import {Badge, Text} from 'native-base';

import {connect} from 'react-redux';

const CartIcon = props => {
  return (
    <>
      {props.cartItems.length ? (
        <Badge
          style={styles.badge}
          colorScheme="danger"
          rounded="full"
          alignSelf="flex-end"
          variant="solid"
          _text={{
            fontSize: 12,
          }}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 'auto',
    position: 'absolute',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    top: -4,
    right: -20,
    // backgroundColor: '#f53838',
  },
  text: {
    // fontSize: 12,
    // width: 100,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default connect(mapStateToProps)(CartIcon);
