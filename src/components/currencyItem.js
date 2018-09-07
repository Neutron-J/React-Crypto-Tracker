import React, { Component } from 'react';
import CurrencyChange from './currencyChange';

class CurrencyItem extends Component {

  render() {

    const images = {
      BTC: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609483/bitcoin_eqld4v.png',
      ETH: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609485/ethereum_nw0chu.png',
      XRP: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/ripple_p0xeut.png',
      BCH: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1516327336/bch_2x_hahroi.png',
      LTC: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1512427497/ltc_fjbqjf.png',
      DASH: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609484/dash_oltvqi.png',
      XEM: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/nem_imprip.png',
      BCC: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/bitconnect_oj1bo5.png',
      XMR: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/monero_wzk3ur.png',
      NEO: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1508609486/neo_fvoo6c.png',
      MIOTA: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1512510148/miota_2x_xkby9u.png',
      ADA: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1513434489/cardano_unympj.png',
      BTG: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1513434542/bitcoin-gold_reytam.png',
      XLM: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1516326886/xlm_2x_jfwlwt.png',
      IOTA: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1516327102/miota_2x_zsvtqc.png',
      TRX: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1516326885/trx_2x_ukhxjm.png',
      EOS: 'https://res.cloudinary.com/da7jhtpgh/image/upload/v1516326878/eos_2x_dvr7p0.png',
      USDT: 'https://static.cryptorival.com/imgs/coins/USDT.svg'
    };

    const { name, symbol, quotes, fiat } = this.props;

    const changeValues = [
      {
        title: 'Change 1 hour',
        value: `${quotes[fiat].percent_change_1h}`
      },
      {
        title: 'Change 24 hour',
        value: `${quotes[fiat].percent_change_24h}`
      },
      {
        title: 'Change 7 day',
        value: `${quotes[fiat].percent_change_7d}`
      }
    ];

    
    return (
      <div className="currencyItem__row">
        <div className="currencyItem__heading">
          <h2>            
            {new Intl.NumberFormat('en-GB', { 
              style: 'currency', 
              currency: fiat,
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            }).format(quotes[fiat].price)}
          </h2>
          <div className="currencyItem__crypto">
            <img src={images[symbol]} alt="" className="icon__coin"/>
            <h2>{name}</h2>
          </div>
        </div>
        
        <div className="changeValues">
          {changeValues.map(
            (changeValue) =>  <CurrencyChange {...changeValue} />
          )}    
        </div> 
      </div>
    )
  }
}

export default CurrencyItem;
