import React from 'react';
import KegHeader from './KegHeader/KegHeader';
import KegDetails from './KegDetails/KegDetails';
import MainHeader from './MainHeader/MainHeader';
import MainKeg from './MainKegs/MainKeg';
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
        image: "",
        price: "$4.20",
        alcoholPercent: "8%",
        inventory: 124,
        id: "666"
      },
       {
        name: "Your Dog Sucks Milk Stout",
        brand: "Princess Haru's Brewery",
        image: "",
        price: "$4.20",
        alcoholPercent: "8%",
        inventory: 124,
        id: "667"
      } //you might need to put a comma here if you dont open up that other beer
      //   {
      //   name: "Your Dog Sucks Milk Stout",
      //   brand: "Princess Haru's Brewery",
      //   image: ""
      //   price: "$4.20",
      //   alcoholPercent: "8%",
      //   inventory: 124,
      //   id: ""
      // },

    ],
    currentSelectedKeg: {},
  }
}
handleKegSelection = (id) => {
  const selectedKeg = this.state.kegList.filter(keg => keg.id === id)[0];
  this.setState({
    currentSelectedKeg: selectedKeg,
    showHomePage: false
  })
}

handleAddingNewKeg = (newKeg) => {
  const newKegList = this.state.kegList.concat(newKeg);
  this.setState({kegList: newKegList})
}

handleBackToKegs = () => {
  this.setState({
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
    return (
      <React.Fragment>
        {currentPage.header}
        {currentPage.body}
      </React.Fragment>
    )
  }
}



export default App;
