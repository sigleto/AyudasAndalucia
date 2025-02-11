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
  SimuladorBeca6000: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Beca6000: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Beca 6000 de la Junta de Andalucía</Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Beca 6000 es una ayuda económica de hasta 6.000 € destinada a
          estudiantes andaluces que cursen estudios postobligatorios no
          universitarios, como Bachillerato o Ciclos Formativos de Grado Medio.
          Su objetivo es fomentar la continuidad educativa y evitar el abandono
          escolar en familias con recursos económicos limitados.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Participar en la convocatoria general de becas para enseñanzas
          postobligatorias no universitarias. {"\n"}• Todos los miembros de la
          unidad familiar deben estar empadronados en un municipio andaluz.{" "}
          {"\n"}• Estar matriculado del curso completo en modalidad presencial
          (excluye educación de personas adultas). {"\n"}• No estar en posesión
          de un título igual o superior a Bachillerato o Técnico. {"\n"}• Haber
          aprobado todas las asignaturas del curso anterior (en caso de
          renovación). {"\n"}• Tener una renta y patrimonio familiar que no
          superen los umbrales establecidos. {"\n"}• No realizar ninguna
          actividad laboral ni estar inscrito como demandante de empleo.
        </Text>

        <Text style={styles.subtitle}>Cuantía de la Ayuda</Text>
        <Text style={styles.content}>
          La beca tiene un importe máximo de 6.000 € anuales, distribuidos en
          pagos mensuales, siempre que se cumplan los requisitos académicos y
          económicos durante todo el curso.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/educacion/portales/becas-ayudas/becas/beca-6000"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Presentación electrónica mediante la Secretaría Virtual
          de los Centros Educativos. {"\n"}• Plazo: Desde el 24 de diciembre de
          2024 hasta el 23 de enero de 2025.
        </Text>

        <Text style={styles.subtitle}>Simulador de Ayudas</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorBeca6000")}
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

export default Beca6000;
