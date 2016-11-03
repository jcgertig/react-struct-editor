import React, { Component, PropTypes } from 'react'
import {
  cloneDeep, isUndefined, pullAt, findKey, find, has, isString, isFunction
} from 'lodash'
import pluralize from 'pluralize'
import defaultFromStruct from '../utils/defaultFromStruct'
import autoBind from '../utils/autoBind'
import warning from '../utils/warning'

import Accordion from './Accordion'
import Panel from './Panel'
import Input from './Input'
import ObjectEditor from './ObjectEditor'

const CollectionTypes = [ 'KeyValue', 'Object', 'Collection', 'Array' ]

class Struct extends Component {

  constructor() {
    super()

    this.state = {
      struct: {}
    }

    autoBind(this, [
      'updateStateKey', 'updateStateIndex', 'updateCollection', 'updateCollectionOrder',
      'updateState', 'addToCollection', 'removeFromCollection', 'handleRemoveClick',
      'renderNonCollections', 'renderCollection', 'renderCollections'
    ])
  }

  componentWillMount() {
    const { struct, data } = this.props
    this.setState({ struct: Object.assign({}, defaultFromStruct(struct.struct), data) })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ struct: Object.assign({}, this.state.struct, nextProps.data) })
  }

  updateStateKey(key, val) {
    this.setState({ struct: Object.assign({}, this.state.struct, { [key]: val }) })
  }

  updateStateIndex(key, index, val) {
    const { struct } = this.state
    const data = cloneDeep(struct[key])
    data[index] = val
    struct[key] = data
    this.setState({ struct })
  }

  updateCollection(key, val, index) {
    let needsUpdate = false
    const data = cloneDeep(this.state.struct[key])
    const current = cloneDeep(data[index])

    const { struct } = this.props.struct
    const idAttr = findKey(struct[key].struct, { type: 'Id' })
    if (!isUndefined(idAttr) && current[idAttr] !== val[idAttr]) {
      if (!isUndefined(find(data, { [idAttr]: val[idAttr] }))) {
        alert(`Id types must be unique. (${idAttr})`); // eslint-disable-line
        return
      }
      needsUpdate = true
    }

    data[index] = val
    this.props.updateData(Object.assign({}, this.state.struct, { [key]: data }), this.props.index)
    if (needsUpdate) {
      this.props.updateRef({ currentId: current[idAttr], newId: val[idAttr] })
    }
  }

  updateCollectionOrder(key, newOrder) {
    const collection = cloneDeep(this.state.struct[key])

    const data = []
    for (const order of newOrder) {
      data.push(collection[parseInt(order, 10)])
    }

    this.props.updateData(Object.assign({}, this.state.struct, { [key]: data }), this.props.index)
  }

  updateState() {
    this.props.updateData(this.state.struct, this.props.index)
  }

  addToCollection(key) {
    const { struct } = this.props
    const data = cloneDeep(this.state.struct[key])
    const s = struct
    if (has(s, key) && has(s[key], 'type') && (s[key].type === 'KeyValue' || s[key].type === 'Object')) {
      data[''] = undefined
    } else if (has(s, key) && has(s[key], 'type') && s[key].type === 'Array') {
      data.push(s[key].struct.default)
    } else if (has(s, key) && has(s[key], 'type')) {
      data.push(defaultFromStruct(s[key].struct))
    } else {
      data.push(defaultFromStruct(s.struct[key].struct))
    }
    this.props.updateData(Object.assign({}, this.state.struct, { [key]: data }), this.props.index)
  }

  removeFromCollection(key, index) {
    const { struct } = this.state
    const data = cloneDeep(struct[key])
    pullAt(data, [ index ])
    this.props.updateData(Object.assign({}, this.state.struct, { [key]: data }), this.props.index)
  }

  handleRemoveClick() {
    const { removeFromCollection, attr, index } = this.props
    removeFromCollection(attr, index)
  }

  renderNonCollections({ struct }) {
    if (!isUndefined(struct)) {
      let keys = Object.keys(struct)
      const isNonCollection = (key) => {
        const notCollection = (k) => (CollectionTypes.indexOf(struct[k].type) < 0)
        return struct[key].type.indexOf('Collection') < 0 && notCollection(key)
      }
      keys = keys.filter(isNonCollection)
      return keys.map((key, i) => (
        <div key={i} style={{ marginTop: '25px' }}>
          <label>{struct[key].label}</label><br />
          <Input
            name={key}
            struct={struct[key]}
            value={this.state.struct[key]}
            onChange={this.updateStateKey}
            optionTypes={this.props.optionTypes}
          />
        </div>
      ))
    }
  }

  renderCollection(struct, key) {
    const { updateRef, optionTypes, collectionTypes } = this.props
    if (struct.type === 'Collection') {
      return this.state.struct[key].map((value, i) => (
        <Struct
          key={i}
          attr={key}
          data={value}
          struct={struct}
          updateRef={updateRef}
          optionTypes={optionTypes}
          collectionTypes={collectionTypes}
          removeFromCollection={this.removeFromCollection}
          updateData={this.updateCollection.bind(this, key)}
        />
      ))
    } else if (struct.type.indexOf('Collection') > -1) {
      const Comp = collectionTypes[struct.type.replace('Collection', '')]
      if (!isUndefined(Comp)) {
        return this.state.struct[key].map((value, i) => (
          <Comp
            key={i}
            attr={key}
            data={value}
            struct={struct}
            optionTypes={optionTypes}
            collectionTypes={collectionTypes}
            removeFromCollection={this.removeFromCollection}
            updateData={this.updateCollection.bind(this, key)}
          />
        ))
      }
    } else if (struct.type === 'KeyValue' || struct.type === 'Object') {
      return (
        <ObjectEditor
          name={key}
          struct={struct}
          optionTypes={optionTypes}
          value={this.state.struct[key]}
          onChange={this.updateStateKey}
          collectionTypes={collectionTypes}
          updateCollectionOrder={this.updateCollectionOrder}
        />
      )
    } else if (struct.type === 'Array') {
      return this.state.struct[key].map((val, i) => (
        <Panel
          key={i}
          header={`${i + 1} - ${val}`}
        >
          <div style={{ marginBottom: 15, marginTop: 25 }}>
            <label>{struct.struct.label}</label><br />
            <Input
              name={i}
              value={val}
              struct={struct.struct}
              onChange={this.updateStateIndex.bind(this, key)}
              optionTypes={this.props.optionTypes}
            />
          </div>
          <button onClick={this.removeFromCollection.bind(this, key, i)}>
            Remove {pluralize(struct.struct.label, 1)}
          </button>
        </Panel>
      ))
    }
  }

  renderCollections({ struct }) {
    if (!isUndefined(struct)) {
      const isObject = (key) => (CollectionTypes.indexOf(struct[key].type) > -1)
      let keys = Object.keys(struct)
      const isCollection = (key) => (
        struct[key].type.indexOf('Collection') > -1 || isObject(key)
      )
      keys = keys.filter(isCollection)
      if (keys.length > 0) {
        return (
          <Accordion>
            {
              keys.map((key, i) => {
                const data = this.state.struct[key]
                let len = '-1'
                if (data) {
                  len = isObject(key) ? Object.keys(data).length : data.length
                }
                return (
                  <Panel
                    key={i}
                    header={`${struct[key].label} (${len})`}
                  >
                    <Accordion
                      orderable={has(struct[key], 'orderable') ? struct[key].orderable : true}
                      reorder={this.updateCollectionOrder.bind(this, key)}
                    >
                      {this.renderCollection(struct[key], key)}
                    </Accordion>
                    {
                      struct[key].type !== 'Object' &&
                      (
                        <button onClick={this.addToCollection.bind(this, key)}>
                          Add a {pluralize(struct[key].label, 1)}
                        </button>
                      )
                    }
                  </Panel>
                )
              })
            }
          </Accordion>
        )
      }
    }
  }

  render() {
    const { struct } = this.props
    let header = 'No header attr update struct.'
    if (has(struct, 'header')) {
      if (isString(struct.header) && has(this.state.struct, struct.header)) {
        header = this.state.struct[struct.header]
      } else if (isFunction(struct.header)) {
        header = struct.header(this.state.struct, parseInt(this.props.index, 10))
      }
    }
    if (isUndefined(struct.label)) {
      warning('undefined label?', struct)
    }
    if (struct.type === 'Object') {
      return (
        <div>
          {this.renderNonCollections(struct || {})}
          {this.renderCollections(struct || {})}
          <br />
          <button onClick={this.updateState}>
            Update {pluralize(struct.label, 1)}
          </button>
        </div>
      )
    }
    return (
      <Panel header={header} {...this.props}>
        {this.renderNonCollections(struct || {})}
        {this.renderCollections(struct || {})}
        <br />
        <button onClick={this.updateState}>
          Update {pluralize(struct.label, 1)}
        </button>
        <button onClick={this.handleRemoveClick}>
          Remove {pluralize(struct.label, 1)}
        </button>
      </Panel>
    )
  }
}

Struct.propTypes = {
  data: PropTypes.any,
  attr: PropTypes.any,
  struct: PropTypes.any,
  updateRef: PropTypes.func,
  updateData: PropTypes.func,
  optionTypes: PropTypes.object,
  collectionTypes: PropTypes.object,
  removeFromCollection: PropTypes.func,

  index: PropTypes.any,
  isOpen: PropTypes.any,
  openPanel: PropTypes.func
}

export default Struct
