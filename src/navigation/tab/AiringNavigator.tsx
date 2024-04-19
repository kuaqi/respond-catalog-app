import { createStackNavigator } from '@react-navigation/stack';
import AiringDrawerNavigator from '../drawer/AiringDrawerNavigator';

const AiringStack = createStackNavigator()

export default function AiringNavigator() {
  return (
    <AiringStack.Navigator>
      <AiringStack.Screen 
        name="AiringStack"
        component={AiringDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </AiringStack.Navigator>
  );
}
