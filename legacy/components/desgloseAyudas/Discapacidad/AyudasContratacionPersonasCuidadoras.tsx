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
  SimuladorAyudasContratacionCuidadores: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasContratacionCuidadores: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Ayudas para la Contratación de Personas Cuidadoras en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece subvenciones dirigidas a facilitar la
          contratación de personas cuidadoras para atender a familiares con
          discapacidad o en situación de dependencia, promoviendo la
          conciliación laboral y familiar.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • El familiar a cuidar debe tener un grado de discapacidad igual o
          superior al 75% o necesitar atención continuada por enfermedad
          crónica. {"\n"}• La persona contratante debe residir en Andalucía y
          figurar como titular del hogar familiar. {"\n"}• Relación de
          parentesco de primer grado entre el contratante y el beneficiario.
        </Text>

        <Text style={styles.subtitle}>Cuantía de la Ayuda</Text>
        <Text style={styles.content}>
          • Subvención de hasta 4.000€ por contrato. {"\n"}• Incremento del 10%
          si la persona contratada es mujer. {"\n"}• Cobertura parcial o total
          de las cuotas a la Seguridad Social según renta familiar.
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
          {"\n"}• Cómo: Presentación electrónica mediante formulario oficial.{" "}
          {"\n"}• Plazo: Del 1 al 31 de enero y del 1 al 31 de julio para
          contrataciones realizadas en los semestres anteriores.
        </Text>

        <Text style={styles.subtitle}>Simulador de Ayudas</Text>
        <Text style={styles.content}>
          Descubre si cumples los requisitos y cuánto podrías recibir con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() =>
            navigation.navigate("SimuladorAyudasContratacionCuidadores")
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

export default AyudasContratacionCuidadores;
