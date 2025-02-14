import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useRoute, RouteProp } from "@react-navigation/native";
import AnuncioRecompensado from '../Anuncios/AnuncioRecompensado';
type RouteParams = {
  edad: string;
  empadronado: string;
  precioVivienda: string;
  certificacionEnergetica: string;
  importeEstimado: string;
};

const InformeGarantiaViviendaJoven: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const {
    edad,
    empadronado,
    precioVivienda,
    certificacionEnergetica,
    importeEstimado,
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
          <h1>Informe del Programa de Garantía Vivienda Joven</h1>
          <p><strong>Datos proporcionados:</strong></p>
          <ul>
            <li><strong>Edad del solicitante:</strong> ${edad} años</li>
            <li><strong>Empadronado en Andalucía:</strong> ${
              empadronado.toLowerCase() === "si" ? "Sí" : "No"
            }</li>
            <li><strong>Precio de la vivienda:</strong> ${precioVivienda} €</li>
            <li><strong>Certificación energética:</strong> ${
              certificacionEnergetica.toUpperCase()
            }</li>
          </ul>
          <h3>Resultado de la simulación:</h3>
          <p class="highlight">${importeEstimado}</p>
          <h3>Descripción:</h3>
          <p>El Programa de Garantía Vivienda Joven está diseñado para facilitar el acceso a la vivienda a jóvenes entre 18 y 40 años que cumplan ciertos requisitos relacionados con el empadronamiento, el precio de la vivienda y la certificación energética.</p>
          <h3>Pasos para acceder al programa:</h3>
          <ol>
            <li>Consulta la normativa oficial y asegúrate de reunir toda la documentación requerida.</li>
            <li>Acredita tu situación mediante certificados oficiales (edad, empadronamiento, etc.).</li>
            <li>Ponte en contacto con las entidades colaboradoras para iniciar el trámite.</li>
          </ol>
          <p><em>Nota:</em> Este informe es meramente informativo y no garantiza la concesión del aval o financiación.</p>
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
      <Text style={styles.title}>Informe del Programa de Garantía Vivienda Joven</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Edad del solicitante:</Text>
        <Text style={styles.value}>{edad} años</Text>

        <Text style={styles.label}>Empadronado en Andalucía:</Text>
        <Text style={styles.value}>
          {empadronado.toLowerCase() === "si" ? "Sí" : "No"}
        </Text>

        <Text style={styles.label}>Precio de la vivienda:</Text>
        <Text style={styles.value}>{precioVivienda} €</Text>

        <Text style={styles.label}>Certificación energética:</Text>
        <Text style={styles.value}>{certificacionEnergetica.toUpperCase()}</Text>

        <Text style={styles.label}>Resultado de la simulación:</Text>
        <Text style={[styles.value, styles.resultado]}>{importeEstimado}</Text>
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

export default InformeGarantiaViviendaJoven;
