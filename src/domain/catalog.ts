import { Aid } from "./types";
export const REVIEW_DATE = "2026-10-30";
const junta = "Junta de Andalucía";
const sede =
  "https://www.juntadeandalucia.es/servicios/sede/tramites/procedimientos/detalle/";
const sepe = "https://www.sepe.es/HomeSepe/prestaciones-desempleo/";
function aid(
  value: Omit<Aid, "reviewed" | "compatibility" | "documents" | "steps"> &
    Partial<Pick<Aid, "compatibility" | "documents" | "steps">>,
): Aid {
  return {
    reviewed: REVIEW_DATE,
    compatibility:
      "Declara otras prestaciones o subvenciones. Consulta las incompatibilidades de la convocatoria antes de solicitarla.",
    documents: [
      "Identificación y documentación acreditativa de los requisitos. Consulta los anexos oficiales para conocer la relación completa.",
    ],
    steps: [
      "Abre la fuente oficial y comprueba el plazo y los requisitos completos.",
      "Prepara los documentos y presenta el formulario por el canal indicado.",
      "Guarda el justificante y revisa las notificaciones y subsanaciones.",
    ],
    ...value,
  };
}
export const aids: Aid[] = [
  aid({
    id: "paro",
    name: "Prestación contributiva por desempleo",
    category: "Desempleo",
    audience: ["Personas desempleadas"],
    agency: "SEPE",
    status: "permanent",
    period:
      "Plazo personal tras situación legal de desempleo; consultar vacaciones pendientes y fecha de solicitud.",
    summary: "Protección por pérdida de empleo con cotizaciones suficientes.",
    requirements: [
      "Situación legal de desempleo e inscripción como demandante.",
      "Al menos 360 días de cotización no utilizados en los seis años anteriores, con reglas especiales para algunos supuestos.",
    ],
    amount:
      "70 % de la base reguladora durante 180 días y 60 % después, con mínimos, máximos y deducciones. Utiliza el programa oficial para incorporar jornada y cargas familiares.",
    source:
      "https://www.sepe.es/HomeSepe/prestaciones-desempleo/prestacion-contributiva/prestacion-contributiva-mas-de-un-anyo",
    documents: [
      "Identificación, cuenta bancaria y certificado de empresa si no se ha remitido electrónicamente.",
    ],
    related: ["subsidio"],
  }),
  aid({
    id: "beca-general",
    name: "Beca general · estudios postobligatorios 2026/2027",
    category: "Becas y estudios",
    audience: ["Estudiantes", "Jóvenes"],
    agency: "Ministerio de Educación, Formación Profesional y Deportes",
    status: "closed",
    period:
      "Nuevas solicitudes 2026/2027 cerradas. Actualizar datos o alegar no equivale a presentar una nueva solicitud.",
    summary:
      "Ayudas al estudio para enseñanzas postobligatorias de la convocatoria general.",
    requirements: [
      "Enseñanza y matrícula elegibles; comprobar requisitos generales y académicos.",
      "Renta y patrimonio familiar dentro de los umbrales de la convocatoria.",
    ],
    amount:
      "Componentes según enseñanza, renta, residencia y rendimiento. No hay un importe único para todos los estudiantes.",
    source:
      "https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/general/05/050130/ficha/050130-2026.html",
    related: ["beca6000", "adriano"],
  }),
  aid({
    id: "imv",
    simulatorSource: "https://imv.seg-social.es/",
    name: "Ingreso Mínimo Vital y complemento de infancia",
    category: "Ayudas sociales",
    audience: ["Hogares con pocos ingresos", "Familias"],
    agency: "INSS · Seguridad Social",
    status: "permanent",
    period: "Solicitud durante todo el año, sujeta a requisitos.",
    summary:
      "Protección de ingresos para personas solas y unidades de convivencia vulnerables.",
    requirements: [
      "Residencia legal y efectiva, con excepciones previstas en la norma.",
      "Acreditar unidad de convivencia, ingresos y patrimonio dentro de los límites aplicables.",
    ],
    amount:
      "Diferencia entre renta garantizada e ingresos computables. Usa el simulador oficial: el patrimonio, la convivencia y el incentivo al empleo pueden cambiar el resultado.",
    source:
      "https://inclusion.gob.es/es/web/inclusion/ingreso-minimo-vital/que-es",
    documents: [
      "Identidad, residencia y convivencia; documentación adicional según situación familiar.",
    ],
    compatibility:
      "Puede coexistir con ingresos del trabajo bajo reglas específicas. El complemento de infancia tiene umbrales propios.",
  }),
  aid({
    id: "rmisa",
    name: "Renta Mínima de Inserción Social de Andalucía",
    category: "Ayudas sociales",
    audience: ["Hogares con pocos ingresos"],
    agency: junta,
    status: "permanent",
    period: "Solicitud permanente; valoración administrativa y social.",
    summary:
      "Prestación y plan de inclusión para hogares en pobreza o exclusión.",
    requirements: [
      "Vecindad administrativa en Andalucía y situación económica acreditada.",
      "Comprobar edad, residencia previa, unidad familiar y excepciones por urgencia.",
      "Revisar la obligación de solicitar otras prestaciones, incluido el IMV.",
    ],
    amount:
      "Depende de la unidad familiar y de los recursos computables. No se usa la antigua base fija de la app.",
    source: sede + "12563.html",
    documents: [
      "Padrón, ingresos, patrimonio y documentación familiar; acreditación relativa al IMV cuando proceda.",
    ],
    related: ["imv", "emergencia"],
  }),
  aid({
    id: "emergencia",
    name: "Ayudas de emergencia social",
    category: "Ayudas sociales",
    audience: ["Hogares con pocos ingresos"],
    agency: "Servicios sociales del ayuntamiento o diputación",
    status: "unknown",
    period: "Consultar disponibilidad y procedimiento de tu municipio.",
    summary:
      "Atención de necesidades extraordinarias que requieren una respuesta inmediata.",
    requirements: [
      "Valoración de la necesidad por servicios sociales comunitarios.",
      "Requisitos económicos y de residencia establecidos localmente.",
    ],
    amount: "No hay un importe único para toda Andalucía.",
    source:
      "https://www.juntadeandalucia.es/organismos/serviciossocialesfamiliaseigualdad/areas/inclusion/servicios-comunitarios/paginas/servicio-prestaciones.html",
    steps: [
      "Pide atención en los servicios sociales de tu municipio.",
      "Explica la necesidad urgente y aporta justificantes de ingresos y gastos.",
      "Sigue las indicaciones del profesional de referencia.",
    ],
  }),
  aid({
    id: "basico",
    name: "Programa BÁSICO · asistencia material",
    category: "Ayudas sociales",
    audience: ["Familias", "Hogares con pocos ingresos"],
    agency: junta,
    status: "open",
    opens: "2026-07-01",
    closes: "2028-10-31",
    period:
      "Derivaciones hasta el 31 de octubre de 2028. Acceso mediante servicios sociales.",
    summary:
      "Apoyo material y acompañamiento social a familias vulnerables con menores.",
    requirements: [
      "Unidad familiar con menores y valoración social.",
      "Ingresos por unidad de consumo inferiores al umbral del marco regulador.",
    ],
    amount:
      "Asignación según valoración y composición familiar; no se calcula sumando cantidades por miembro.",
    source: "https://www.juntadeandalucia.es/boja/2026/124/3",
    steps: [
      "Solicita valoración a servicios sociales comunitarios.",
      "El profesional comprueba las condiciones y tramita la derivación.",
    ],
    related: ["emergencia", "imv"],
  }),
  aid({
    id: "bono-carestia",
    name: "Bono Carestía · convocatoria 2024",
    category: "Familias",
    audience: ["Familias", "Hogares con pocos ingresos"],
    agency: junta,
    status: "historical",
    period: "Referencia de 2024. No habilita nuevas solicitudes en 2026.",
    summary:
      "Ayuda extraordinaria de una convocatoria anterior. Se conserva para identificar expedientes antiguos.",
    requirements: [
      "Los requisitos se referían al hogar y a la renta de la convocatoria de 2024.",
    ],
    amount: "No se ofrece un cálculo actual para este programa histórico.",
    source: "https://www.juntadeandalucia.es/boja/2024/69/4",
    related: ["imv", "basico"],
  }),
  aid({
    id: "retorno",
    name: "Subsidio para emigrantes retornados",
    category: "Desempleo",
    audience: ["Personas desempleadas", "Emigrantes retornados"],
    agency: "SEPE",
    status: "permanent",
    period:
      "Plazo individual: hasta seis meses desde el retorno; la fecha de solicitud afecta al inicio del derecho.",
    summary:
      "Protección asistencial para personas españolas que regresan de determinados países tras trabajar.",
    requirements: [
      "Certificado de emigrante retornado y trabajo en países comprendidos en el programa.",
      "Carencia de rentas y ausencia de derecho a prestación contributiva; revisar cotizaciones y demanda de empleo.",
    ],
    amount:
      "Cuantía y duración según régimen aplicable. Se elimina la antigua cifra de 426 €.",
    source: sepe + "subsidio-desempleo/subsidio-de-emigrante-retornado.html",
    documents: [
      "Certificado de emigrante retornado, identificación, cuenta bancaria y declaración de rentas.",
    ],
  }),
  aid({
    id: "agraria",
    name: "Renta agraria",
    category: "Desempleo",
    audience: ["Personas desempleadas", "Trabajadores agrarios"],
    agency: "SEPE",
    status: "permanent",
    period: "Plazos personales y reglas de renovación del SEPE.",
    summary:
      "Protección para trabajadores eventuales agrarios de Andalucía y Extremadura.",
    requirements: [
      "Inscripción en el SEASS, residencia y demanda de empleo.",
      "Jornadas cotizadas, rentas y antecedentes de prestaciones: comprobar todas las condiciones.",
    ],
    amount:
      "Según jornadas e IPREM. La duración también depende de edad y responsabilidades familiares.",
    source: sepe + "subsidio-desempleo/renta-agraria.html",
    compatibility:
      "Renta agraria y subsidio agrario son programas diferentes. El SEPE debe comprobar cuál corresponde.",
  }),
  aid({
    id: "violencia",
    name: "Subsidio para víctimas de violencia",
    category: "Desempleo",
    audience: ["Víctimas de violencia", "Personas desempleadas"],
    agency: "SEPE",
    status: "permanent",
    period:
      "Plazo personal desde el hecho causante; consultar excepciones y acreditaciones.",
    summary:
      "Protección específica ante violencia de género o sexual y otros supuestos previstos por el SEPE.",
    requirements: [
      "Acreditación válida de la condición de víctima.",
      "Cumplir las condiciones de desempleo, rentas y solicitud del subsidio.",
    ],
    amount:
      "Depende de los períodos reconocidos y del régimen de compatibilidad con empleo.",
    source:
      "https://www.sepe.es/HomeSepe/es/prestaciones-desempleo/subsidio-desempleo/victimas-violencia-genero-o-sexual.html",
    compatibility:
      "El complemento de apoyo al empleo tiene reglas propias. Consulta al SEPE antes de compatibilizar.",
  }),
  aid({
    id: "subsidio",
    name: "Subsidio tras agotar la prestación contributiva",
    category: "Desempleo",
    audience: ["Personas desempleadas"],
    agency: "SEPE",
    status: "permanent",
    period:
      "Plazo individual tras agotamiento; sujeto a prórrogas y requisitos.",
    summary:
      "Protección asistencial cuando termina la prestación contributiva.",
    requirements: [
      "Haber agotado la prestación y cumplir los requisitos de rentas o responsabilidades familiares.",
      "Revisar edad, duración de la prestación agotada y demanda de empleo.",
    ],
    amount:
      "95 % del IPREM los primeros 180 días; 90 % del día 181 al 360; 80 % después. No determina por sí solo la duración del derecho.",
    source:
      "https://sepe.es/HomeSepe/prestaciones-desempleo/subsidio-desempleo/subsidio-agotamiento-prestacion-contributiva",
    compatibility:
      "Las reglas del complemento de apoyo al empleo pueden modificar la cuantía. No aplicar esta escala al subsidio de mayores de 52 años.",
  }),
  aid({
    id: "alquiler",
    name: "Alquiler para personas vulnerables",
    category: "Vivienda",
    audience: ["Hogares con pocos ingresos", "Víctimas de violencia"],
    agency: junta,
    status: "unknown",
    period: "Consultar convocatoria, canal y disponibilidad vigentes.",
    summary:
      "Apoyo al acceso o mantenimiento de vivienda para colectivos especialmente vulnerables.",
    requirements: [
      "Acreditación de vulnerabilidad por servicios sociales.",
      "Comprobar título de ocupación, ingresos y condiciones de la línea concreta.",
    ],
    amount:
      "Según convocatoria; no existe un porcentaje universal por tener más de 65 años.",
    source:
      "https://www.juntadeandalucia.es/temas/vivienda-consumo/alquiler/ayudas.html",
    documents: [
      "Contrato o título de ocupación, recibos y acreditación social/económica.",
    ],
  }),
  aid({
    id: "garantia",
    name: "Garantía Vivienda Andalucía",
    category: "Vivienda",
    audience: ["Jóvenes"],
    agency: junta + " y entidades financieras colaboradoras",
    status: "unknown",
    period:
      "Programa con ampliación de financiación en 2026. Confirmar disponibilidad con el banco.",
    summary:
      "Aval público para facilitar la financiación de la primera vivienda habitual.",
    requirements: [
      "Consultar las condiciones de edad hasta 40 años y de primera vivienda habitual en Andalucía.",
      "La entidad financiera debe aprobar la operación y verificar límites de precio y demás condiciones.",
    ],
    amount:
      "La garantía puede cubrir el tramo que supera el 80 % de financiación. Es un aval, no dinero que se entrega al comprador.",
    source:
      "https://www.juntadeandalucia.es/presidencia/portavoz/economiayempleo/218850/JuntadeAndalucia/ConsejodeGobierno",
    compatibility:
      "Un aval no elimina la deuda hipotecaria ni los gastos de compra. Revisar otras garantías públicas.",
    steps: [
      "Consulta las bases y entidades colaboradoras desde la fuente oficial.",
      "Solicita al banco estudio de solvencia y disponibilidad del programa.",
    ],
  }),
  aid({
    id: "rehabilitacion",
    name: "Rehabilitación energética · Plan Eco Vivienda",
    category: "Vivienda",
    audience: ["Propietarios", "Comunidades de vecinos"],
    agency: junta,
    status: "unknown",
    period:
      "Consultar línea y convocatoria. El plazo de ejecución de obras no es el plazo de solicitud.",
    summary:
      "Programas para rehabilitación y mejora energética de viviendas y edificios.",
    requirements: [
      "Identificar la línea según vivienda, edificio o documentación técnica.",
      "Acreditar las mejoras energéticas y las condiciones de las actuaciones.",
    ],
    amount:
      "Porcentajes y máximos distintos por línea; se requiere documentación técnica.",
    source:
      "https://www.juntadeandalucia.es/organismos/viviendajuventudyordenaciondelterritorio/areas/vivienda-rehabilitacion/plan-eco-vivienda/paginas/plan-eco-convocatoriarehab.html",
    documents: [
      "Proyecto o memoria, presupuesto, certificados energéticos y título habilitante.",
    ],
  }),
  aid({
    id: "multiple",
    name: "Prestación por parto o adopción múltiples",
    category: "Familias",
    audience: ["Familias"],
    agency: "INSS · Seguridad Social",
    status: "permanent",
    period:
      "Derecho sujeto a requisitos y prescripción. Consultar fecha del nacimiento o adopción.",
    summary:
      "Pago único por nacimiento o adopción simultánea de dos o más hijos.",
    requirements: [
      "Residencia legal y nacimiento o adopción en España, con los supuestos asimilados previstos.",
      "No tener derecho a prestación de igual naturaleza en otro régimen público.",
    ],
    amount:
      "4, 8 o 12 veces el SMI mensual, para 2, 3 o 4 y más hijos computables. Cada hijo con discapacidad de al menos el 33 % computa doble.",
    source:
      "https://www.seg-social.es/wps/portal/wss/internet/InformacionUtil/44539/44999/44880/44882",
    calculator: "multiple",
    documents: [
      "Identificación, registro de nacimiento o adopción y acreditación de discapacidad si procede.",
    ],
    compatibility:
      "Comprobar compatibilidades con otras prestaciones familiares; solo una persona beneficiaria por el mismo hecho.",
  }),
  aid({
    id: "infantil",
    name: "Escolarización infantil · ayudas a las familias",
    category: "Familias",
    audience: ["Familias"],
    agency: junta + " · Educación",
    status: "unknown",
    period:
      "Curso 2026/2027. Consultar procedimiento de admisión y convocatoria de ayudas aplicable.",
    summary:
      "Gratuidad y bonificaciones en el primer ciclo infantil según curso, centro y servicio.",
    requirements: [
      "Centro participante y matrícula en el primer ciclo infantil.",
      "Comprobar renta, composición familiar y servicio solicitado.",
    ],
    amount:
      "Las tablas distinguen atención socioeducativa, comedor y circunstancias familiares. No se aplica un coste anual ficticio.",
    source:
      "https://www.juntadeandalucia.es/educacion/portales/web/escolarizacion/0-a-3-anos/programa-de-ayudas-a-las-familias",
    documents: [
      "Solicitud del centro y acreditaciones familiares y económicas exigidas.",
    ],
  }),
  aid({
    id: "beca6000",
    name: "Beca 6000 · curso 2025/2026",
    category: "Becas y estudios",
    audience: ["Estudiantes", "Jóvenes"],
    agency: junta + " · Educación",
    status: "closed",
    period:
      "Convocatoria 2025/2026 cerrada para nuevas solicitudes. Comprobar publicación del curso siguiente.",
    summary: "Apoyo a la continuidad en Bachillerato o FP de grado medio.",
    requirements: [
      "Matrícula en enseñanzas elegibles, requisitos de renta y patrimonio.",
      "Cumplir requisitos académicos, de asistencia y de actividad laboral.",
    ],
    amount:
      "Hasta 6.000 € por curso, con deducciones y condiciones de percepción previstas en las bases.",
    source: "https://www.juntadeandalucia.es/boja/2025/234/1",
    compatibility:
      "Revisar relación con la beca general y sus componentes; no se suman automáticamente.",
  }),
  aid({
    id: "adriano",
    name: "Beca Adriano · curso 2025/2026",
    category: "Becas y estudios",
    audience: ["Estudiantes"],
    agency: junta + " · Educación",
    status: "closed",
    period:
      "Nuevas solicitudes cerradas. Alegaciones de expedientes existentes no reabren la convocatoria.",
    summary:
      "Apoyo a estudiantes de enseñanzas incluidas en las bases con dificultades para acceder a la beca general.",
    requirements: [
      "Enseñanza, modalidad, curso y rendimiento académico contemplados en las bases.",
      "Cumplir los límites económicos y el resto de requisitos.",
    ],
    amount:
      "Consultar la resolución del curso y las incompatibilidades. No se determina solo con una nota media.",
    source:
      "https://www.juntadeandalucia.es/educacion/portales/web/educacion/w/convocatoria-publica-de-la-beca-adriano-para-el-curso-escolar-2025-2026",
  }),
  aid({
    id: "segunda",
    name: "Beca Andalucía Segunda Oportunidad · 2025/2026",
    category: "Becas y estudios",
    audience: ["Jóvenes", "Personas desempleadas", "Estudiantes"],
    agency: junta + " · Educación",
    status: "closed",
    period: "Curso 2025/2026: plazo de nuevas solicitudes cerrado.",
    summary:
      "Facilita volver a estudiar a jóvenes que abandonaron el sistema educativo.",
    requirements: [
      "Edad y situación de desempleo exigidas; matrícula en enseñanzas admitidas.",
      "Comprobar renta, titulaciones previas y obligaciones académicas.",
    ],
    amount:
      "Según convocatoria y disponibilidad presupuestaria; se retira el cálculo automático de 600 € al mes.",
    source: "https://www.juntadeandalucia.es/boja/2025/235/3",
  }),
  aid({
    id: "cuota-cero",
    name: "Cuota Cero · convocatoria 2024–2026",
    category: "Emprendimiento",
    audience: ["Autónomos"],
    agency: junta,
    status: "closed",
    closes: "2026-09-30",
    period:
      "Convocatoria cerrada el 30 de septiembre de 2026. El plazo individual no prolonga el cierre general.",
    summary:
      "Financia cuotas reducidas o bonificadas de Seguridad Social en los supuestos regulados.",
    requirements: [
      "Actividad en Andalucía y disfrute de la reducción o bonificación correspondiente.",
      "Completar el período de alta y pago exigido; comprobar deudas y obligaciones.",
    ],
    amount:
      "Cuotas elegibles efectivamente devengadas; no implica cuotas gratuitas por adelantado.",
    source:
      "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/trabajo-autonomo/fomento-trabajo-autonomo/paginas/preguntas-frecuentes-l1.html",
    compatibility:
      "Algunas medidas de la propia línea son incompatibles entre sí; revisar la medida solicitada.",
  }),
  aid({
    id: "autonomos",
    name: "Inicio de actividad · trabajo autónomo",
    category: "Emprendimiento",
    audience: ["Autónomos"],
    agency: junta,
    status: "closed",
    closes: "2026-09-30",
    period: "Convocatoria 2025/2026 finalizada el 30 de septiembre de 2026.",
    summary: "Incentivos para iniciar una actividad por cuenta propia.",
    requirements: [
      "Alta y cuota reducida en los términos exigidos.",
      "Actividad en Andalucía, plan de viabilidad y mantenimiento exigido por las bases.",
    ],
    amount:
      "Cuantía según colectivo y localidad; consultar expediente y bases.",
    source:
      "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/trabajo-autonomo/fomento-trabajo-autonomo/paginas/preguntas-frecuentes.html",
    related: ["cade", "cuota-cero"],
  }),
  aid({
    id: "empleat",
    name: "Emplea‑T · líneas 1 y 2 (2026)",
    category: "Emprendimiento",
    audience: ["Autónomos", "Empresas"],
    agency: junta,
    status: "open",
    opens: "2026-03-28",
    closes: "2026-10-31",
    period: "28 de marzo a 31 de octubre de 2026, según ampliación publicada.",
    summary:
      "Incentivos a la contratación indefinida por autónomos y empresas según línea.",
    requirements: [
      "Actividad en Andalucía y contratación de colectivos admitidos.",
      "Incremento neto de empleo estable y mantenimiento del contrato según bases.",
    ],
    amount:
      "Depende de línea, jornada y colectivo. No aplicar una cantidad única.",
    source:
      "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/empleo/incentivos-contratacion/paginas/empleat.html",
    documents: [
      "Datos de empresa y contrato, alta en Seguridad Social y declaraciones exigidas.",
    ],
  }),
  aid({
    id: "cade",
    name: "Andalucía Emprende · asesoramiento CADE",
    category: "Emprendimiento",
    audience: ["Autónomos", "Empresas"],
    agency: "Andalucía Emprende · Fundación Pública Andaluza",
    status: "permanent",
    period: "Servicio de orientación; consulta cita y disponibilidad.",
    summary:
      "Asesoramiento, formación y acompañamiento para crear o consolidar un negocio.",
    requirements: [
      "Tener una idea o proyecto empresarial y solicitar el servicio.",
    ],
    amount:
      "Servicio de asesoramiento gratuito; no es una subvención en efectivo.",
    source: "https://www.andaluciaemprende.es/servicios/",
    steps: [
      "Localiza tu CADE y solicita asesoramiento.",
      "Prepara una descripción del proyecto y tus dudas sobre financiación.",
    ],
  }),
  aid({
    id: "discapacidad",
    name: "Pensión no contributiva de incapacidad",
    category: "Discapacidad",
    audience: ["Personas con discapacidad", "Hogares con pocos ingresos"],
    agency: "IMSERSO y Junta de Andalucía",
    status: "permanent",
    period: "Solicitud sujeta a requisitos; revisión de ingresos.",
    summary:
      "Protección económica para personas con discapacidad sin recursos suficientes.",
    requirements: [
      "Tener 18 años y menos de 65; discapacidad reconocida de al menos el 65 %.",
      "Residencia legal en España durante cinco años, incluidos los dos inmediatamente anteriores a la solicitud.",
      "Ingresos personales inferiores a 8.803,20 €/año en 2026. Si convives con familiares, se exige además el límite conjunto correspondiente al parentesco y número de convivientes.",
    ],
    amount:
      "Cuantía íntegra de referencia de 2026: 8.803,20 € anuales en 14 pagas. La cuantía individual depende de rentas y convivencia.",
    source:
      "https://www.imserso.es/documents/20123/1595507/fpnc_2026.pdf/d76f3d01-3c8b-9fc5-9ea8-4d7f6dfdcec4",
    documents: [
      "Reconocimiento de discapacidad, residencia y rentas de la unidad económica.",
    ],
    compatibility:
      "Consultar incompatibilidades y reglas especiales de compatibilidad con trabajo.",
  }),
  aid({
    id: "individuales",
    name: "Subvenciones individuales por discapacidad · 2026",
    category: "Discapacidad",
    audience: ["Personas con discapacidad"],
    agency: junta,
    status: "closed",
    period:
      "Plazo inicial de 15 días hábiles desde la publicación del 26 de mayo de 2026, ya finalizado. Consultar resoluciones y posibles novedades.",
    summary:
      "Apoyos para necesidades y desplazamientos previstos en las bases.",
    requirements: [
      "Discapacidad reconocida de al menos 33 % y vecindad administrativa andaluza.",
      "Renta per cápita no superior a 1,25 IPREM y presupuesto cierto.",
      "Informe favorable del centro de valoración para productos de apoyo cuando proceda.",
    ],
    amount:
      "Según concepto y límites de la convocatoria; no sumar importes de conceptos no solicitados.",
    source: "https://www.juntadeandalucia.es/boja/2026/99/c01/2",
    documents: [
      "Resolución de discapacidad, presupuesto y acreditación económica; informe técnico cuando corresponda.",
    ],
  }),
  aid({
    id: "dependencia",
    name: "Dependencia · servicios y prestaciones",
    category: "Dependencia",
    audience: ["Personas dependientes", "Personas cuidadoras", "Mayores"],
    agency: "Agencia de Servicios Sociales y Dependencia de Andalucía",
    status: "permanent",
    period: "Solicitud permanente de reconocimiento y revisión.",
    summary:
      "Reconocimiento del grado y acceso a servicios o prestaciones mediante el Programa Individual de Atención.",
    requirements: [
      "Solicitar valoración de la situación de dependencia.",
      "Residencia y demás condiciones legales; la prestación depende del PIA.",
    ],
    amount:
      "Según grado, capacidad económica y prestación reconocida. Discapacidad y dependencia no son equivalentes.",
    source:
      "https://www.juntadeandalucia.es/servicios/sede/tramites/procedimientos/detalle/2454",
    documents: [
      "Solicitud, identificación, residencia e informe de salud conforme al procedimiento.",
    ],
    compatibility:
      "El PIA determina servicios y compatibilidades. No hay una ayuda general automática por contratar a un cuidador.",
  }),
  aid({
    id: "jovenes-agrarios",
    name: "Establecimiento de jóvenes agricultores",
    category: "Agricultura",
    audience: ["Trabajadores agrarios", "Jóvenes"],
    agency: junta + " · Agricultura",
    status: "unknown",
    period:
      "Página con resoluciones en 2026. Consultar próxima convocatoria; una resolución no abre solicitudes.",
    summary:
      "Apoyo a la incorporación como titular de una explotación agraria.",
    requirements: [
      "Edad, primera instalación y capacitación previstas en las bases.",
      "Plan empresarial y compromisos de establecimiento.",
    ],
    amount:
      "Prima e incrementos según convocatoria y compromisos; requiere valoración del expediente.",
    source:
      "https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/infraestructuras-agrarias/modernizacion/paginas/establecimiento-jovenes-agricultores-2024-2027.html",
  }),
  aid({
    id: "renove",
    name: "Plan Renove de maquinaria agraria · 2026",
    category: "Agricultura",
    audience: ["Trabajadores agrarios", "Empresas"],
    agency: "Ministerio de Agricultura, Pesca y Alimentación",
    status: "closed",
    closes: "2026-09-15",
    period:
      "Solicitudes cerradas el 15 de septiembre de 2026. Justificación y solicitudes son fases distintas.",
    summary:
      "Renovación de maquinaria dentro de los equipos y líneas admitidos.",
    requirements: [
      "Maquinaria admisible y requisitos de titularidad e inscripción.",
      "Acreditar inversión y retirada de maquinaria cuando se exija.",
    ],
    amount: "Según tipo de máquina y límites de la convocatoria.",
    source:
      "https://www.mapa.gob.es/eu/prensa/ultimas-noticias/detalle_noticias/casi-2.000-agricultores-y-ganaderos-reciben-los-9-4-millones-de-euros-de-las-ayudas-del-plan-renove-de-maquinaria-agraria-2026/ded6ca64-0059-4a05-9b01-ae7e52afdd1d",
  }),
  aid({
    id: "pac",
    name: "PAC · ayudas directas y medidas agrarias",
    category: "Agricultura",
    audience: ["Trabajadores agrarios"],
    agency: junta + " · Agricultura",
    status: "unknown",
    period:
      "Campaña 2026. Consultar el trámite y fase concreta; no asumir que continúa el plazo inicial.",
    summary:
      "Pagos directos y medidas vinculadas a explotaciones, superficies y prácticas agrarias.",
    requirements: [
      "Identificar intervención, explotación y superficies elegibles.",
      "Cumplir condiciones de agricultor, actividad y compromisos de cada intervención.",
    ],
    amount:
      "Depende de derechos, superficies, intervención y controles. No hay una cuantía sectorial única.",
    source: "https://www.juntadeandalucia.es/boja/2026/20/2",
  }),
  aid({
    id: "bono-social",
    name: "Bono social eléctrico",
    category: "Energía",
    audience: ["Hogares con pocos ingresos", "Familias", "Mayores"],
    agency:
      "Ministerio para la Transición Ecológica y comercializadoras de referencia",
    status: "permanent",
    period:
      "Solicitud sujeta a requisitos. Descuentos temporales deben revisarse por fecha.",
    summary:
      "Descuento en la electricidad de la vivienda habitual para consumidores vulnerables.",
    requirements: [
      "Titular del contrato de vivienda habitual con PVPC.",
      "Cumplir alguna vía de acceso por renta, familia numerosa, pensión mínima o IMV en los términos oficiales.",
    ],
    amount:
      "Descuento sujeto a límites de consumo y categoría de vulnerabilidad. No se aplica a toda la factura sin distinción.",
    source:
      "https://www.miteco.gob.es/es/energia/pobreza-energetica/pe-001/requisitos.html",
    steps: [
      "Comprueba contrato PVPC y comercializadora de referencia.",
      "Solicita el bono con su formulario y documentación de la unidad de convivencia.",
    ],
    documents: [
      "Identidad, padrón y acreditación familiar o económica correspondiente.",
    ],
  }),
];
