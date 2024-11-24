import { StyleSheet, View, Text, ScrollView, Image, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
    const imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  return (
    <View style={styles.bg}>
        <View style={styles.container}>
        <Image source={{ uri: imageURL }} style={styles.image} />
        </View>
        <View style={{marginBottom:40}}>
        <Text style={styles.Text1}>Yourname</Text>
        </View>
      <View style={styles.buttonview}>
        <Button title='Change ProfilePicture' onPress={() => (null)} color="#90A4AE" />
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
    marginBottom:250,
    width:300
  }, container: {
    flex: 1,
    marginTop:100,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover', // ปรับขนาดรูปภาพตามต้องการ
  },Text1:{
    fontSize:24,
    marginLeft:20
  }
});