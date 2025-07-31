import { DbDigimon, DbEntityId } from "../../respositories/digimon.dbmodel";

export const punimon: () => DbDigimon = () => ({
  name: "Punimon",
  level: "Fresh",
  type: "Unknown",
  attribute: "Unknown",
  fields: ["Unknown"],
  description: "Digimon gelatinoso con ojos pequeños y actitud tranquila.",
  attacks: [{ name: "Acid Bubbles", description: "Lanza burbujas ácidas para defenderse." }]
});

export const tsunomon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Tsunomon",
  level: "In-Training",
  type: "Beast",
  attribute: "Unknown",
  fields: ["Unknown"],
  description: "Pequeño Digimon peludo con un cuerno. Ágil y curioso.",
  attacks: [{ name: "Bubble Blow", description: "Sopla burbujas para disuadir a los enemigos." }],
  evolvesFrom: preId
});

export const gabumon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Gabumon",
  level: "Rookie",
  type: "Reptile",
  attribute: "Data",
  fields: ["Nature Spirits"],
  description: "Un Digimon tímido que lleva la piel de un lobo sobre su cuerpo.",
  image: "https://digimon-api.com/images/gabumon.png",
  attacks: [
    {
      name: "Blue Blaster",
      description: "Dispara una flama azul desde su boca."
    }
  ],
  evolvesFrom: preId
});

export const garurumon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Garurumon",
  level: "Champion",
  type: "Beast",
  attribute: "Vaccine",
  fields: ["Nature Spirits"],
  description: "Un Digimon lobo envuelto en pelaje azul, veloz y feroz en batalla.",
  image: "https://digimon-api.com/images/garurumon.png",
  attacks: [
    {
      name: "Howling Blaster",
      description: "Lanza una ráfaga de energía azul helada desde su boca."
    }
  ],
  evolvesFrom: preId
});

export const weregarurumon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "WereGarurumon",
  level: "Ultimate",
  type: "Beast",
  attribute: "Vaccine",
  fields: ["Nature Spirits"],
  description: "La forma bípeda de Garurumon, con habilidades mejoradas en combate cuerpo a cuerpo.",
  image: "https://digimon-api.com/images/weregarurumon.png",
  attacks: [
    {
      name: "Wolf Claw",
      description: "Ataca con sus garras metálicas a gran velocidad."
    }
  ],
  evolvesFrom: preId
});
