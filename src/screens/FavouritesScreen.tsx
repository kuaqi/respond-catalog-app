import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigation } from '../navigation/MainNavigator';
import { View, Text, FlatList, StyleSheet, Image, ListRenderItem, Pressable } from 'react-native';
import { Anime } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function FavouriteScreen() {
  const navigation = useNavigation<StackNavigation>()
  const favourites = useSelector((state: RootState) => state.favourites.items)
  const keyExtractor = useCallback((item: Anime) => `${item.mal_id.toString()}`, [])

  const onImagePress = useCallback((item: Anime) => {
    navigation.navigate('AnimeDetail', {
      malId: item.mal_id,
      title: item.title,
    })
  }, [])

  const renderItem: ListRenderItem<Anime> = useCallback(({ item, index }) => (
    <Pressable
      onPress={() => onImagePress(item)}
      style={[
        styles.itemContainer,
        index % 2 === 0 ? { marginRight: 4 } : { marginLeft: 4 },
      ]}>
      <Image
        source={{ uri: item.images.jpg.image_url }}
        style={styles.animeImage}
      />
      <Text style={styles.animeTitleText}>{item.title}</Text>
      <Text style={styles.animeDescText}>{item.score}</Text>
      <Text style={styles.animeDescText}>{item.year}</Text>
      <Text style={styles.animeDescText}>{item.rating}</Text>
      <View style={{ height: 18 }} />
    </Pressable>
  ), [])

  return (
    <View style={styles.container}>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <View style={{ height: 54 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    flexGrow: 1,
    padding: 8,
  },
  itemContainer: {
    flex: 0.5,
  },
  animeImage: {
    borderRadius: 5,
    aspectRatio: 3 / 5,
  },
  animeTitleText: {
    fontWeight: 'bold',
  },
  animeDescText: {
    fontSize: 12,
  },
})
