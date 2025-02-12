import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorPrestacionesDiscapacidad: React.FC = () => {
  const [discapacidad, setDiscapacidad] = useState<string>("");
  const [residencia, setResidencia] = useState<string>("");
  const [renta, setRenta] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (!discapacidad || !residencia || !renta) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const discapacidadNum = parseFloat(discapacidad);
    const rentaNum = parseFloat(renta);

    if (isNaN(discapacidadNum) || isNaN(rentaNum)) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    // Verificar requisitos
    if (
      discapacidadNum >= 33 &&
      residencia.toLowerCase() === "si" &&
      rentaNum <= 1.25
    ) {
      // Calcular importe estimado (ejemplo simplificado)
      let importe = 0;
      if (discapacidadNum >= 65) {
        importe += 1200; // Prótesis auditivas
      }
      if (rentaNum <= 1) {
        importe += 600; // Prótesis dentales
      }
      importe += rentaNum > 1 ? 750 : 6000; // Productos tecnológicos o vehículos

      setImporteEstimado(`Cumples los requisitos. Importe estimado: ${importe}€.`);
    } else {
      setImporteEstimado("No cumples con los requisitos para esta ayuda.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Prestaciones por Discapacidad</Text>

      <Text>Porcentaje de discapacidad (%):</Text>
      <TextInput
        value={discapacidad}
        onChangeText={setDiscapacidad}
        placeholder="Ejemplo: 45"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>¿Resides en Andalucía? (Sí/No):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>Renta per cápita familiar (en relación al IPREM, ej. 1.2):</Text>
      <TextInput
        value={renta}
        onChangeText={setRenta}
        placeholder="Ejemplo: 1.2"
        keyboardType="numeric"
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

export default SimuladorPrestacionesDiscapacidad;
