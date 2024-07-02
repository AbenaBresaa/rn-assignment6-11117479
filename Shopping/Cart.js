import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Logo = require('./assets/Logo.png');
const Search = require('./assets/Search.png');
const Remove = require('./assets/remove.png');


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await AsyncStorage.getItem('cartItems');
        if (cartItems) {
          setCartItems(JSON.parse(cartItems));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Image style={styles.icon} source={Logo}/>
      <Image style={styles.icons} source={Search}/>
      </View>

      <Text style={styles.text}>C H E C K O U T</Text>
      <View style={styles.checkoutlist}>
         {cartItems.map(item => (
          <View key={item.id} style={styles.all}>
            <Image style={styles.productlist} source={item.image} />
            <View style={styles.about}>
              <Text style={styles.first}>{item.name}</Text>
              <Text style={styles.next}>{item.description}</Text>
              <Text style={styles.last}>${item.price}</Text>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Image style={styles.tag} source={Remove} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
     <View style={styles.buttom}>
      <Text style={styles.total}> E S T. T O T A L</Text>
      <Text style={styles.amount}>${calculateTotal()}</Text>
     </View>
     <Button
        title="CheckOut"
        onPress={() => alert('Checked Out')}
        style={styles.cartButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   marginBottom: 1,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  icon:{
   marginBottom:8,
   marginStart:135,
  },
  icons:{
    marginBottom: 8,
  },
  text:{
    fontSize: 30,
    marginBottom:10,
    marginStart:100,
  }, 
  checkoutlist:{
    margin: 20,
  },
  productlist:{
    marginBottom: 35,
    width: 125,
    height: 180,
  },
  all:{
  flexDirection: 'row',
  },
  about:{
    margin: 8,
    marginLeft: 10,
  },
  first: {
    fontSize: 19,
    fontWeight: '500',
    marginTop: 40,
  },
  next: {
    fontSize: 15,
    opacity: 0.6,
    marginTop: 5,
    fontSize: 16,
  },
  last: {
    color: '#CC5801',
    marginTop: 5,
    fontSize: 16,
  },
  tag: {
    width: 25,
    height: 25,
    marginTop:25,
    marginLeft: 160,
  },
  buttom:{
   flexDirection:'row',
   justifyContent: 'space-between',
   marginBottom: 5,
  },
  total:{
    fontSize: 18,
    marginLeft: 15,
  },
  amount:{
    color: '#CC5801',
    fontSize: 25,
    marginRight: 15,
  },
 
});
export default Cart;
