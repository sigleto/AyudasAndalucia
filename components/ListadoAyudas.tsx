import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type RutasNavegacion =
  | "SubsidiosDesempleo"
  | "AyudasSociales"
  | "AyudasVivienda"
  | "AyudaDescendientes"
  | "BecasEstudio"
  | "Emprendedores"
  | "Discapacidad"
  | "AyudasAgricolas";

type RootStackParamList = {
  SubsidiosDesempleo: undefined;
  AyudasSociales: undefined;
  AyudasVivienda: undefined;
  AyudaDescendientes: undefined;
  BecasEstudio: undefined;
  Emprendedores: undefined;
  Discapacidad: undefined;
  AyudasAgricolas: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const ayudas: {
  id: number;
  nombre: string;
  ruta: RutasNavegacion;
  color: string;
  icono: IconName;
}[] = [
  {
    id: 1,
    nombre: "Subsidios por desempleo",
    ruta: "SubsidiosDesempleo",
    color: "#FF6F61",
    icono: "briefcase-outline",
  },
  {
    id: 2,
    nombre: "Ayudas sociales",
    ruta: "AyudasSociales",
    color: "#FFD700",
    icono: "hand-heart",
  },
  {
    id: 3,
    nombre: "Ayudas para vivienda",
    ruta: "AyudasVivienda",
    color: "#6A5ACD",
    icono: "home-outline",
  },
  {
    id: 4,
    nombre: "Ayudas por descendientes",
    ruta: "AyudaDescendientes",
    color: "#32CD32",
    icono: "baby-face-outline",
  },
  {
    id: 5,
    nombre: "Becas y ayudas al estudio",
    ruta: "BecasEstudio",
    color: "#FF4500",
    icono: "school-outline",
  },
  {
    id: 6,
    nombre: "Ayudas para emprendedores",
    ruta: "Emprendedores",
    color: "#1E90FF",
    icono: "lightbulb-on-outline",
  },
  {
    id: 7,
    nombre: "Ayudas para la discapacidad",
    ruta: "Discapacidad",
    color: "#C71585",
    icono: "wheelchair-accessibility",
  },

  {
    id: 8,
    nombre: "Ayudas agrícolas",
    ruta: "AyudasAgricolas",
    color: "#C71585",
    icono: "tractor",
  },
];

export default function ListadoDeAyudas() {
  const navigation = useNavigation<NavigationProp>();

  const navigateToAyuda = (ruta: RutasNavegacion) => {
    navigation.navigate(ruta);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>¿En qué ayuda estás interesado?</Text>
      <View style={styles.ayudas}>
        {ayudas.map((ayuda) => (
          <TouchableOpacity
            key={ayuda.id}
            style={styles.item}
            onPress={() => navigateToAyuda(ayuda.ruta)}
          >
            <MaterialCommunityIcons
              name={ayuda.icono}
              size={30}
              color="#FFFFFF"
              style={styles.icono}
            />
            <Text style={styles.texto}>{ayuda.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5F5FE",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#0077B6",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  ayudas: {
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#0077B6",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  icono: {
    marginRight: 15,
  },
  texto: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "left",
    textTransform: "capitalize",
  },
});
