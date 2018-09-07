import React, {Component} from 'react';
  
class SortSelect extends Component {
    
    render(){
      const { sorts, sortKey, onChange } = this.props;

      const sortOptions = Object.keys(sorts).map((key, i) => (<option value={key} key={i} >{key}</option>) );
    
      return(
        <div className="orderSelector">
          <h4>Select Order</h4>
          <select defaultValue={sortKey} onChange={onChange}>
            {sortOptions}
          </select>
        </div>
      )
    }   

}

export default SortSelect;