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
  SimuladorBonoCarestia: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BonoCarestia: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bono Carestía en Andalucía</Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ha puesto en marcha el Bono Carestía para ayudar
          a las familias afectadas por el aumento del coste de la vida. Este
          bono está destinado a personas con rentas bajas que necesitan apoyo
          para cubrir los gastos derivados del incremento en los precios de los
          bienes básicos.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Residir en Andalucía y estar empadronado en un municipio andaluz.{" "}
          {"\n"}• Tener una renta familiar que no supere los umbrales
          establecidos en la convocatoria del bono. {"\n"}• Estar en una
          situación económica vulnerable según los criterios de la Junta de
          Andalucía.{"\n"}• Solicitar la ayuda dentro del plazo establecido.
        </Text>

        <Text style={styles.subtitle}>Cuantías</Text>
        <Text style={styles.content}>
          El Bono Carestía ofrece un apoyo económico directo para las familias
          que cumplan los requisitos. La cantidad exacta dependerá de la renta
          familiar y el número de miembros que conforman el hogar.
        </Text>

        <Text style={styles.subtitle}>Documentación Necesaria</Text>
        <Text style={styles.content}>
          • DNI/NIE del solicitante y los miembros de la unidad familiar. {"\n"}
          • Libro de familia o certificado de inscripción en el Registro Civil.{" "}
          {"\n"}• Declaración jurada de ingresos familiares y copia del IRPF del
          último ejercicio fiscal.{"\n"}• Certificado de empadronamiento
          colectivo.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad/areas/familias/ayudas-bono-carestia.html"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Presentación online mediante certificado digital o
          presencialmente en la Delegación Territorial correspondiente. {"\n"}•
          Plazo: Según la convocatoria anual.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Apoyo económico directo para hacer frente al incremento de los
          precios. {"\n"}• Facilita la estabilidad económica en familias con
          recursos limitados.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorBonoCarestia")}
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

export default BonoCarestia;
