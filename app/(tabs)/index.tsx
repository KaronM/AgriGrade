import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Upload } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function IdentifyScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Navigate to results with the image
      router.push({
        pathname: '/results',
        params: { imageUri: result.assets[0].uri }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Plant Identifier</Text>
        <Text style={styles.subtitle}>Discover the plants around you</Text>
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Upload size={32} color="#2D6A4F" />
        <Text style={styles.uploadText}>Upload Photo</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.imageText}>
          Take or upload a photo of any plant to identify it and discover if it's edible
        </Text>
      </View>
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
    marginBottom: 40,
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
  uploadButton: {
    backgroundColor: '#E6F0EA',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  uploadText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#2D6A4F',
    marginLeft: 12,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(45, 106, 79, 0.3)',
  },
  imageText: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    color: '#FFFFFF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});