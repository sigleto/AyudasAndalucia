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
  SimuladorAndaluciaEmprende: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProgramaAndaluciaEmprende: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Programa Andalucía Emprende</Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          Andalucía Emprende es un programa de la Junta de Andalucía que tiene
          como objetivo apoyar a emprendedores y empresas en todas las fases de
          su desarrollo. A través de los Centros de Apoyo al Desarrollo
          Empresarial (CADE), se ofrecen servicios gratuitos como asesoramiento,
          formación, mentorización y acceso a recursos para facilitar la
          creación y consolidación de negocios.
        </Text>

        <Text style={styles.subtitle}>Servicios Ofrecidos</Text>
        <Text style={styles.content}>
          • **Asesoramiento personalizado** en la creación y desarrollo
          empresarial. {"\n"}• **Formación empresarial** en áreas clave como
          marketing digital, finanzas, transformación digital y habilidades
          blandas. {"\n"}• **Mentorización individualizada** por expertos en
          emprendimiento. {"\n"}• **Acceso a espacios gratuitos**, como oficinas
          y naves industriales, por un tiempo limitado. {"\n"}• **Networking
          empresarial** para conectar con otros emprendedores y empresas. {"\n"}
          • **Apoyo en la internacionalización** para empresas que deseen
          expandirse globalmente.
        </Text>

        <Text style={styles.subtitle}>Itinerario de Emprendimiento</Text>
        <Text style={styles.content}>
          El programa incluye un itinerario dividido en cuatro etapas según el
          estado del proyecto: {"\n"}
          1. Quiero Emprender: Apoyo inicial para quienes tienen una idea de
          negocio. {"\n"}
          2. Tengo una Idea: Validación y desarrollo del modelo de negocio.{" "}
          {"\n"}
          3. Soy una Empresa Reciente: Asesoramiento para startups y empresas
          jóvenes. {"\n"}
          4. Empresa Consolidada: Servicios para empresas con más de tres años
          en el mercado.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL("https://www.andaluciaemprende.es/programas/")
            }
          >
            portal oficial de Andalucía Emprende.
          </Text>
          {"\n"}• Cómo: Solicitar cita previa en el CADE más cercano mediante el{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL("https://www.andaluciaemprende.es/citaprevia/")
            }
          >
            sistema online.
          </Text>{" "}
          También puedes descargar el formulario y presentarlo presencialmente.
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

export default ProgramaAndaluciaEmprende;
