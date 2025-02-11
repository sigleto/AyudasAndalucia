import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  SimuladorAyudasMaquinaria: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasModernizacionMaquinaria: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Ayudas para la Modernización de Maquinaria Agrícola 2025
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece ayudas para la modernización de
          maquinaria agrícola, promoviendo la eficiencia, la sostenibilidad y la
          reducción de emisiones en el sector.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Ser titular de una explotación agraria. {"\n"}• Adquirir maquinaria
          agrícola nueva y eficiente. {"\n"}• Justificar la necesidad de
          modernización. {"\n"}• Cumplir con los criterios de sostenibilidad y
          reducción de emisiones.
        </Text>

        <Text style={styles.subtitle}>Cuantía de las Ayudas</Text>
        <Text style={styles.content}>
          • Subvención de hasta el 40% del coste de la maquinaria. {"\n"}•
          Incrementos en función de la eficiencia energética y el impacto
          ambiental positivo. {"\n"}• Bonificaciones para explotaciones en zonas
          desfavorecidas.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/agriculturaganaderiapescaydesarrollosostenible"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Presentación electrónica con asistencia técnica. {"\n"}•
          Plazo: Apertura de solicitudes desde enero hasta abril de 2025.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  card: {
    backgroundColor: "#e7f9f1",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#006d77",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2a9d8f",
    marginTop: 20,
  },
  content: {
    fontSize: 18,
    color: "#2c3e50",
    textAlign: "justify",
    lineHeight: 24,
  },
  link: {
    color: "#2a9d8f",
    textDecorationLine: "underline",
  },
});

export default AyudasModernizacionMaquinaria;
