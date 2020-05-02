import React from 'react';
import PropTypes from 'prop-types';

const KegHeader = (props) => {
  console.log("Keg header props: ", props);
  return (
    <div className="detailsHeader">
      <div className="columns">
        <div className="column1">
          <img className="kegDetailsImg" src={props.keg.image} alt=""/>
        </div>
        <div className="column2">
          <h1>{props.keg.name} by <em>{props.keg.brand}</em></h1>
          <button onClick={props.handleBackToKegs}>Back to Kegs</button>
        </div>
        <div className="column3">
        </div>
      </div>
    </div>
  )
}

KegHeader.propTypes = {
  keg: PropTypes.object
}

export default KegHeader;