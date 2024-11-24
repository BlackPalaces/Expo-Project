import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';




export default function ProductAPI() {
    const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://it2.sut.ac.th/labexample/product.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        if (Array.isArray(json.products)) { // ตรวจสอบว่า json.products เป็นอาร์เรย์หรือไม่
          setData(json.products);
        } else {
          console.error('Invalid data format:', json);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.id} style={styles.product}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.pic }} style={styles.image} />
          </View>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.productStock}>จำนวนคงเหลือ {item.stock}</Text>
          <Text style={styles.productPrice}>Price: ${item.price}</Text>
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
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
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
});
