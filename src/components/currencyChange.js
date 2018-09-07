import React from 'react';
import classNames from 'classnames';

const CurrencyChange = ({title, value}) => {

  const priceClass = classNames(
    'changeValue__value', 
    {
      'changeValue__increase': (value >= 0) ,
      'changeValue__decrease': (value < 0)
    }
  ); 

  return (
    <div className="changeValue">
    <h3>{title}</h3>
    <span className={priceClass}>{value}%</span>
    </div>
  )

}

export default CurrencyChange;