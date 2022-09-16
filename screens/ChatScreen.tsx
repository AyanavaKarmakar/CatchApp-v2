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
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../Firebase'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'CHAT'>

export const ChatScreen = (props: Props) => {
  const { navigation, route } = props
  const { chatName, id } = route.params

  const [input, setInput] = useState<string>()

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
    Keyboard.dismiss()

    // ! NOT WORKING
    await setDoc(doc(db, 'chats', id), {
      message: input,
    }).catch((error: { code: number; message: string }) => {
      const errorCode = error.code
      const errorMessage = error.message
      alert(`${errorCode} + ${errorMessage}`)
    })

    setInput('')
  }

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
