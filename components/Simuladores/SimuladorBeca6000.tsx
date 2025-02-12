import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorBeca6000: React.FC = () => {
  const [empadronado, setEmpadronado] = useState<string>("");
  const [matriculado, setMatriculado] = useState<string>("");
  const [cursoAnteriorAprobado, setCursoAnteriorAprobado] = useState<string>("");
  const [rentaFamiliar, setRentaFamiliar] = useState<string>("");
  const [actividadLaboral, setActividadLaboral] = useState<string>("");
  const [importeEstimado, setImporteEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (
      !empadronado ||
      !matriculado ||
      !cursoAnteriorAprobado ||
      !rentaFamiliar ||
      !actividadLaboral
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const rentaNum = parseFloat(rentaFamiliar);

    if (isNaN(rentaNum)) {
      Alert.alert("Error", "Introduce un valor numérico válido para la renta.");
      return;
    }

    // Verificar requisitos
    if (
      empadronado.toLowerCase() === "si" &&
      matriculado.toLowerCase() === "si" &&
      cursoAnteriorAprobado.toLowerCase() === "si" &&
      rentaNum <= 1.5 && // Ejemplo: umbral de renta familiar en relación al IPREM
      actividadLaboral.toLowerCase() === "no"
    ) {
      setImporteEstimado(
        `Cumples con los requisitos. Importe estimado: hasta 6.000 € anuales distribuidos en pagos mensuales.`
      );
    } else {
      setImporteEstimado(
        "No cumples con los requisitos para la Beca 6000."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Beca 6000</Text>

      <Text>¿Estás empadronado en Andalucía? (Sí/No):</Text>
      <TextInput
        value={empadronado}
        onChangeText={(text) => setEmpadronado(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>¿Estás matriculado del curso completo en modalidad presencial? (Sí/No):</Text>
      <TextInput
        value={matriculado}
        onChangeText={(text) => setMatriculado(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>¿Has aprobado todas las asignaturas del curso anterior? (Sí/No):</Text>
      <TextInput
        value={cursoAnteriorAprobado}
        onChangeText={(text) => setCursoAnteriorAprobado(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>Renta per cápita familiar (en relación al IPREM, ej. 1.2):</Text>
      <TextInput
        value={rentaFamiliar}
        onChangeText={setRentaFamiliar}
        placeholder="Ejemplo: 1.2"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>¿Realizas alguna actividad laboral o estás inscrito como demandante de empleo? (Sí/No):</Text>
      <TextInput
        value={actividadLaboral}
        onChangeText={(text) => setActividadLaboral(text.trim())}
        placeholder="Ejemplo: No"
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

export default SimuladorBeca6000;
