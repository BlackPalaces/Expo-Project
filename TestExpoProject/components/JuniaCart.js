import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const DATA = [
  {
    "id": "1",
    "name": "Pantene แพนทีน มิราเคิล คริสตัล สมูท แชมพู+ครีมนวดผม 500 มล.",
    "price": "599",
    "stock": "2",
    "cate": "ผลิตภัณฑ์ดูแลผม",
    "pic": "http://it2.sut.ac.th/labexample/pics/pantene.jpg"
  },
  {
    "id": "2",
    "name": "ลอรีอัล ปารีส เอลแซฟ เอ็กซ์ตรอว์ดินารี่ ออยล์ 100 มล. (Extraordinary, บ ารุงผม, น้า มนั ใส่ผม, เซรั่มบา ",
    "price": "259",
    "stock": "0",
    "cate": "ผลิตภัณฑ์ดูแลผม",
    "pic": "http://it2.sut.ac.th/labexample/pics/elseve.jpg"
  },
  {
    "id": "3",
    "name": "Microsoft Surface Pro 7 Laptop with Type Cover",
    "price": "38900",
    "stock": "5",
    "cate": "Computer",
    "pic": "http://it2.sut.ac.th/labexample/pics/surface.jpg"
  },
  {
    "id": "4",
    "name": "Desktop PC DELL Optiplex 3080SFF-SNS38SF001",
    "price": "14400",
    "stock": "3",
    "cate": "Computer",
    "pic": "http://it2.sut.ac.th/labexample/pics/dell.jpg"
  },
  {
    "id": "5",
    "name": "ซัมซุง ตู้เย็น 2 ประตู รุ่น RT20HAR1DSA/ST ขนาด 7.4 คิว",
    "price": "6990",
    "stock": "10",
    "cate": "เครื่องใช้ไฟฟ้า",
    "pic": "http://it2.sut.ac.th/labexample/pics/fridge.jpg"
  }
];

export default function JuniaCart() {
  return (
    <View style={styles.container}>
      {DATA.map((props) => (
        <View key={props.id} style={styles.product}>
          <View style={styles.imageContainer}>
          <Image source={{ uri: props.pic }} style={styles.image} />
          </View>
          <Text style={styles.productName}>{props.name}</Text>
          <Text style={styles.productstock}>จำนวนคงเหลือ{props.stock}</Text>
          <Text style={styles.productPrice}>${props.price}</Text>
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  product: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    padding: 10,
    
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
  productstock: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray',
  },
  imageContainer: {
    alignItems: 'center', // จัดให้อยู่ตรงกลางแนวตั้ง
  },
});
