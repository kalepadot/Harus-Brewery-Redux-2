import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import KegHeader from './KegHeader/KegHeader';
import KegDetails from './KegDetails/KegDetails';
import MainHeader from './MainHeader/MainHeader';
import MainKeg from './MainKegs/MainKeg';



import '../App.css';

class App extends React.Component {

constructor(props) {
  super(props);
  this.state = {

  }
}

handleKegSelection = (id) => {
  const selectedKeg =  this.props.kegs[id];
  const { dispatch } = this.props;
    const action = {
      type: 'SELECTED_KEG',
      selectedKeg: selectedKeg
    }
    dispatch(action);
}

handleAddingNewKeg = (newKeg) => {   //doesnt work
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
}

handleBackToKegs = () => {

  const { dispatch } = this.props;
  const action = {
    type: 'RETURN_HOME',
    
  }
  dispatch(action);
}

handleKegPurchase = (id) => {
   const { dispatch } = this.props;
   const action = {
     type: 'KEG_PURCHASE',
     id: id
    }
    dispatch(action);
  }
  

  
  handleKegRestock = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'KEG_RESTOCK',
      id: id
      }
      dispatch(action);
    }

  
handleKegDelete = (id) => {
  const { dispatch } = this.props;
  const action = {
    type: 'DELETE_KEG',
    id: id
  }
  dispatch(action);
  this.setState({selectedKeg: null}); //doesnt work
}




  currentPage = () => {


  console.log("BEFORE HEADER RENDER: ", this.props);
   if (this.props.showHomePage) {     //hmmmmmmmm ??? check this after first run
      return {

        header: <MainHeader
        keg={this.props.currentSelectedKeg}
        handleBackToKegs={this.handleBackToKegs}/>,
        body: <MainKeg
            kegs={this.props.kegs}
            onKegSelection={this.handleKegSelection}
            onNewKegCreation={this.handleAddingNewKeg}
            handleKegDelete={this.handleKegDelete} />
      }
    }
     else{
      return {
        header: <KegHeader 
          keg={this.props.currentSelectedKeg}
          handleBackToKegs={this.handleBackToKegs}/>,
        body: <KegDetails 
          keg={this.props.currentSelectedKeg}
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

App.propTypes = {
  kegs: PropTypes.object,
  currentSelectedKeg: PropTypes.object,
  showHomePage: PropTypes.object

};
const mapStateToProps = state => {
  return {
    kegs: state.kegs,
    currentSelectedKeg: state.currentSelectedKeg,
    showHomePage: state.showHomePage
  
  }
}

App = connect(mapStateToProps)(App);
export default App;
