import React, { Component } from 'react'
import Pubsub from 'pubsub-js'
import './item.less'

class Item extends Component {
  constructor(props) {
    super(props)
  }
  handleDelete(item, e) {
    e.stopPropagation()
    Pubsub.publish('DEL_MUSIC', item)
  }
  handlePlayMusic(item) {
    Pubsub.publish('PLAY_MUSIC', item)
  }
  render() {
    let item = this.props.data
    return (
      <li
        className={`com-item ${this.props.focus ? 'focus' : ''}`}
        onClick={this.handlePlayMusic.bind(this, item)}
      >
        <p>
          {item.title} - {item.artist}
          <span className="delete" onClick={this.handleDelete.bind(this, item)}>
            删除
          </span>
        </p>
      </li>
    )
  }
}

export default Item
