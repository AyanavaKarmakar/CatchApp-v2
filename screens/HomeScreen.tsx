import { useEffect, useLayoutEffect, useState } from 'react'
import {
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Linking,
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

  const handleProfileEdit = () => {
    navigation.navigate('EDITPROFILE')
  }

  // /**
  //  * @see https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signout
  //  */
  // const signOut = () => {
  //   auth.signOut().then(() => {
  //     navigation.replace('LOGIN')
  //   })
  // }

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
          <TouchableOpacity activeOpacity={0.5} onPress={handleProfileEdit}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL } as ImageSourcePropType} />
          </TouchableOpacity>
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

  const onEnterChat = (id: string, chatName: string) => {
    navigation.navigate('CHAT', {
      id: id,
      chatName: chatName,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerBackground}>
        {chats?.map((chat: Chats) => (
          <CustomListItem
            key={chat.id}
            id={chat.id}
            chatName={chat.chatName}
            onEnterChat={onEnterChat}
          />
        ))}
      </ScrollView>
      <Text style={{ ...styles.footer, color: 'hotpink' }}>
        Currently logged in as [ [ {auth.currentUser?.displayName} ] [{' '}
        {new Date().toLocaleDateString()} ] ]
      </Text>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerBackground: {
    backgroundColor: '#1F2022',
  },
  footer: {
    textAlign: 'center',
    backgroundColor: '#000000',
    color: '#E0FFFF',
    paddingBottom: 5,
    paddingTop: 5,
  },
})
