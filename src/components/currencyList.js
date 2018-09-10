import React, { Component } from 'react';
import { sortBy } from 'lodash';
import axios from 'axios';
import CurrencyItem from './currencyItem';
import DropDown from './dropDown';
import SortSelect from './sortSelect';

const SORTS = {
  NONE: currencies => currencies,
  ASC: currencies => sortBy(currencies, 'quotes.USD.price'),
  DESC: currencies => sortBy(currencies, 'quotes.USD.price').reverse(),
};

class CurrencyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies:[],
      fiat: 'AUD',
      fiatList: ['USD', 'EUR', 'AUD', 'GBP'],
      loading: false, 
      error: null,
      sortKey: 'NONE',
      openSections: {},
    };
    this.changeFiatCurrency = this.changeFiatCurrency.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.expandListItem = this.expandListItem.bind(this);
  }

  componentDidMount() {
        
    this.fetchCurrencyList(`${this.state.fiat}`);

  }

  changeFiatCurrency(e) {
        
    this.fetchCurrencyList(e.target.value);

  }

  fetchCurrencyList(c) {
    
    this.setState({loading: true, fiat: c});

    axios(`https://api.coinmarketcap.com/v2/ticker/?limit=10&convert=${c}&structure=array`)
        //.then(response => response.json())
        //.then(json => json.data)
        //.then(data =>   data = Object.keys(data).map((key) => data[key])) Map JSON if supplied as Object not Array
        .then(result => this.setState({
            currencies: result.data.data,
            loading: false
        }))
        .catch(error => this.setState({error}));

  }

  expandListItem(e) {
   const sectionKey = e.currentTarget.getAttribute('data-id');

    (this.state.openSections[sectionKey] === 'open') ?
      this.setState({openSections: {[sectionKey]: 'closed'}})
      : this.setState({openSections: {[sectionKey]: 'open'}});
    
  }

  updateOrder(e) {
    this.setState({sortKey: e.target.value});
  }

  render() {
    
    const { currencies, loading, fiat, fiatList, error, sortKey, openSections } = this.state;
    
    return (
      <div className="currencyContainer">
        
        <div className="currencyList">
        <h1>Crypto-track</h1>
        <div className="selectors">
          <DropDown dropDownItems={fiatList} selectedFiat={fiat} onChange={this.changeFiatCurrency}/>
          <SortSelect sorts={SORTS} sortKey={sortKey} onChange={this.updateOrder} />
        </div>
        {
        (error) ?
        <p className="error">Error. Something went wrong. </p>
        :  
        (loading) ?
          <span>loading...</span> : 
        (currencies.length) ?
          SORTS[sortKey](currencies).map(
            (currency) =>
            <CurrencyItem key={currency.id} openSections={openSections} {...currency} fiat={fiat} onClick={this.expandListItem} />
          ):
          <span>Nothing to display</span>
        }
          
        </div>
      </div>
    );

  }

}

export default CurrencyList;