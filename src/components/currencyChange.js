import React from 'react';
import classNames from 'classnames';

const CurrencyChange = ({title, value}) => {

  const priceClass = classNames(
    'change-value--value', 
    {
      'change-value--increase': (value >= 0) ,
      'change-value--decrease': (value < 0)
    }
  ); 

  return (
    <div className="change-value">
    <h3>{title}</h3>
    <span className={priceClass}>{value}%</span>
    </div>
  )

}

export default CurrencyChange;