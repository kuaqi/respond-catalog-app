import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getAnimeById } from '../api/JikanAPI';

interface Props {
  route: any,
}

export default function AnimeDetailScreen({ route }: Props) {
  const { malId } = route.params
  const animeQuery = useQuery({ queryKey: ['anime', malId], queryFn: () => getAnimeById(malId) })

  function renderBanner() {
    return (
      <Image 
        source={{ uri: animeQuery.data?.images?.jpg?.image_url }} 
        style={styles.bannerImage}
      />
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
          {animeQuery.data?.year && animeQuery.isSuccess && renderYear()}
          {animeQuery.data?.rating && animeQuery.isSuccess && renderRating()}
          {animeQuery.data?.score && animeQuery.isSuccess && renderScore()}
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
        {renderBanner()}
        {renderContent()}
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
  bannerImage: {
    aspectRatio: 1,
    width: '100%',
  },
  animeTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
