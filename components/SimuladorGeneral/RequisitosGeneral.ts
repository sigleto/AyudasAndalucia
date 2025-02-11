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
        simulador: ["SimuladorBecaGeneral"],
      },
      {
        name: "Beca general",
        simulador: ["SimuladorBecaGeneral"],
      },
      {
        name: "Beca por apoyo educativo especial",
        simulador: ["SimuladorBecaApoyoEducativo"],
      },
      {
        name: "Beca por residencia",
        simulador: ["SimuladorBecaResidencia"],
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
        name: "Ingreso Mínimo Vital",
        simulador: ["SimuladorIngresoMinimoVital"],
      },
      {
        name: "Ley de dependencia",
        simulador: ["SimuladorLeyDeDependencia"],
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
        name: "Ayuda por nacimiento o adopción",
        simulador: ["SimuladorAyudaNacimiento"],
      },
      {
        name: "Prestación por hijos con discapacidad",
        simulador: ["SimuladorPrestacionHijoDiscapacidad"],
      },

      {
        name: "Complemento de ayuda a la infancia",
        simulador: ["SimuladorComplementoAyudaInfancia"],
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
        name: "Ayuda al alquiler",
        simulador: ["SimuladorAyudasAlquiler"],
      },
      {
        name: "Ayuda adquisición para jóvenes",
        simulador: ["SimuladorAyudaJovenesAdquisicion"],
      },
      {
        name: "Bono alquiler joven",
        simulador: ["SimuladorAyudaJovenesAlquiler"],
      },
      {
        name: "Aval del 20% de la hipoteca",
        simulador: ["SimuladorAvalHipoteca"],
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
        name: "Pensión no contributiva",
        simulador: ["SimuladorPensionNoContributiva"],
      },
      {
        name: "Subsidio de movilidad",
        simulador: ["SimuladorSubsidioMovilidad"],
      },
      {
        name: "Asistencia Sanitaria",
        simulador: ["SimuladorAsistenciaSanitaria"],
      },
    ],
  },
  {
    category: "Ayudas agrícolas",
    ayudas: [
      {
        name: "",
        simulador: [""],
      },
      {
        name: "Ayudas Desacopladas",
        simulador: ["SimuladorAyudasDesacopladas"],
      },
      {
        name: "Medidas de desarrollo rural",
        simulador: ["SimuladorDesarrolloRural"],
      },
      {
        name: "Medidas Sectoriales",
        simulador: ["SimuladorMedidasSectoriales"],
      },
    ],
  },
];
