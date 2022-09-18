import { useState, useLayoutEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, Button, Input } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { NativeRootStackParamList } from '../App'
import { auth } from '../Firebase'
import { updatePassword, updateProfile } from 'firebase/auth'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'EDITPROFILE'>

export const EditProfileScreen = (props: Props) => {
  const { navigation } = props

  const [newDisplayName, setNewDisplayName] = useState<string | null | undefined>(
    auth.currentUser?.displayName,
  )
  const [newDisplayImageURL, setNewDisplayImageURL] = useState<string | null | undefined>(
    auth.currentUser?.photoURL,
  )
  const [newPassword, setNewPassword] = useState<string>()

  /**
   * @see https://reactnavigation.org/docs/navigation-prop#setoptions
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${auth.currentUser?.displayName}`,
      headerStyle: { backgroundColor: '#000000' },
      headerTitleStyle: { color: '#E0FFFF' },
      headerTitleAlign: 'center',
    })
  }, [navigation])

  /**
   * @see https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signout
   */
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace('LOGIN')
    })
  }

  /**
   * Updates user cedentials and goes back to previous screen
   */
  const handleProfileUpdate = async () => {
    const user = auth.currentUser
    if (user !== null && user !== undefined) {
      try {
        await updateProfile(user, { displayName: newDisplayName, photoURL: newDisplayImageURL })
        alert('Credentails Updated!')
        navigation.goBack()
      } catch (error) {
        alert(error)
      }
    }
  }

  /**
   * @see https://stackoverflow.com/a/53981399/18893631
   * Updates user's password and goes back to previous screen
   */
  const handlePasswordUpdate = async () => {
    const user = auth.currentUser
    if (
      user !== null &&
      user !== undefined &&
      newPassword !== null &&
      newPassword !== undefined &&
      newPassword !== '' &&
      newPassword !== ' '
    ) {
      try {
        await updatePassword(user, newPassword)
        alert('Password Updated!')
        navigation.goBack()
      } catch (error) {
        alert(error)
      }
    }
    setNewPassword('')
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h1 style={{ marginBottom: 200, textAlign: 'center', width: 300, color: '#E0FFFF' }}>
        UPDATE PROFILE
      </Text>
      <View style={styles.inputContainer}>
        <Input
          inputStyle={{ color: '#E0FFFF', textAlign: 'center', fontSize: 25 }}
          placeholder='Edit Display Name'
          placeholderTextColor='#E0FFFF'
          textContentType='name'
          value={newDisplayName ? newDisplayName : ''}
          onChangeText={(text) => setNewDisplayName(text)}
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Edit Display Image URL'
          placeholderTextColor='#E0FFFF'
          textContentType='URL'
          value={newDisplayImageURL ? newDisplayImageURL : ''}
          onChangeText={(text) => setNewDisplayImageURL(text)}
          onSubmitEditing={handleProfileUpdate}
        />
        <Input
          inputStyle={{ color: '#EOFFFF', backgroundColor: 'darkgrey', textAlign: 'center' }}
          placeholder='Set New Password'
          placeholderTextColor='#E0FFFF'
          textContentType='password'
          value={newPassword ? newPassword : ''}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry
        />
      </View>
      <Button
        disabled={!newDisplayName || !newDisplayImageURL}
        containerStyle={styles.button}
        type='outline'
        onPress={handleProfileUpdate}
      >
        Update Profile
      </Button>
      <Button
        color='warning'
        disabled={!newPassword}
        containerStyle={styles.button}
        onPress={handlePasswordUpdate}
      >
        Update Password
      </Button>
      <Button containerStyle={styles.button} color='error' onPress={handleLogout}>
        Log Out
      </Button>
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
    marginTop: 15,
  },
})
