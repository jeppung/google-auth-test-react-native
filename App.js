import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebase';


WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();


  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '315155757858-lchvbeeiu8660ij79tgcuoiaja8bnipc.apps.googleusercontent.com',
    androidClientId: '917231495190-dqtu6vu1547btrnrvislsmv14b12sou1.apps.googleusercontent.com'
  });

  const getUserData = async () => {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me",{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    })
  }

  const showUserInfo = () => {
    if(userInfo){
      return (
        <View> 
          {/* <Image source={{uri: userInfo.picture}} style={styles.profilePict}/> */}
          <Text>Welcome {userInfo.name}</Text>
          <Text>Welcome {userInfo.email}</Text>
        </View>
      )
    }
  }

  useEffect(() => {
    const test = async () => {
      if(response?.type === 'success'){
        setAccessToken(response.authentication.accessToken);
      }
  
      const credential = GoogleAuthProvider.credential(response.authentication.idToken, response.authentication.accessToken);
  
      await signInWithCredential(auth, credential);
    }
    test();
  }, [response])

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button title={accessToken ? "Get User Data" : "Login"} 
        onPress={accessToken ? getUserData : () => {promptAsync({showInRecents: true})}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
