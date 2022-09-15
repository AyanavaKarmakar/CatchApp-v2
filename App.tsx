import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, RegisterScreen } from './screens'

/**
 * Refer = https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
 */
export type NativeRootStackParamList = {
  Login: undefined
  Register: undefined
}

/**
 * Refer = https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator
 */
const Stack = createNativeStackNavigator<NativeRootStackParamList>()

const globalScreenOptions = {
  headerTitleStyle: { color: 'white' },
  headerStyle: { backgroundColor: 'secondary' },
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
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
