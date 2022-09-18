import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { NativeRootStackParamList } from '../App'
import { auth } from '../Firebase'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'HOME'>

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

  return (
    <View>
      <Text>Edit Profile Screen</Text>
    </View>
  )
}
