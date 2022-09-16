import { useEffect, useLayoutEffect, useState } from 'react'
import { ImageSourcePropType, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { NativeRootStackParamList } from '../App'
import { CustomListItem } from '../components'
import { Avatar } from '@rneui/themed'
import { auth, db } from '../Firebase'
import { doc, DocumentData, onSnapshot } from 'firebase/firestore'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'HOME'>

interface Snapshot {
  id: string
  data: DocumentData
}

export const HomeScreen = (props: Props) => {
  const { navigation } = props

  const [chats, setChats] = useState<Snapshot[]>()

  const handleAddChat = () => {
    navigation.navigate('ADDCHAT')
  }

  /**
   * @see https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signout
   */
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace('LOGIN')
    })
  }

  /**
   * @see https://reactnavigation.org/docs/navigation-prop#setoptions
   */
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

  /**
   * @see https://firebase.google.com/docs/firestore/query-data/listen
   */
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'chats'), (doc) => {
      setChats([
        ...(chats || []),
        {
          id: doc.id,
          data: doc.data,
        },
      ])
    })

    return unsubscribe
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}
