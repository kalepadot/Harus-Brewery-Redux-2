export default (state = {}, action) => {
  switch (action.type) {
  case 'ADD_KEG':
    const { name, brand, price, alcoholPercent, inventory, id } = action;
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
  default:
    return state;
  }
};