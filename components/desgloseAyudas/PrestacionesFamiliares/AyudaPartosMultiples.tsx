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
  SimuladorAyudasPartosMultiples: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasPartosMultiples: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Ayudas por Partos Múltiples en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece ayudas económicas para familias que hayan
          tenido partos múltiples o un tercer hijo/a, con el objetivo de aliviar
          los costes asociados a la crianza y fomentar la estabilidad económica.
          Estas ayudas se otorgan en un pago único anual durante los primeros
          tres años tras el nacimiento, adopción o acogimiento.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Residir en Andalucía y estar empadronado en un municipio andaluz.{" "}
          {"\n"}• Ostentar la patria potestad o guarda permanente de los
          menores. {"\n"}• Los ingresos de la unidad familiar no deben superar
          los tramos establecidos en el IPREM vigente. {"\n"}• Solicitar la
          ayuda dentro del plazo de un año desde el nacimiento, adopción o
          acogimiento.
        </Text>

        <Text style={styles.subtitle}>Cuantías</Text>
        <Text style={styles.content}>
          Las ayudas se distribuyen de la siguiente manera: {"\n"}• **1.200 €**
          para partos de dos hijos/as. {"\n"}• **2.400 €** para partos de tres
          hijos/as. {"\n"}• **3.600 €** para partos de cuatro hijos/as. {"\n"}•
          **4.800 €** para partos de cinco o más hijos/as. {"\n"}
          Además, se otorgan **600 € anuales** por cada hijo/a menor de tres
          años al momento del nacimiento del nuevo hijo/a.
        </Text>

        <Text style={styles.subtitle}>Documentación Necesaria</Text>
        <Text style={styles.content}>
          • DNI/NIE del padre y la madre. {"\n"}• Libro de familia o certificado
          de inscripción en el Registro Civil. {"\n"}• Declaración jurada de
          ingresos familiares y copia del IRPF del último ejercicio fiscal.{" "}
          {"\n"}• Certificado de empadronamiento colectivo.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad/areas/familias/ayudas-partos.html"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Presentación online mediante certificado digital o
          presencialmente en la Delegación Territorial correspondiente. {"\n"}•
          Plazo: Dentro del primer año tras el nacimiento, adopción o
          acogimiento.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Apoyo económico significativo para afrontar los gastos derivados del
          parto múltiple o la llegada de un tercer hijo/a. {"\n"}• Posibilidad
          de renovación durante los tres primeros años si se mantienen las
          condiciones iniciales.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorAyudasPartosMultiples")}
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

export default AyudasPartosMultiples;
