import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from './screens'

/**
 * Refer = https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator
 */
const Stack = createNativeStackNavigator()

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C6BEF' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
}

/**
 * Refer = https://reactnavigation.org/docs/getting-started/#wrapping-your-app-in-navigationcontainer
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
