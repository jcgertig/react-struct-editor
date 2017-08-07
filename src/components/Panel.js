import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { assign } from 'lodash'
import autoBind from '../utils/autoBind'

const styles = {
  'ClosedPanelWrapper': {
    height: '40px'
  },

  'PanelWrapper': {
    position: 'relative'
  },

  'Over': {
    border: '1px dashed white',
    overflowY: 'hidden'
  },

  'PanelTitle': {
    width: '100%',
    height: '40px',
    lineHeight: '40px',
    backgroundColor: '#000',
    color: '#fff',
    paddingLeft: '10px',
    position: 'relative',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: '8px',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    userSelect: 'none'
  },

  'Handle': {
    cursor: '-webkit-grab',
    position: 'absolute',
    zIndex: '2',
    color: 'white',
    right: '10px',
    fontSize: '16px',
    top: '12px'
  },

  'OpenPanel': {
    position: 'relative',
    zIndex: '2',
    top: '0',
    left: '0',
    padding: '7px',
    paddingTop: '5px',
    maxHeight: '30%',
    display: 'block'
  },

  'ClosedPanel': {
    height: '0',
    position: 'relative',
    zIndex: '2',
    top: '-1000px',
    left: '0',
    overflow: 'hidden',
    maxHeight: '0',
    display: 'none'
  }
}

class Panel extends Component {

  constructor() {
    super()

    this.state = {
      dragIndex: null,
      overIndex: null,
      isOver: false
    }

    autoBind(this, [
      'handleTitleClick', 'handleDragStart', 'handleDragOver', 'handleDragEnter',
      'handleDragLeave', 'handleDrop', 'handleDragEnd'
    ])
  }

  handleTitleClick() {
    const { index, isOpen, openPanel } = this.props
    openPanel(isOpen ? -1 : index)
  }

  handleDragStart(e) {
    // e.target.style.opacity = '0.4';  // this / e.target is the source node.
    e.dataTransfer.setData('index', e.target.dataset.index)
  }

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault() // Necessary. Allows us to drop.
    }
    return false
  }

  handleDragEnter(e) {
    const overIndex = e.target.dataset.index
    if (e.dataTransfer.getData('index') !== overIndex) {
      // e.target.classList.add('Over') // e.target is the current hover target.
      this.setState({ isOver: true })
    }
  }

  handleDragLeave() {
    this.setState({ isOver: false })
    // e.target.classList.remove('Over')  // e.target is previous target element.
  }

  handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation() // stops the browser from redirecting.
    }

    const dragIndex = e.dataTransfer.getData('index')
    const dropIndex = this.props.index.toString()
    if (dragIndex !== dropIndex) {
      this.props.reorder(dragIndex, dropIndex)
    }

    return false
  }

  handleDragEnd() {
    this.setState({ isOver: false, dragIndex: null, overIndex: null })
  }

  render() {
    const { isOpen, orderable } = this.props
    const { isOver } = this.state
    return (
      <div
        style={assign({}, styles.PanelWrapper, isOpen ? {} : styles.ClosedPanelWrapper, isOver ? styles.Over : {})}
        onDragStart={this.handleDragStart}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        onDragEnd={this.handleDragEnd}
      >
        <div
          style={styles.PanelTitle}
          onClick={this.handleTitleClick}
          draggable={orderable}
          data-index={this.props.index}
        >
          {this.props.header}
          {orderable && (<i className="fa fa-th" style={styles.Handle}></i>)}
        </div>
        {
          isOpen &&
          (
            <div style={isOpen ? styles.OpenPanel : styles.ClosedPanel}>
              {this.props.children}
            </div>
          )
        }
      </div>
    )
  }
}

Panel.propTypes = {
  children: PropTypes.any,
  index: PropTypes.any,
  openPanel: PropTypes.func,
  isOpen: PropTypes.any,
  header: PropTypes.any,
  orderable: PropTypes.any,
  reorder: PropTypes.func
}

Panel.defaultProps = {
  isOpen: false,
  header: '',
  orderable: false
}

export default Panel
