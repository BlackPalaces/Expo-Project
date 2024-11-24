import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../Firestore"; // ระบุตำแหน่งของ Firebase.js ที่คุณบันทึกไว้
import { getFirestore, collection, doc, setDoc } from '@firebase/firestore';
import {firebase} from '@firebase/app';
import '@firebase/auth';



export default function ProductAPIALL2() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // เพิ่ม state สำหรับข้อมูลที่ถูกกรอง
  const [filterType, setFilterType] = useState('All'); // เพิ่ม state สำหรับประเภทการกรอง
  const [cart, setcart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(
        'https://it2.sut.ac.th/labexample/product.php?pageno=' + offset
      );
      const json = await result.json();

      if (json.products.length > 0) {
        setOffset(offset + 1);
        setData([...data, ...json.products]);
      } else {
        setIsListEnd(true);
      }
    }
    fetchData();
  }, [data]);

  useEffect(() => {
    // ตรวจสอบประเภทการกรองและกรองข้อมูลตามนั้น
    if (filterType === 'All') {
      setFilteredData(data);
    } else if (filterType === 'IN STOCK') {
      const filtered = data.filter((item) => item.stock > 0);
      setFilteredData(filtered);
    } 
  }, [filterType, data]);

  const filterItem = (type) => {
    setFilterType(type); // เปลี่ยนประเภทการกรองเมื่อกดปุ่ม
  };

  async function addProd(prodname) {
    alert('บันทึก '+prodname);
    try {
      //await SecureStore.deleteItemAsync('Cart');
      SecureStore.getItemAsync('Cart').then(async (res) => {
        var ProductList = null;

        console.log(res);

        if (res === undefined || res === null) {
          ProductList = [prodname];
        } else {
          ProductList = JSON.parse(res);
          ProductList.push(prodname);
        }
        await SecureStore.setItemAsync('Cart', JSON.stringify(ProductList));
        getcart();
      });

    } catch (e) {
      console.log(e)
    }
  }
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
    <View style={styles.container}>
      <View style={{ marginTop: 5 }}>
        <Button title="All" onPress={() => filterItem('All')} />
        <Button title="IN STOCK" onPress={() => filterItem('IN STOCK')} />
      </View>

      <ScrollView style={{ marginTop: 0, width: '100%', height: 500, }}>
        {filteredData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => addProd(item.name)} style={styles.footerImage} >
            <View key={item.id} style={styles.product}>
              <View style={styles.imageContainer} >
                <Image source={{ uri: item.pic }} style={styles.image}/>
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.productStock}>จำนวนคงเหลือ {item.stock}</Text>
              <Text style={styles.productPrice}>${item.price} </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
