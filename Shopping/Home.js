import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = require('./assets/Menu.png');
const Logo = require('./assets/Logo.png');
const Search = require('./assets/Search.png');
const Bag = require('./assets/shoppingBag.png');
const List = require('./assets/Listview.png');
const Filter = require('./assets/Filter.png');
const dress1 = require('./assets/dress1.png');
const dress2 = require('./assets/dress2.png');
const dress3 = require('./assets/dress3.png');
const dress4 = require('./assets/dress4.png');
const dress5 = require('./assets/dress5.png');
const dress6 = require('./assets/dress6.png');
const dress7 = require('./assets/dress7.png');
const Add = require('./assets/add_circle.png');

const products = [
  { id: 1, name: 'Office Wear', description: 'reversible angora cardigan', price: 120, image: dress1 },
  { id: 2, name: 'Black', description: 'reversible angora cardigan', price: 120, image: dress2 },
  { id: 3, name: 'Church Wear', description: 'reversible angora cardigan', price: 120, image: dress3 },
  { id: 4, name: 'Lamerei', description: 'reversible angora cardigan', price: 120, image: dress4 },
  { id: 5, name: '21WN', description: 'reversible angora cardigan', price: 120, image: dress5 },
  { id: 6, name: 'Lopo', description: 'reversible angora cardigan', price: 120, image: dress6 },
  { id: 7, name: '21WN', description: 'reversible angora cardigan', price: 120, image: dress7 },
  { id: 8, name: 'lame', description: 'reversible angora cardigan', price:120, image: dress3},
];

const Home = () => {
  const navigation = useNavigation();

  const addToCart = async (product) => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      let items = cartItems ? JSON.parse(cartItems) : [];
      items.push(product);
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.productImage} source={Menu} />
        <Image style={styles.productImage} source={Logo} />
        <View style={styles.iconContainer}>
          <Image style={styles.productIcon} source={Search} />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image style={styles.productIcon} source={Bag} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subheader}>
        <Text style={styles.text}>O U R   S T O R Y</Text>
        <View style={styles.icon}>
          <Image style={styles.icons} source={List} />
          <Image style={styles.icons} source={Filter} />
        </View>
      </View>

      <View style={styles.products}>
        {products.map((product, index) => (
          <View key={product.id} style={[styles.productBlock, (index % 2 !== 0) && { marginLeft: 10 }]}>
            <ImageBackground style={styles.dresses} source={product.image}>
              <TouchableOpacity onPress={() => addToCart(product)}>
                <Image style={styles.tag} source={Add} />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.first}>{product.name}</Text>
            <Text style={styles.next}>{product.description}</Text>
            <Text style={styles.last}>${product.price}</Text>
          </View>
        ))}
      </View>

      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Cart')}
        style={styles.cartButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  productImage: {
    marginBottom: 8,
  },
  productIcon: {
    marginBottom: 8,
    marginLeft: 20,
  },
  text: {
    fontSize: 25,
    marginTop: 10,
  },
  subheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  icon: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icons: {
    marginBottom: 8,
    marginLeft: 20,
  },
  products: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productBlock: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  dresses: {
    marginTop: 10,
    marginBottom: 8,
    width: 170,
    height: 220,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  tag: {
    width: 20,
    height: 20,
    margin: 5,
  },
  first: {
    fontSize: 18,
    fontWeight: '500',
  },
  next: {
    fontSize: 15,
    opacity: 0.6,
  },
  last: {
    color: '#CC5801',
  },
  cartButton: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
});

export default Home;
