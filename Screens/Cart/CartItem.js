import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  Left,
  Right,
  ListItem,
  Thumbnail,
  Body,
  HStack,
  Avatar,
  Box,
  Spacer,
  FlatList,
  VStack,
} from 'native-base';

const CartItem = props => {
  const data = [props.item.item];
  // const data = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     name: 'Aafreen Khan',
  //     price: 200,
  //     image:
  //       'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //   },
  // ];
  console.log(data);
  return (
    // <ListItem style={styles.listItem} key={Math.random()} avatar>
    //   <Left>
    //     <Thumbnail
    //       source={{
    //         uri: data.image
    //           ? data.image
    //           : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
    //       }}
    //     />
    //   </Left>
    //   <Body style={styles.body}>
    //     <Left>
    //       <Text>{data.name}</Text>
    //     </Left>
    //     <Right>
    //       <Text>$ {data.price}</Text>
    //     </Right>
    //   </Body>
    // </ListItem>
    <FlatList
      style={styles.listItem}
      data={data}
      renderItem={({item}) => (
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: 'gray.600',
          }}
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2">
          <HStack
            maxW="100%"
            // maxW="350"
            space={3}
            justifyContent="space-between">
            <Avatar
              size="48px"
              source={{
                uri: item.image
                  ? item.image
                  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }}
            />
            <VStack>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                bold>
                {item.name}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                {item.price}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              alignSelf="flex-start">
              {/* {'item.tim'} */}
            </Text>
          </HStack>
        </Box>
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    // alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default CartItem;
