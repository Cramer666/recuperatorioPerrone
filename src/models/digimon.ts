export type Level = 'Fresh' | 'In-Training' | 'Rookie' | 'Champion' | 'Ultimate';
export const Levels = ['Fresh', 'In-Training', 'Rookie', 'Champion', 'Ultimate'];

export type Type = 'Beast' | 'Cyborg' | 'Dragon' | 'Machine' | 'Insect' | 'Aquatic' | 'Undead' | 'Holy' | 'Dark' | 'Plant' | 'Bird' | 'Reptile' | 'Fairy' | 'Unknown';
export const Types = ['Beast', 'Cyborg', 'Dragon', 'Machine', 'Insect', 'Aquatic', 'Undead', 'Holy', 'Dark', 'Plant', 'Bird', 'Reptile', 'Fairy', 'Unknown'];

export type Attribute = 'Data' | 'Vaccine' | 'Virus' | 'Free' | 'Unknown';
export const Attributes = ['Data', 'Vaccine', 'Virus', 'Free', 'Unknown'];

export type Family =
  | 'Nature Spirits'
  | 'Deep Savers'
  | 'Wind Guardians'
  | 'Metal Empire'
  | 'Nightmare Soldiers'
  | 'Virus Busters'
  | 'Dragon\'s Roar'
  | 'Unknown';
export const Families = [
  'Nature Spirits',
  'Deep Savers',
  'Wind Guardians',
  'Metal Empire',
  'Nightmare Soldiers',
  'Virus Busters',
  'Dragon\'s Roar',
  'Unknown'
];

export interface Attack {
  name: string;
  description: string;
}

export interface Digimon {
  name: string;
  level: Level;
  type: Type;
  attribute: Attribute;
  description?: string;
  image?: string;
  evolvesFrom?: string;
  alternateForms?: string[];
}

export type DigimonWithId = Digimon & { _id: string; };
