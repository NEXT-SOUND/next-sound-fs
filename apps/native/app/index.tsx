import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from '@/ui';
import { Home } from "app/screens/home";
import { useSafeArea } from '@/utils/safe-area';

export default function HomePage() {
  const { top } = useSafeArea();
  
  return (
    <ScrollView 
      className="flex-1 bg-spotify-black"
      style={{ paddingTop: top }}
      showsVerticalScrollIndicator={false}
    >
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-white text-2xl font-bold mb-2">
            MusicApp
          </Text>
          <Text className="text-spotify-light-gray">
            Modern music streaming experience
          </Text>
        </View>
        
        <Home />
      </View>
    </ScrollView>
  );
}
