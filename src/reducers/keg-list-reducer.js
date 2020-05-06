import BeerImage from '../img/420.gif';
import FishImage from '../img/fish.gif';
import Woof from '../img/woof.gif';

const initialState = {
  showHomePage: true,
  currentSelectedKeg: {},
  kegs: {
    1: {name: "I'd Rather Be Smokin Cat Nip Pale Ale", brand: "Princess Haru's Brewery", image: BeerImage, price: "$4.20", alcoholPercent: "8%", inventory: 124, id: 1},
    2: {name: "Your Dog Sucks Milk Stout", brand: "Princess Haru's Brewery", image: FishImage, price: "$4.20", alcoholPercent: "8%", inventory: 124, id: 2},
    3: { name: "No Dogs No Masters Lager", brand: "Princess Haru's Brewery", image: Woof, price: "$4.20", alcoholPercent: "666%", inventory: 124, id: 3} 
  }
}


export default (state = initialState, action) => {
  const { name, brand, image, price, alcoholPercent, inventory, id } = action;
  switch (action.type) {
  case 'ADD_KEG':
    const newKegsList = Object.assign({}, state.kegs, {
      [id]: {
        name: name,
        brand: brand,
        price: price,
        image: image,
        alcoholPercent: alcoholPercent,
        inventory: inventory,
        id: id
      }
    })

    return  { ...state, kegs: newKegsList };
   
    case 'DELETE_KEG':
      const newState = { ...state };
      delete newState.kegs[id];
      return newState;
      // return Object.assign(newState, { kegsList: updatedKegsList }) ;

    case 'SELECTED_KEG':
      const { selectedKeg } = action;
      // const newSelectedKegState = Object.assign({}, state.currentSelectedKeg, selectedKeg)
      return { ...state, currentSelectedKeg : selectedKeg, showHomePage: false };

    
    case 'RETURN_HOME':
    
    return { ...state, showHomePage: true };
  
    


  default:
    return state;

  }
};
