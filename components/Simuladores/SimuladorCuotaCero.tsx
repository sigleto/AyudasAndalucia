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
const SimuladorCuotaCero: React.FC = () => {
  const [altaAutonomo, setAltaAutonomo] = useState<string>("");
  const [tarifaPlana, setTarifaPlana] = useState<string>("");
  const [autonomoPrevio, setAutonomoPrevio] = useState<string>("");
  const [deudas, setDeudas] = useState<string>("");
  const [residencia, setResidencia] = useState<string>("");
  const [pluriactividad, setPluriactividad] = useState<string>("");
  const [ingresosNetos, setIngresosNetos] = useState<string>("");
  const [beneficioEstimado, setBeneficioEstimado] = useState<string>("");

  const handleSimulacion = () => {
    // Validar campos
    if (
      !altaAutonomo ||
      !tarifaPlana ||
      !autonomoPrevio ||
      !deudas ||
      !residencia ||
      !pluriactividad
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (
      altaAutonomo.toUpperCase() !== "S" &&
      altaAutonomo.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre si te diste de alta como autónomo."
      );
      return;
    }

    if (
      tarifaPlana.toUpperCase() !== "S" &&
      tarifaPlana.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre si solicitaste la Tarifa Plana Estatal."
      );
      return;
    }

    if (
      autonomoPrevio.toUpperCase() !== "S" &&
      autonomoPrevio.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre si has sido autónomo en los últimos dos años."
      );
      return;
    }

    if (
      deudas.toUpperCase() !== "S" &&
      deudas.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre si tienes deudas con la Seguridad Social o Hacienda."
      );
      return;
    }

    if (
      residencia.toUpperCase() !== "S" &&
      residencia.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre si resides y desarrollas tu actividad en Andalucía."
      );
      return;
    }

    if (
      pluriactividad.toUpperCase() !== "S" &&
      pluriactividad.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre pluriactividad."
      );
      return;
    }

    const ingresosNum = parseFloat(ingresosNetos);

    if (ingresosNetos && isNaN(ingresosNum)) {
      Alert.alert("Error", "Introduce un valor numérico válido para los ingresos netos.");
      return;
    }

    // Verificar requisitos
    if (
      altaAutonomo.toUpperCase() === "S" &&
      tarifaPlana.toUpperCase() === "S" &&
      autonomoPrevio.toUpperCase() === "N" &&
      deudas.toUpperCase() === "N" &&
      residencia.toUpperCase() === "S" &&
      pluriactividad.toUpperCase() === "N"
    ) {
      let beneficio =
        "Eliminación del coste de las cotizaciones sociales durante el primer año.";

      // Extender bonificación al segundo año si los ingresos netos son inferiores al SMI
      if (ingresosNetos && ingresosNum < 15600) {
        // SMI anual aproximado
        beneficio +=
          " Además, puedes extender la bonificación al segundo año.";
      }

      // Subvenciones adicionales
      beneficio +=
        " También podrías optar a subvenciones adicionales de hasta 5.500 €.";

      setBeneficioEstimado(
        `Cumples con los requisitos. Beneficios estimados: ${beneficio}`
      );
    } else {
      setBeneficioEstimado(
        "No cumples con los requisitos para el Programa Cuota Cero."
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
      <Text style={styles.title}>Simulador del Programa Cuota Cero</Text>

      <Text>¿Te diste de alta como autónomo a partir de enero de 2023? (S/N):</Text>
      <TextInput
        value={altaAutonomo}
        onChangeText={(text) => setAltaAutonomo(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Solicitaste la Tarifa Plana Estatal? (S/N):</Text>
      <TextInput
        value={tarifaPlana}
        onChangeText={(text) => setTarifaPlana(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Has sido autónomo en los últimos dos años? (S/N):</Text>
      <TextInput
        value={autonomoPrevio}
        onChangeText={(text) => setAutonomoPrevio(text.trim())}
        placeholder="Ejemplo: N"
        style={styles.input}
      />

      <Text>¿Tienes deudas con la Seguridad Social o Hacienda? (S/N):</Text>
      <TextInput
        value={deudas}
        onChangeText={(text) => setDeudas(text.trim())}
        placeholder="Ejemplo: N"
        style={styles.input}
      />

      <Text>¿Resides y desarrollas tu actividad en Andalucía? (S/N):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Estás en situación de pluriactividad o eres autónomo colaborador? (S/N):</Text>
      <TextInput
        value={pluriactividad}
        onChangeText={(text) => setPluriactividad(text.trim())}
        placeholder="Ejemplo: N"
        style={styles.input}
      />

      <Text>
        Ingresos netos anuales estimados (opcional, solo si quieres calcular la extensión al segundo año):
      </Text>
      <TextInput
        value={ingresosNetos}
        onChangeText={setIngresosNetos}
        placeholder="Ejemplo: 15000"
        keyboardType="numeric"
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

export default SimuladorCuotaCero;
