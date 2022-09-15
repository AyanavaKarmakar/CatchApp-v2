import { ListItem, Avatar } from '@rneui/themed'

export const CustomListItem = () => {
  // const { id, chatName, enterChat } = props

  const placeholderAvatar =
    'https://ayanava-karmakar.imgix.net/https%3A%2F%2Fraw.githubusercontent.com%2FAyanavaKarmakar%2Fimgix-source-assets%2Fmain%2FsiteIcon.png?s=b56a16a7886aaf99f639de88c3fcdc0b'
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: placeholderAvatar,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>Admin Chat</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          This is the chat for admins
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}
