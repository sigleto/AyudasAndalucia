import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorRehabilitacionVivienda: React.FC = () => {
  const [antiguedad, setAntiguedad] = useState<string>("");
  const [superficie, setSuperficie] = useState<string>("");
  const [ingresosFamiliares, setIngresosFamiliares] = useState<string>("");
  const [presupuestoObra, setPresupuestoObra] = useState<string>("");
  const [vulnerabilidad, setVulnerabilidad] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (
      !antiguedad ||
      !superficie ||
      !ingresosFamiliares ||
      !presupuestoObra ||
      !vulnerabilidad
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const antiguedadNum = parseInt(antiguedad);
    const superficieNum = parseFloat(superficie);
    const ingresosNum = parseFloat(ingresosFamiliares);
    const presupuestoNum = parseFloat(presupuestoObra);

    if (
      isNaN(antiguedadNum) ||
      isNaN(superficieNum) ||
      isNaN(ingresosNum) ||
      isNaN(presupuestoNum)
    ) {
      Alert.alert("Error", "Introduce valores numéricos válidos.");
      return;
    }

    // Verificar requisitos
    if (antiguedadNum < 15) {
      setImporteEstimado(
        "No cumples con los requisitos. La vivienda debe tener al menos 15 años de antigüedad."
      );
      return;
    }

    if (superficieNum > 120) {
      setImporteEstimado(
        "No cumples con los requisitos. La superficie útil máxima subvencionable es de 120 m²."
      );
      return;
    }

    if (ingresosNum > 5.5 * 600 || (vulnerabilidad.toLowerCase() === "si" && ingresosNum > 3 * 600)) {
      setImporteEstimado(
        "No cumples con los requisitos. Los ingresos familiares superan el límite establecido."
      );
      return;
    }

    // Calcular subvención
    let porcentajeSubvencion = vulnerabilidad.toLowerCase() === "si" ? 75 : 40; // Subvención del 75% para vulnerabilidad y 40% general
    let maximoSubvencion = vulnerabilidad.toLowerCase() === "si" ? Infinity : 4800; // Máximo de subvención general

    let importeSubvencion = (presupuestoNum * porcentajeSubvencion) / 100;

    if (importeSubvencion > maximoSubvencion) {
      importeSubvencion = maximoSubvencion; // Aplicar límite máximo de subvención
    }

    setImporteEstimado(
      `Cumples con los requisitos. Importe estimado de la ayuda: ${importeSubvencion.toFixed(
        2
      )} € (${porcentajeSubvencion}% del presupuesto protegido).`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Simulador del Programa de Rehabilitación de Viviendas
      </Text>

      <Text>Antigüedad de la vivienda (en años):</Text>
      <TextInput
        value={antiguedad}
        onChangeText={setAntiguedad}
        placeholder="Ejemplo: 20"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Superficie útil de la vivienda (en m²):</Text>
      <TextInput
        value={superficie}
        onChangeText={setSuperficie}
        placeholder="Ejemplo: 90"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Ingresos familiares mensuales (en euros):</Text>
      <TextInput
        value={ingresosFamiliares}
        onChangeText={setIngresosFamiliares}
        placeholder="Ejemplo: 2000"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Presupuesto estimado para las obras (en euros):</Text>
      <TextInput
        value={presupuestoObra}
        onChangeText={setPresupuestoObra}
        placeholder="Ejemplo: 10000"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>
        ¿Te encuentras en una situación de vulnerabilidad económica? (Sí/No):
      </Text>
      <TextInput
        value={vulnerabilidad}
        onChangeText={(text) => setVulnerabilidad(text.trim())}
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

export default SimuladorRehabilitacionVivienda;
