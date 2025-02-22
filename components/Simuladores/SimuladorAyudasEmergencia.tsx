import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import AnuncioInt from "../Anuncios/AnuncioIntersticial";

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

    if (
      residencia.toUpperCase() !== "S" &&
      residencia.toUpperCase() !== "N"
    ) {
      Alert.alert("Error", "Responde con 'S' o 'N' en la pregunta sobre residencia.");
      return;
    }

    if (
      crisisSobrevenida.toUpperCase() !== "S" &&
      crisisSobrevenida.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre crisis sobrevenida."
      );
      return;
    }

    if (
      otraAyuda.toUpperCase() !== "S" &&
      otraAyuda.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre acceso a otras ayudas."
      );
      return;
    }

    const recursosNum = parseFloat(recursosEconomicos);

    if (isNaN(recursosNum)) {
      Alert.alert("Error", "Introduce un valor numérico válido para los recursos económicos.");
      return;
    }

    // Verificar requisitos
    if (
      residencia.toUpperCase() === "S" &&
      crisisSobrevenida.toUpperCase() === "S" &&
      recursosNum < 600 && // Ejemplo: IPREM mensual como referencia
      otraAyuda.toUpperCase() === "N"
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
          Alert.alert(
            "Error",
            "Selecciona una necesidad válida (vivienda, alimentación o suministros)."
          );
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

  React.useEffect(() => {
    Alert.alert(
      "Aviso importante",
      "Este simulador es una herramienta orientativa y no contempla necesariamente todos los requisitos o condiciones específicos aplicables a cada caso particular. Por tanto, el resultado obtenido no es vinculante ni garantiza la concesión de la ayuda.\n\nPara obtener información oficial y confirmar tu situación, es imprescindible consultar con el organismo competente o acudir a las fuentes oficiales correspondientes.",
      [{ text: "Entendido" }]
    );
  }, []);

  return (
    <View style={styles.container}>
      <AnuncioInt />
      <Text style={styles.title}>Simulador de Ayudas de Emergencia Social</Text>

      <Text>¿Resides y estás empadronado en Andalucía? (S/N):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Te encuentras en una situación de crisis sobrevenida? (S/N):</Text>
      <TextInput
        value={crisisSobrevenida}
        onChangeText={(text) => setCrisisSobrevenida(text.trim())}
        placeholder="Ejemplo: S"
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

      <Text>¿Tienes acceso a otras ayudas que cubran esta necesidad? (S/N):</Text>
      <TextInput
        value={otraAyuda}
        onChangeText={(text) => setOtraAyuda(text.trim())}
        placeholder="Ejemplo: N"
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
