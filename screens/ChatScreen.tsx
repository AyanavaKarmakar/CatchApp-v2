import { useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ImageSourcePropType,
  Linking,
} from 'react-native'
import { NativeRootStackParamList } from '../App'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { auth, db } from '../Firebase'
import { Avatar } from '@rneui/themed'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'CHAT'>

interface Messages {
  id: string
  data: DocumentData
}

export const ChatScreen = (props: Props) => {
  const { navigation, route } = props
  const { chatName, id } = route.params

  const [input, setInput] = useState<string>()
  const [messages, setMessages] = useState<Messages[]>()

  /**
   * @see https://reactnavigation.org/docs/navigation-prop#setoptions
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      title: chatName,
      headerStyle: { backgroundColor: '#000000' },
      headerTitleStyle: { color: '#E0FFFF' },
      headerTitleAlign: 'center',
    })
  }, [navigation, chatName])

  const sendMessage = async () => {
    if (input !== '') {
      /**
       * Removes keyboard
       */
      Keyboard.dismiss()

      /**
       * @see https://firebase.google.com/docs/firestore/manage-data/add-data
       * @see https://stackoverflow.com/a/70551419/18893631
       */
      const docRef = doc(db, 'chats', id)
      const colRef = collection(docRef, 'messages')
      await addDoc(colRef, {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        photoURl: auth.currentUser?.photoURL,
      }).catch((error: { code: number; message: string }) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(`${errorCode} + ${errorMessage}`)
      })

      /**
       * Resets input field
       */
      setInput('')
    }
  }

  /**
   * @see https://firebase.google.com/docs/firestore/query-data/order-limit-data
   */
  useLayoutEffect(() => {
    const docRef = doc(db, 'chats', id)
    const colRef = collection(docRef, 'messages')
    const q = query(colRef, orderBy('timestamp', 'desc'))
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      )
    })

    return unSubscribe
  }, [route])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.viewContainer}
        keyboardVerticalOffset={135}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages?.map((message) =>
                message.data.email === auth.currentUser?.email ? (
                  <View key={message.id} style={styles.receiver}>
                    <Avatar
                      rounded
                      containerStyle={styles.receiverAvatar}
                      size={30}
                      source={{ uri: message.data.photoURL } as ImageSourcePropType}
                    />
                    {message.data.message.startsWith('https://') === true ? (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => Linking.openURL(message.data.message)}
                      >
                        <Text style={{ ...styles.receiverText, color: 'blue' }}>
                          {message.data.message}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.receiverText}>{message.data.message}</Text>
                    )}
                  </View>
                ) : (
                  <View key={message.id} style={styles.sender}>
                    <Avatar
                      rounded
                      containerStyle={styles.senderAvatar}
                      size={30}
                      source={{ uri: message.data.photoURL } as ImageSourcePropType}
                    />
                    <Text style={styles.senderText}>{message.data.message}</Text>
                    <Text style={styles.senderName}>
                      <Text style={{ color: 'cyan' }}>{message.data.displayName}</Text> |{' '}
                      {message.data.timestamp
                        .toDate()
                        .toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
                    </Text>
                  </View>
                ),
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder={`[${chatName}] Start Typing... `}
                placeholderTextColor='#E0FFFF'
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
                value={input}
                style={styles.textInput}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name='send' size={24} color='#E0FFFF' />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2022',
  },
  viewContainer: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    width: '90%',
    marginRight: 15,
    backgroundColor: '#000000',
    padding: 10,
    color: '#E0FFFF',
    borderRadius: 30,
    textAlign: 'center',
  },
  receiver: {
    padding: 15,
    backgroundColor: 'lightgrey',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  receiverText: {
    color: 'black',
    fontWeight: '500',
  },
  receiverAvatar: {
    position: 'absolute',
    bottom: -15,
    right: -5,
  },
  sender: {
    padding: 15,
    backgroundColor: '#006a6a',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 15,
  },
  senderName: {
    paddingRight: 10,
    fontSize: 12,
    color: 'white',
  },
  senderAvatar: {
    position: 'absolute',
    bottom: -15,
    left: -5,
  },
})
