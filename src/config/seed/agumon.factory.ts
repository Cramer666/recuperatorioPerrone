import { DbDigimon, DbEntityId } from "../../respositories/digimon.dbmodel";

export const botamon: () => DbDigimon = () => ({
  name: "Botamon",
  level: "Fresh",
  type: "Unknown",
  attribute: "Unknown",
  fields: ["Unknown"],
  description: "Un pequeño Digimon de cuerpo negro con aspecto de gota y ojos brillantes.",
  attacks: [{ name: "Bubble Blow", description: "Lanza burbujas para defenderse." }]
});

export const koromon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Koromon",
  level: "In-Training",
  type: "Unknown",
  attribute: "Unknown",
  fields: ["Unknown"],
  description: "Digimon esférico rosado con orejas y personalidad juguetona.",
  attacks: [{ name: "Bubble Blow", description: "Sopla burbujas para ahuyentar enemigos." }],
  evolvesFrom: preId
});

export const agumon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Agumon",
  level: "Rookie",
  type: "Reptile",
  attribute: "Vaccine",
  fields: ["Nature Spirits", "Dragon's Roar"],
  description: "Un Digimon de tipo reptil que lanza pequeñas bolas de fuego. Leal y valiente.",
  image: "https://digimon-api.com/images/agumon.png",
  attacks: [
    {
      name: "Pepper Breath",
      description: "Lanza una pequeña bola de fuego por la boca."
    }
  ],
  evolvesFrom: preId
});

export const graymon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Greymon",
  level: "Champion",
  type: "Dragon",
  attribute: "Vaccine",
  fields: ["Dragon's Roar"],
  description: "Un Digimon dinosaurio poderoso y valiente con cuernos y casco craneal.",
  image: "https://digimon-api.com/images/greymon.png",
  attacks: [
    {
      name: "Mega Flame",
      description: "Escupe una bola de fuego extremadamente caliente."
    }
  ],
  evolvesFrom: preId
});

export const metalgraymon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "MetalGreymon",
  level: "Ultimate",
  type: "Cyborg",
  attribute: "Vaccine",
  fields: ["Dragon's Roar", "Metal Empire"],
  description: "La evolución cibernética de Greymon. Su cuerpo combina partes biológicas y mecánicas, otorgándole gran poder y resistencia.",
  image: "https://digimon-api.com/images/metalgreymon.png",
  attacks: [
    {
      name: "Giga Destroyer",
      description: "Lanza dos misiles orgánicos desde su pecho que destruyen todo a su paso."
    },
    {
      name: "Trident Arm",
      description: "Ataca con su brazo mecánico extensible para perforar al enemigo."
    }
  ],
  evolvesFrom: preId
});

export const skullgraymon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "SkullGreymon",
  level: "Ultimate",
  type: "Undead",
  attribute: "Virus",
  fields: ["Nightmare Soldiers"],
  description: "Una evolución fallida de Greymon. Se convirtió en un Digimon esquelético sin control, impulsado por pura destrucción.",
  image: "https://digimon-api.com/images/skullgreymon.png",
  attacks: [
    {
      name: "Dark Shot",
      description: "Dispara un enorme misil desde su espina dorsal con fuerza devastadora."
    }
  ],
  evolvesFrom: preId
});
