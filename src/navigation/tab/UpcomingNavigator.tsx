import { createStackNavigator } from '@react-navigation/stack';
import UpcomingDrawerNavigator from '../drawer/UpcomingDrawerNavigator';

const UpcomingStack = createStackNavigator()

export default function UpcomingNavigator() {
  return (
    <UpcomingStack.Navigator>
      <UpcomingStack.Screen 
        name="UpcomingStack"
        component={UpcomingDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </UpcomingStack.Navigator>
  );
}
