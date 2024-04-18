import React, { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { getAnimeSearch } from '../api/JikanAPI';
import { Anime } from '../types';

export default function CatalogueScreen() {
  const [status, setStatus] = useState<'airing' | 'complete' | 'upcoming'>('airing')
  const animeQuery = useQuery({ queryKey: ['anime'], queryFn: () => getAnimeSearch(status) })
  const keyExtractor = useCallback((item: Anime) => `${item.mal_id.toString()}`, [])

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

  const onImagePress = useCallback((item: Anime) => {
    console.log(item.title + ' selected.')
  }, [])

  return (
    <View style={styles.container}>
      {animeQuery.status === 'pending' && <ActivityIndicator size={"large"} />}
      {animeQuery.status === 'error' && <Text>{JSON.stringify(animeQuery.error)}</Text>}
      <FlatList
        data={animeQuery.data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
      />
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
