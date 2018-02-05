import React, { Component } from 'react'
import Item from '../components/item'

class List extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let Items = this.props.musicList.map(item => {
      return (
        <Item
          data={item}
          key={item.id}
          focus={this.props.currentItem === item}
        />
      )
    })
    return <ul>{Items}</ul>
  }
}

export default List
