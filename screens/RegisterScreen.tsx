import { useState, useLayoutEffect } from 'react'
import { Input, Button, Text } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import { NativeRootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/**
 * Refer = https://reactnavigation.org/docs/typescript/#type-checking-screens
 */
type Props = NativeStackScreenProps<NativeRootStackParamList, 'REGISTER'>

export const RegisterScreen = (props: Props) => {
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [imageUrl, setImageUrl] = useState<string>()
  const [newPassword, setNewPassword] = useState<string>()
  const { navigation } = props

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
    })
  }, [navigation])

  const handleLogin = () => {
    navigation.navigate('LOGIN')
  }

  const handleSubmit = () => {
    return
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h1 style={{ textAlign: 'center', width: 300, color: '#E0FFFF', marginBottom: 50 }}>
        REGISTER ACCOUNT
      </Text>
      <View style={styles.inputContainer}>
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Full Name'
          textContentType='name'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Email Address'
          textContentType='emailAddress'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='Profile Picture URL'
          textContentType='URL'
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />
        <Input
          inputStyle={{ color: '#E0FFFF' }}
          placeholder='New Password'
          textContentType='newPassword'
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry
          onSubmitEditing={handleSubmit}
        />
      </View>
      <Button type='clear' containerStyle={styles.button} title='Register' onPress={handleSubmit} />
      <Button type='outline' containerStyle={styles.button} title='Login' onPress={handleLogin} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#1F2022',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
})
