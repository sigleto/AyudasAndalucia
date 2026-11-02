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
  SimuladorPrestacionesDiscapacidad: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PrestacionesDiscapacidad: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Prestaciones Sociales por Discapacidad en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece ayudas económicas y subvenciones para
          personas con discapacidad, con el objetivo de mejorar su autonomía y
          calidad de vida. Estas ayudas incluyen la adquisición de productos de
          apoyo, adaptación de vehículos y renovación de prótesis.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Tener reconocida una discapacidad física, psíquica o sensorial igual
          o superior al 33%. {"\n"}• Residir en algún municipio de Andalucía.{" "}
          {"\n"}• Renta per cápita familiar no superior a 1,25 veces el IPREM.{" "}
          {"\n"}• Contar con un informe favorable del Centro de Valoración y
          Orientación para determinadas solicitudes.
        </Text>

        <Text style={styles.subtitle}>Cuantía de la Ayuda</Text>
        <Text style={styles.content}>
          • Adaptación de vehículos: hasta 750€. {"\n"}• Prótesis auditivas:
          hasta 1.200€ (600€ por cada audífono). {"\n"}• Prótesis dentales:
          hasta 600€. {"\n"}• Productos tecnológicos: hasta 6.000€ dependiendo
          del coste.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/temas/familias-igualdad/discapacidad/prestaciones.html"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Presentación electrónica o presencial con la
          documentación requerida. {"\n"}• Plazo: Generalmente abierto en
          periodos específicos según convocatoria.
        </Text>

        <Text style={styles.subtitle}>Simulador de Ayudas</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() =>
            navigation.navigate("SimuladorPrestacionesDiscapacidad")
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

export default PrestacionesDiscapacidad;
