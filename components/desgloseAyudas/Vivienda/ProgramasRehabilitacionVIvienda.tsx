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
  SimuladorRehabilitacionVivienda: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RehabilitacionVivienda: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Programa de Rehabilitación de Viviendas en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          El Programa de Rehabilitación de Viviendas de la Junta de Andalucía
          tiene como objetivo mejorar las condiciones de habitabilidad,
          accesibilidad y eficiencia energética de las viviendas y edificios
          residenciales. Las ayudas están dirigidas a propietarios, inquilinos y
          comunidades de propietarios que deseen realizar obras de conservación,
          mejora o adecuación funcional.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • La vivienda debe tener una antigüedad mínima de **15 años**.{"\n"}•
          La superficie útil máxima subvencionable es de **120 m²**.{"\n"}• Las
          obras no deben haber comenzado antes de solicitar la ayuda.{"\n"}• La
          vivienda debe ser residencia habitual durante al menos **5 años** tras
          la finalización de las obras.{"\n"}• Los ingresos familiares no deben
          superar **5,5 veces el IPREM** (para ayudas generales) o **3 veces el
          IPREM** (para casos de vulnerabilidad económica).{"\n"}• En edificios,
          al menos el **50% de las viviendas** deben ser residencia habitual.
        </Text>

        <Text style={styles.subtitle}>Cuantías</Text>
        <Text style={styles.content}>
          • Subvención del **40%** del presupuesto protegible, con un máximo de
          **4.800 €**.{"\n"}• En casos de vulnerabilidad económica o
          accesibilidad, la ayuda puede alcanzar hasta el **75%** del
          presupuesto.{"\n"}• Para actuaciones técnicas (proyectos y dirección
          de obra), se cubre hasta el **70%** del coste, con un máximo de **600
          €**.
        </Text>

        <Text style={styles.subtitle}>Documentación Necesaria</Text>
        <Text style={styles.content}>
          • Solicitud oficial según el modelo establecido.{"\n"}• DNI/NIE del
          solicitante y miembros del hogar.{"\n"}• Escritura pública, contrato
          de arrendamiento o documento que acredite el derecho sobre la
          vivienda.{"\n"}• Certificado de empadronamiento colectivo.{"\n"}•
          Informe técnico o proyecto aprobado por la Consejería correspondiente.
          {"\n"}• Declaración responsable sobre ingresos familiares.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • **Dónde:** A través del portal oficial de la Junta de Andalucía o en
          la Delegación Provincial correspondiente.{"\n"}• **Cómo:**
          Presentación telemática mediante certificado digital o presencialmente
          en los Servicios Sociales Comunitarios.{"\n"}• **Plazo:** Según
          convocatoria anual o hasta agotar presupuesto asignado.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Mejora las condiciones estructurales y energéticas de las viviendas.
          {"\n"}• Facilita la accesibilidad para personas mayores o con
          discapacidad.{"\n"}• Reduce el coste económico mediante subvenciones
          significativas.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorRehabilitacionVivienda")}
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
});

export default RehabilitacionVivienda;
