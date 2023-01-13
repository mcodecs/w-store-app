import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
  HStack,
  Heading,
  Box,
  Select,
  CheckIcon,
} from 'native-base';

const methods = [
  {name: 'Cash on Delivery', value: 1},
  {name: 'Bank Transfer', value: 2},
  {name: 'Card Payment', value: 3},
];

const paymentCards = [
  {name: 'Wallet', value: 1},
  {name: 'Visa', value: 2},
  {name: 'MasterCard', value: 3},
  {name: 'Other', value: 4},
];

const Payment = props => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  const [value, setValue] = React.useState('one');
  return (
    <Container maxWidth="100%" alignItems="center">
      <HStack justifyContent={'center'}>
        <View>
          <Heading size="lg">Choose your payment method</Heading>
        </View>
      </HStack>
      <Container maxWidth="100%" alignItems="center">
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={selected}
          onChange={nextValue => {
            setSelected(nextValue);
          }}>
          {methods.map((item, index) => {
            return (
              <Radio value={item.value} my={1}>
                <Text>{item.name}</Text>
              </Radio>
            );
          })}
        </Radio.Group>
        ;
        {selected == 3 ? (
          <Box w="3/4" maxW="300" mb={4}>
            <Select
              selectedValue={card}
              minWidth="200"
              accessibilityLabel="Select your country"
              placeholder="Select your country"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={x => setCard(x)}>
              {paymentCards.map(c => {
                return (
                  <Select.Item key={c.code} label={c.name} value={c.name} />
                );
              })}
            </Select>
          </Box>
        ) : null}
        <View style={{marginTop: 60, alignSelf: 'center'}}>
          <Button
            title={'Confirm'}
            onPress={() => props.navigation.navigate('Confirm', {order})}
          />
        </View>
      </Container>
    </Container>
  );
};

export default Payment;
