import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import KegHeader from './KegHeader/KegHeader';
import KegDetails from './KegDetails/KegDetails';
import MainHeader from './MainHeader/MainHeader';
import MainKeg from './MainKegs/MainKeg';
import BeerImage from '../img/420.gif';
import FishImage from '../img/fish.gif';
import Woof from '../img/woof.gif';

import '../App.css';

class App extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    showHomePage: true,
    kegList: [
      {
        name: "I'd Rather Be Smokin Cat Nip Pale Ale",
        brand: "Princess Haru's Brewery",
        image: BeerImage,
        price: "$4.20",
        alcoholPercent: "8%",
        inventory: 124,
        id: "666"
      },
       {
        name: "Your Dog Sucks Milk Stout",
        brand: "Princess Haru's Brewery",
        image: FishImage,
        price: "$4.20",
        alcoholPercent: "8%",
        inventory: 124,
        id: "667"
      }, //you might need to put a comma here if you dont open up that other beer
        {
        name: "No Dogs No Masters Lager",
        brand: "Princess Haru's Brewery",
        image: Woof,
        price: "$4.20",
        alcoholPercent: "666%",
        inventory: 124,
        id: "668"
      },

    ],
    currentSelectedKeg: {},
  }
}
handleKegSelection = (id) => {
  const selectedKeg = this.props.masterKegList.filter(keg => keg.id === id)[0];
  this.setState({
    currentSelectedKeg: selectedKeg,
    showHomePage: false
  })
}

handleAddingNewKeg = (newKeg) => {   //doesnt work
  // const newKegList = this.state.kegList.concat(newKeg);
  // this.setState({kegList: newKegList})
  const { dispatch } = this.props;
  const { id, name, brand, image, price, alcoholPercent, inventory } = newKeg;
  const action = {
    type: 'ADD_KEG',
    id: id,
    name: name,
    brand: brand,
    image: image,
    price: price,
    alcoholPercent: alcoholPercent,
    inventory: inventory
  }
  dispatch(action);
  this.setState({showHomePage: false});
}

handleBackToKegs = () => {
  this.setState({   //dispatch(action) ? ? ?
    showHomePage: true
  })
}

handleKegPurchase = (id) => {
    const selectedKeg = this.state.kegList.filter(keg => keg.id === id)[0];
    // const newShoppingCartItems = this.state.shoppingCartItems.concat(selectedAlbum);
    const newInventory = selectedKeg.inventory -1;
    const updatedKeg = {...selectedKeg, inventory: newInventory};
    const oldKegs = this.state.kegList.filter(keg => keg.id !== id);
    this.setState({
      // shoppingCartItems: newShoppingCartItems,
      kegList: [...oldKegs, updatedKeg],
      currentSelectedKeg: updatedKeg
    });
}

  handleKegRestock = (id) => {
    const selectedKeg = this.state.kegList.filter(keg => keg.id === id)[0];
    const newInventory = selectedKeg.inventory +124;
    const updatedKeg = {...selectedKeg, inventory: newInventory}
    const oldKegs = this.state.kegList.filter(keg => keg.id !== id);
    this.setState({
      kegList: [...oldKegs, updatedKeg],
      currentSelectedKeg: updatedKeg
    });
  }

  handleKegDelete = id => {
    const updateKegsList = this.state.kegList.filter(keg => keg.id !== id);
    this.setState({
      kegList: [...updateKegsList]
    })
  }
// og keg delete that works ^ ^ ^

handleKegDelete = (id) => {
  const { dispatch } = this.props;
  const action = {
    type: 'DELETE_KEG',
    id: id
  }
  dispatch(action);
  this.setState({selectedKeg: null}); //doesnt work
}


  // handleShowShoppingCart = () => {   ///prob not going to do a shopping cart *come back to this later
  //   this.setState({
  //     showShoppingCart: !this.state.showShoppingCart
  //   })
  // }

  currentPage = () => {
  //   if (this.state.showShoppingCart) {
  //     return {
  //       header: <MainHeader
  //         onShowShoppingCart={this.handleShowShoppingCart}
  //         cartItemNumber={this.state.shoppingCartItems.length}/>,
  //       body: <ShoppingCart
  //         albums={this.state.shoppingCartItems}/>
  //     }
  //   }

   if (this.state.showHomePage) {     //hmmmmmmmm ??? check this after first run
      return {
        // header: <MainHeader 
          // onShowShoppingCart={this.handleShowShoppingCart}
          // cartItemNumber={this.state.shoppingCartItems.length}/>,
        header: <MainHeader
        keg={this.state.currentSelectedKeg}
        handleBackToKegs={this.handleBackToKegs}/>,
        body: <MainKeg
            kegs={this.state.kegList}
            onKegSelection={this.handleKegSelection}
            onNewKegCreation={this.handleAddingNewKeg}
            handleKegDelete={this.handleKegDelete} />
      }
    }
     else{
      return {
        header: <KegHeader 
          keg={this.state.currentSelectedKeg}
          handleBackToKegs={this.handleBackToKegs}/>,
        body: <KegDetails 
          keg={this.state.currentSelectedKeg}
          onKegPurchase={this.handleKegPurchase}
          onKegRestock={this.handleKegRestock}/>
      }
     }
   };

 render() {
    let currentPage = this.currentPage();
    console.log(this.props.masterKegList);
    return (
      <React.Fragment>
        {currentPage.header}
        {currentPage.body}
      </React.Fragment>
    )
  }
}
App.propTypes = {
  masterKegList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterKegList: state
  }
}

App = connect(mapStateToProps)(App);
export default App;
