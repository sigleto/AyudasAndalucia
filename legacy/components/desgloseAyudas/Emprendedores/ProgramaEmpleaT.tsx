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
  SimuladorEmpleaT: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProgramaEmpleaT: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Programa Emplea-T de la Junta de Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          El Programa Emplea-T es una iniciativa de la Junta de Andalucía que
          tiene como objetivo fomentar la inserción laboral y mejorar la
          empleabilidad, con especial atención a colectivos vulnerables. Este
          programa incluye subvenciones para la contratación indefinida y otras
          medidas que promueven el empleo estable y de calidad.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Dirigido a personas trabajadoras autónomas, mutualistas de colegios
          profesionales y pymes. {"\n"}• Contratación indefinida de personas
          desempleadas menores de 30 años, mayores de 45 años, personas con
          discapacidad o desempleadas de larga duración. {"\n"}• Conversión de
          contratos indefinidos parciales a jornada completa. {"\n"}•
          Contratación de jóvenes menores de 30 años beneficiarios del Sistema
          Nacional de Garantía Juvenil. {"\n"}• Residir y desarrollar la
          actividad en Andalucía.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Subvenciones para fomentar la contratación indefinida. {"\n"}• Apoyo
          económico para colectivos vulnerables con mayor dificultad para
          acceder al mercado laboral. {"\n"}• Incentivos adicionales para
          corporaciones locales que contraten jóvenes del Sistema Nacional de
          Garantía Juvenil.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/incentivos-empleo/plan-empleo-juvenil/programa-empleat.html"
              )
            }
          >
            portal oficial del Programa Emplea-T.
          </Text>
          {"\n"}• Cómo: Completar el formulario online y adjuntar la
          documentación requerida, como los contratos laborales y certificados
          oficiales. {"\n"}• Plazo: Desde el día siguiente a la publicación en
          el Boletín Oficial hasta el cierre del periodo establecido en cada
          convocatoria.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula los beneficios estimados
          con nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorEmpleaT")}
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

export default ProgramaEmpleaT;
