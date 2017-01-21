"use strict";

exports.__esModule = true;

exports["default"] = function (props) {
  var textTypes = props.textTypes,
      arrayTypes = props.arrayTypes,
      numberTypes = props.numberTypes,
      optionTypes = props.optionTypes,
      objectTypes = props.objectTypes,
      booleanTypes = props.booleanTypes,
      keyValueTypes = props.keyValueTypes,
      collectionTypes = props.collectionTypes;


  return {
    textTypes: textTypes,
    arrayTypes: arrayTypes,
    numberTypes: numberTypes,
    optionTypes: optionTypes,
    objectTypes: objectTypes,
    booleanTypes: booleanTypes,
    keyValueTypes: keyValueTypes,
    collectionTypes: collectionTypes
  };
};