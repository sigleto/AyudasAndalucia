import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  InformeGarantiaViviendaJoven: {
    edad: string;
    empadronado: string;
    precioVivienda: string;
    certificacionEnergetica: string;
    importeEstimado: string;
  };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SimuladorGarantiaViviendaJoven: React.FC = () => {
  const [edad, setEdad] = useState<string>("");
  const [empadronado, setEmpadronado] = useState<string>("");
  const [precioVivienda, setPrecioVivienda] = useState<string>("");
  const [certificacionEnergetica, setCertificacionEnergetica] =
    useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");
  const [cumpleRequisitos, setCumpleRequisitos] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp>();

  const handleSimulacion = () => {
    if (!edad || !empadronado || !precioVivienda || !certificacionEnergetica) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const edadNum = parseInt(edad);
    const precioNum = parseFloat(precioVivienda);

    if (isNaN(edadNum) || isNaN(precioNum)) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    let precioMaximo = 295240;
    if (
      certificacionEnergetica.toLowerCase() === "a" ||
      certificacionEnergetica.toLowerCase() === "b"
    ) {
      precioMaximo = 354288;
    }

    if (edadNum < 18 || edadNum > 40) {
      setImporteEstimado(
        "No cumples con los requisitos. La edad debe estar entre 18 y 40 años."
      );
      setCumpleRequisitos(false);
      return;
    }

    if (empadronado.toLowerCase() !== "si") {
      setImporteEstimado(
        "No cumples con los requisitos. Debes estar empadronado en un municipio de Andalucía."
      );
      setCumpleRequisitos(false);
      return;
    }

    if (precioNum > precioMaximo) {
      setImporteEstimado(
        `No cumples con los requisitos. El precio de la vivienda no puede superar los ${precioMaximo} €.`
      );
      setCumpleRequisitos(false);
      return;
    }

    const aval = precioNum * 0.15;
    const financiacionTotal = precioNum * 0.95;

    setImporteEstimado(
      `Cumples con los requisitos. Aval estimado: ${aval.toFixed(
        2
      )} €. Financiación total posible: ${financiacionTotal.toFixed(2)} €.`
    );
    setCumpleRequisitos(true);
  };

  React.useEffect(() => {
    Alert.alert(
      "Aviso importante",
      "Este simulador es una herramienta orientativa y no contempla necesariamente todos los requisitos o condiciones específicos aplicables a cada caso particular. Por tanto, el resultado obtenido no es vinculante ni garantiza la concesión de la ayuda.\n\nPara obtener información oficial y confirmar tu situación, es imprescindible consultar con el organismo competente o acudir a las fuentes oficiales correspondientes.",
      [{ text: "Entendido" }]
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Simulador del Programa de Garantía Vivienda Joven
      </Text>

      <Text>Edad del solicitante:</Text>
      <TextInput
        value={edad}
        onChangeText={setEdad}
        placeholder="Ejemplo: 30"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>¿Estás empadronado en Andalucía? (Sí/No):</Text>
      <TextInput
        value={empadronado}
        onChangeText={(text) => setEmpadronado(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>Precio de la vivienda (en euros):</Text>
      <TextInput
        value={precioVivienda}
        onChangeText={setPrecioVivienda}
        placeholder="Ejemplo: 200000"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Certificación energética de la vivienda (A/B/No aplica):</Text>
      <TextInput
        value={certificacionEnergetica}
        onChangeText={(text) => setCertificacionEnergetica(text.trim())}
        placeholder="Ejemplo: A"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {importeEstimado ? (
        <>
          <Text style={styles.result}>{importeEstimado}</Text>

          {cumpleRequisitos && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InformeGarantiaViviendaJoven", {
                  edad,
                  empadronado,
                  precioVivienda,
                  certificacionEnergetica,
                  importeEstimado,
                })
              }
              style={styles.boton}
            >
              <Text style={styles.botonTexto}>Generar Informe PDF</Text>
            </TouchableOpacity>
          )}
        </>
      ) : null}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2a9d8f",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4caf50",
  },
  boton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SimuladorGarantiaViviendaJoven;
