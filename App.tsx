import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

/**
 * Refer = https://reactnavigation.org/docs/getting-started/#wrapping-your-app-in-navigationcontainer
 */
export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text>Lets build signal!</Text>
      </View>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
