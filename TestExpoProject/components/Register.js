import { StyleSheet, View, Text, ScrollView, Image, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../Firestore"; // ระบุตำแหน่งของ Firebase.js ที่คุณบันทึกไว้
import { getFirestore, collection, doc, setDoc } from '@firebase/firestore';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const imageURL = 'https://w7.pngwing.com/pngs/112/858/png-transparent-computer-icons-icon-design-user-register-button-heroes-rectangle-logo.png';
    const auth = getAuth(); // Get Firebase Authentication instance

    async function Userregister() {
        try {
            //console.log('Email:', email);
            //console.log('Username:', name);
            //console.log(db);
    
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // เพิ่ม username ลงใน Firestore
            const userDocRef = doc(collection(db, 'users'), user.uid);
            await setDoc(userDocRef, {
                username: name,
            });
    
            alert('สร้างบัญชีผู้ใช้สำเร็จ');
        } catch (error) {
            alert('ชื่ออีเมลนี้ใช้ไม่ได้ กรุณาเปลี่ยนชื่ออีเมล');
        }
    }
    return (
        <View style={styles.bg}>
            <View >
                <Image source={{ uri: imageURL }} style={styles.image} />
            </View>
            <View style={{ marginTop: 50 }}>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Register</Text>
                <TextInput style={styles.textbox}
                    placeholder="UserName"
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <TextInput
                    style={styles.textbox}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.textbox}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonview}>
                <Button title='Register' onPress={() => { Userregister(); }} color="#90A4AE" />
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