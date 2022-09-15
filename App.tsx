import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, LoginScreen, RegisterScreen } from './screens'

/**
 * @see https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
 */
export type NativeRootStackParamList = {
  LOGIN: undefined
  REGISTER: undefined
  HOME: undefined
}

/**
 * @see https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator
 */
const Stack = createNativeStackNavigator<NativeRootStackParamList>()

const globalScreenOptions = {
  headerTitleStyle: { color: 'white' },
  headerStyle: { backgroundColor: 'secondary' },
  headerTintColor: 'white',
}

/**
 * @see https://reactnavigation.org/docs/getting-started/#wrapping-your-app-in-navigationcontainer
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name='LOGIN' component={LoginScreen} />
        <Stack.Screen name='REGISTER' component={RegisterScreen} />
        <Stack.Screen name='HOME' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
