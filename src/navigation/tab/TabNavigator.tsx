import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import AiringNavigator from './AiringNavigator';
import CompleteNavigator from './CompleteNavigator';
import UpcomingNavigator from './UpcomingNavigator';

const TabName = {
  AIRING: 'Airing',
  COMPLETE: 'Complete',
  UPCOMING: 'Upcoming',
}

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIconStyle: {},
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="AiringTab"
        component={AiringNavigator}
        options={{
          headerShown: false,
          title: TabName.AIRING,
        }}
      />
      <Tab.Screen
        name="CompleteTab"
        component={CompleteNavigator}
        options={{
          headerShown: false,
          title: TabName.COMPLETE,
        }}
      />
      <Tab.Screen
        name="UpcomingTab"
        component={UpcomingNavigator}
        options={{
          headerShown: false,
          title: TabName.UPCOMING,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 54,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
    position: 'absolute',
  },
  tabBarLabelStyle: {
    paddingBottom: 5,
    fontSize: 12,
  },
})
