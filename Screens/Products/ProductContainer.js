import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Icon,
  Item,
  Input,
  Text,
  HStack,
  SearchIcon,
  CloseIcon,
  Row,
  Stack,
  VStack,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import baseUrl from '../../assets/common/baseUrl';
import axios from 'axios';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import baseURL from '../../assets/common/baseUrl';

import p from '../../assets/data/products.json';
import c from '../../assets/data/categories.json';

var {height} = Dimensions.get('window');

const ProductContainer = props => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      console.log('call back');
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseURL}products`)
        .then(res => {
          console.log('responds', res);
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch(error => {
          console.log('Api call error', baseURL, error);
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then(res => {
          setCategories(res.data);
          console.log('\n\n\ncategory', res);
        })
        .catch(error => {
          console.log('Api call error');
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, []),
  );

  // Product Methods
  const searchProduct = text => {
    setProductsFiltered(
      products.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = ctg => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter(i => i.category._id === ctg),
              setActive(true),
            ),
          ];
    }
  };
  console.log('URL', baseURL, `${baseURL}categories`);
  console.log('products', products);
  console.log('productsFiltered', productsFiltered);
  console.log('categories', categories);
  console.log('productsCtg', productsCtg, productsCtg.length);
  console.log('initialState', initialState);
  console.log('loading', loading);
  console.log('focus', focus);
  return (
    <>
      {loading == false ? (
        <>
          <Container maxWidth="100%">
            <HStack
              px="3"
              py="3"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              maxW="350">
              <HStack>
                {/* <Icon name="ios-search" /> */}
                <SearchIcon />
              </HStack>
              <HStack>
                <Input
                  size="xs"
                  placeholder="Search"
                  onFocus={openList}
                  onChangeText={text => searchProduct(text)}
                />
              </HStack>
              <HStack>
                {/* {focus == true ? (
                  <Icon onPress={onBlur} name="ios-close" /> 
                ) : null} */}
                {focus == true ? <CloseIcon onPress={onBlur} /> : null}
              </HStack>
            </HStack>
            {focus == true ? null : (
              <ScrollView>
                <View>
                  <View>
                    <Banner />
                  </View>
                  <View>
                    <CategoryFilter
                      categories={categories}
                      categoryFilter={changeCtg}
                      productsCtg={productsCtg}
                      active={active}
                      setActive={setActive}
                    />
                  </View>
                  {productsCtg.length > 0 ? (
                    <View style={styles.listContainer}>
                      {productsCtg.map(item => {
                        return (
                          <ProductList
                            navigation={props.navigation}
                            key={item.name}
                            item={item}
                          />
                        );
                      })}
                    </View>
                  ) : (
                    <View style={[styles.center, {height: height / 2}]}>
                      <Text>No products found</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </Container>
        </>
      ) : (
        // Loading
        <Container
          maxWidth="100%"
          style={[styles.center, {backgroundColor: '#f2f2f2'}]}>
          <ActivityIndicator size="large" color="red" />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    // height: height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductContainer;
