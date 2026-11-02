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
  SimuladorAyudasEmergencia: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasEmergenciaSocial: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Ayudas de Emergencia Social en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          Las Ayudas de Emergencia Social son prestaciones económicas
          individualizadas destinadas a paliar contingencias extraordinarias que
          requieren atención inmediata. Estas ayudas buscan minimizar el impacto
          de situaciones de crisis social, catástrofes o accidentes, evitando la
          exclusión social y protegiendo a las personas más vulnerables.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Residir en Andalucía y estar empadronado en un municipio andaluz.
          {"\n"}• Encontrarse en una situación coyuntural de crisis sobrevenida.
          {"\n"}• Carecer de recursos económicos suficientes para cubrir
          necesidades básicas.{"\n"}• No tener acceso a otras ayudas que cubran
          la misma necesidad.
        </Text>

        <Text style={styles.subtitle}>Cuantías</Text>
        <Text style={styles.content}>
          Las cuantías varían según la situación específica y las necesidades de
          cada solicitante, siendo evaluadas por los Servicios Sociales
          Comunitarios. Las ayudas pueden cubrir gastos básicos como vivienda,
          alimentación o suministros esenciales.
        </Text>

        <Text style={styles.subtitle}>Documentación Necesaria</Text>
        <Text style={styles.content}>
          • DNI/NIE del solicitante y miembros de la unidad familiar.{"\n"}•
          Certificado de empadronamiento colectivo.{"\n"}• Justificación de
          ingresos o declaración jurada de carencia de los mismos.{"\n"}•
          Documentación que acredite la situación de emergencia (por ejemplo,
          informes médicos, policiales, etc.).
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad/areas/inclusion/servicios-comunitarios/paginas/servicio-prestaciones.html"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Presentación online con certificado digital o
          presencialmente en los Servicios Sociales Comunitarios.{"\n"}• Plazo:
          Según convocatoria vigente.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Atención inmediata a situaciones críticas para evitar la exclusión
          social.{"\n"}• Flexibilidad en el uso de las ayudas según las
          necesidades específicas del solicitante.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorAyudasEmergencia")}
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

export default AyudasEmergenciaSocial;
