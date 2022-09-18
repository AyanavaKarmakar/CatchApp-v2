import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button } from '@rneui/themed'
import { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { NativeRootStackParamList } from '../App'
import { auth } from '../Firebase'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'EDITPROFILE'>

export const EditProfileScreen = (props: Props) => {
  const { navigation } = props

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

  return (
    <View>
      <Text>Edit Profile Screen</Text>
      <Button color='error' onPress={handleLogout}>
        Log Out
      </Button>
    </View>
  )
}
