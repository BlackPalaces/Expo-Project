import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native'; // เพิ่ม import

export default function Cart({ navigation }) {
    const [cart, setcart] = useState([]);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        // ดึงข้อมูล cart เมื่อหน้านี้ได้รับ focus
        if (isFocused) {
          getcart();
        }
      }, [isFocused]);
    
    
      const handleClearCart = async () => {
        try {
          await SecureStore.deleteItemAsync('Cart'); // รอให้ removeValue เสร็จสิ้นก่อน
          setcart([]); // รีเซ็ตค่า cart เป็น array ว่าง
          await getcart(); // รอให้ getcart เสร็จสิ้นก่อน
          alert('ตะกล้าสินค้าถูกลบแล้ว');
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      }
      
      useEffect(() => {
        // ไม่ต้องใส่ removeValue() ที่นี่ เพราะเราเรียกมันใน handleClearCart แล้ว
      }, []);
    
      async function getcart() {
        var res = await SecureStore.getItemAsync('Cart');
        if (res) {
          setcart(JSON.parse(res));
        }
      }
      useEffect(() => {
        getcart();
      }, []);
    


  return (
    <View style={styles.bg}>
        
      <View style={styles.productcart}>
        <Button title='Clear' onPress={() => handleClearCart()} color="#90A4AE" />
        <ScrollView>
          {cart.map((product, index) =>
            <Text key={index} style={{ ...styles.headerText, }} numberOfLines={2} >{product}</Text>
          )}
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
    backgroundColor: 'white',
    marginTop: 20,
    height: 50,
    width: 300,
    alignSelf: 'center',  // ทำให้ตรงกลางแนวแกนตั้ง
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,  // ปรับขนาดของข้อความภายใน TextInput
  },buttonview:{
    alignSelf: 'center',  // ทำให้ตรงกลางแนวแกนตั้ง
    marginTop:30,
    width:300
  },headerText: {
    color: 'black',
    fontSize: 14,
    marginTop:10,
  },productcart: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 1,
  },
});