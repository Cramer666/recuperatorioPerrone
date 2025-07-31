import { DbDigimon, DbEntityId } from "../../respositories/digimon.dbmodel";

export const pabumon: () => DbDigimon = () => ({
  name: "Pabumon",
  level: "Fresh",
  type: "Unknown",
  attribute: "Unknown",
  fields: ["Unknown"],
  description: "Un pequeño Digimon verde con tentáculos, recién nacido del DigiHuevo.",
  attacks: [{ name: "Acid Bubbles", description: "Emite burbujas ácidas para protegerse." }]
});

export const yuramon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Yuramon",
  level: "In-Training",
  type: "Plant",
  attribute: "Unknown",
  fields: ["Nature Spirits"],
  description: "Digimon peludo y esponjoso que adora la luz del sol.",
  attacks: [{ name: "Pollen Blow", description: "Suelta esporas para disuadir a los enemigos." }],
  evolvesFrom: preId
});

export const palmon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Palmon",
  level: "Rookie",
  type: "Plant",
  attribute: "Data",
  fields: ["Nature Spirits"],
  description: "Un Digimon con brazos florales, alegre y muy leal.",
  image: "https://digimon-api.com/images/palmon.png",
  attacks: [
    {
      name: "Poison Ivy",
      description: "Usa sus zarcillos para atrapar o golpear al enemigo."
    }
  ],
  evolvesFrom: preId
});

export const togemon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Togemon",
  level: "Champion",
  type: "Plant",
  attribute: "Data",
  fields: ["Nature Spirits", "Wind Guardians"],
  description: "Digimon con forma de cactus gigante que lucha con guantes de boxeo.",
  image: "https://digimon-api.com/images/togemon.png",
  attacks: [
    {
      name: "Needle Spray",
      description: "Dispara una ráfaga de agujas desde su cuerpo."
    }
  ],
  evolvesFrom: preId
});

export const lillymon: (preId: DbEntityId) => DbDigimon = (preId) => ({
  name: "Lillymon",
  level: "Ultimate",
  type: "Fairy",
  attribute: "Data",
  fields: ["Wind Guardians", "Nature Spirits"],
  description: "Una Digimon hada que puede volar libremente y controlar la flora a su alrededor.",
  image: "https://digimon-api.com/images/lillymon.png",
  attacks: [
    {
      name: "Flower Cannon",
      description: "Dispara un rayo de energía floral desde una flor gigante en su brazo."
    }
  ],
  evolvesFrom: preId
});
