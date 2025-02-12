import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorSubvencionesAutonomos: React.FC = () => {
  const [altaRETA, setAltaRETA] = useState<string>("");
  const [residencia, setResidencia] = useState<string>("");
  const [tarifaPlana, setTarifaPlana] = useState<string>("");
  const [actividadReciente, setActividadReciente] = useState<string>("");
  const [tipoProyecto, setTipoProyecto] = useState<string>("");
  const [beneficioEstimado, setBeneficioEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (!altaRETA || !residencia || !tarifaPlana || !actividadReciente || !tipoProyecto) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    // Verificar requisitos generales
    if (
      altaRETA.toLowerCase() === "si" &&
      residencia.toLowerCase() === "si" &&
      (actividadReciente.toLowerCase() === "no" || tipoProyecto.toLowerCase() === "digitalización")
    ) {
      let beneficio = "Cumples con los requisitos generales.";

      // Calcular beneficios según el tipo de proyecto
      switch (tipoProyecto.toLowerCase()) {
        case "inicio de actividad":
          beneficio += " Puedes optar a una subvención de entre 3.800 € y 5.500 € para nuevos autónomos.";
          break;
        case "cuota cero":
          beneficio += " Puedes beneficiarte de la bonificación del 100% en las cotizaciones sociales durante el primer año.";
          break;
        case "digitalización":
          beneficio += " Puedes solicitar financiación para proyectos tecnológicos o sostenibles.";
          break;
        default:
          beneficio += " No se ha identificado un tipo de ayuda específico.";
          break;
      }

      setBeneficioEstimado(beneficio);
    } else {
      setBeneficioEstimado("No cumples con los requisitos para las subvenciones.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Subvenciones para Autónomos</Text>

      <Text>¿Estás dado de alta en el RETA? (Sí/No):</Text>
      <TextInput
        value={altaRETA}
        onChangeText={(text) => setAltaRETA(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>¿Resides y desarrollas tu actividad en Andalucía? (Sí/No):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>¿Estás acogido a la tarifa plana estatal? (Sí/No):</Text>
      <TextInput
        value={tarifaPlana}
        onChangeText={(text) => setTarifaPlana(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>¿Has sido autónomo en los últimos dos años? (Sí/No):</Text>
      <TextInput
        value={actividadReciente}
        onChangeText={(text) => setActividadReciente(text.trim())}
        placeholder="Ejemplo: No"
        style={styles.input}
      />

      <Text>
        Tipo de proyecto (Inicio de actividad, Cuota Cero, Digitalización):
      </Text>
      <TextInput
        value={tipoProyecto}
        onChangeText={(text) => setTipoProyecto(text.trim())}
        placeholder="Ejemplo: Digitalización"
        style={styles.input}
      />

      <Button title="Simular" onPress={handleSimulacion} />

      {beneficioEstimado ? (
        <Text style={styles.result}>{beneficioEstimado}</Text>
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

export default SimuladorSubvencionesAutonomos;
