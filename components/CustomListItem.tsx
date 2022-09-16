import { ListItem, Avatar } from '@rneui/themed'

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
    <ListItem onPress={() => onEnterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: placeholderAvatar,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          This is the chat for admins
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}
