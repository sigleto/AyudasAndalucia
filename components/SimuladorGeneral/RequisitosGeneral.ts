type Ayuda = {
  name: string;
  simulador: string[];
};

type Categoria = {
  category: string;
  ayudas: Ayuda[];
};

export const categories: Categoria[] = [
  {
    category: "",
    ayudas: [
      {
        name: "",
        simulador: ["a"],
      },
    ],
  },
  {
    category: "Ayudas educativas",
    ayudas: [
      {
        name: "",
        simulador: [""],
      },
      {
        name: "Beca Adriano",
        simulador: ["SimuladorBecaAdriano"],
      },
      {
        name: "Beca 6000",
        simulador: ["SimuladorBeca6000"],
      },
     
    ],
  },
  {
    category: "Ayudas para emprendedores",
    ayudas: [
      {
        name: "",
        simulador: [""],
      },
      {
        name: "Programa Cuota Cero",
        simulador: ["SimuladorCuotaCero"],
      },
      {
        name: "Programa EmpleaT",
        simulador: ["SimuladorEmpleaT"],
      },
      {
        name: "Subvenciones Trabajo Autónomo",
        simulador: ["SimuladorSubvencionesAutonomos"],
      },
     
    ],
  },
  {
    category: "Ayudas sociales",
    ayudas: [
      {
        name: "",
        simulador: [""],
      },
      {
        name: "Ayuda de emergencia social",
        simulador: ["SimuladorAyudasEmergencia"],
      },
      {
        name: "Programas de solidaridad alimentaria",
        simulador: ["SimuladorSolidaridadAlimentaria"],
      },
      {
        name: "Renta Minima de Reinserción",
        simulador: ["SimuladoRentaMinima"],
      },
    ],
  },
  {
    category: "Ayudas al desempleo",
    ayudas: [
      {
        name: "",
        simulador: [""],
      },
      {
        name: "Beca segunda oportunidad",
        simulador: ["SimuladorBecasSegundaOportunidad"],
      },
      {
        name: "Emigrantes retornados",
        simulador: ["SimuladorAyudasEmigrantesRetornados"],
      },
      {
        name: "Trabajadores Agrarios",
        simulador: ["SimuladorAyudasTrabajadoresAgrarios"],
      },
    ],
  },
  {
    category: "Ayudas familiares",
    ayudas: [
      {
        name: "",
        simulador: [""],
      },
      {
        name: "Ayuda por partos múltiples",
        simulador: ["SimuladorAyudaPartosMultiples"],
      },
      {
        name: "Ayudas para guarderia",
        simulador: ["SimuladorAyudasGuarderia"],
      },

      {
        name: "Bono Carestía",
        simulador: ["SimuladorBonoCarestia"],
      },
    ],
  },
  {
    category: "Ayudas de vivienda",
    ayudas: [
      {
        name: "",
        simulador: [""],
      },
      {
        name: "Ayuda al alquiler de personas vulnerables",
        simulador: ["SimuladorAyudasAlquiler"],
      },
      {
        name: "Programa garantía Vivienda Joven",
        simulador: ["SimuladorGarantiaViviendaJoven"],
      },
      {
        name: "Programas para rehabilitacion de vivienda",
        simulador: ["SimuladorRehabilitacionVivienda"],
      },
      
    ],
  },
  {
    category: "Ayudas para personas con discapacidad",
    ayudas: [
      {
        name: "",
        simulador: [""],
      },
      {
        name: "Ayudas para contratación de personas cuidadoras",
        simulador: ["SimuladorAyudasContratacionCuidadores"],
      },
      {
        name: "Prestaciones sociales por discapacidad",
        simulador: ["SimuladorPrestacionesDiscapacidad"],
      },
      {
        name: "Subvenciones individuales por discapacidad",
        simulador: ["SimuladorSubvencionesDiscapacidad"],
      },
    ],
  },
  {
    category: "Ayudas para Agricultura",
    ayudas: [
      {
        name: "",
        simulador: [""],
      },
      {
        name: "Ayudas para agricultores jóvenes",
        simulador: ["SimuladorAyudasAgricultores"],
      },
      {
        name: "Medidas Sectoriales",
        simulador: ["SimuladorAyudasSectoriales"],
      },
      
    ],
  },
 
];
