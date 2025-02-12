import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorAyudasEmergencia: React.FC = () => {
  const [residencia, setResidencia] = useState<string>("");
  const [crisisSobrevenida, setCrisisSobrevenida] = useState<string>("");
  const [recursosEconomicos, setRecursosEconomicos] = useState<string>("");
  const [otraAyuda, setOtraAyuda] = useState<string>("");
  const [necesidad, setNecesidad] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (!residencia || !crisisSobrevenida || !recursosEconomicos || !otraAyuda || !necesidad) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const recursosNum = parseFloat(recursosEconomicos);

    if (isNaN(recursosNum)) {
      Alert.alert("Error", "Introduce un valor numérico válido para los recursos económicos.");
      return;
    }

    // Verificar requisitos
    if (
      residencia.toLowerCase() === "si" &&
      crisisSobrevenida.toLowerCase() === "si" &&
      recursosNum < 600 && // Ejemplo: IPREM mensual como referencia
      otraAyuda.toLowerCase() === "no"
    ) {
      // Calcular importe estimado según la necesidad
      let importeBase = 0;

      switch (necesidad.toLowerCase()) {
        case "vivienda":
          importeBase = 1000; // Ejemplo: ayuda para vivienda
          break;
        case "alimentación":
          importeBase = 500; // Ejemplo: ayuda para alimentación
          break;
        case "suministros":
          importeBase = 300; // Ejemplo: ayuda para suministros esenciales
          break;
        default:
          Alert.alert("Error", "Selecciona una necesidad válida (vivienda, alimentación o suministros).");
          return;
      }

      setImporteEstimado(
        `Cumples con los requisitos. Importe estimado de la ayuda: ${importeBase} € para cubrir gastos de ${necesidad}.`
      );
    } else {
      setImporteEstimado(
        "No cumples con los requisitos para las Ayudas de Emergencia Social."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Ayudas de Emergencia Social</Text>

      <Text>¿Resides y estás empadronado en Andalucía? (Sí/No):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>¿Te encuentras en una situación de crisis sobrevenida? (Sí/No):</Text>
      <TextInput
        value={crisisSobrevenida}
        onChangeText={(text) => setCrisisSobrevenida(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>Recursos económicos mensuales disponibles (en euros):</Text>
      <TextInput
        value={recursosEconomicos}
        onChangeText={setRecursosEconomicos}
        placeholder="Ejemplo: 400"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>¿Tienes acceso a otras ayudas que cubran esta necesidad? (Sí/No):</Text>
      <TextInput
        value={otraAyuda}
        onChangeText={(text) => setOtraAyuda(text.trim())}
        placeholder="Ejemplo: No"
        style={styles.input}
      />

      <Text>
        ¿Qué tipo de necesidad necesitas cubrir? (Vivienda, Alimentación, Suministros):
      </Text>
      <TextInput
        value={necesidad}
        onChangeText={(text) => setNecesidad(text.trim())}
        placeholder="Ejemplo: Vivienda"
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

export default SimuladorAyudasEmergencia;
