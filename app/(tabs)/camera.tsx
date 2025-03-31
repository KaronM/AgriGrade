import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera'; // Correct import from expo-camera
import { useRouter } from 'expo-router';
import { Camera as CaptureIcon, Camera as FlipCamera2 } from 'lucide-react-native';

export default function CameraScreen() {
  const [type, setType] = useState<'back' | 'front'>('back');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  // Use 'Camera' type for typing the ref properly
  const cameraRef = useRef<Camera | null>(null); // Correct ref typing for Camera component
  
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Request permission from expo-camera
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>We need your permission to use the camera</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync(); // Request permission from expo-camera
            setHasPermission(status === 'granted');
          }}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync(); // Call takePictureAsync on the cameraRef
      router.push({
        pathname: '/results',
        params: { imageUri: photo.uri }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={type}> {/* Correct usage as JSX component */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => setType(type === 'back' ? 'front' : 'back')}
          >
            <FlipCamera2 color="#FFFFFF" size={24} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <CaptureIcon color="#2D6A4F" size={32} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  captureButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding: 20,
    alignSelf: 'center',
    margin: 20,
  },
  flipButton: {
    alignSelf: 'center',
    margin: 20,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#2D6A4F',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
