'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _autoBind = require('../utils/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'AccordionWrapper': {
    width: '100%',
    marginTop: '10px',
    marginBottom: '15px',
    position: 'relative'
  }
};

var Accordion = function (_Component) {
  _inherits(Accordion, _Component);

  function Accordion() {
    _classCallCheck(this, Accordion);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      isOpen: -1,
      order: []
    };

    (0, _autoBind2["default"])(_this, ['reorder', 'openPanel', 'renderPanels']);
    return _this;
  }

  Accordion.prototype.componentWillMount = function componentWillMount() {
    var order = [];
    for (var i = 0; i < _react.Children.count(this.props.children); i++) {
      order.push(i.toString());
    }
    this.setState({ order: order });
  };

  Accordion.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (!(0, _lodash.isEqual)(this.props.children, newProps.children)) {
      var order = [];
      for (var i = 0; i < _react.Children.count(newProps.children); i++) {
        order.push(i.toString());
      }
      this.setState({ order: order });
    }
  };

  Accordion.prototype.reorder = function reorder(key) {
    var _this2 = this;

    var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var order = (0, _lodash.cloneDeep)(this.state.order);
    (0, _lodash.pull)(order, key);
    if (after === null) {
      order.splice(0, 0, key);
    } else {
      order.splice((0, _lodash.indexOf)(order, after) + 1, 0, key);
    }
    this.setState({ order: order }, function () {
      _this2.props.reorder(order);
    });
  };

  Accordion.prototype.openPanel = function openPanel(index) {
    this.setState({ isOpen: index });
  };

  Accordion.prototype.renderPanels = function renderPanels() {
    var _this3 = this;

    var _props = this.props,
        children = _props.children,
        orderable = _props.orderable;

    var panels = _react.Children.map(children, function (child, index) {
      return {
        index: index.toString(),
        elm: (0, _react.cloneElement)(child, {
          key: index,
          openPanel: _this3.openPanel,
          index: index,
          isOpen: _this3.state.isOpen === index,
          orderable: orderable,
          reorder: _this3.reorder
        })
      };
    });
    var orderedPanels = [];
    for (var _iterator = this.state.order, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var order = _ref;

      var panel = (0, _lodash.find)(panels, { index: order });
      if (panel) {
        orderedPanels.push(panel);
      }
    }
    return orderedPanels.map(function (p) {
      return p.elm;
    });
  };

  Accordion.prototype.render = function render() {
    return _react2["default"].createElement(
      'div',
      { style: styles.AccordionWrapper },
      this.renderPanels()
    );
  };

  return Accordion;
}(_react.Component);

Accordion.propTypes = {
  children: _react.PropTypes.any,
  orderable: _react.PropTypes.bool,
  reorder: _react.PropTypes.func
};

Accordion.defaultProps = {
  orderable: false,
  reorder: function reorder() {}
};

exports["default"] = Accordion;