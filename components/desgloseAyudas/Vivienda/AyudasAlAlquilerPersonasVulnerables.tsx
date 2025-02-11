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
  SimuladorAyudasAlquiler: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasAlquiler: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Programa de Ayudas al Alquiler para Personas Vulnerables en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          Este programa ofrece ayudas económicas destinadas a personas y
          familias en situación de especial vulnerabilidad para facilitar el
          pago del alquiler de su vivienda habitual. Las subvenciones pueden
          cubrir entre el 40% y el 75% de la renta mensual, dependiendo de la
          situación del solicitante. En casos excepcionales, como mayores de 65
          años o situaciones de vulnerabilidad extrema, la ayuda puede alcanzar
          hasta el 75%.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Ser titular de un contrato de arrendamiento de vivienda habitual con
          una renta igual o inferior a **600 euros mensuales** (ampliable a
          **900 euros** en casos justificados).{"\n"}• Estar empadronado en
          Andalucía o acreditar residencia en la zona mediante certificado
          policial con más de un año de antigüedad.{"\n"}• No disponer de otra
          vivienda en propiedad o usufructo (salvo excepciones como separación o
          discapacidad).{"\n"}• Acreditar situación de vulnerabilidad económica,
          social o habitacional mediante informe de los Servicios Sociales
          Comunitarios.{"\n"}• Haber abonado la fianza del contrato y estar al
          corriente del pago del alquiler.
        </Text>

        <Text style={styles.subtitle}>Cuantías</Text>
        <Text style={styles.content}>
          • **40%** del alquiler mensual para la mayoría de los beneficiarios.
          {"\n"}• **50%** para mayores de 65 años.{"\n"}• Hasta **75%** para
          personas en situaciones de especial vulnerabilidad, como víctimas de
          violencia de género, personas sin hogar o desahuciadas.
        </Text>

        <Text style={styles.subtitle}>Documentación Necesaria</Text>
        <Text style={styles.content}>
          • DNI/NIE del solicitante y miembros del hogar.{"\n"}• Contrato de
          arrendamiento y justificante del depósito de la fianza.{"\n"}•
          Certificado histórico colectivo de empadronamiento.{"\n"}• Informe
          social que acredite la situación de vulnerabilidad.{"\n"}•
          Justificantes de ingresos y gastos relacionados con la vivienda.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • **Dónde:** A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/fomentoarticulaciondelterritorioyvivienda/areas/vivienda-rehabilitacion/fomento-alquiler.html"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• **Cómo:** Presentación telemática con certificado digital o
          presencialmente en las oficinas habilitadas por la Junta.{"\n"}•
          **Plazo:** Según convocatoria anual o hasta agotar presupuesto.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Ayuda económica significativa para garantizar el acceso a una
          vivienda digna.{"\n"}• Flexibilidad en los porcentajes subvencionados
          según las necesidades específicas.{"\n"}• Protección especial para
          colectivos vulnerables como víctimas de violencia o personas sin
          hogar.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorAyudasAlquiler")}
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

export default AyudasAlquiler;
