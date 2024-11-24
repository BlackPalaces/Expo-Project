
import { StyleSheet, Text, View, SafeAreaView, SectionList, ScrollView } from "react-native";
import Login from "./components/Login";
import ProductAPIALL from "./components/Productapiall";
import ProductAPIALL2 from "./components/Productapiall2";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./components/Register";
import Forgot from "./components/Forgot";
import Cart from "./components/Cart";
import Cart2 from "./components/Cart2";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from "./components/Profile";
import Profile2 from "./components/Profile2";
import Productapi from "./components/Productapi";
import ProductCard2 from "./components/ProductCard2";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoginTab() {
  return (
    <Stack.Navigator >
       <Stack.Screen name="Productapi" component={Productapi} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="LoginTab" component={LoginTab} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTab" component={Carttab} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTab2" component={Carttab2} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}

function Carttab() {
  return (
    <Tab.Navigator screenOptions={{ activeTintColor: '#e91e63', }}>
      <Tab.Screen name="Home" component={ProductAPIALL} options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Cart" component={Cart} options={{
        headerShown: false,
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cart" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
}

function Carttab2() {
  return (
    <Tab.Navigator screenOptions={{ activeTintColor: '#e91e63', }}>
      <Tab.Screen name="Home2" component={ProductCard2} options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Cart2" component={Cart2} options={{
        headerShown: false,
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cart" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Profile2" component={Profile2} options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCD4',
  },
});

/*<Stack.Navigator >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
      </Stack.Navigator>*/