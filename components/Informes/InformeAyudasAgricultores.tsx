import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

type RouteParams = {
  edad: string;
  explotacion: string;
  planEmpresarial: string;
  resultado: string;
};

const InformeAyudasAgricultores: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { edad, explotacion, planEmpresarial, resultado } = route.params || {};
const navigation=useNavigation()
  const generarPDF = async () => {
    try {
      const contenidoHTML = `
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #2a9d8f; }
            h2, h3 { color: #444; }
            p { line-height: 1.5; }
            .highlight { font-weight: bold; color: #c13855; }
          </style>
        </head>
        <body>
          <h1>Informe de Simulación</h1>
          <h2>Ayudas para Agricultores Jóvenes</h2>
          <p><strong>Datos proporcionados:</strong></p>
          <ul>
            <li><strong>Edad:</strong> ${edad} años</li>
            <li><strong>Titular de explotación agraria:</strong> ${
              explotacion === "S" ? "Sí" : "No"
            }</li>
            <li><strong>Plan empresarial viable:</strong> ${
              planEmpresarial === "S" ? "Sí" : "No"
            }</li>
          </ul>
          <h3>Resultado de la simulación:</h3>
          <p class="highlight">${resultado}</p>
          <h3>Descripción:</h3>
          <p>Las ayudas para jóvenes agricultores están dirigidas a personas que cumplen ciertos requisitos relacionados con la edad, titularidad de explotaciones agrarias y viabilidad empresarial. Estas ayudas buscan fomentar la incorporación de jóvenes al sector agrícola.</p>
          <h3>Pasos para realizar la solicitud:</h3>
          <ol>
            <li>Reúne los documentos necesarios (identificación, acreditación de titularidad y plan empresarial).</li>
            <li>Consulta con las oficinas agrarias o la administración pública correspondiente.</li>
            <li>Completa el formulario de solicitud según las indicaciones proporcionadas.</li>
            <li>Entrega los documentos requeridos y espera la resolución.</li>
          </ol>
          <p><em>Nota:</em> Este informe es meramente informativo y no sustituye la consulta oficial con los organismos competentes.</p>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: contenidoHTML });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert(
          "No se puede compartir",
          "El dispositivo no admite compartir archivos."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al generar el informe.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe del Simulador</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{edad} años</Text>

        <Text style={styles.label}>Titular de explotación agraria:</Text>
        <Text style={styles.value}>
          {explotacion === "S" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>Plan empresarial viable:</Text>
        <Text style={styles.value}>
          {planEmpresarial === "S" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>Resultado:</Text>
        <Text style={[styles.value, styles.resultado]}>{resultado}</Text>
      </View>

      {/* Botón para generar el PDF */}
      <TouchableOpacity onPress={generarPDF} style={styles.boton}>
        <Text style={styles.botonTexto}>Descargar Informe en PDF</Text>
      </TouchableOpacity>

      {/* Botón para regresar a la pantalla principal */}
      <TouchableOpacity
         onPress={() => navigation.navigate("Home" as never)}
        style={[styles.boton, styles.botonSecundario]}
      >
        <Text style={styles.botonTexto}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a9d8f",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  resultado: {
    fontWeight: "bold",
    color: "#c13855",
    textAlign: "center",
    marginTop: 10,
  },
  boton: {
    backgroundColor: "#c13855",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  botonSecundario: {
    backgroundColor: "#007BFF",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InformeAyudasAgricultores;
