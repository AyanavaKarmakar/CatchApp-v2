import { useEffect, useLayoutEffect, useState } from 'react'
import {
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SimpleLineIcons } from '@expo/vector-icons'
import { NativeRootStackParamList } from '../App'
import { Avatar } from '@rneui/themed'
import { auth, db } from '../Firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { CustomListItem } from '../components'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'HOME'>

interface Chats {
  id: string
  chatName: string
}

export const HomeScreen = (props: Props) => {
  const { navigation } = props

  const [chats, setChats] = useState<Chats[]>()

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
          <TouchableOpacity activeOpacity={0.5} onPress={signOut} style={{ marginLeft: 6 }}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL } as ImageSourcePropType} />
          </TouchableOpacity>
          <Text style={{ color: '#E0FFFF', fontSize: 12 }}>Log Out</Text>
        </View>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons name='plus' size={26} onPress={handleAddChat} color='#E0FFFF' />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])

  /**
   * @see https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection
   */
  useEffect(() => {
    const q = query(collection(db, 'chats'))
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      setChats(
        querySnapshot.docs.map((doc) => ({
          id: doc.id as string,
          chatName: doc.data().chatName as string,
        })),
      )
    })

    return unSubscribe
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        {chats?.map((chat: Chats) => (
          <CustomListItem key={chat.id} id={chat.id} chatName={chat.chatName} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
