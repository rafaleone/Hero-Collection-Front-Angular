import { HeroRarity } from "./hero-rarity";
import { HeroType } from "./hero-type";

export class HeroDetails {
    id: number;
    type: HeroType;
    rarity: HeroRarity;
    attrHealthPoints: number;
    attrMeleAttack: number;
    attrDefense: number;
    attrDistanceAttack: number;
    attrMagicPower: number;
    attrAttackSpeed: number;
    totalPwr: number;
}