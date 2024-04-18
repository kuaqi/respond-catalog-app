import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import CatalogueScreen from '../screens/CatalogueScreen';

export type StackNavigation = StackNavigationProp<RootStackParamList>

export type RootStackParamList = {
  Main: undefined,
}

const Stack = createStackNavigator<RootStackParamList>()

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={CatalogueScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
