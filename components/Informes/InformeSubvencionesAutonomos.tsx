import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useRoute, RouteProp } from "@react-navigation/native";

type RouteParams = {
  altaRETA: string;
  residencia: string;
  tarifaPlana: string;
  actividadReciente: string;
  tipoProyecto: string;
  beneficioEstimado: string;
};

const InformeSubvencionesAutonomos: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const {
    altaRETA,
    residencia,
    tarifaPlana,
    actividadReciente,
    tipoProyecto,
    beneficioEstimado,
  } = route.params || {};

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
          <h1>Informe de Subvenciones para Autónomos</h1>
          <p><strong>Datos proporcionados:</strong></p>
          <ul>
            <li><strong>Alta en el RETA:</strong> ${
              altaRETA.toLowerCase() === "si" ? "Sí" : "No"
            }</li>
            <li><strong>Reside y desarrolla actividad en Andalucía:</strong> ${
              residencia.toLowerCase() === "si" ? "Sí" : "No"
            }</li>
            <li><strong>Acogido a la tarifa plana estatal:</strong> ${
              tarifaPlana.toLowerCase() === "si" ? "Sí" : "No"
            }</li>
            <li><strong>Ha sido autónomo en los últimos dos años:</strong> ${
              actividadReciente.toLowerCase() === "si" ? "Sí" : "No"
            }</li>
            <li><strong>Tipo de proyecto:</strong> ${tipoProyecto}</li>
          </ul>
          <h3>Resultado de la simulación:</h3>
          <p class="highlight">${beneficioEstimado}</p>
          <h3>Descripción:</h3>
          <p>Este informe detalla las subvenciones disponibles para autónomos que cumplen ciertos requisitos relacionados con el alta en el RETA, la residencia en Andalucía y el tipo de proyecto presentado.</p>
          <h3>Pasos para acceder a las subvenciones:</h3>
          <ol>
            <li>Reúne los documentos necesarios (certificado de alta en el RETA, comprobante de residencia, proyecto detallado, etc.).</li>
            <li>Consulta con las oficinas de empleo o administración pública correspondiente.</li>
            <li>Completa el formulario de solicitud según las indicaciones proporcionadas.</li>
            <li>Entrega los documentos requeridos y espera la resolución.</li>
          </ol>
          <p><em>Nota:</em> Este informe es meramente informativo y no garantiza la concesión de la subvención.</p>
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
      <Text style={styles.title}>Informe de Subvenciones para Autónomos</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Alta en el RETA:</Text>
        <Text style={styles.value}>
          {altaRETA.toLowerCase() === "si" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>
          Reside y desarrolla actividad en Andalucía:
        </Text>
        <Text style={styles.value}>
          {residencia.toLowerCase() === "si" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>Acogido a la tarifa plana estatal:</Text>
        <Text style={styles.value}>
          {tarifaPlana.toLowerCase() === "si" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>
          Ha sido autónomo en los últimos dos años:
        </Text>
        <Text style={styles.value}>
          {actividadReciente.toLowerCase() === "si" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>Tipo de proyecto:</Text>
        <Text style={styles.value}>{tipoProyecto}</Text>

        <Text style={styles.label}>Resultado de la simulación:</Text>
        <Text style={[styles.value, styles.resultado]}>{beneficioEstimado}</Text>
      </View>

      {/* Botón para generar el PDF */}
      <TouchableOpacity onPress={generarPDF} style={styles.boton}>
        <Text style={styles.botonTexto}>Descargar Informe en PDF</Text>
      </TouchableOpacity>

      {/* Botón para regresar a la pantalla principal */}
      <TouchableOpacity
        onPress={() => Alert.alert("Volver", "Regresando a inicio...")}
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
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  botonSecundario: {
    backgroundColor: "#c13855",
    marginTop: 10,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InformeSubvencionesAutonomos;
