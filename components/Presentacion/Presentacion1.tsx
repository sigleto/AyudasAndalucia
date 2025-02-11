import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';


// Define el tipo de las rutas de tu aplicación
type RootStackParamList = {
  Presentacion2: undefined;
  Home: undefined;
};

const Presentacion1: React.FC = () => {
  const navegacion = useNavigation<NavigationProp<RootStackParamList>>();
  const salto = () => { 
    navegacion.navigate("Principal" as never); 
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.parrafo}>
          {`¡Bienvenidos a 'Ayudas Públicas'! Nuestra aplicación ofrece información y servicios exclusivamente sobre ayudas y subvenciones estatales. No se incluye información sobre ayudas de ámbito autonómico o local.

En algunas ayudas, disponemos de simuladores orientativos diseñados para ayudarte a comprobar si podrías cumplir los requisitos para su concesión. Ten en cuenta que estos simuladores son solo aproximaciones y no garantizan la adjudicación de la ayuda.`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={salto}>
          <Text style={styles.buttonText}>SALTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos se mantienen igual

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 20,
  },
  parrafo: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  skipButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Presentacion1;
