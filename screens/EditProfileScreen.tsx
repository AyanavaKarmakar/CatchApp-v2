import { useState, useLayoutEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, Button, Input } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { NativeRootStackParamList } from '../App'
import { auth } from '../Firebase'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'EDITPROFILE'>

export const EditProfileScreen = (props: Props) => {
  const { navigation } = props

  const [newDisplayName, setNewDisplayName] = useState<string | null | undefined>(
    auth.currentUser?.displayName,
  )

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

  const handleProfileUpdate = () => {
    return
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h1 style={{ marginBottom: 200, textAlign: 'center', width: 300, color: '#E0FFFF' }}>
        UPDATE PROFILE
      </Text>
      <View style={styles.inputContainer}>
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Edit Display Name'
          textContentType='name'
          value={newDisplayName}
          onChangeText={(text) => setNewDisplayName(text)}
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Edit Display Image URL'
          textContentType='URL'
        />
        <Input
          inputStyle={{ color: '#EOFFFF' }}
          placeholder='(Optional) Set New Password'
          textContentType='password'
          secureTextEntry
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Confirm Old Password'
          textContentType='password'
          secureTextEntry
          onSubmitEditing={handleProfileUpdate}
        />
      </View>
      <Button containerStyle={styles.button} type='outline' onPress={handleProfileUpdate}>
        Update Profile
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
    marginTop: 10,
  },
})
