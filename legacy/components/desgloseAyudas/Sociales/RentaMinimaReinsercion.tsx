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
  SimuladorRentaMinima: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RentaMinimaInsercion: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Renta Mínima de Inserción Social en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Renta Mínima de Inserción Social es una prestación económica
          mensual destinada a las personas y familias en situación de pobreza o
          exclusión social en Andalucía. Este programa busca garantizar ingresos
          básicos y fomentar la inclusión social y laboral mediante planes de
          intervención personalizados.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Residir en Andalucía y estar empadronado en un municipio de la
          comunidad.{"\n"}• Edad entre 25 y 64 años (excepciones para jóvenes
          extutelados, víctimas de violencia de género, entre otros).{"\n"}•
          Ingresos mensuales inferiores a la cuantía establecida por el
          programa.{"\n"}• Inscripción como demandante de empleo en el Servicio
          Andaluz de Empleo (SAE).{"\n"}• No disponer de patrimonio superior a
          lo establecido (por ejemplo, fondos bancarios superiores al IPREM
          anual).{"\n"}• Denegación del Ingreso Mínimo Vital, salvo excepciones
          justificadas.
        </Text>

        <Text style={styles.subtitle}>Cuantías</Text>
        <Text style={styles.content}>
          La cuantía base es de **604,22 € mensuales**, incrementándose un 30%
          por cada miembro adicional de la unidad familiar. En casos
          específicos, como familias monoparentales o con personas con
          discapacidad, se aplican complementos adicionales del 22% o más.
        </Text>

        <Text style={styles.subtitle}>Documentación Necesaria</Text>
        <Text style={styles.content}>
          • DNI/NIE del solicitante y miembros del hogar.{"\n"}• Certificado de
          empadronamiento colectivo.{"\n"}• Justificación de ingresos o
          declaración responsable.{"\n"}• Resolución denegatoria del Ingreso
          Mínimo Vital.{"\n"}• Documentación que acredite situaciones especiales
          (por ejemplo, discapacidad, violencia de género, etc.).
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
          presencialmente en los Servicios Sociales Comunitarios.{"\n"}• Plazo:
          Según convocatoria vigente.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Garantiza ingresos mínimos para cubrir necesidades básicas.{"\n"}•
          Incluye un plan personalizado para la inclusión sociolaboral.{"\n"}•
          Complementos adicionales para familias vulnerables (monoparentales,
          con menores o personas con discapacidad).
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorRentaMinima")}
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

export default RentaMinimaInsercion;
