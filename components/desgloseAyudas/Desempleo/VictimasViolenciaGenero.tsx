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
  SimuladorAyudasVictimasViolenciaGenero: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasVictimasViolenciaGenero: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Ayuda al Empleo para Víctimas de Violencia de Género 2025
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece ayudas específicas para el empleo de
          víctimas de violencia de género, con el objetivo de fomentar su
          independencia económica y su integración en el mercado laboral.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Ser víctima de violencia de género acreditada por organismos
          oficiales. {"\n"}• Estar inscrita como demandante de empleo en el SAE.{" "}
          {"\n"}• Participar en programas de formación o inserción laboral.{" "}
          {"\n"}• Residencia en Andalucía.
        </Text>

        <Text style={styles.subtitle}>Beneficios</Text>
        <Text style={styles.content}>
          • Subvenciones para la contratación en empresas colaboradoras. {"\n"}•
          Ayudas económicas directas para autoempleo. {"\n"}• Programas de
          formación y asesoramiento profesional. {"\n"}• Apoyo psicológico y
          social para la inserción laboral.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/empleo"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Presentación electrónica con formulario oficial. {"\n"}•
          Plazo: Apertura de solicitudes desde enero hasta diciembre de 2025.
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

export default AyudasVictimasViolenciaGenero;
