import { useLayoutEffect } from 'react'
import { ImageSourcePropType, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { NativeRootStackParamList } from '../App'
import { CustomListItem } from '../components'
import { Avatar } from '@rneui/themed'
import { auth } from '../Firebase'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'HOME'>

export const HomeScreen = (props: Props) => {
  const { navigation } = props

  const handleAddChat = () => {
    navigation.navigate('ADDCHAT')
  }

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace('LOGIN')
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'CHATS',
      headerStyle: { backgroundColor: '#000000' },
      headerTitleStyle: { color: '#E0FFFF' },
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL } as ImageSourcePropType} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 70,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={26} color='#E0FFFF' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons name='plus' size={26} onPress={handleAddChat} color='#E0FFFF' />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}
