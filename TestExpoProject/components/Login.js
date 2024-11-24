import { StyleSheet, View, Text, Image, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { db } from "../Firestore"; // ระบุตำแหน่งของ Firebase.js ที่คุณบันทึกไว้
import { CommonActions } from '@react-navigation/native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const imageURL = 'https://w7.pngwing.com/pngs/505/761/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png';

  const auth = getAuth(); // Get Firebase Authentication instance

  async function UserLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('ล็อกอินสำเร็จ');
      navigation.reset({ index: 0, routes: [{ name: 'HomeTab2' }] });
    } catch (error) {
      alert('รหัสผ่านหรือชื่อผู้ใช้ผิด กรุณากรอกใหม่');
    }
  }

  /*useEffect(() => {
    async function CheckLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeTab2' }],
            })
          );
        }
      });
    }
    CheckLogin();
  }, []);*/

  return (
    <View style={styles.bg}>
      <View>
        <Image source={{ uri: imageURL }} style={styles.image} />
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>LOGIN</Text>
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
        <Button title='Login' onPress={() => { UserLogin(); }} color="#90A4AE" />
      </View>
      <View style={styles.buttonview}>
        <Button title='Register' onPress={() => navigation.navigate('Register')} color="#90A4AE" />
      </View>
      <View style={styles.buttonview}>
        <Button title='Forget Password' onPress={() => navigation.navigate('Forgot')} color="#90A4AE" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#2F2E34",
  },
  textbox: {
    backgroundColor: 'white',
    marginTop: 20,
    height: 50,
    width: 300,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonview: {
    alignSelf: 'center',
    marginTop: 30,
    width: 200,
  },
  image: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});
