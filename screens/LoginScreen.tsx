import { useLayoutEffect, useState, useEffect } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Dimensions, Text, Linking } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Input, Image, Button } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NativeRootStackParamList } from '../App'
import { auth } from '../Firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'LOGIN'>

export const LoginScreen = (props: Props) => {
  const { navigation } = props

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  useEffect(() => {
    /**
     * @see https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
     */
    const unsubscribeUser = auth.onAuthStateChanged((authUser) => {
      // console.log(authUser)
      if (authUser !== null) {
        navigation.replace('HOME')
      }
    })

    return unsubscribeUser
  }, [])

  /**
   * @see https://reactnavigation.org/docs/navigation-prop#setoptions
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
    })
  }, [navigation])

  /**
   * @see https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
   */
  const handleSignIn = () => {
    if (email !== undefined && password !== undefined) {
      signInWithEmailAndPassword(auth, email, password).catch(
        (error: { code: number; message: string }) => {
          const errorCode = error.code
          const errorMessage = error.message
          alert(`${errorCode} + ${errorMessage}`)
        },
      )
    }
  }

  const handleRegister = () => {
    navigation.navigate('REGISTER')
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={{
          uri: 'https://user-images.githubusercontent.com/89210438/190361956-afa02c63-e1a0-424e-9a1d-8c10125126be.png',
        }}
        style={styles.imageStyles}
      />
      <View style={styles.inputContainer}>
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Email'
          textContentType='emailAddress'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Password'
          textContentType='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          onSubmitEditing={handleSignIn}
        />
      </View>
      <Button type='clear' containerStyle={styles.button} onPress={handleSignIn} title='Login' />
      <Button
        containerStyle={styles.button}
        title='Register'
        type='outline'
        onPress={handleRegister}
      />
      <View style={{ height: 80 }} />
      <Text style={styles.footer}>
        Made with ❤ by
        <Text
          onPress={() => Linking.openURL('https://github.com/AyanavaKarmakar')}
          style={{ color: 'cyan' }}
        >
          {' '}
          &lt;Ayanava Karmakar&gt;
        </Text>{' '}
        &copy; 2022
      </Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: Dimensions.get('window').height,
    backgroundColor: '#1F2022',
  },
  imageStyles: {
    width: 400,
    height: 400,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
  footer: {
    textAlign: 'center',
    backgroundColor: '#1F2022',
    color: '#E0FFFF',
  },
})
