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
} from 'react-native'
import { NativeRootStackParamList } from '../App'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'CHAT'>

export const ChatScreen = (props: Props) => {
  const { navigation, route } = props
  const { chatName } = route.params

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

  const sendMessage = () => {
    return
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.viewContainer}
        keyboardVerticalOffset={135}
      >
        <>
          <ScrollView>{/* Chat goes here */}</ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder={`[${chatName}] Start Typing... `}
              onChangeText={(text) => setInput(text)}
              value={input}
              style={styles.textInput}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <Ionicons name='send' size={24} color='black' />
            </TouchableOpacity>
          </View>
        </>
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
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    borderWidth: 1,
    padding: 10,
    color: 'grey',
    borderRadius: 30,
    textAlign: 'center',
  },
})
