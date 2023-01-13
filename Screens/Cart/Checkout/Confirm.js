import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Button} from 'react-native';
import {
  Text,
  Left,
  Right,
  ListItem,
  Thumbnail,
  Body,
  FlatList,
  Image,
} from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';

import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

var {width, height} = Dimensions.get('window');

const Confirm = props => {
  const finalOrder = props.route.params;

  // Add this
  const [productUpdate, setProductUpdate] = useState();
  useEffect(() => {
    if (finalOrder) {
      getProducts(finalOrder);
    }
    return () => {
      setProductUpdate();
    };
  }, [props]);

  // Add this
  const getProducts = x => {
    const order = x.order.order;
    var products = [];
    if (order) {
      order.orderItems.forEach(cart => {
        axios
          .get(`${baseURL}products/${cart.product}`)
          .then(data => {
            products.push(data.data);
            setProductUpdate(products);
          })
          .catch(e => {
            console.log(e);
          });
      });
    }
  };

  const confirmOrder = () => {
    const order = finalOrder.order.order;
    console.log('\n\n\n\n order =====', order);

    AsyncStorage.getItem('jwt').then(res => {
      console.log(res)
      axios
        .post(`${baseURL}orders`, order, {
          headers: {Authorization: `Bearer ${res}`},
        })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Order Completed',
              text2: '',
            });
            setTimeout(() => {
              props.clearCart();
              props.navigation.navigate('Cart');
            }, 500);
          }
        })
        .catch(error => {
          console.log('server error', error);
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    });
  };

  console.log('product up date', productUpdate);

  const listItemView = (item, index) => {
    console.log('list item view', item, index);
    return (
      <View style={styles.mainCardView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.subCardView}>
            <Image
              source={{
                uri: item.image
                  ? item.image
                  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }}
              resizeMode="contain"
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
              }}
            />
          </View>
          <View style={{marginLeft: 12}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {item.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                width: '85%',
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                }}>
                {item.price}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const data = productUpdate;
  // const data = [
  //   {id: 'dafdfa', name: 'tiger', price: 200},
  //   {id: 'dafa', name: 'mohammed', price: 2050},
  //   {id: 'dafddfa', name: 'sara', price: 20},
  // ]
  // const data = [
  //   {
  //     __v: 0,
  //     _id: '62ebc6605ce019230158e905',
  //     brand: 'Tt',
  //     category: {
  //       __v: 0,
  //       _id: '62eba2a9232f65a97b2e7e01',
  //       color: '',
  //       name: 'CAR',
  //     },
  //     countInStock: 30,
  //     dateCreated: '2022-08-04T13:15:12.634Z',
  //     description: 'Fughhhjhggg',
  //     id: '62ebc6605ce019230158e905',
  //     image:
  //       'http://192.168.100.172:4000/public/upload/rn_image_picker_lib_temp_5d25cc72-6c2d-4659-816d-c8dfdcb6208d.png-1659618912628.png',
  //     images: [],
  //     isFeatured: false,
  //     name: 'Car',
  //     numReviews: 0,
  //     price: 200,
  //     rating: 0,
  //     richDescription: 'undefined',
  //   },
  //   {
  //     __v: 0,
  //     _id: '62ebc5395ce019230158e8f0',
  //     brand: 'Test',
  //     category: {
  //       __v: 0,
  //       _id: '62eba25e232f65a97b2e7df0',
  //       color: '',
  //       name: 'PHONE',
  //     },
  //     countInStock: 10,
  //     dateCreated: '2022-08-04T13:10:17.697Z',
  //     description: 'Test',
  //     id: '62ebc5395ce019230158e8f0',
  //     image:
  //       'http://192.168.100.172:4000/public/upload/rn_image_picker_lib_temp_aad8c08a-c69e-43a3-8263-dd197ba37fd6.png-1659618617693.png',
  //     images: [],
  //     isFeatured: false,
  //     name: 'Iphone',
  //     numReviews: 0,
  //     price: 1000,
  //     rating: 0,
  //     richDescription: 'undefined',
  //   },
  // ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{borderWidth: 1, borderColor: 'orange', width: '100%'}}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{padding: 8}}>
              <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
              <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
              <Text>City: {finalOrder.order.order.city}</Text>
              <Text>Zip Code: {finalOrder.order.order.zip}</Text>
              <Text>Country: {finalOrder.order.order.country}</Text>
            </View>
            {/* <Text style={styles.title}>Items:</Text> */}
            {/* CHANGE THIS */}
            {/* {productUpdate && (
              <>
                {productUpdate.map(x => {
                  return (
                    <ListItem style={styles.listItem} key={x.name} avatar>
                      <Left>
                        <Thumbnail source={{uri: x.image}} />
                      </Left>
                      <Body style={styles.body}>
                        <Left>
                          <Text>{x.name}</Text>
                        </Left>
                        <Right>
                          <Text>$ {x.price}</Text>
                        </Right>
                      </Body>
                    </ListItem>
                  );
                })}
              </>
            )} */}
            {/* {productUpdate && (
              <>
                {productUpdate.map((x, index) => {
                  return (<Text>{x.name}</Text>);
                })}
              </>
            )} */}
            {/* <View>
            <FlatList
              data={data}
              // ListHeaderComponent={
              //   <View style={{width: '100%', height: moderateScale(8)}} />
              // }
              // ListFooterComponent={
              //   <View style={{width: '100%', height: 28}} />
              // }
              renderItem={
                // ({item, index}) => listItemView(item, index) //this is a main view
                ({item, index}) => <Text>test</Text> //this is a main view
              }
              keyExtractor={item => item._id}
            />
            </View> */}
          </View>
        ) : null}
        <View style={{alignItems: 'center', margin: 20}}>
          <Button title={'Place order'} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    // alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },

  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'black',
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
