import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import AnimeDetailScreen from '../screens/AnimeDetailScreen';
import DrawerNavigator from './DrawerNavigator';

export type StackNavigation = StackNavigationProp<RootStackParamList>

export type RootStackParamList = {
  Main: undefined,
  AnimeDetail: { malId: number, title: string } | undefined,
}

const Stack = createStackNavigator<RootStackParamList>()

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AnimeDetail"
        component={AnimeDetailScreen}
        options={({ route }) => ({
          title: route.params?.title,
          gestureEnabled: true,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
}
