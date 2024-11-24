import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { collection, onSnapshot, doc, deleteDoc,addDoc } from '@firebase/firestore';  // เพิ่ม import

import { db } from '../Firestore';

export default function Cart2({ navigation }) {
  const [carts, setCarts] = useState([]);
  const [cuser, setCuser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCuser(user);
        const cartsCollection = collection(db, 'users', user.uid, 'cart');
        const unsubscribeSnapshot = onSnapshot(cartsCollection, (querySnapshot) => {
          const tempCarts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCarts(tempCarts);
        });

        // Cleanup function
        return () => unsubscribeSnapshot();
      } else {
        console.warn('ออกจากระบบผู้ใช้แล้ว');
        setCuser(null);
        setCarts([]);  // เคลียร์ข้อมูลเมื่อไม่มีผู้ใช้
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [auth]);

  async function RemoveProduct(id) {
    try {
      const collRef = doc(db, 'users', cuser.uid, 'cart', id);
      await deleteDoc(collRef);
      alert('ลบสินค้า');
      // ไม่ต้องเรียก Getcarts หรืออัปเดต state โดยตรง เนื่องจาก onSnapshot จะทำให้ข้อมูลอัพเดตอัตโนมัติ
    } catch (error) {
      console.error('Error removing product:', error);
    }
  }

  async function Order() {
    try {
      if (cuser) {
        // สร้างเอกสารใน collection "order"
        const orderCollection = collection(db, 'users', cuser.uid, 'order');
        const orderDocRef = await addDoc(orderCollection, { products: carts });

        // ลบสินค้าทั้งหมดใน collection "cart"
        for (const item of carts) {
          const collRef = doc(db, 'users', cuser.uid, 'cart', item.id);
          await deleteDoc(collRef);
        }

        // แสดง ID ของเอกสารที่ถูกสร้างใน console ตรวจดูว่าสร้างจริงไหม
        console.log('Order placed with ID:', orderDocRef.id);

        alert('สั่งซื้อสินค้าเรียบร้อย เกือบตาย');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }


  return (
    <View style={styles.bg}>
      <View style={styles.productcart}>
        <Button title="Order" onPress={() => Order()} color="#90A4AE" />
        <ScrollView style={{backgroundColor:'#7660AF'}}>
          {carts.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => RemoveProduct(item.id)}>
              <View style={{ ...styles.textbox }}>
                <Text style={styles.productStock}>ID: {item.id}</Text>
                <Text style={styles.productStock}>ชื่อสินค้า: {item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#2F2E34",
  }, textbox: {
    backgroundColor: '#8EE6C9',
    marginTop: 20,
    height: 50,
    width: 300,
    alignSelf: 'center',  // ทำให้ตรงกลางแนวแกนตั้ง
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,  // ปรับขนาดของข้อความภายใน TextInput
  }, buttonview: {
    alignSelf: 'center',  // ทำให้ตรงกลางแนวแกนตั้ง
    marginTop: 30,
    width: 300
  }, headerText: {
    color: 'black',
    fontSize: 14,
    marginTop: 10,
  }, productcart: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    padding: 1,
  }, productStock: {
    marginTop: 5,
    fontSize: 14,
    color: 'black',
  },
});