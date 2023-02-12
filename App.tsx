import { Button, StyleSheet, View } from 'react-native';
import {
  getAuth,
  FacebookAuthProvider,
  signInWithCredential,
} from 'firebase/auth'
import {AccessToken, LoginManager} from "react-native-fbsdk-next";
import app from "./firebaseSetup";

export default function App() {
  const SignInWithFB = async () => {
    console.log("HERE");
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
    console.log("RESULT", result);
    if (result?.isCancelled) {
      throw new Error("User cancelled login");
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error("Something went wrong obtaining access token");
    }
    const credential = FacebookAuthProvider.credential(data.accessToken);
    const auth = getAuth(app)
    const user = await signInWithCredential(auth, credential);
    console.log(user);
  }
  return (
    <View style={styles.container}>
      <Button title={"Sign in with Facebook"} onPress={SignInWithFB} />
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
