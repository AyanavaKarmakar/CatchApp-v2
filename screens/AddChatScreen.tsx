import { useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, StyleSheet } from 'react-native'
import { NativeRootStackParamList } from '../App'
import { Button, Icon, Input } from '@rneui/themed'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../Firebase'
/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'ADDCHAT'>

export const AddChatScreen = (props: Props) => {
  const { navigation } = props
  const [input, setInput] = useState<string>()

  /**
   * @see https://reactnavigation.org/docs/navigation-prop#setoptions
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ADD NEW CHAT',
      headerStyle: { backgroundColor: '#000000' },
      headerTitleStyle: { color: '#E0FFFF' },
      headerTitleAlign: 'center',
    })
  }, [navigation])

  /**
   * @see https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
   * @see https://console.firebase.google.com/u/2/project/signal-clone-af25b/firestore/rules
   */
  const handleCreateChat = async () => {
    await addDoc(collection(db, 'chats'), {
      chatName: input,
    })
      .then(() => {
        navigation.goBack()
      })
      .catch((error: { code: number; message: string }) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(`${errorCode} + ${errorMessage}`)
      })
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a new chat name'
        onChangeText={(text) => setInput(text)}
        leftIcon={<Icon name='wechat' type='antdesign' size={24} color='black' />}
      />
      <Button onPress={handleCreateChat} title='Create new chat' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})
