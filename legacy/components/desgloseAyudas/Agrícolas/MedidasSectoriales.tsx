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
  SimuladorAyudasSectoriales: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasSectorialesAgricolas: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ayudas Sectoriales Agrícolas 2025</Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece ayudas sectoriales para apoyar distintos
          sectores agrícolas, mejorando la competitividad y sostenibilidad del
          sector agroalimentario.
        </Text>

        <Text style={styles.subtitle}>Sectores Beneficiarios</Text>
        <Text style={styles.content}>
          • Sector olivarero: Apoyo a la producción y mejora de calidad. {"\n"}•
          Sector hortofrutícola: Subvenciones para innovación y exportación.{" "}
          {"\n"}• Sector vitivinícola: Fondos para modernización y
          sostenibilidad. {"\n"}• Otros sectores: Ayudas específicas según
          necesidades productivas.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Estar registrado como productor agrícola en Andalucía. {"\n"}•
          Cumplir con criterios de sostenibilidad y trazabilidad. {"\n"}•
          Participar en programas de mejora y formación sectorial.
        </Text>

        <Text style={styles.subtitle}>Cuantía de las Ayudas</Text>
        <Text style={styles.content}>
          • Subvenciones de hasta el 50% del coste de mejora. {"\n"}• Incentivos
          adicionales por prácticas ecológicas y de calidad. {"\n"}• Fondos
          especiales para pequeños y medianos productores.
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
          onPress={() => navigation.navigate("SimuladorAyudasSectoriales")}
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

export default AyudasSectorialesAgricolas;
