import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RutasNavegacion =
  | "AyudasAgricultoresJovenes"
  | "AyudasModernizacionMaquinaria"
  | "AyudasMejoraRendimiento";

type RootStackParamList = {
  AyudasAgricultoresJovenes: undefined;
  AyudasModernizacionMaquinaria: undefined;
  AyudasMejoraRendimiento: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type Apartado = {
  nombre: string;
  ruta: RutasNavegacion;
  scale: Animated.Value; // Añadimos la propiedad scale
};

const AyudasAgricolas = () => {
  const navigation = useNavigation<NavigationProp>();

  // Creamos un valor de animación para cada apartado
  const apartados: Apartado[] = [
    {
      nombre: "Ayudas Agricultores Jóvenes",
      ruta: "AyudasAgricultoresJovenes",
      scale: new Animated.Value(1),
    },
    {
      nombre: "Ayudas para la modernización de la maquinaria",
      ruta: "AyudasModernizacionMaquinaria",
      scale: new Animated.Value(1),
    },
    {
      nombre: "Ayudas para la mejora del rendimiento",
      ruta: "AyudasMejoraRendimiento",
      scale: new Animated.Value(1),
    },
  ];

  // Funciones para aplicar la animación
  const handlePressIn = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../assets/images/Agrícola.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Ayudas agrícolas</Text>
      <View style={styles.list}>
        {apartados.map((apartado) => (
          <Animated.View
            key={apartado.ruta}
            style={[styles.item, { transform: [{ scale: apartado.scale }] }]}
          >
            <TouchableOpacity
              onPressIn={() => handlePressIn(apartado.scale)}
              onPressOut={() => handlePressOut(apartado.scale)}
              onPress={() => navigation.navigate(apartado.ruta)}
              style={styles.touchable}
            >
              <Text style={styles.itemText}>{apartado.nombre}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A535C",
    textAlign: "center",
    marginBottom: 24,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  list: {
    marginTop: 16,
  },
  item: {
    marginVertical: 10,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  touchable: {
    padding: 18,
    width: "100%",
    alignItems: "center",
  },
  itemText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "capitalize",
  },
  logo: {
    width: "70%",
    height: 200, // Altura fija en lugar de porcentaje
    alignSelf: "center",
    marginTop: 55,
    marginBottom: 20,
  },
});

export default AyudasAgricolas;
