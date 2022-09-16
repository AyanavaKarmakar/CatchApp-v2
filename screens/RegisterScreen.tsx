import { useState, useLayoutEffect } from 'react'
import { Input, Button, Text } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { NativeRootStackParamList } from '../App'
import { auth } from '../Firebase.js'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'REGISTER'>

export const RegisterScreen = (props: Props) => {
  const { navigation } = props

  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [imageUrl, setImageUrl] = useState<string>()
  const [newPassword, setNewPassword] = useState<string>()

  const placeholderDisplayName = 'user0'
  const placeholderImageUrl =
    'https://ayanava-karmakar.imgix.net/https%3A%2F%2Fraw.githubusercontent.com%2FAyanavaKarmakar%2Fimgix-source-assets%2Fmain%2FsiteIcon.png?s=b56a16a7886aaf99f639de88c3fcdc0b'

  /**
   * @see https://reactnavigation.org/docs/navigation-prop#setoptions
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
    })
  }, [navigation])

  const handleLogin = () => {
    navigation.navigate('LOGIN')
  }

  const handleSubmit = () => {
    if (email !== undefined && newPassword !== undefined) {
      /**
       * @seee https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
       */
      createUserWithEmailAndPassword(auth, email, newPassword)
        .then(() => {
          // console.log('Signed In!')
          // const user = userCredential.user
          if (auth.currentUser !== null) {
            /**
             * @see https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
             */
            updateProfile(auth.currentUser, {
              displayName: name || placeholderDisplayName,
              photoURL: imageUrl || placeholderImageUrl,
            })
              .then(() => {
                // console.log(auth.currentUser)
              })
              .catch((error: { code: number; message: string }) => {
                const errorCode = error.code
                const errorMessage = error.message
                alert(`${errorCode} + ${errorMessage}`)
              })
          }
        })
        .catch((error: { code: number; message: string }) => {
          const errorCode = error.code
          const errorMessage = error.message
          alert(`${errorCode} + ${errorMessage}`)
        })
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h1 style={{ textAlign: 'center', width: 300, color: '#E0FFFF', marginBottom: 50 }}>
        REGISTER ACCOUNT
      </Text>
      <View style={styles.inputContainer}>
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Full Name'
          textContentType='name'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Email Address'
          textContentType='emailAddress'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='(OPTIONAL) Profile Picture URL'
          textContentType='URL'
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='New Password'
          textContentType='newPassword'
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry
          onSubmitEditing={handleSubmit}
        />
      </View>
      <Button type='clear' containerStyle={styles.button} title='Register' onPress={handleSubmit} />
      <Button type='outline' containerStyle={styles.button} title='Login' onPress={handleLogin} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#1F2022',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
})
