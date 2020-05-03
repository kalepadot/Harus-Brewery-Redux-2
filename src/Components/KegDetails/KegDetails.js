import React from 'react';
import PropTypes from 'prop-types';

const KegDetails = (props) => {
  
  function hasInventory(count) {
    return count > 0 ? <button onClick={() => props.onKegPurchase(props.keg.id)}>Pour up a Drank</button> : <p>Fresh Out Bro!</p>
  }

  console.log("IS IT A KEG: ", props.keg);
  return (
    <div className="details" >
      <p>How much: {props.keg.price}</p>
      <p>Alcohol Percentage (who cares) : {props.keg.alcoholPercent}</p>
      <br />
      <div className="buttons">
        {hasInventory(props.keg.inventory)}
        <p>How Many I Got Left: {props.keg.inventory} Pints</p>
        <button onClick={() => props.onKegRestock(props.keg.id)}>Change The Keg!</button>
      </div>
    </div>
  )
}

KegDetails.propTypes = {
  keg: PropTypes.object,
  onKegPurchase: PropTypes.func,
  onKegRestock: PropTypes.func
}

export default KegDetails;