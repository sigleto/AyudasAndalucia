import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AnuncioInt from "../Anuncios/AnuncioIntersticial";
type RootStackParamList = {
  Home: undefined;
  InformeSubvencionesAutonomos: {
    altaRETA: string;
    residencia: string;
    tarifaPlana: string;
    actividadReciente: string;
    tipoProyecto: string;
    beneficioEstimado: string;
  };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SimuladorSubvencionesAutonomos: React.FC = () => {
  const [altaRETA, setAltaRETA] = useState<string>("");
  const [residencia, setResidencia] = useState<string>("");
  const [tarifaPlana, setTarifaPlana] = useState<string>("");
  const [actividadReciente, setActividadReciente] = useState<string>("");
  const [tipoProyecto, setTipoProyecto] = useState<string>("");
  const [beneficioEstimado, setBeneficioEstimado] = useState<string>("");
  const [cumpleRequisitos, setCumpleRequisitos] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp>();

  const handleSimulacion = () => {
    if (!altaRETA || !residencia || !tarifaPlana || !actividadReciente || !tipoProyecto) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (
      altaRETA.toUpperCase() !== "S" &&
      altaRETA.toUpperCase() !== "N"
    ) {
      Alert.alert("Error", "Responde con 'S' o 'N' en la pregunta sobre el alta en el RETA.");
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
      tarifaPlana.toUpperCase() !== "S" &&
      tarifaPlana.toUpperCase() !== "N"
    ) {
      Alert.alert("Error", "Responde con 'S' o 'N' en la pregunta sobre la tarifa plana.");
      return;
    }

    if (
      actividadReciente.toUpperCase() !== "S" &&
      actividadReciente.toUpperCase() !== "N"
    ) {
      Alert.alert(
        "Error",
        "Responde con 'S' o 'N' en la pregunta sobre actividad reciente."
      );
      return;
    }

    if (
      altaRETA.toUpperCase() === "S" &&
      residencia.toUpperCase() === "S" &&
      (actividadReciente.toUpperCase() === "N" || tipoProyecto.toLowerCase() === "digitalización")
    ) {
      let beneficio = "Cumples con los requisitos generales.";

      switch (tipoProyecto.toLowerCase()) {
        case "inicio de actividad":
          beneficio +=
            " Puedes optar a una subvención de entre 3.800 € y 5.500 € para nuevos autónomos.";
          break;
        case "cuota cero":
          beneficio +=
            " Puedes beneficiarte de la bonificación del 100% en las cotizaciones sociales durante el primer año.";
          break;
        case "digitalización":
          beneficio +=
            " Puedes solicitar financiación para proyectos tecnológicos o sostenibles.";
          break;
        default:
          beneficio +=
            " No se ha identificado un tipo de ayuda específico.";
          break;
      }

      setBeneficioEstimado(beneficio);
      setCumpleRequisitos(true);
    } else {
      setBeneficioEstimado("No cumples con los requisitos para las subvenciones.");
      setCumpleRequisitos(false);
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
      <Text style={styles.title}>Simulador de Subvenciones para Autónomos</Text>

      <Text>¿Estás dado de alta en el RETA? (S/N):</Text>
      <TextInput
        value={altaRETA}
        onChangeText={(text) => setAltaRETA(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Resides y desarrollas tu actividad en Andalucía? (S/N):</Text>
      <TextInput
        value={residencia}
        onChangeText={(text) => setResidencia(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Estás acogido a la tarifa plana estatal? (S/N):</Text>
      <TextInput
        value={tarifaPlana}
        onChangeText={(text) => setTarifaPlana(text.trim())}
        placeholder="Ejemplo: S"
        style={styles.input}
      />

      <Text>¿Has sido autónomo en los últimos dos años? (S/N):</Text>
      <TextInput
        value={actividadReciente}
        onChangeText={(text) => setActividadReciente(text.trim())}
        placeholder="Ejemplo: N"
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
        <>
          <Text style={styles.result}>{beneficioEstimado}</Text>

          {cumpleRequisitos && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InformeSubvencionesAutonomos", {
                  altaRETA,
                  residencia,
                  tarifaPlana,
                  actividadReciente,
                  tipoProyecto,
                  beneficioEstimado,
                })
              }
              style={styles.boton}
            >
              <Text style={styles.botonTexto}>Generar Informe PDF</Text>
            </TouchableOpacity>
          )}
        </>
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
  boton: {
    marginTop: 20,
    backgroundColor: "#2a9d8f",
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SimuladorSubvencionesAutonomos;
