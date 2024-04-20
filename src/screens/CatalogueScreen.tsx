import React, { useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import { getAnimeSearch } from '../api/JikanAPI';
import { Anime } from '../types';
import CatalogueListItem from '../components/CatalogueListItem';
import CustomSearchBar from '../components/CustomSearchBar';

interface Props {
  route: any,
}

export default function CatalogueScreen({ route }: Props) {
  const { name, params } = route
  const { broadcast_status } = params
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
      return (<CatalogueListItem item={item} index={index} />);
    }
    if (item.title.toLowerCase().trim().includes(inputKeyword.toLowerCase().trim())) {
      return (<CatalogueListItem item={item} index={index} />);
    }

    return null
  }, [inputKeyword])

  function onSearch(text: string) {
    setInputKeyword(text)
  }

  function onInputClear() {
    setInputKeyword('')
  }

  function loadMore() {
    if (animeQuery.hasNextPage) animeQuery.fetchNextPage()
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
      {animeQuery.isSuccess && 
        <CustomSearchBar
          inputKeyword={inputKeyword}
          onSearch={onSearch}
          onInputClear={onInputClear}
        />
      }
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
  listFooterComponent: {
    height: 100,
  },
  loadingIndicator: {
    paddingVertical: 10,
  }
})
