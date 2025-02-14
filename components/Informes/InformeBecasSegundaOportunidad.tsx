import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useRoute, RouteProp } from "@react-navigation/native";
import AnuncioRecompensado from "../Anuncios/AnuncioRecompensado";

type RouteParams = {
  edad: string;
  desempleo: string;
  estudios: string;
  matricula: string;
  resultado: string;
  cuantia: string;
};

const InformeBecasSegundaOportunidad: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { edad, desempleo, estudios, matricula, resultado, cuantia } =
    route.params || {};

  const [recompensaGanada, setRecompensaGanada] = useState(false);
  const [botonActivo, setBotonActivo] = useState(false);

  const manejarRecompensa = (reward: { type: string; amount: number }) => {
    console.log(`Recompensa obtenida: ${reward.type}, cantidad: ${reward.amount}`);
    setRecompensaGanada(true);
  };

  // Habilitar el botón del PDF cuando se gane la recompensa
  useEffect(() => {
    if (recompensaGanada) {
      setBotonActivo(true);
    }
  }, [recompensaGanada]);

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
          <h2>Becas Segunda Oportunidad</h2>
          <p><strong>Datos proporcionados:</strong></p>
          <ul>
            <li><strong>Edad:</strong> ${edad} años</li>
            <li><strong>En situación de desempleo:</strong> ${
              desempleo === "S" ? "Sí" : "No"
            }</li>
            <li><strong>Finalizó estudios secundarios o superiores:</strong> ${
              estudios === "S" ? "Sí" : "No"
            }</li>
            <li><strong>Matriculado en un programa de formación oficial:</strong> ${
              matricula === "S" ? "Sí" : "No"
            }</li>
          </ul>
          <h3>Resultado de la simulación:</h3>
          <p class="highlight">${resultado}</p>
          ${
            cuantia
              ? `<h3>Cuantía estimada:</h3><p class="highlight">${cuantia}</p>`
              : ""
          }
          <h3>Descripción:</h3>
          <p>Las becas Segunda Oportunidad están dirigidas a jóvenes entre 18 y 30 años que se encuentran en situación de desempleo y desean retomar su formación académica mediante programas oficiales. Estas becas tienen como objetivo fomentar la reinserción educativa y laboral.</p>
          <h3>Pasos para realizar la solicitud:</h3>
          <ol>
            <li>Reúne los documentos necesarios (certificado de desempleo, matrícula en un programa oficial, etc.).</li>
            <li>Consulta con las oficinas de educación o administración pública correspondiente.</li>
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

      {/* Mostrar los datos del informe */}
      <View style={styles.section}>
        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{edad} años</Text>

        <Text style={styles.label}>En situación de desempleo:</Text>
        <Text style={styles.value}>{desempleo === "S" ? "Sí" : "No"}</Text>

        <Text style={styles.label}>
          Finalizó estudios secundarios o superiores:
        </Text>
        <Text style={styles.value}>{estudios === "S" ? "Sí" : "No"}</Text>

        <Text style={styles.label}>
          Matriculado en un programa de formación oficial:
        </Text>
        <Text style={styles.value}>{matricula === "S" ? "Sí" : "No"}</Text>

        <Text style={styles.label}>Resultado:</Text>
        <Text style={[styles.value, styles.resultado]}>{resultado}</Text>

        {cuantia && (
          <>
            <Text style={styles.label}>Cuantía estimada:</Text>
            <Text style={[styles.value, styles.cuantia]}>{cuantia}</Text>
          </>
        )}
      </View>

      {/* Mostrar anuncio si no se ha ganado recompensa */}
      {!recompensaGanada && (
        <AnuncioRecompensado onRewardEarned={manejarRecompensa} />
      )}

      {/* Mostrar botón para generar PDF si ya se ganó recompensa */}
      {botonActivo && (
        <TouchableOpacity onPress={generarPDF} style={styles.boton}>
          <Text style={styles.botonTexto}>Descargar Informe en PDF</Text>
        </TouchableOpacity>
      )}

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
  cuantia: {
    fontWeight: "bold",
    color: "#4caf50",
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

export default InformeBecasSegundaOportunidad;
