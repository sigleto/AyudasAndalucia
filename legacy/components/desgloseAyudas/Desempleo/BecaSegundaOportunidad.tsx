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
  SimuladorBecasSegundaOportunidad: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BecasSegundaOportunidad: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Becas Segunda Oportunidad 2025</Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece las Becas Segunda Oportunidad para
          personas desempleadas que desean retomar su formación y mejorar sus
          oportunidades laborales.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Tener entre 18 y 30 años. {"\n"}• Estar en situación de desempleo y
          registrado en el SAE. {"\n"}• No haber finalizado estudios de
          educación secundaria o superior. {"\n"}• Matricularse en un programa
          de formación oficial.
        </Text>

        <Text style={styles.subtitle}>Cuantía de la Beca</Text>
        <Text style={styles.content}>
          • Ayuda mensual de hasta 600€. {"\n"}• Duración de hasta 10 meses.{" "}
          {"\n"}• Posibilidad de compatibilizar con otras ayudas para formación.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/educacionydeporte"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Presentación electrónica con formulario oficial. {"\n"}•
          Plazo: Apertura de solicitudes desde enero hasta abril de 2025.
        </Text>

        <Text style={styles.subtitle}>Simulador de Becas</Text>
        <Text style={styles.content}>
          Descubre si cumples los requisitos y cuánto podrías recibir con
          nuestro simulador actualizado:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() =>
            navigation.navigate("SimuladorBecasSegundaOportunidad")
          }
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

export default BecasSegundaOportunidad;
