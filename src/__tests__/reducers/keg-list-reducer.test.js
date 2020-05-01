import kegListReducer from '../../reducers/keg-list-reducer';

describe('kegListReducer', () => {

  let action;
  const kegData = {
    name: "haru",
    brand: "harus brewery",
    price: 10,
    alcoholPercent: 10,
    inventory: 124,
    id: 1
  };
  
  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(kegListReducer({}, { type: null })).toEqual({});
  });
  
    test('Should successfully add new ticket data to masterKegList', () => {
    const { name, brand, price, alcoholPercent, inventory, id } = kegData;
    action = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholPercent: alcoholPercent,
      inventory: inventory,
      id: id
    };

    expect(kegListReducer({}, action)).toEqual({
      [id] : {
        name: name,
        brand: brand,
        price: price,
        alcoholPercent: alcoholPercent,
        inventory: inventory,
        id: id
      }
    });
  });
});