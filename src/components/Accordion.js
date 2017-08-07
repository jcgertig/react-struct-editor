import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { cloneDeep, pull, indexOf, find, isEqual } from 'lodash'
import autoBind from '../utils/autoBind'

const styles = {
  'AccordionWrapper': {
    width: '100%',
    marginTop: '10px',
    marginBottom: '15px',
    position: 'relative'
  }
}

class Accordion extends Component {

  constructor() {
    super()

    this.state = {
      isOpen: -1,
      order: []
    }

    autoBind(this, [ 'reorder', 'openPanel', 'renderPanels' ])
  }

  componentWillMount() {
    const order = []
    for (let i = 0; i < Children.count(this.props.children); i++) {
      order.push(i.toString())
    }
    this.setState({ order })
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.children, newProps.children)) {
      const order = []
      for (let i = 0; i < Children.count(newProps.children); i++) {
        order.push(i.toString())
      }
      this.setState({ order })
    }
  }

  reorder(key, after = null) {
    const order = cloneDeep(this.state.order)
    pull(order, key)
    if (after === null) {
      order.splice(0, 0, key)
    } else {
      order.splice(indexOf(order, after) + 1, 0, key)
    }
    this.setState({ order }, () => {
      this.props.reorder(order)
    })
  }

  openPanel(index) {
    this.setState({ isOpen: index })
  }

  renderPanels() {
    const { children, orderable } = this.props
    const panels = Children.map(children, (child, index) => {
      return {
        index: index.toString(),
        elm: cloneElement(child, {
          key: index,
          openPanel: this.openPanel,
          index,
          isOpen: (this.state.isOpen === index),
          orderable,
          reorder: this.reorder
        })
      }
    })
    const orderedPanels = []
    for (const order of this.state.order) {
      const panel = find(panels, { index: order })
      if (panel) {
        orderedPanels.push(panel)
      }
    }
    return orderedPanels.map(p => p.elm)
  }

  render() {
    return (
      <div style={styles.AccordionWrapper}>
        {this.renderPanels()}
      </div>
    )
  }
}

Accordion.propTypes = {
  children: PropTypes.any,
  orderable: PropTypes.bool,
  reorder: PropTypes.func
}

Accordion.defaultProps = {
  orderable: false,
  reorder: () => {}
}

export default Accordion
