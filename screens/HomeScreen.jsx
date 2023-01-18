import axios from "axios";
import { Text, FlatList, View, Alert, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { Post } from "../components/Post";
import React from "react";

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState();

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get("https://63c7a7fd5c0760f69abb42ae.mockapi.io/posts")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Не удалось получить статьи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
				refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => (
					<TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
						<Post
            title={item.title}
            imageUrl={item.imageUrl}
            createdAt={item.createdAt}
          />
					</TouchableOpacity>
        )}
      />
    </View>
  );
}
