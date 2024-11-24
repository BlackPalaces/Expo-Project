import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import { db } from "../Firestore"; // ระบุตำแหน่งของ Firebase.js ที่คุณบันทึกไว้
import { getFirestore, collection, doc, setDoc } from '@firebase/firestore';
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { CommonActions } from '@react-navigation/native';

export default function Product2( props ) {
    const [cuser,setCuser] = useState(null);
    const auth = getAuth(); // Get Firebase Authentication instance


    async function Order(id, name) {
        try {
          // เพิ่มสินค้าลงใน Firestore ใน collection 'cart'
          const userDocRef = doc(collection(db, 'users'), cuser.uid);
          const cartCollectionRef = collection(userDocRef, 'cart');
          const cartDocRef = doc(cartCollectionRef, id);
      
          await setDoc(cartDocRef, {
            name: name,
            prodid: id
          });
      
          alert('เอาสินค้าใส่ตะกร้าเรียบร้อย');
        } catch (error) {
          alert(error);
        }
      }


    useEffect(() => {
        const CheckLogin = async () => {
          try {
            const user = await new Promise((resolve, reject) => {
              onAuthStateChanged(auth, resolve, reject);
            });
      
            if (user) {
              setCuser(user);
            }
          } catch (error) {
            console.error('Error checking login:', error);
          }
        };
      
        CheckLogin();
      }, []);

    return (
        <View style={{...styles.container,backgroundColor:'black'}}>
          <TouchableOpacity onPress={() => Order(props.id,props.name)}>
          <View style={{marginTop:10,backgroundColor:'yellow' ,...styles.prodInfo,padding:10}}>
            <Image source={{ uri: props.pic }} style={{ width: 150, height: 150,borderRadius: 5,  }} />
            <View style={{marginLeft:20}}>
            <Text style={{...styles.headerText}} numberOfLines={2}>สินค้า: {props.name} </Text>
            <Text style={{...styles.headerText}}>ราคา: {props.price}บาท</Text>
            <Text style={{...styles.headerText}}>คงเหลืออยู่: {props.stock}</Text>
            </View>
          </View>
          </TouchableOpacity>
          </View>
     
    );
  }
 
const styles = StyleSheet.create({
    headerText: {
        color: 'black',
        fontSize:20,
        width:230,
    },
    productcart: {
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        padding: 1,
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
    prodInfo: {
        justifyContent: 'left',
        flexDirection: 'row',
    },
});
