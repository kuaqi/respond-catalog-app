import { createDrawerNavigator } from '@react-navigation/drawer';
import CatalogueScreen from '../screens/CatalogueScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator()
  
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Catalogue"
        component={CatalogueScreen}
        options={{
          headerShown: true,
          headerTitle: () => null,
        }}
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
