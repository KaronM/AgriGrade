import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Clock, Users } from 'lucide-react-native';
type Recipe = {
  id: string;
  title: string;
  time: string;
  servings: number;
  image: string;
};

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Wild Garlic Pesto Pasta',
    time: '25 mins',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Dandelion Green Salad',
    time: '15 mins',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Nettle Soup',
    time: '35 mins',
    servings: 6,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=400&auto=format&fit=crop',
  },
];

export default function RecipesScreen() {
  const renderRecipeCard =  ({ item }: { item: Recipe }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Clock size={16} color="#74A48B" />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <Users size={16} color="#74A48B" />
            <Text style={styles.metaText}>{item.servings} servings</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Foraged Recipes</Text>
        <Text style={styles.subtitle}>Delicious dishes from wild edibles</Text>
      </View>

      <FlatList
        data={SAMPLE_RECIPES}
        renderItem={renderRecipeCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
    color: '#2D6A4F',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#74A48B',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#2D6A4F',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#74A48B',
    marginLeft: 6,
  },
});