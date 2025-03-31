import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Leaf, UtensilsCrossed } from 'lucide-react-native';
import { useEffect, useState } from 'react';

//object for plant data
interface PlantData {
  name: string;
  scientificName: string;
  edible: boolean;
  confidence: number;
  description: string;
  usages: string[];
}

const [plantData, setPlantData] = useState<PlantData>({
  name: '',
  scientificName: '',
  edible: false,
  confidence: 0,
  description: '',
  usages: [],
});


export default function ResultsScreen() {
  const { imageUri } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
   // <-- Explicitly specify type

  // Simulated plant identification result
  useEffect(() => {
    setTimeout(() => {
      setPlantData({
        name: 'Wild Garlic',
        scientificName: 'Allium ursinum',
        edible: true,
        confidence: 0.95,
        description: 'Wild garlic, also known as ramsons, is an edible wild plant. Its leaves are used as a herb, and it has a distinctive garlic-like taste but is milder than cultivated garlic.',
        usages: [
          'Can be used raw in salads',
          'Makes excellent pesto',
          'Can be cooked like spinach',
          'Used in soups and sauces'
        ]
      });
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#2D6A4F" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Plant Details</Text>
      </View>

      <Image source={{ uri: Array.isArray(imageUri) ? imageUri[0] : imageUri || 'https://via.placeholder.com/300' }} style={styles.image} />


      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Analyzing your plant...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.nameContainer}>
            <Text style={styles.plantName}>{plantData.name}</Text>
            <Text style={styles.scientificName}>{plantData.scientificName}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Leaf color="#2D6A4F" size={24} />
              <Text style={styles.infoText}>
                {(plantData.confidence * 100).toFixed(1)}% Match
              </Text>
            </View>
            {plantData.edible && (
              <View style={styles.infoItem}>
                <UtensilsCrossed color="#2D6A4F" size={24} />
                <Text style={styles.infoText}>Edible</Text>
              </View>
            )}
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{plantData.description}</Text>

          {plantData.edible && (
            <>
              <Text style={styles.sectionTitle}>Culinary Uses</Text>
              {plantData.usages.map((usage, index) => (
                <Text key={index} style={styles.usageItem}>• {usage}</Text>
              ))}
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#2D6A4F',
    marginLeft: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#74A48B',
  },
  content: {
    padding: 20,
  },
  nameContainer: {
    marginBottom: 20,
  },
  plantName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 28,
    color: '#2D6A4F',
    marginBottom: 4,
  },
  scientificName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#74A48B',
    fontStyle: 'italic',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  infoText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#2D6A4F',
    marginLeft: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#2D6A4F',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 24,
  },
  usageItem: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    paddingLeft: 8,
  },
});