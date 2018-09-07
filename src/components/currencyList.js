import React, { Component } from 'react';
import CurrencyItem from './currencyItem';
import DropDown from './dropDown';

class CurrencyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies:[],
      fiat: 'AUD',
      fiatList: ['USD', 'EUR', 'AUD', 'GBP'],
      loading: false, 
      error: null,
    };
    this.changeFiatCurrency = this.changeFiatCurrency.bind(this);
  }
  
  componentDidMount() {
        
    this.fetchCurrencyList(`${this.state.fiat}`);

  }

  changeFiatCurrency(e) {
        
    this.fetchCurrencyList(e.target.value);

  }

  fetchCurrencyList(c) {
    
    this.setState({loading: true, fiat: c});

    fetch(`https://api.coinmarketcap.com/v2/ticker/?limit=10&convert=${c}&structure=array`)
        .then(response => response.json())
        .then(json => json.data)
        //.then(data =>   data = Object.keys(data).map((key) => data[key])) Map JSON if supplied as Object not Array
        .then(currencies => this.setState({
            currencies,
            loading: false
        }))
        .catch(error => this.setState({error}));

  }

  render() {
    
    const { currencies, loading, fiat, fiatList, error } = this.state;
    
    return (
      <div className="currencyContainer">
        
        <div className="currencyList">
        <h1>List of Crypto-currencies</h1>
        <div className="currencyPicker">
          <DropDown dropDownItems={fiatList} selectedFiat={fiat} onChange={this.changeFiatCurrency}/>
        </div>
        {
        (error) ?
        <p className="error">Error. Something went wrong. </p>
        :  
        (loading) ?
          <span>loading...</span> : 
        (currencies.length) ?
          currencies.map(
            (currency) =>
            <CurrencyItem key={currency.id} {...currency} fiat={fiat} />
          ):
          <span>Nothing to display</span>
        }
          
        </div>
      </div>
    );

  }

}

export default CurrencyList;