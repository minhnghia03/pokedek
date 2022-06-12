export type IPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: IType;
  }[];
  stats: {
    baseStat: number;
    stat: IStat;
  }[];
  sprite: string;
  description: string;
  abilities: {
    slot: number;
    isHidden: boolean;
    ability: IAbility;
  }[];
  color: string;
};

export type IType = {
  id: number;
  name: string;
};

export type IStat = {
  id: number;
  name: string;
};

export type IAbility = {
  id: number;
  name: string;
};
