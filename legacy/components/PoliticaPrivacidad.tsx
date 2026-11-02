import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PoliticaPrivacidad: React.FC = () => {
  const navegacion = useNavigation();

  const salto = () => {
    navegacion.navigate("Principal" as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.titulo}>Política de privacidad:</Text>
        <Text style={styles.parrafo}>
          {"Se ha construido la aplicación Ayudas Andalucía como una aplicación gratuita. Este SERVICIO es proporcionado sin costo alguno y está destinado a ser utilizado tal cual. Esta página se utiliza para informar a los usuarios sobre nuestras políticas con respecto a la recopilación, el uso y la divulgación de Información personal si alguien decide utilizar este Servicio.\n\n" +
            "La aplicación utiliza servicios de terceros que pueden recopilar información utilizada para identificarte.\n\n" +
            "Enlace a la política de privacidad de los proveedores de servicios de terceros utilizados por la aplicación\n\n" +
            "Servicios de Google Play\nExpo\n\n" +
            "Cookies\n\nLas cookies son archivos con una pequeña cantidad de datos que se utilizan comúnmente como identificadores únicos anónimos. Estos se envían a tu navegador desde los sitios web que visitas y se almacenan en la memoria interna de tu dispositivo. Este Servicio no utiliza estas 'cookies' de forma explícita. Sin embargo, la aplicación puede usar código y bibliotecas de terceros que usan 'cookies' para recopilar información y mejorar sus servicios. Tienes la opción de aceptar o rechazar estas cookies y saber cuándo se envía una cookie a tu dispositivo. Si eliges rechazar nuestras cookies, es posible que no puedas utilizar algunas partes de este Servicio.\n\n" +
            "Proveedores de servicio\n\nPodemos emplear empresas e individuos de terceros debido a las siguientes razones: Para facilitar nuestro Servicio; Para proporcionar el Servicio en nuestro nombre; Para realizar servicios relacionados con el Servicio; o Para ayudarnos a analizar cómo se utiliza nuestro Servicio.\n\n" +
            "Seguridad\n\nValoramos tu confianza al proporcionarnos tu información personal, por lo que nos esforzamos por utilizar medios comercialmente aceptables para protegerla. Pero recuerda que ningún método de transmisión por Internet, o método de almacenamiento electrónico es 100% seguro y confiable, y no podemos garantizar tu seguridad absoluta.\n\n" +
            "Enlaces a otros sitios\n\nEste Servicio puede contener enlaces a otros sitios. Si haces clic en un enlace de un tercero, serás dirigido a ese sitio. Ten en cuenta que estos sitios externos no son operados por nosotros. Por lo tanto, te recomendamos encarecidamente que revises la Política de privacidad de estos sitios web. No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios o servicios de terceros.\n\n" +
            "Privacidad de los niños\n\nEstos Servicios no están dirigidos a personas menores de 13 años. No recopilamos a sabiendas información de identificación personal de niños menores de 13 años. En caso de que descubramos que un niño menor de 13 años nos ha proporcionado información personal, la eliminaremos inmediatamente de nuestros servidores. Si eres padre o tutor y sabes que tu hijo nos ha proporcionado información personal, comunícate con nosotros para que podamos tomar las medidas necesarias.\n\n" +
            "Cambios a esta Política de privacidad\n\nPodemos actualizar nuestra Política de privacidad de vez en cuando. Por lo tanto, se te recomienda revisar esta página periódicamente para ver si hay cambios. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Esta política es efectiva a partir del 2024-12-30.\n\n" +
            "Contáctanos\n\nSi tienes alguna pregunta o sugerencia sobre nuestra Política de Privacidad, no dudes en ponerte en contacto con nosotros en trianabaresapp@gmail.com."}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={salto}>
          <Text style={styles.buttonText}>SALTAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
    color: "#007BFF",
  },
  parrafo: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    marginBottom: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
  skipButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PoliticaPrivacidad;
