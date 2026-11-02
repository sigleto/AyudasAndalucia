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
  SimuladorAyudasTrabajadoresAgrarios: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasTrabajadoresAgrarios: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Ayudas al Desempleo para Trabajadores Agrarios 2025
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece ayudas específicas para los trabajadores
          agrarios que se encuentran en situación de desempleo, proporcionando
          apoyo económico y acceso a programas de reinserción laboral.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Haber trabajado en el sector agrario en los últimos 12 meses. {"\n"}
          • Estar inscrito en el SAE como demandante de empleo. {"\n"}• No
          superar los límites de renta establecidos. {"\n"}• Residencia en
          Andalucía.
        </Text>

        <Text style={styles.subtitle}>Cuantía de la Ayuda</Text>
        <Text style={styles.content}>
          • Prestación económica de hasta 480€ mensuales. {"\n"}• Duración de
          hasta 6 meses. {"\n"}• Posibilidad de acceso a programas de formación
          y empleo.
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
          Plazo: Apertura de solicitudes desde enero hasta abril de 2025.
        </Text>

        <Text style={styles.subtitle}>Simulador de Ayudas</Text>
        <Text style={styles.content}>
          Descubre si cumples los requisitos y cuánto podrías recibir con
          nuestro simulador actualizado:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() =>
            navigation.navigate("SimuladorAyudasTrabajadoresAgrarios")
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

export default AyudasTrabajadoresAgrarios;
