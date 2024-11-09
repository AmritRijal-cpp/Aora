import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import "../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants';
export default function App() {
  return (
    <SafeAreaView classname="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View classname="w-full justify-center items-center h-full px-4">
          <Image 
            source={images.logo}
            classname="w-[130px] h-[84px]"
            resizeMode="contain"  
          />
          <Image 
            source={images.cards}
            classname="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
