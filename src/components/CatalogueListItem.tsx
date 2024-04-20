import React, { useCallback } from "react";
import { Pressable, Image, Text, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { StackNavigation } from '../navigation/MainNavigator';
import { Anime } from "../types";

interface Props {
  item: Anime,
  index: number,
}

const CatalogueListItem = ({ item, index }: Props) => {
  const navigation = useNavigation<StackNavigation>()
  
  const onImagePress = useCallback((item: Anime) => {
    navigation.navigate('AnimeDetail', {
      malId: item.mal_id,
      title: item.title,
    })
  }, [])

  return (
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
  );
}

const styles = StyleSheet.create({
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

export default React.memo(CatalogueListItem)
