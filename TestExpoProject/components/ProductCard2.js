import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import { db } from "../Firestore"; // ระบุตำแหน่งของ Firebase.js ที่คุณบันทึกไว้
import { getFirestore, collection, doc, setDoc, getDocs } from '@firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from '@firebase/app';
import '@firebase/auth';
import Product2 from './Product2';
import Profile2 from './Profile2';

export default function ProductCard2({ navigation }) {
  const [product, setproducts] = useState([]);
  
  async function Getproducts() {
    try {
      const productsCollection = collection(db, 'products');
      const querySnap = await getDocs(productsCollection);

      const tempProducts = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setproducts(tempProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    Getproducts();
  }, []);

  return (
    <View>
       <View style={{ marginTop: 5 ,}}>
          <Button title="สำหรับนักผจญภัยเริ่มต้น" />
        </View>
        <ScrollView style={{ marginTop: 0, width: '100%', height: '90%', backgroundColor: 'white'  }}>
          <View>
      {product.map((item) => (
        <Product2  key ={item.id} id={item.id} name={item.name} price={item.price} stock={item.stock} pic={item.pic} />
      ))}
    </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    padding: 10,
  },
  headerText: {
    color: 'black',
    fontSize: 14,
  },
  productcart: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    padding: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: 150,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
    color: 'orange',
  },
  productStock: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray',
  },
  list: {
    paddingHorizontal: 8,
    flexDirection: '',
    justifyContent: 'space-between',
  },
});
