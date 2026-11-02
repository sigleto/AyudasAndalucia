import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FavoritesProvider } from "./src/state/Favorites";
import { MenuRoutes, RootRoutes } from "./src/navigation";
import {
  CatalogScreen,
  DetailScreen,
  GuideScreen,
  HomeScreen,
  InfoScreen,
  OrientScreen,
} from "./src/screens";
import { colors } from "./src/ui";
const Drawer = createDrawerNavigator<MenuRoutes>();
const Stack = createNativeStackNavigator<RootRoutes>();
const icons: Record<
  keyof MenuRoutes,
  React.ComponentProps<typeof MaterialCommunityIcons>["name"]
> = {
  Inicio: "home-outline",
  Buscar: "magnify",
  Convocatorias: "calendar-outline",
  Favoritos: "bookmark-outline",
  Orientación: "compass-outline",
  Información: "information-outline",
};
function Menu() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerTintColor: colors.ink,
        headerStyle: { backgroundColor: colors.paper },
        drawerActiveTintColor: colors.primary,
        drawerActiveBackgroundColor: colors.wash,
        drawerInactiveTintColor: colors.muted,
        drawerStyle: { backgroundColor: colors.paper },
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name={icons[route.name]}
            size={size}
            color={color}
          />
        ),
        headerShadowVisible: false,
        headerTitleStyle: { fontSize: 17, fontWeight: "800" },
        drawerLabelStyle: { fontSize: 16 },
      })}
    >
      <Drawer.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ title: "Ayudas Andalucía", drawerLabel: "Inicio" }}
      />
      <Drawer.Screen
        name="Buscar"
        component={CatalogScreen}
        options={{ title: "Buscar ayudas" }}
      />
      <Drawer.Screen name="Convocatorias" component={CatalogScreen} />
      <Drawer.Screen name="Favoritos" component={CatalogScreen} />
      <Drawer.Screen name="Orientación" component={OrientScreen} />
      <Drawer.Screen
        name="Información"
        component={InfoScreen}
        options={{ title: "Información y privacidad" }}
      />
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FavoritesProvider>
          <StatusBar style="dark" />
          <NavigationContainer
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                background: colors.paper,
                primary: colors.primary,
                card: colors.paper,
                text: colors.ink,
                border: colors.line,
              },
            }}
          >
            <Stack.Navigator
              screenOptions={{
                headerTintColor: colors.ink,
                headerStyle: { backgroundColor: colors.paper },
                headerShadowVisible: false,
                animation: "default",
              }}
            >
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Ficha"
                component={DetailScreen}
                options={{ title: "Detalle de la ayuda" }}
              />
              <Stack.Screen
                name="Guía"
                component={GuideScreen}
                options={{ title: "Orientación" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
