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
      currentList: [],
      fiat: 'AUD',
      fiatList: ['USD', 'EUR', 'AUD', 'GBP'],
      loading: false, 
      error: null,
      sortKey: 'NONE',
      openSection: {},
    };
    this.changeFiatCurrency = this.changeFiatCurrency.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.expandListItem = this.expandListItem.bind(this);
  }

  componentDidMount() {
        
    this.fetchCurrencyList(`${this.state.fiat}`);

  }

  changeFiatCurrency(e) {
        
    this.checkCurrencyList(e.target.value);

  }

  checkCurrencyList(c) {
    const { currencies } = this.state;
    if ( currencies[c] && (currencies[c].timeStamp > Date.now() - 1800000 ) ) {
      this.setState({
        currentList: currencies[c].currencyList,
        fiat: c,
        loading: false
      });
    } else {
      this.fetchCurrencyList(c);
    }
  }

  fetchCurrencyList(c) {
    
    this.setState({loading: true, fiat: c});

    axios(`https://api.coinmarketcap.com/v2/ticker/?limit=10&convert=${c}&structure=array`)
        //.then(response => response.json())
        //.then(json => json.data)
        //.then(data =>   data = Object.keys(data).map((key) => data[key])) Map JSON if supplied as Object not Array
        .then(result => this.storeCurrencyList(c, result.data.data))
        .catch(error => this.setState({error}));

  }

  storeCurrencyList(fiat, currencyList) {

    this.setState(prevState => ({
      currencies: {
        ...prevState.currencies,
        [fiat]: {
          currencyList,
          timeStamp: Date.now() 
        }
      },
      currentList: currencyList,
      loading: false
    }));

  }

  expandListItem(e) {
   const sectionKey = e.currentTarget.getAttribute('data-id');

    (this.state.openSection[sectionKey] === 'open') ?
      this.setState({openSection: {[sectionKey]: 'closed'}})
      : this.setState({openSection: {[sectionKey]: 'open'}});
    
  }

  updateOrder(e) {
    this.setState({sortKey: e.target.value});
  }

  render() {
    
    const { currentList, loading, fiat, fiatList, error, sortKey, openSection } = this.state;
        
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
        (currentList.length) ?
          SORTS[sortKey](currentList).map(
            (currency) =>
            <CurrencyItem key={currency.id} openSection={openSection} {...currency} fiat={fiat} onClick={this.expandListItem} />
          ) :
          <span>Nothing to display</span>
        }
          
        </div>
      </div>
    );

  }

}

    
//let currencyToDisplay = (currencies[fiat].length) ? ( `${currencies[fiat]}`) : null;

//console.log(loading + ' ' + currencyToDisplay);

export default CurrencyList;