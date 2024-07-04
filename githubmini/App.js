import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
// index.js or App.js
import 'react-native-gesture-handler';

// import { ClerkProvider } from '@clerk/clerk-expo';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
// import { ClerkProvider } from "@clerk/clerk-expo";
// import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './App/Navigations/TabNavigation';
import { useFonts } from 'expo-font';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <ClerkProvider publishableKey='pk_test_ZW5hYmxlZC1zdGFsbGlvbi00OC5jbGVyay5hY2NvdW50cy5kZXYk'>
    <View style={styles.container}>
      
      <SignedIn>
       <NavigationContainer>
        <TabNavigation/>
       </NavigationContainer>

      </SignedIn>
        <SignedOut>
          <Login/>
        </SignedOut>
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:20
  },
});
