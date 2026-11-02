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

const SimuladorAyudasGuarderia: React.FC = () => {
  const [residencia, setResidencia] = useState<string>("");
  const [menorTresAños, setMenorTresAños] = useState<string>("");
  const [matriculado, setMatriculado] = useState<string>("");
  const [ingresosFamiliares, setIngresosFamiliares] = useState<string>("");
  const [numeroHijos, setNumeroHijos] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (
      !residencia ||
      !menorTresAños ||
      !matriculado ||
      !ingresosFamiliares ||
      !numeroHijos
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (
      residencia.toUpperCase() !== "S" &&
      residencia.toUpperCase() !== "N"
    ) {
      Alert.alert("Error", "Responde con 'S' o 'N' en la pregunta de residencia.");
      return;
    }

    if (
      menorTresAños.toUpperCase() !== "S" &&
      menorTresAños.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre tener un hijo menor de tres años."
      );
      return;
    }

    if (
      matriculado.toUpperCase() !== "S" &&
      matriculado.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre si está matriculado en una guardería."
      );
      return;
    }

    const ingresosNum = parseFloat(ingresosFamiliares);
    const hijosNum = parseInt(numeroHijos);

    if (isNaN(ingresosNum) || isNaN(hijosNum)) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    // Verificar requisitos
    if (
      residencia.toUpperCase() === "S" &&
      menorTresAños.toUpperCase() === "S" &&
      matriculado.toUpperCase() === "S" &&
      ingresosNum <= hijosNum * 1.5 * 600 // Ejemplo: IPREM mensual multiplicado por número de hijos
    ) {
      // Calcular importe estimado basado en ingresos y número de hijos
      let porcentajeCobertura = 0;

      if (ingresosNum <= hijosNum * 1.2 * 600) {
        porcentajeCobertura = 80; // Cobertura del 80% si los ingresos son bajos
      } else if (ingresosNum <= hijosNum * 1.5 * 600) {
        porcentajeCobertura = 50; // Cobertura del 50% si los ingresos son moderados
      }

      const costeAnualGuarderia = 3000; // Ejemplo: coste promedio anual de una guardería
      const importeAyuda =
        (costeAnualGuarderia * porcentajeCobertura) / 100;

      setImporteEstimado(
        `Cumples con los requisitos. Importe estimado de la ayuda: ${importeAyuda.toFixed(
          2
        )} € (${porcentajeCobertura}% de cobertura).`
      );
    } else {
      setImporteEstimado(
        "No cumples con los requisitos para las ayudas de guardería."
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
      <Text style={styles.title}>Simulador de Ayudas para Guardería</Text>

      <Text>¿Resides y estás empadronado en Andalucía? (S/N):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Tienes un hijo/a menor de tres años? (S/N):</Text>
      <TextInput
        value={menorTresAños}
        onChangeText={(text) => setMenorTresAños(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Está matriculado en una guardería autorizada? (S/N):</Text>
      <TextInput
        value={matriculado}
        onChangeText={(text) => setMatriculado(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>Ingresos familiares mensuales (en euros):</Text>
      <TextInput
        value={ingresosFamiliares}
        onChangeText={setIngresosFamiliares}
        placeholder="Ejemplo: 1200"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Número total de hijos en la unidad familiar:</Text>
      <TextInput
        value={numeroHijos}
        onChangeText={setNumeroHijos}
        placeholder="Ejemplo: 2"
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

export default SimuladorAyudasGuarderia;
