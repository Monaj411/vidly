import { starHalfFull } from 'fontawesome';
import React, { Component } from 'react';

const ListGroup = (props) => {
    const {items, textProperty, valueProperty, selectedItem, onItemSelect} = props;
    return <div>
<ul class="list-group">
            {items.map(item => <li onClick={() => onItemSelect(item)} key={item[valueProperty]} class={item === selectedItem ? "list-group-item active" : "list-group-item"}>{item[textProperty]}</li> )}
  
</ul>
    </div>
        
};
 
export default ListGroup;