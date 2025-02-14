import React, { useCallback } from "react";
import { Share, Alert, View, Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { PrincipalStack, PresentacionStack } from "./components/navigator";
import DescargoResponsabilidad from "./components/DescargoResponsabilidad";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";

enableScreens();

const Drawer = createDrawerNavigator();

const shareApp = async () => {
  try {
    const result = await Share.share({
      message:
        "Descarga la app Ayudas Públicas Andalucía y descubre todas las ayudas disponibles. ¡Haz clic aquí para descargarla! https://play.google.com/store/apps/details?id=com.sigleto.AyudasAndalucia",
    });
    if (result.action === Share.dismissedAction) {
      Alert.alert("Compartir cancelado");
    }
  } catch (error) {
    Alert.alert("Error", "Hubo un problema al intentar compartir la app.");
  }
};

const ShareScreen = () => {
  const handleShare = useCallback(() => {
    shareApp();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={handleShare}
        style={{
          backgroundColor: "#007AFF",
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 10,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          📤 Compartir la aplicación
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Principal"
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: "#f7f7f7",
            },
            drawerLabelStyle: {
              fontSize: 18,
              marginLeft: -10,
            },
            drawerActiveTintColor: "#007AFF",
            drawerInactiveTintColor: "#333",
          }}
        >
          <Drawer.Screen
            name="Principal"
            component={PrincipalStack}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" size={size} color={color} />
              ),
              drawerLabel: "Inicio",
            }}
          />
          <Drawer.Screen
            name="Cómo funciona"
            component={PresentacionStack}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="information-outline"
                  size={size}
                  color={color}
                />
              ),
              drawerLabel: "Cómo funciona",
            }}
          />
          <Drawer.Screen
            name="DescargoResponsabilidad"
            component={DescargoResponsabilidad}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="shield-alert-outline"
                  size={size}
                  color={color}
                />
              ),
              drawerLabel: "Descargo de responsabilidad",
            }}
          />
          <Drawer.Screen
            name="PoliticaPrivacidad"
            component={PoliticaPrivacidad}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={size}
                  color={color}
                />
              ),
              drawerLabel: "Política de Privacidad",
            }}
          />
          <Drawer.Screen
            name="Compartir"
            component={ShareScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="share-variant"
                  size={size}
                  color={color}
                />
              ),
              drawerLabel: "Compartir la App",
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
