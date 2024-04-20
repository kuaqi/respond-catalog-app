import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import AiringNavigator from './AiringNavigator';
import CompleteNavigator from './CompleteNavigator';
import UpcomingNavigator from './UpcomingNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabName = {
  AIRING: 'Airing',
  COMPLETE: 'Complete',
  UPCOMING: 'Upcoming',
}

const Tab = createBottomTabNavigator()

export default function TabNavigator() {

  function renderAiringIcon(focus: boolean, color: string, size: number) {
    return (<Ionicons name='radio-outline' size={20} />);
  }

  function renderCompleteIcon(focus: boolean, color: string, size: number) {
    return (<Ionicons name='checkmark-done-outline' size={20} />);
  }

  function renderUpcomingIcon(focus: boolean, color: string, size: number) {
    return (<Ionicons name='calendar-outline' size={20} />);
  }

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
          tabBarIcon: ({ focused, color, size }) => renderAiringIcon(focused, color, size)
        }}
      />
      <Tab.Screen
        name="CompleteTab"
        component={CompleteNavigator}
        options={{
          headerShown: false,
          title: TabName.COMPLETE,
          tabBarIcon: ({ focused, color, size }) => renderCompleteIcon(focused, color, size)
        }}
      />
      <Tab.Screen
        name="UpcomingTab"
        component={UpcomingNavigator}
        options={{
          headerShown: false,
          title: TabName.UPCOMING,
          tabBarIcon: ({ focused, color, size }) => renderUpcomingIcon(focused, color, size)
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
