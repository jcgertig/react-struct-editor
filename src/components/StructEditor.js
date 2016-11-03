import React, { Component, PropTypes } from 'react'
import { pullAt, cloneDeep, findKey, find, isUndefined, has } from 'lodash'
import pluralize from 'pluralize'
import defaultFromStruct from '../utils/defaultFromStruct'
import autoBind from '../utils/autoBind'

import Accordion from './Accordion'
import Struct from './Struct'
import ObjectEditor from './ObjectEditor'

class StructEditor extends Component {

  constructor() {
    super()

    autoBind(this, [
      'removeFromCollection', 'updateCollection', 'updateCollectionOrder',
      'addStruct', 'directUpdate', 'updateStateKey'
    ])
  }

  removeFromCollection(key, index) {
    const data = cloneDeep(this.props.data)
    const collection = data[key]
    pullAt(collection, [ index ])
    data[key] = collection
    this.props.setData(data)
  }

  updateCollection(key, val, index) {
    let needsUpdate = false
    const data = cloneDeep(this.props.data)
    const collection = data[key]
    const current = collection[index]

    const { struct } = this.props
    const idAttr = findKey(struct[key].struct, { type: 'Id' })
    if (!isUndefined(idAttr) && current[idAttr] !== val[idAttr]) {
      if (!isUndefined(find(data, { [idAttr]: val[idAttr] }))) {
        alert(`Id types must be unique to collection. (${idAttr})`); // eslint-disable-line
        return
      }
      needsUpdate = true
    }

    collection[index] = val
    data[key] = collection
    this.props.setData(data)
    if (needsUpdate) {
      this.props.updateRef({ currentId: current[idAttr], newId: val[idAttr] })
    }
  }

  updateCollectionOrder(key, newOrder) {
    const data = cloneDeep(this.props.data)
    const collection = data[key]

    const orderedSet = []
    for (const order of newOrder) {
      orderedSet.push(collection[parseInt(order, 10)])
    }
    data[key] = orderedSet

    this.props.setData(data)
  }

  addStruct(key) {
    const { struct } = this.props
    const data = cloneDeep(this.props.data)
    const collection = data[key]
    const s = struct
    if (has(s, key) && has(s[key], 'type') && (s[key].type === 'KeyValue' || s[key].type === 'Object')) {
      collection[''] = undefined
    } else if (has(s, key) && has(s[key], 'type') && s[key].type === 'Array') {
      data.push(s[key].struct.default)
    } else if (has(s, key) && has(s[key], 'type')) {
      data.push(defaultFromStruct(s[key].struct))
    } else {
      collection.push(defaultFromStruct(s[key].struct))
    }
    data[key] = collection
    this.props.setData(data)
  }

  directUpdate(val) {
    this.props.setData(val)
  }

  updateStateKey(key, val) {
    this.props.setData(Object.assign({}, this.props.data, { [key]: val }))
  }

  render() {
    const { struct, data, collectionTypes, updateRef, optionTypes } = this.props
    const keys = Object.keys(struct)
    if (keys.length > 1) {
      return (
        <Struct
          index={0}
          attr={''}
          data={data}
          struct={struct}
          updateRef={updateRef}
          optionTypes={optionTypes}
          updateData={this.directUpdate}
          removeFromCollection={() => {}}
          collectionTypes={collectionTypes}
        />
      )
    } else if (keys.length === 1) {
      const key = keys[0]
      if (struct[key].type === 'Collection') {
        return (
          <div>
            <Accordion
              orderable={has(struct[key], 'orderable') ? struct[key].orderable : true}
              reorder={this.updateCollectionOrder.bind(this, key)}
            >
              {
                data[key].map((d, i) => (
                  <Struct
                    key={i}
                    data={d}
                    attr={key}
                    struct={struct[key]}
                    updateRef={updateRef}
                    optionTypes={optionTypes}
                    collectionTypes={collectionTypes}
                    removeFromCollection={this.removeFromCollection}
                    updateData={this.updateCollection.bind(this, key)}
                  />
                ))
              }
            </Accordion>
            <button onClick={this.addStruct.bind(this, key)}>
              Add {pluralize(struct[key].label, 1)}
            </button>
          </div>
        )
      } else if (struct[key].type.indexOf('Collection') > -1) {
        const Comp = collectionTypes[struct[key].type.replace('Collection', '')]
        if (!isUndefined(Comp)) {
          return (
            <div>
              <Accordion
                orderable={has(struct[key], 'orderable') ? struct[key].orderable : true}
                reorder={this.updateCollectionOrder.bind(this, key)}
              >
                {
                  data[key].map((d, i) => (
                    <Comp
                      key={i}
                      data={d}
                      attr={key}
                      struct={struct[key]}
                      optionTypes={optionTypes}
                      collectionTypes={collectionTypes}
                      removeFromCollection={this.removeFromCollection}
                      updateData={this.updateCollection.bind(this, key)}
                    />
                  ))
                }
              </Accordion>
              <button onClick={this.addStruct.bind(this, key)}>
                Add {pluralize(struct[key].label, 1)}
              </button>
            </div>
          )
        }
      } else if (struct[key].type === 'KeyValue' || struct[key].type === 'Object') {
        return (
          <ObjectEditor
            name={key}
            value={data[key]}
            struct={struct[key]}
            optionTypes={optionTypes}
            onChange={this.updateStateKey}
            collectionTypes={collectionTypes}
            updateCollectionOrder={this.updateCollectionOrder}
          />
        )
      }
    }
    return (<div>Alert! No content in struct!</div>)
  }
}

StructEditor.propTypes = {
  updateRef: PropTypes.func,
  optionTypes: PropTypes.object,
  collectionTypes: PropTypes.object,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  struct: PropTypes.object.isRequired
}

StructEditor.defaultProps = {
  collectionTypes: [],
  optionTypes: {},
  updateRef: () => {}
}

export default StructEditor
