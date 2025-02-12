import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorBonoCarestia: React.FC = () => {
  const [residencia, setResidencia] = useState<string>("");
  const [rentaFamiliar, setRentaFamiliar] = useState<string>("");
  const [miembrosHogar, setMiembrosHogar] = useState<string>("");
  const [situacionVulnerable, setSituacionVulnerable] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (!residencia || !rentaFamiliar || !miembrosHogar || !situacionVulnerable) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const rentaNum = parseFloat(rentaFamiliar);
    const miembrosNum = parseInt(miembrosHogar);

    if (isNaN(rentaNum) || isNaN(miembrosNum)) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    // Verificar requisitos
    if (
      residencia.toLowerCase() === "si" &&
      situacionVulnerable.toLowerCase() === "si" &&
      rentaNum <= miembrosNum * 1.5 * 600 // Ejemplo: IPREM mensual multiplicado por número de miembros y un factor de ajuste
    ) {
      // Calcular importe estimado basado en renta y número de miembros
      let importeBase = 200; // Ejemplo: importe base del bono
      let incrementoPorMiembro = 100; // Incremento por cada miembro adicional del hogar

      const importeTotal = importeBase + (miembrosNum - 1) * incrementoPorMiembro;

      setImporteEstimado(
        `Cumples con los requisitos. Importe estimado del Bono Carestía: ${importeTotal} €.`
      );
    } else {
      setImporteEstimado(
        "No cumples con los requisitos para el Bono Carestía."
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
      <Text style={styles.title}>Simulador del Bono Carestía</Text>

      <Text>¿Resides y estás empadronado en Andalucía? (Sí/No):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>Renta familiar mensual (en euros):</Text>
      <TextInput
        value={rentaFamiliar}
        onChangeText={setRentaFamiliar}
        placeholder="Ejemplo: 1200"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Número de miembros en la unidad familiar:</Text>
      <TextInput
        value={miembrosHogar}
        onChangeText={setMiembrosHogar}
        placeholder="Ejemplo: 4"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>¿Estás en una situación económica vulnerable? (Sí/No):</Text>
      <TextInput
        value={situacionVulnerable}
        onChangeText={(text) => setSituacionVulnerable(text.trim())}
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

export default SimuladorBonoCarestia;

