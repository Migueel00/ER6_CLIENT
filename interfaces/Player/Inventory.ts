import Ingredient from '../../components/potions/ingredient';
import Artifact from '../ArtifactsInterface';
import { AntidotePotion } from './AntidotePotion';
import { Armor } from './Armor';
import { Boot } from './Boot';
import { EnhancerPotion } from './EnhancerPotion';
import { HealingPotion } from './HealingPotion';
import { Helmet } from './Helmet';
import { Ring } from './Ring';
import { Weapon } from './Weapon';
import { Shield } from './Shield';

export interface Inventory{
  helmets: Helmet[],
  weapons: Weapon[],
  armors: Armor[],
  shields: Shield[],
  artifacts: Artifact[],
  boots: Boot[],
  rings: Ring[],
  ingredients: Ingredient[],
  healing_potions: HealingPotion[],
  antidote_potions: AntidotePotion[],
  enhancer_potions: EnhancerPotion[],
}
