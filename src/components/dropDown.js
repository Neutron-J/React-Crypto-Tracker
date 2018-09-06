import React, { Component } from 'react';
  
class DropDown extends Component {
  

  render() {

    const { dropDownItems, selectedFiat, onChange } = this.props;
    const dropDownOptions =  dropDownItems.map((dropDownItem, i) => (<option value={dropDownItem} key={i} >{dropDownItem}</option>) );
    
    return(
      <select defaultValue={selectedFiat} onChange={onChange}>
        {dropDownOptions}
      </select>
    )
  }

}

export default DropDown;