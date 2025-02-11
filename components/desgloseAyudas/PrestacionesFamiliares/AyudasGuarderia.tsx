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
  SimuladorAyudasGuarderia: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AyudasGuarderia: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ayudas para Guardería en Andalucía</Text>

        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.content}>
          La Junta de Andalucía ofrece ayudas económicas para facilitar la
          conciliación de la vida laboral y familiar, mediante el apoyo a las
          familias que matriculen a sus hijos en centros de educación infantil
          autorizados. Estas ayudas están destinadas a cubrir una parte del
          coste de la matrícula y otros gastos relacionados con la guardería.
        </Text>

        <Text style={styles.subtitle}>Requisitos</Text>
        <Text style={styles.content}>
          • Residir en Andalucía y estar empadronado en un municipio andaluz.{" "}
          {"\n"}• Tener un hijo/a menor de 3 años matriculado en una guardería
          autorizada. {"\n"}• Los ingresos de la unidad familiar no deben
          superar los tramos establecidos en el IPREM vigente. {"\n"}• Solicitar
          la ayuda dentro del plazo establecido por la Junta de Andalucía.
        </Text>

        <Text style={styles.subtitle}>Cuantías</Text>
        <Text style={styles.content}>
          Las ayudas se distribuyen en función de los ingresos familiares y el
          número de hijos. Se puede obtener un porcentaje del coste de la
          matrícula y otros gastos. Para más detalles, consulte la normativa
          específica de la convocatoria.
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
                "https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad/areas/familias/ayudas-guarderia.html"
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
          • Apoyo económico para reducir el coste de la matrícula en guarderías
          y facilitar la conciliación. {"\n"}• Ayuda renovable en función de la
          normativa y requisitos establecidos cada año.
        </Text>

        <Text style={styles.subtitle}>Simulador del Programa</Text>
        <Text style={styles.content}>
          Comprueba si cumples los requisitos y calcula el importe estimado con
          nuestro simulador:
        </Text>
        <Button
          title="Acceder al Simulador"
          onPress={() => navigation.navigate("SimuladorAyudasGuarderia")}
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

export default AyudasGuarderia;
