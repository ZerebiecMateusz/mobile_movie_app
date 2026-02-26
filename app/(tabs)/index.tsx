import "../global.css"
import { ActivityIndicator, Image, View, Text, FlatList } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading, 
    error: moviesError
  } = useFetch(() => fetchMovies({query: ''}), true); // Zmienione na TRUE

  return (
    <View className="flex-1 bg-primary-primary">
      <Image source={images.bg} className="absolute w-full z-0"/>

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )} 
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 10,
          paddingRight: 2,
          marginBottom: 10,
          paddingHorizontal: 10, // Równe marginesy po bokach
        }}
        className="mt-2 pb-32"
        scrollEnabled={false}

        ListHeaderComponent={
          <View className="px-1">
             <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
             
             <SearchBar 
               onPress={() => router.push('/search')}
               placeholder="Search for a movie" 
             />

             {moviesLoading && (
               <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
             )}

             {moviesError && (
               <Text className="text-red-500 text-lg mt-10 text-center">
                 Failed to load movies: {moviesError.message}
               </Text>
             )}

             {!moviesLoading && !moviesError && (
               <Text className="text-lg text-white font-bold mt-5 mb-3">Latest movies</Text>
             )}
          </View>
        }
        // Styl dla całej zawartości listy (żeby nie kończyła się przy samej krawędzi)
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}