import { ListItem, Avatar } from '@rneui/themed'
import { StyleSheet } from 'react-native'

interface Props {
  id: string
  chatName: string
  onEnterChat: (id: string, chatName: string) => void
}

export const CustomListItem = (props: Props) => {
  const { id, chatName, onEnterChat } = props

  const placeholderAvatar =
    'https://user-images.githubusercontent.com/89210438/190708630-526de943-f158-4f24-809b-279c58ea70fe.png'

  return (
    <ListItem containerStyle={styles.container} onPress={() => onEnterChat(id, chatName)} key={id}>
      <Avatar
        rounded
        source={{
          uri: placeholderAvatar,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle} numberOfLines={1} ellipsizeMode='tail'>
          This is the chat for admins
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
