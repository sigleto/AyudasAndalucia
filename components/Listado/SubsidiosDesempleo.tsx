import React, { useState } from "react";
import {
  Share,
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
import AnuncioBan from "../Anuncios/AnuncioBanner"
import { MaterialCommunityIcons } from "@expo/vector-icons";

type RutasNavegacion =
  | "BecasSegundaOportunidad"
  | "AyudasEmigrantesRetornados"
  | "AyudasVictimasViolenciaGenero"
  | "AyudasTrabajadoresAgrarios";

type RootStackParamList = {
  BecasSegundaOportunidad: undefined;
  AyudasEmigrantesRetornados: undefined;
  AyudasVictimasViolenciaGenero: undefined;
  AyudasTrabajadoresAgrarios: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type Apartado = {
  nombre: string;
  ruta: RutasNavegacion;
};

const SubsidiosDesempleo = () => {
  const navigation = useNavigation<NavigationProp>();

  const apartados: Apartado[] = [
    {
      nombre: "Beca Andalucía Segunda Oportunidad: ",
      ruta: "BecasSegundaOportunidad",
    },
    {
      nombre: "Personas Emigrantes Retornadas: ",
      ruta: "AyudasEmigrantesRetornados",
    },
    {
      nombre: "Víctimas de Violencia de Género: ",
      ruta: "AyudasVictimasViolenciaGenero",
    },
    { nombre: "Trabajadores Agrarios: ", ruta: "AyudasTrabajadoresAgrarios" },
  ];

  // Estado para controlar el efecto de animación
  const [scale] = useState(new Animated.Value(1));

  // Función para aplicar la animación
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
const shareApp = async () => {
    try {
      await Share.share({
        message:
          "Descarga la app Ayudas Públicas Andalucía y descubre todas las ayudas disponibles. ¡Haz clic aquí para descargarla! https://play.google.com/store/apps/details?id=com.sigleto.AyudasAndalucia",
      });
    } catch (error) {
      console.error("Error al compartir", error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../assets/images/desempleo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Subsidios por Desempleo</Text>
      <TouchableOpacity onPress={shareApp} style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={27}
          color="#007BFF"
        />
         </TouchableOpacity>
      <View style={styles.list}>
        {apartados.map((apartado) => (
          <Animated.View
            key={apartado.ruta}
            style={[styles.item, { transform: [{ scale }] }]} // Aplicar la animación de escala
          >
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate(apartado.ruta)}
            >
              <Text style={styles.itemText}>{apartado.nombre}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
         <AnuncioBan/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF", // Color de fondo suave
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A", // Color más fuerte para el título
    textAlign: "center",
    marginBottom: 24,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  list: {
    marginTop: 16,
  },
  item: {
    padding: 18,
    marginVertical: 10,
    backgroundColor: "#4CAF50", // Color verde vibrante
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
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
    height: "35%",
    marginTop: 55,
    marginLeft: "16%",
    marginBottom: 20,
  },
  shareIcon: {
    position: "absolute",
    right: 20,
    top: 10,
    fontSize: 20,
    backgroundColor:"#c3fe4d"
  },
});

export default SubsidiosDesempleo;
