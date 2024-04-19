import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getAnimeById } from '../api/JikanAPI';
import { RootState } from '../redux/store';
import { addFavourite, removeFavourite } from '../redux/slice/FavouritesSlice';
import { Anime } from '../types';

interface Props {
  route: any,
}

export default function AnimeDetailScreen({ route }: Props) {
  const { malId } = route.params
  const dispatch = useDispatch()
  const [isFavouritedAnime, setFavouritedAnime] = useState(false)
  const favourites = useSelector((state: RootState) => state.favourites.items)
  const animeQuery = useQuery({ queryKey: ['anime', malId], queryFn: () => getAnimeById(malId) })

  useEffect(() => {
    initFavourites()
  }, [])

  function initFavourites() {
    if (!favourites) return
    if (favourites.length === 0) return

    favourites.forEach((anime: Anime) => {
      if (anime.mal_id === malId) {
        setFavouritedAnime(true)
      }
    })
  }

  function onFavouritePress() {
    if (isFavouritedAnime) {
      const favouritedAnime = favourites.find(favourite => favourite.mal_id === malId)
      if (favouritedAnime) {
        dispatch(removeFavourite(favouritedAnime))
        setFavouritedAnime(false)
      }
    } else if (animeQuery.data) {
      dispatch(addFavourite(animeQuery.data))
      setFavouritedAnime(true)
    }
  }

  function renderBanner() {
    return (
      <View>
        <Image 
          source={{ uri: animeQuery.data?.images?.jpg?.image_url }} 
          style={styles.bannerImage}
        />
        {renderFavouriteButton()}
      </View>
    );
  }

  function renderFavouriteButton() {
    const favourited = '\u2764'
    const unfavourited = '\u2661'
    
    return (
      <View style={styles.favouriteContainer}>
        {isFavouritedAnime && (
          <TouchableOpacity
            style={[styles.favouriteButton, { backgroundColor: 'white' } ]}
            onPress={onFavouritePress}>
            <Text style={[styles.favouriteText, { paddingVertical: 5 } ]}>
              {favourited}
            </Text>
          </TouchableOpacity>
        )}
        {!isFavouritedAnime && (
          <TouchableOpacity
            style={[styles.favouriteButton, { backgroundColor: 'grey' } ]}
            onPress={onFavouritePress}>
            <Text style={[styles.favouriteText, { fontSize: 23, fontWeight: 'bold' } ]}>
              {unfavourited}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function renderContent() {
    return (
      <>
        <View style={{ height: 14 }} />
        <View style={styles.bodyContainer}>
          <Text style={styles.animeTitleText}>
            {animeQuery.data?.title}
          </Text>
          <View style={{ height: 8 }} />
          {animeQuery.data?.synopsis && renderSynopsis()}
          <View style={{ height: 10 }} />
          {animeQuery.data?.year && renderYear()}
          {animeQuery.data?.rating && renderRating()}
          {animeQuery.data?.score && renderScore()}
        </View>
        <View style={{ height: 60 }} />
      </>
    );
  }

  function renderSynopsis() {
    return <Text>{animeQuery.data?.synopsis}</Text>
  }

  function renderYear() {
    return <Text>{'Year: ' + animeQuery.data?.year}</Text>
  }

  function renderRating() {
    return <Text>{'Rating: ' + animeQuery.data?.rating}</Text>
  }

  function renderScore() {
    return <Text>{'Score: ' + animeQuery.data?.score}</Text>
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {animeQuery.status === 'pending' && <ActivityIndicator size={"large"} />}
        {animeQuery.status === 'error' && <Text>{JSON.stringify(animeQuery.error)}</Text>}
        {animeQuery.isSuccess && renderBanner()}
        {animeQuery.isSuccess && renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bodyContainer: {
    paddingHorizontal: 16,
  },
  favouriteContainer: {
    right: 0,
    bottom: 0,
    paddingBottom: 20,
    paddingRight: 20,
    position: 'absolute',
  },
  favouriteButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 28,
    backgroundColor: 'lightgray',
  },
  favouriteText: {
    fontSize: 15,
    color: 'white',
  },
  bannerImage: {
    aspectRatio: 1,
    width: '100%',
  },
  animeTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
