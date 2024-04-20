import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  inputKeyword: string,
  onSearch: Function,
  onInputClear: () => void,
}

export default function CustomSearchBar({ inputKeyword, onSearch, onInputClear }: Props) {
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

const styles = StyleSheet.create({
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
})
