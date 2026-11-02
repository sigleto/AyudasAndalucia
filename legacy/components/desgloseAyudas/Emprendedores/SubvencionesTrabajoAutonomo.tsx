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
  SimuladorSubvencionesAutonomos: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SubvencionesAutonomos: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Subvenciones para Autónomos en Andalucía
        </Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece diversas subvenciones para fomentar el
          trabajo autónomo, apoyar el inicio de actividad y promover la
          sostenibilidad económica de los emprendedores. Estas ayudas incluyen
          incentivos económicos para nuevos autónomos, bonificaciones en las
          cuotas de la Seguridad Social y financiación para proyectos de
          digitalización y sostenibilidad.
        </Text>

        <Text style={styles.subtitle}>Requisitos Generales</Text>
        <Text style={styles.content}>
          • Estar dado de alta en el Régimen Especial de Trabajadores Autónomos
          (RETA). {"\n"}• Residir y desarrollar la actividad económica en
          Andalucía. {"\n"}• No haber sido autónomo en los últimos dos años
          (para ayudas al inicio de actividad). {"\n"}• Cumplir con los
          requisitos específicos de cada línea de ayuda, como estar acogido a la
          tarifa plana estatal o desarrollar proyectos en zonas rurales.
        </Text>

        <Text style={styles.subtitle}>Tipos de Ayudas Disponibles</Text>
        <Text style={styles.content}>
          • **Ayudas al Inicio de Actividad**: Subvenciones de entre 3.800 y
          5.500 € para nuevos autónomos acogidos a la tarifa plana estatal, con
          carácter retroactivo desde enero de 2023[1][5]. {"\n"}• **Cuota
          Cero**: Bonificación del 100% en las cotizaciones a la Seguridad
          Social durante el primer año, ampliable a dos años en casos
          específicos[2][4]. {"\n"}• **Digitalización y Sostenibilidad**:
          Financiación para creación o mejora de páginas web, instalación de
          energías renovables y proyectos tecnológicos[3].
        </Text>

        <Text style={styles.subtitle}>Proceso de Solicitud</Text>
        <Text style={styles.content}>
          • Dónde: A través del{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/trabajo-autonomo/fomento-trabajo-autonomo.html"
              )
            }
          >
            portal oficial de la Junta de Andalucía.
          </Text>
          {"\n"}• Cómo: Completar el formulario online y adjuntar la
          documentación requerida, como el alta en el RETA, DNI/NIE y
          certificados oficiales. {"\n"}• Plazo: Desde enero hasta septiembre de
          cada año, según convocatoria específica[6][9].
        </Text>

        <Text style={styles.subtitle}>Ventajas</Text>
        <Text style={styles.content}>
          • Apoyo económico directo para iniciar o consolidar actividades
          económicas. {"\n"}• Bonificaciones que reducen significativamente los
          costes iniciales del emprendimiento. {"\n"}• Acceso a recursos
          adicionales para digitalización y sostenibilidad empresarial.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula los beneficios estimados
          con nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorSubvencionesAutonomos")}
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

export default SubvencionesAutonomos;
