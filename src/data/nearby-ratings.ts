const kirkjufellGuesthouse = 'https://www.google.is/travel/hotels/entity/CgsI_PrBptPd16WeARAB?ap=MABiEzE2NDc5Njg0MjgwMTU3NDk0MTM';
const adventureHotel = 'https://www.google.com/travel/hotels/entity/ChoI89PNhdCf3ffJARoNL2cvMTFrcnAyajE4bhAB?gsas=1';

type Rating = { score: number; count: number; source: string };

export const nearbyRatings: Partial<Record<string, Rating>> = {
  kirkjufell: { score: 4.6, count: 1437, source: kirkjufellGuesthouse },
  grundarfoss: { score: 4.7, count: 389, source: kirkjufellGuesthouse },
  saxholl: { score: 4.5, count: 2617, source: adventureHotel },
  vatnshellir: { score: 4.6, count: 1778, source: adventureHotel },
  budakirkja: { score: 4.5, count: 3635, source: 'https://www.google.com/travel/hotels/entity/ChkIgPbVo4v-2YdZGg0vZy8xMWYzeHp0ZjBsEAE?ts=CAEaBAoCGgAqBAoAGgA' },
};

export const ratingsAccessedOn = '2026-11-23';
