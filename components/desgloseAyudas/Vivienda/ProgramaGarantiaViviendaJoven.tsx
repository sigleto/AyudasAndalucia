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
  SimuladorGarantiaViviendaJoven: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const GarantiaViviendaJoven: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Programa de Garantía Vivienda Joven en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          El Programa de Garantía Vivienda Joven es una iniciativa de la Junta
          de Andalucía destinada a facilitar el acceso a la propiedad de la
          primera vivienda para jóvenes de hasta **40 años**. Este programa
          ofrece un aval del **15%** del valor de compra, permitiendo financiar
          hasta el **95%** del precio del inmueble mediante préstamos
          hipotecarios, ya sea para viviendas nuevas o usadas.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Tener entre **18 y 40 años** en el momento de la solicitud.{"\n"}•
          Estar empadronado en un municipio de Andalucía.{"\n"}• Adquirir la
          primera vivienda, que debe destinarse como residencia habitual durante
          al menos **dos años**.{"\n"}• No ser titular de otra vivienda en
          propiedad, salvo excepciones reguladas.{"\n"}• Haber suscrito un
          contrato de arras o preacuerdo de compraventa.{"\n"}• Contar con
          autorización previa del préstamo hipotecario por una entidad
          financiera colaboradora.
        </Text>

        <Text style={styles.subtitle}>Cuantías</Text>
        <Text style={styles.content}>
          • Aval del **15%** del valor de compra, complementando el **80%**
          financiado por la hipoteca bancaria, lo que permite alcanzar una
          financiación total del **95%** del precio del inmueble.{"\n"}• El
          precio máximo de la vivienda es de **295.240 euros**, ampliable hasta
          **354.288 euros** si cuenta con certificación energética A o B.
        </Text>

        <Text style={styles.subtitle}>Documentación Necesaria</Text>
        <Text style={styles.content}>
          • DNI/NIE del solicitante.{"\n"}• Certificado de empadronamiento en
          Andalucía.{"\n"}• Contrato de arras o preacuerdo de compraventa.{"\n"}
          • Certificado negativo catastral y nota simple del Registro de la
          Propiedad.{"\n"}• Declaración responsable que confirme que será su
          residencia habitual.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • **Dónde:** A través de las entidades financieras colaboradoras como
          Caixabank, Cajamar, Santander, Unicaja, entre otras.{"\n"}• **Cómo:**
          La entidad financiera evaluará la solvencia económica del solicitante
          y gestionará la solicitud del aval con la Junta de Andalucía.{"\n"}•
          **Plazo:** Hasta agotar los fondos asignados o el vencimiento del
          convenio vigente.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Facilita el acceso a la propiedad para jóvenes sin ahorros previos
          suficientes.{"\n"}• Reduce significativamente el desembolso inicial
          necesario para adquirir una vivienda.{"\n"}• Apoyo financiero
          respaldado por la Junta para garantizar condiciones favorables.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorGarantiaViviendaJoven")}
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

export default GarantiaViviendaJoven;
