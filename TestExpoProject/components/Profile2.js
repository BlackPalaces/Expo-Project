import { StyleSheet, View, Text, Image, Button, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, getDocs, collection, query, where, onSnapshot } from '@firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes } from '@firebase/storage';
import { CommonActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function Profile2({ navigation }) {
  const imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const auth = getAuth();
  const firestore = getFirestore();
  const storage = getStorage();
  const [cuser, setCuser] = useState(null);
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCuser(user);

          try {
            const userDocRef = doc(firestore, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              setName(userDocSnap.data().username);
            }

            const storageRef = ref(storage, `${user.uid}.jpg`);
            const imageUrl = await getDownloadURL(storageRef);
            setProfileImage(imageUrl);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      });
    };

    checkLogin();
  }, [auth, firestore, storage]);

  useEffect(() => {
    const askPermissions = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'You need to grant permission to access the media library.');
        }
      }
    };

    askPermissions();
  }, []);

  const Logout = async () => {
    try {
      await signOut(auth);
      // นำนี้เพิ่มเข้ามา
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginTab' }],
        })
      );
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const UploadPic = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'You need to grant permission to access the media library.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        const selectedImageUri = result.assets[0].uri;
        const response = await fetch(selectedImageUri);
        const blob = await response.blob();

        const storageRef = ref(storage, `${cuser.uid}.jpg`);
        await uploadBytes(storageRef, blob);

        const imageUrl = await getDownloadURL(storageRef);
        setProfileImage(imageUrl);

        Alert.alert('uploaded!!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };


  return (
    <View style={styles.bg}>
      <View style={styles.container}>
        <Image source={profileImage ? { uri: profileImage } : { uri: imageURL }} style={styles.image} />
      </View>
      <View style={styles.buttonview}>
        <Text style={styles.Text1}>{name}</Text>
        <View style={{ marginBottom: 20 }}>
          <Button title='Change ProfilePicture' onPress={() => UploadPic()} color="#90A4AE" style={{ marginTop: 20 }} />
        </View>
        <Button title='Logout' onPress={() => Logout()} color="#90A4AE" style={{ marginTop: 20 }} />
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
    width: 300
  }, container: {
    marginTop: 100,
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    resizeMode: 'cover', // ปรับขนาดรูปภาพตามต้องการ
  }, Text1: {
    alignSelf: 'center',
    fontSize: 24,
    marginTop: 20,
    marginLeft: 0,
    marginBottom: 20,
    color:'white'
  }
});