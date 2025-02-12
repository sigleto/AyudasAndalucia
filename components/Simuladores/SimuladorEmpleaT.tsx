import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const SimuladorEmpleaT: React.FC = () => {
  const [tipoContratacion, setTipoContratacion] = useState<string>("");
  const [colectivo, setColectivo] = useState<string>("");
  const [residencia, setResidencia] = useState<string>("");
  const [jornadaCompleta, setJornadaCompleta] = useState<string>("");
  const [beneficioEstimado, setBeneficioEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (!tipoContratacion || !colectivo || !residencia || !jornadaCompleta) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    // Verificar requisitos
    if (
      tipoContratacion.toLowerCase() === "indefinida" &&
      residencia.toLowerCase() === "si" &&
      (colectivo.toLowerCase() === "menor de 30 años" ||
        colectivo.toLowerCase() === "mayor de 45 años" ||
        colectivo.toLowerCase() === "persona con discapacidad" ||
        colectivo.toLowerCase() === "desempleado de larga duración") &&
      jornadaCompleta.toLowerCase() === "si"
    ) {
      let beneficio = "Subvención base para contratación indefinida.";

      // Beneficios adicionales según colectivo
      switch (colectivo.toLowerCase()) {
        case "menor de 30 años":
          beneficio += " Incentivo adicional por contratación de jóvenes del Sistema Nacional de Garantía Juvenil.";
          break;
        case "persona con discapacidad":
          beneficio += " Subvención adicional por fomentar la inclusión laboral de personas con discapacidad.";
          break;
        case "desempleado de larga duración":
          beneficio += " Bonificación especial por apoyar la reinserción laboral.";
          break;
        default:
          break;
      }

      setBeneficioEstimado(`Cumples con los requisitos. Beneficios estimados: ${beneficio}`);
    } else {
      setBeneficioEstimado("No cumples con los requisitos para el Programa Emplea-T.");
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
      <Text style={styles.title}>Simulador del Programa Emplea-T</Text>

      <Text>Tipo de contratación (Indefinida/Temporal):</Text>
      <TextInput
        value={tipoContratacion}
        onChangeText={(text) => setTipoContratacion(text.trim())}
        placeholder="Ejemplo: Indefinida"
        style={styles.input}
      />

      <Text>
        Colectivo contratado (Menor de 30 años, Mayor de 45 años, Persona con discapacidad, Desempleado de larga duración):
      </Text>
      <TextInput
        value={colectivo}
        onChangeText={(text) => setColectivo(text.trim())}
        placeholder="Ejemplo: Menor de 30 años"
        style={styles.input}
      />

      <Text>¿Resides y desarrollas la actividad en Andalucía? (Sí/No):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: Sí"
        style={styles.input}
      />

      <Text>¿Es una jornada completa? (Sí/No):</Text>
      <TextInput
        value={jornadaCompleta}
        onChangeText={(text) => setJornadaCompleta(text.trim())}
        placeholder="Ejemplo: Sí"
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

export default SimuladorEmpleaT;
