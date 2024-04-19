import { createDrawerNavigator } from '@react-navigation/drawer';
import CatalogueScreen from '../../screens/CatalogueScreen';
import FavouritesScreen from '../../screens/FavouritesScreen';

const Drawer = createDrawerNavigator()

export default function AiringDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Airing"
        component={CatalogueScreen}
        options={{
          headerShown: true,
        }}
        initialParams={{ broadcast_status: 'airing' }}
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
