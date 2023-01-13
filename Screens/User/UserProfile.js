import React, {useContext, useState, useCallback} from 'react';
import {View, Text, ScrollView, Button, StyleSheet} from 'react-native';
import {Container} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderCard from '../../Shared/OrderCard';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import {logoutUser} from '../../Context/actions/Auth.actions';
import {useEffect} from 'react/cjs/react.development';

const UserProfile = props => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();
  const [token, setToken] = useState();
  console.log('\n\n\n\n\n\n\n f', context);
  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login');
      }

      AsyncStorage.getItem('jwt')
        .then(res => {
          setToken(res);
          console.log('async get item', res, context);
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: {Authorization: `Bearer ${res}`},
            })
            .then(user => setUserProfile(user.data));
          // .then(user => console.log('\n\n\n\n\ndata',user.data));
        })
        .catch(error => console.log(error));
      AsyncStorage.getItem('jwt')
        .then(res => {
          axios
            .get(`${baseURL}orders`, {
              headers: {Authorization: `Bearer ${res}`},
            })
            .then(x => {
              const data = x.data;
              console.log(data);
              const userOrders = data.filter(
                order => order.user._id === context.stateUser.user.userId,
              );
              setOrders(userOrders);
            })
            .catch(error => console.log(error));
        })
        .catch(err => console.log(err));

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated]),
  );
  // console.log('jwt', JSON.stringify(AsyncStorage.getItem('jwt')));
  // console.log('jwt', AsyncStorage.getItem('jwt'));
  // console.log('user sub', context.stateUser.user.userId);
  console.log('\n\n\n\n\nuser profile', userProfile);
  return (
    <Container style={styles.container} maxWidth="100%">
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{fontSize: 30}}>
          {userProfile ? userProfile.name : ''}
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{margin: 10}}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
          <Text style={{margin: 10}}>
            Phone: {userProfile ? userProfile.phone : ''}
          </Text>
        </View>
        <View style={{marginTop: 80}}>
          <Button
            title={'Sign Out'}
            onPress={() => [
              AsyncStorage.removeItem('jwt'),
              logoutUser(context.dispatch),
            ]}
          />
        </View>
        <View style={styles.order}>
          <Text style={{fontSize: 20}}>My Orders</Text>
          <View>
            {console.log('\n\n\n\n order', orders)}
            {orders ? (
              orders.map(x => {
                return <OrderCard key={x.id} {...x} />;
              })
            ) : (
              <View style={styles.order}>
                <Text>You have no orders</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
});

export default UserProfile;
