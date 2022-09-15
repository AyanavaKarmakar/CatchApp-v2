import { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'
import { Input, Image, Button } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleSignIn = () => {
    return
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
          placeholder='Email'
          textContentType='emailAddress'
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoFocus
        />
        <Input
          placeholder='Password'
          textContentType='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <Button
        color='secondary'
        containerStyle={styles.button}
        onPress={handleSignIn}
        title='Login'
      />
      <Button containerStyle={styles.button} title='Register' type='outline' />
      <View style={{ height: 50 }} />
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
})
