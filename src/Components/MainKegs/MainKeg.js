import React from 'react';
import Keg from './Keg';
import PropTypes from "prop-types";
import { v4 } from 'uuid';

function MainKeg(props){

  function handleNewKegFormSubmit(event) {
    event.preventDefault();
    props.onNewKegCreation({
      image: event.target.kegImg.value, 
      name: event.target.kegName.value, 
      brand: event.target.brandName.value, 
      price: event.target.price.value,
      alcoholPercent: event.target.alcoholPercent.value,
      id: v4()});
  }

  console.log(props.kegs);
  return (
    <React.Fragment>
      <div className="kegs">
        {props.kegs.map((keg, index) => { //creating list
          console.log("KEG: ", keg);
          return <Keg
            key={keg.id}
            name={keg.name}
            brand={keg.brand}
            image={keg.image}
            price={keg.price}
            alcoholPercent={keg.alcoholPercent}
            id={keg.id}
            onKegClick={props.onKegSelection}
            handleKegDelete={props.handleKegDelete} />
        })}
      </div>
      
      <form className="createForm" onSubmit={handleNewKegFormSubmit}>
        <h3>Add New Keg</h3>
        <input
          type="text"
          name="kegName"
          placeholder="Beer Name" />
        <input
          type="text"
          name="brandName"
          placeholder="Brand Name" />
        <input
          type="text"
          name="kegImg"
          placeholder="Link to Keg Image" />
          <input
          type="text"
          name="price"
          placeholder="How much is it?" />
          <input
          type="text"
          name="alcoholPercent"
          placeholder="Whats the Alcohol % ?" />
        <button type='submit'>Add Keg</button>
      </form>
    </React.Fragment>
  );
}

MainKeg.propTypes = {
  kegs: PropTypes.array,
  onNewKegCreation: PropTypes.func,
  onKegSelection: PropTypes.func
}

export default MainKeg;