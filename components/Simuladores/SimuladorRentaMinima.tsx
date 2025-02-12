import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorRentaMinima: React.FC = () => {
  const [residencia, setResidencia] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [ingresosFamiliares, setIngresosFamiliares] = useState<string>("");
  const [miembrosHogar, setMiembrosHogar] = useState<string>("");
  const [patrimonio, setPatrimonio] = useState<string>("");
  const [denegacionIMV, setDenegacionIMV] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (
      !residencia ||
      !edad ||
      !ingresosFamiliares ||
      !miembrosHogar ||
      !patrimonio ||
      !denegacionIMV
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const edadNum = parseInt(edad);
    const ingresosNum = parseFloat(ingresosFamiliares);
    const miembrosNum = parseInt(miembrosHogar);
    const patrimonioNum = parseFloat(patrimonio);

    if (
      isNaN(edadNum) ||
      isNaN(ingresosNum) ||
      isNaN(miembrosNum) ||
      isNaN(patrimonioNum)
    ) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    // Verificar requisitos
    if (
      residencia.toLowerCase() === "si" &&
      edadNum >= 25 &&
      edadNum <= 64 &&
      ingresosNum < 604.22 + (miembrosNum - 1) * (604.22 * 0.3) &&
      patrimonioNum <= 6000 && // Ejemplo: límite de patrimonio en euros
      denegacionIMV.toLowerCase() === "si"
    ) {
      // Calcular importe estimado según los miembros del hogar
      const baseCuantia = 604.22; // Cuantía base mensual
      const incrementoPorMiembro = baseCuantia * 0.3; // Incremento por cada miembro adicional

      const importeTotal =
        baseCuantia + (miembrosNum - 1) * incrementoPorMiembro;

      setImporteEstimado(
        `Cumples con los requisitos. Importe estimado de la ayuda: ${importeTotal.toFixed(
          2
        )} € mensuales.`
      );
    } else {
      setImporteEstimado(
        "No cumples con los requisitos para la Renta Mínima de Inserción Social."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Simulador de la Renta Mínima de Inserción Social
      </Text>

      <Text>¿Resides en Andalucía y estás empadronado? (Sí/No):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>Edad del solicitante:</Text>
      <TextInput
        value={edad}
        onChangeText={setEdad}
        placeholder="Ejemplo: 35"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Ingresos familiares mensuales (en euros):</Text>
      <TextInput
        value={ingresosFamiliares}
        onChangeText={setIngresosFamiliares}
        placeholder="Ejemplo: 500"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Número de miembros en la unidad familiar:</Text>
      <TextInput
        value={miembrosHogar}
        onChangeText={setMiembrosHogar}
        placeholder="Ejemplo: 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Patrimonio total (en euros):</Text>
      <TextInput
        value={patrimonio}
        onChangeText={setPatrimonio}
        placeholder="Ejemplo: 3000"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>
        ¿Has recibido una denegación del Ingreso Mínimo Vital? (Sí/No):
      </Text>
      <TextInput
        value={denegacionIMV}
        onChangeText={(text) => setDenegacionIMV(text.trim())}
        placeholder="Ejemplo: Sí"
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

export default SimuladorRentaMinima;
