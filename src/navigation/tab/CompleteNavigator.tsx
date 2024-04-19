import { createStackNavigator } from '@react-navigation/stack';
import CompleteDrawerNavigator from '../drawer/CompleteDrawerNavigator';

const CompleteStack = createStackNavigator()

export default function CompleteNavigator() {
  return (
    <CompleteStack.Navigator>
      <CompleteStack.Screen 
        name="CompleteStack"
        component={CompleteDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </CompleteStack.Navigator>
  );
}
