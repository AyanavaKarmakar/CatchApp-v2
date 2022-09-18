import { ListItem, Avatar } from '@rneui/themed'
import { collection, doc, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { ImageSourcePropType, StyleSheet } from 'react-native'
import { db } from '../Firebase'

interface Props {
  id: string
  chatName: string
  onEnterChat: (id: string, chatName: string) => void
}

export const CustomListItem = (props: Props) => {
  const { id, chatName, onEnterChat } = props

  const [chatMessages, setChatMessages] = useState<DocumentData[]>()

  const placeholderAvatar =
    'https://user-images.githubusercontent.com/89210438/190708630-526de943-f158-4f24-809b-279c58ea70fe.png'

  useEffect(() => {
    const docRef = doc(db, 'chats', id)
    const colRef = collection(docRef, 'messages')
    const q = query(colRef, orderBy('timestamp', 'desc'))
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      setChatMessages(querySnapshot.docs.map((doc) => doc.data()))
    })

    return unSubscribe
  }, [])

  return (
    <ListItem key={id} containerStyle={styles.container} onPress={() => onEnterChat(id, chatName)}>
      <Avatar
        rounded
        source={
          {
            uri: chatMessages?.[0]?.photoURL || placeholderAvatar,
          } as ImageSourcePropType
        }
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle} numberOfLines={1} ellipsizeMode='tail'>
          {chatMessages?.[0]?.displayName}
          {chatMessages?.[0]?.message !== undefined && ': '}
          {chatMessages?.[0]?.message === undefined && 'No new messages to display...'}
          {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F0014',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    borderRadius: 10,
    borderColor: '#E0FFFF',
    borderWidth: 1,
  },
  title: { fontWeight: '800', color: '#E0FFFF' },
  subtitle: { color: 'white' },
})
