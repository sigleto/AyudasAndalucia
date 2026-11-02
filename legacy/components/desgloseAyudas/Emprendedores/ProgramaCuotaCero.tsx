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
  SimuladorCuotaCero: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProgramaCuotaCero: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Programa Cuota Cero para Autónomos en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          El Programa Cuota Cero de la Junta de Andalucía es una iniciativa
          destinada a fomentar el autoempleo, permitiendo a los nuevos autónomos
          eliminar el coste de las cotizaciones a la Seguridad Social durante un
          periodo determinado. Este programa complementa la Tarifa Plana Estatal
          y tiene carácter retroactivo para autónomos dados de alta desde enero
          de 2023.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Estar dado de alta como autónomo en el Régimen Especial de
          Trabajadores Autónomos (RETA) a partir de enero de 2023. {"\n"}• Haber
          solicitado previamente la Tarifa Plana Estatal. {"\n"}• No haber sido
          autónomo en los últimos dos años. {"\n"}• No tener deudas con la
          Seguridad Social ni con Hacienda. {"\n"}• Residir y desarrollar la
          actividad económica en Andalucía. {"\n"}• No estar en situación de
          pluriactividad ni ser autónomo colaborador.
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Eliminación del coste de las cotizaciones sociales durante el primer
          año. {"\n"}• Posibilidad de extender la bonificación al segundo año si
          los ingresos netos son inferiores al Salario Mínimo Interprofesional
          (SMI). {"\n"}• Subvenciones adicionales de hasta 5.500 € para
          autónomos beneficiarios del programa.
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/servicios.html"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Completar el formulario online y adjuntar la
          documentación requerida, como el alta en el RETA, DNI/NIE, y
          declaración responsable. {"\n"}• Plazo: Desde el 2 de enero de 2024
          hasta el 30 de septiembre de 2026.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula los beneficios estimados
          con nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorCuotaCero")}
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

export default ProgramaCuotaCero;
