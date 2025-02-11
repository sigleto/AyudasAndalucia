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
  SimuladorBecaAdriano: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BecaAdriano: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Beca Adriano de la Junta de Andalucía</Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Beca Adriano es una ayuda económica ofrecida por la Junta de
          Andalucía para estudiantes de enseñanzas postobligatorias no
          universitarias. Su objetivo es garantizar la permanencia en el sistema
          educativo y evitar el abandono escolar, promoviendo la igualdad de
          oportunidades.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Estar matriculado en modalidad presencial en enseñanzas oficiales no
          universitarias en Andalucía: Bachillerato, Formación Profesional
          (Grado Medio o Superior), Enseñanzas Profesionales de Música y Danza,
          Artes Plásticas y Diseño, Enseñanzas Deportivas o Enseñanzas
          Artísticas Superiores. {"\n"}• Cumplir los requisitos económicos para
          ser beneficiario de la beca MEC, pero no alcanzar los requisitos
          académicos mínimos establecidos por esta última. {"\n"}• Tener una
          nota media igual o superior a 5 puntos. {"\n"}• No poseer un título
          del mismo nivel o superior al solicitado. {"\n"}• No cursar estudios
          en la modalidad de educación de personas adultas.
        </Text>

        <Text style={styles.subtitle}>Cuantía de la Ayuda</Text>
        <Text style={styles.content}>
          La Beca Adriano tiene una cuantía fija de **1.700 €**, que se abonará
          en un único pago tras la resolución definitiva.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/educacion/portals/web/becas-y-ayudas"
              )
            }
          >
            portal oficial de Becas y Ayudas al Estudio.
          </Text>
          {"\n"}• Cómo: Completar el formulario online y presentarlo junto con
          la documentación requerida. {"\n"}• Plazo: Desde el 28 de enero hasta
          el 27 de febrero de 2025.
        </Text>

        <Text style={styles.subtitle}>Simulador de Ayudas</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorBecaAdriano")}
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

export default BecaAdriano;
