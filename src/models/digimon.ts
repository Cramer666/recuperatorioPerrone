export type Level = 'Fresh' | 'In-Training' | 'Rookie' | 'Champion' | 'Ultimate' | 'Mega' | 'Ultra' | 'Armor' | 'Hybrid';

export type Type = 'Beast' | 'Cyborg' | 'Dragon' | 'Machine' | 'Insect' | 'Aquatic' | 'Undead' | 'Holy' | 'Dark' | 'Plant' | 'Bird' | 'Reptile' | 'Fairy' | 'Unknown';

export type Attribute = 'Data' | 'Vaccine' | 'Virus' | 'Free' | 'Unknown';

export interface Digimon {
  name: string;
  level: Level;
  type: Type;
  attribute: Attribute;
  description?: string;
  image?: string;
  evolvesFrom?: string;
  alternateForms?: string[];
  createdAt: Date;
  updatedAt: Date;
}
