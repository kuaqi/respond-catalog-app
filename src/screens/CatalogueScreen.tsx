import React, { useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/core';
import { StackNavigation } from '../navigation/MainNavigator';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAnimeSearch } from '../api/JikanAPI';
import { Anime } from '../types';

interface Props {
  route: any,
}

export default function CatalogueScreen({ route }: Props) {
  const { name, params } = route
  const { broadcast_status } = params
  const navigation = useNavigation<StackNavigation>()
  const [status, setStatus] = useState<'airing' | 'complete' | 'upcoming'>(broadcast_status)
  const [inputKeyword, setInputKeyword] = useState('')
  const keyExtractor = useCallback((item: Anime) => `${item.mal_id.toString()}`, [])
  const animeQuery = useInfiniteQuery({ 
    queryKey: ['anime'],
    queryFn: ({ pageParam }) => getAnimeSearch(status, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  })

  const renderItem: ListRenderItem<Anime> = useCallback(({ item, index }) => {
  
    if (inputKeyword === '') {
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

    if (item.title.toLowerCase().trim().includes(inputKeyword.toLowerCase().trim())) {
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

    return null
  }, [inputKeyword])

  const onImagePress = useCallback((item: Anime) => {
    navigation.navigate('AnimeDetail', {
      malId: item.mal_id,
      title: item.title,
    })
  }, [])

  function onSearch(text: string) {
    setInputKeyword(text)
  }

  function onInputClear() {
    setInputKeyword('')
  }

  function loadMore() {
    if (animeQuery.hasNextPage) animeQuery.fetchNextPage()
  }

  function renderSearchBar() {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name='search'
            size={20}
            color='black'
            style={styles.searchIcon}
          />
          <TextInput 
            placeholder='Search'
            value={inputKeyword}
            onChangeText={(text) => onSearch(text)}
            style={styles.searchInput}
          />
        </View>
        <View style={styles.closeIconContainer}>
          <Ionicons
            name='close'
            size={25}
            color='black'
            onPress={onInputClear}
          />
        </View>
      </View>
    );
  }

  function renderListFooter() {
    return (
      <View style={styles.listFooterComponent}>
        {animeQuery.isFetchingNextPage && <ActivityIndicator size={"large"} />}
      </View>
    );
  }

  function renderLoadingIndicator() {
    return (<ActivityIndicator size={"large"} style={styles.loadingIndicator} />);
  }

  return (
    <View style={styles.container}>
      {animeQuery.isSuccess && renderSearchBar()}
      {!animeQuery.isFetchedAfterMount && renderLoadingIndicator()}
      {animeQuery.status === 'error' && <Text>{JSON.stringify(animeQuery.error)}</Text>}
      <FlatList
        data={animeQuery.data?.pages.flatMap(page => page) || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        initialNumToRender={8}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderListFooter}
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
  searchContainer: {
    padding: 8,
    paddingTop: 10,
    width: '100%',
    flexDirection: 'row',
  },
  searchBar: {
    height: 40,
    paddingLeft: 8,
    borderRadius: 10,
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  closeIconContainer: {
    height: 40,
    width: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    paddingHorizontal: 4,
  },
  searchInput: {
    fontSize: 15,
    width: '100%',
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
  listFooterComponent: {
    height: 100,
  },
  loadingIndicator: {
    paddingVertical: 10,
  }
})
