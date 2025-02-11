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
  SimuladorSolidaridadAlimentaria: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SolidaridadAlimentaria: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Programa de Solidaridad y Garantía Alimentaria en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          El Programa de Solidaridad y Garantía Alimentaria tiene como objetivo
          garantizar las necesidades alimentarias básicas de las personas y
          familias en situación de vulnerabilidad social en Andalucía. Este
          programa incluye medidas como la distribución de alimentos, ayudas
          económicas para la adquisición de productos básicos y el refuerzo de
          la alimentación infantil en centros educativos.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Residir en Andalucía, independientemente de la situación
          administrativa.{"\n"}• Estar empadronado en un municipio andaluz, al
          menos seis meses antes de la solicitud (excepto casos de urgencia
          social).{"\n"}• Pertenecer a una unidad familiar cuyos ingresos no
          superen los límites establecidos según el IPREM vigente.{"\n"}•
          Encontrarse en situación de exclusión social o riesgo de estarlo.
          {"\n"}• En caso de menores, estar escolarizados en centros públicos
          con servicio de comedor.
        </Text>

        <Text style={styles.subtitle}>Cuantías</Text>
        <Text style={styles.content}>
          Las cuantías varían según el tamaño de la unidad familiar y las
          necesidades específicas. Por ejemplo, se asignan importes mínimos para
          alimentos que aumentan proporcionalmente con el número de miembros del
          hogar.
        </Text>

        <Text style={styles.subtitle}>Documentación Necesaria</Text>
        <Text style={styles.content}>
          • DNI/NIE del solicitante y miembros del hogar.{"\n"}• Certificado de
          empadronamiento colectivo.{"\n"}• Declaración responsable sobre los
          ingresos familiares.{"\n"}• Libro de familia o documentos que
          acrediten la relación familiar.{"\n"}• En caso de menores,
          justificante de escolarización en centros públicos.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad/servicios/procedimientos/detalle/24580.html"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Presentación online mediante certificado digital o
          presencialmente en los Servicios Sociales Comunitarios
          correspondientes.{"\n"}• Plazo: Según convocatoria vigente.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Garantiza el acceso a alimentos básicos para las familias más
          vulnerables.{"\n"}• Refuerza la alimentación infantil a través del
          servicio de comedor escolar.{"\n"}• Promueve la inclusión social
          mediante medidas complementarias.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorSolidaridadAlimentaria")}
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

export default SolidaridadAlimentaria;
