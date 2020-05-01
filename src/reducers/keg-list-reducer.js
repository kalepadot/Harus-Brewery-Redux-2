import BeerImage from '../img/420.gif';
import FishImage from '../img/fish.gif';
import Woof from '../img/woof.gif';

const currentState = {
1: {name: "I'd Rather Be Smokin Cat Nip Pale Ale", brand: "Princess Haru's Brewery", price: "$4.20", alcoholPercent: "8%", inventory: 124, id: 1 },
2: {name: "Your Dog Sucks Milk Stout", brand: "Princess Haru's Brewery", image: FishImage, price: "$4.20", alcoholPercent: "8%", inventory: 124, id: 2},
3: { name: "No Dogs No Masters Lager", brand: "Princess Haru's Brewery", image: Woof, price: "$4.20", alcoholPercent: "666%", inventory: 124, id: 3}
};

const differentState = {
  0: { keg: 1},
  1: { keg: 2}
}

export default (state = initialState, action) => {
  const { name, brand, price, alcoholPercent, inventory, id } = action;
  switch (action.type) {
  case 'ADD_KEG':
    return Object.assign({}, state, {
      [id]: {
        name: name,
        brand: brand,
        price: price,
        alcoholPercent: alcoholPercent,
        inventory: inventory,
        id: id
      }
    });
    case 'DELETE_KEG':
      const newState = { ...state };
      const updatedKegsList = newState.kegsList.filter(keg => keg.id !== id);
      delete newState[id];
      return Object.assign(newState, { kegsList: updatedKegsList }) ;
  default:
    return state;
  }
};