import {Image, View, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
  onPress?: () => void;
  placeholder: string;
}

const SearchBar = ({onPress, placeholder}: Props) => {
  return (
    <View className='flex-row items-center bg-primary-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className="size-5" resizeMode='contain' tintColor="#ab8bff"/>
      <TextInput
        onPress={onPress}
        className="flex-1 text-white text-base ml-2"
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        value=''
        onChangeText={() => {}}
      />
    </View>
  )
}

export default SearchBar

