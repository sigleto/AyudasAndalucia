import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorGarantiaViviendaJoven: React.FC = () => {
  const [edad, setEdad] = useState<string>("");
  const [empadronado, setEmpadronado] = useState<string>("");
  const [precioVivienda, setPrecioVivienda] = useState<string>("");
  const [certificacionEnergetica, setCertificacionEnergetica] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
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

    // Verificar requisitos
    let precioMaximo = 295240; // Precio máximo base de la vivienda
    if (
      certificacionEnergetica.toLowerCase() === "a" ||
      certificacionEnergetica.toLowerCase() === "b"
    ) {
      precioMaximo = 354288; // Precio máximo ampliado para certificación energética A o B
    }

    if (edadNum < 18 || edadNum > 40) {
      setImporteEstimado(
        "No cumples con los requisitos. La edad debe estar entre 18 y 40 años."
      );
      return;
    }

    if (empadronado.toLowerCase() !== "si") {
      setImporteEstimado(
        "No cumples con los requisitos. Debes estar empadronado en un municipio de Andalucía."
      );
      return;
    }

    if (precioNum > precioMaximo) {
      setImporteEstimado(
        `No cumples con los requisitos. El precio de la vivienda no puede superar los ${precioMaximo} €.`
      );
      return;
    }

    // Calcular aval y financiación
    const aval = precioNum * 0.15; // Aval del 15%
    const financiacionTotal = precioNum * 0.95; // Financiación total del 95%

    setImporteEstimado(
      `Cumples con los requisitos. Aval estimado: ${aval.toFixed(
        2
      )} €. Financiación total posible: ${financiacionTotal.toFixed(2)} €.`
    );
  };

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

      <Text>
        Certificación energética de la vivienda (A/B/No aplica):
      </Text>
      <TextInput
        value={certificacionEnergetica}
        onChangeText={(text) => setCertificacionEnergetica(text.trim())}
        placeholder="Ejemplo: A"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {importeEstimado ? (
        <Text style={styles.result}>{importeEstimado}</Text>
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
});

export default SimuladorGarantiaViviendaJoven;
