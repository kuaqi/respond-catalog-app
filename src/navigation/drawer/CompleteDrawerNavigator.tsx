import { createDrawerNavigator } from '@react-navigation/drawer';
import CatalogueScreen from '../../screens/CatalogueScreen';
import FavouritesScreen from '../../screens/FavouritesScreen';

const Drawer = createDrawerNavigator()

export default function CompleteDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Complete"
        component={CatalogueScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ broadcast_status: 'complete' }}
      />
      <Drawer.Screen 
        name="Favourites"
        component={FavouritesScreen}
        options={{
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
}
