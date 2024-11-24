import { StyleSheet, View, Text, ScrollView, Image, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../Firestore"; // ระบุตำแหน่งของ Firebase.js ที่คุณบันทึกไว้
import { getFirestore, collection, doc, setDoc } from '@firebase/firestore';


export default function Forgot({ navigation }) {
    const [email, setEmail] = useState('');
    const imageURL = 'https://p1.hiclipart.com/preview/795/919/824/google-logo-gmail-email-email-client-yahoo-mail-inbox-by-gmail-email-box-mailbox-provider-png-clipart.jpg';
    
    const auth = getAuth(); // Get Firebase Authentication instance

    async function Forgotpassword() {
      try {
        await sendPasswordResetEmail(auth, email);
        alert('ส่งคำขอสำเร็จ');
      } catch (error) {
        alert(error);
      }
    }
  
    
    
    return (
        <View style={styles.bg}>
            <View >
                <Image source={{ uri: imageURL }} style={styles.image} />
            </View>
            <View style={{ marginTop: 50 }}>
            <Text style={{color:'white',alignSelf:'center',fontSize:20}}>Forgot Password</Text>
                <TextInput style={styles.textbox}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
            </View>
            <View style={styles.buttonview}>
                <Button title='Reset Password' onPress={() => { Forgotpassword(); }} color="#90A4AE" />
            </View>
            <View style={styles.buttonview}>
                <Button title='Back' onPress={() => navigation.goBack()} color="#90A4AE" />
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
    }, buttonview: {
        alignSelf: 'center',  // ทำให้ตรงกลางแนวแกนตั้ง
        marginTop: 30,
        width: 200
    }, image: {
        width: 200,
        height: 200,
        resizeMode: 'cover', // ปรับขนาดรูปภาพตามต้องการ
    }, image: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50,
        width: 200,
        height: 200,
        resizeMode: 'cover', // ปรับขนาดรูปภาพตามต้องการ
    },
});