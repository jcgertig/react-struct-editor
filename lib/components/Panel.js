'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _autoBind = require('../utils/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
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
};

var Panel = function (_Component) {
  _inherits(Panel, _Component);

  function Panel() {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      dragIndex: null,
      overIndex: null,
      isOver: false
    };

    (0, _autoBind2["default"])(_this, ['handleTitleClick', 'handleDragStart', 'handleDragOver', 'handleDragEnter', 'handleDragLeave', 'handleDrop', 'handleDragEnd']);
    return _this;
  }

  Panel.prototype.handleTitleClick = function handleTitleClick() {
    var _props = this.props,
        index = _props.index,
        isOpen = _props.isOpen,
        openPanel = _props.openPanel;

    openPanel(isOpen ? -1 : index);
  };

  Panel.prototype.handleDragStart = function handleDragStart(e) {
    // e.target.style.opacity = '0.4';  // this / e.target is the source node.
    e.dataTransfer.setData('index', e.target.dataset.index);
  };

  Panel.prototype.handleDragOver = function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    return false;
  };

  Panel.prototype.handleDragEnter = function handleDragEnter(e) {
    var overIndex = e.target.dataset.index;
    if (e.dataTransfer.getData('index') !== overIndex) {
      // e.target.classList.add('Over') // e.target is the current hover target.
      this.setState({ isOver: true });
    }
  };

  Panel.prototype.handleDragLeave = function handleDragLeave() {
    this.setState({ isOver: false });
    // e.target.classList.remove('Over')  // e.target is previous target element.
  };

  Panel.prototype.handleDrop = function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    var dragIndex = e.dataTransfer.getData('index');
    var dropIndex = this.props.index.toString();
    if (dragIndex !== dropIndex) {
      this.props.reorder(dragIndex, dropIndex);
    }

    return false;
  };

  Panel.prototype.handleDragEnd = function handleDragEnd() {
    this.setState({ isOver: false, dragIndex: null, overIndex: null });
  };

  Panel.prototype.render = function render() {
    var _props2 = this.props,
        isOpen = _props2.isOpen,
        orderable = _props2.orderable;
    var isOver = this.state.isOver;

    return _react2["default"].createElement(
      'div',
      {
        style: (0, _lodash.assign)({}, styles.PanelWrapper, isOpen ? {} : styles.ClosedPanelWrapper, isOver ? styles.Over : {}),
        onDragStart: this.handleDragStart,
        onDragEnter: this.handleDragEnter,
        onDragOver: this.handleDragOver,
        onDragLeave: this.handleDragLeave,
        onDrop: this.handleDrop,
        onDragEnd: this.handleDragEnd
      },
      _react2["default"].createElement(
        'div',
        {
          style: styles.PanelTitle,
          onClick: this.handleTitleClick,
          draggable: orderable,
          'data-index': this.props.index
        },
        this.props.header,
        orderable && _react2["default"].createElement('i', { className: 'fa fa-th', style: styles.Handle })
      ),
      isOpen && _react2["default"].createElement(
        'div',
        { style: isOpen ? styles.OpenPanel : styles.ClosedPanel },
        this.props.children
      )
    );
  };

  return Panel;
}(_react.Component);

Panel.propTypes = {
  children: _propTypes2["default"].any,
  index: _propTypes2["default"].any,
  openPanel: _propTypes2["default"].func,
  isOpen: _propTypes2["default"].any,
  header: _propTypes2["default"].any,
  orderable: _propTypes2["default"].any,
  reorder: _propTypes2["default"].func
};

Panel.defaultProps = {
  isOpen: false,
  header: '',
  orderable: false
};

exports["default"] = Panel;