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
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { NativeRootStackParamList } from '../App'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../Firebase'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'CHAT'>

export const ChatScreen = (props: Props) => {
  const { navigation, route } = props
  const { chatName, id } = route.params

  const [input, setInput] = useState<string>()
  // const [messages, setMessages] = useState([])

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
  }, [navigation])

  const sendMessage = async () => {
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
    addDoc(colRef, {
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

  // useLayoutEffect(() => {
  //   const unSubscribe = collection(db, 'chats')
  //     .doc(id)
  //     .collection('messages')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot((snapshot) => {
  //       setMessages({
  //         snapshot.docs.map((doc)=>({
  //           id: doc.id,
  //           data: doc.data()
  //         }))
  //       })
  //     })

  //   return unSubscribe
  // }, [route])

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
            <ScrollView>{/* Chat goes here */}</ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder={`[${chatName}] Start Typing... `}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
                value={input}
                style={styles.textInput}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name='send' size={24} color='black' />
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
    backgroundColor: 'white',
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
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
    textAlign: 'center',
  },
})
