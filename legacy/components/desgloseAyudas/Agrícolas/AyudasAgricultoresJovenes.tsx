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
  SimuladorAyudasAgricultores: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasAgricultoresJovenes: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ayudas a Agricultores Jóvenes 2025</Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece ayudas específicas para jóvenes
          agricultores menores de 40 años, facilitando su incorporación al
          sector agrario y promoviendo la modernización y sostenibilidad de las
          explotaciones.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Tener entre 18 y 40 años. {"\n"}• Establecerse por primera vez como
          titular de una explotación agraria. {"\n"}• Presentar un plan
          empresarial viable. {"\n"}• Cumplir con los criterios de
          sostenibilidad exigidos por la PAC.
        </Text>

        <Text style={styles.subtitle}>Cuantía de las Ayudas</Text>
        <Text style={styles.content}>
          • Subvención base de hasta 70.000€. {"\n"}• Incrementos por
          localización en zonas desfavorecidas. {"\n"}• Complementos por
          adopción de prácticas sostenibles y ecológicas.
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

        <Text style={styles.subtitle}>Simulador de Ayudas</Text>
        <Text style={styles.content}>
          Descubre cuánto podrías recibir con nuestro simulador actualizado para
          2025:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorAyudasAgricultores")}
        />
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

export default AyudasAgricultoresJovenes;
