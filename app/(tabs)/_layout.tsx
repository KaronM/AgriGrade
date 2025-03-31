import { Tabs } from 'expo-router';
import { Camera, Leaf, Book } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2D6A4F',
        tabBarInactiveTintColor: '#74A48B',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Identify',
          tabBarIcon: ({ color, size }) => <Leaf size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color, size }) => <Camera size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F0F7F4',
    borderTopColor: '#E6F0EA',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
});