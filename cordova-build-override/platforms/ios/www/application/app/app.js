var require = meteorInstall({"client":{"template.main.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/template.main.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.body.addContent((function() {
  var view = this;
  return HTML.Raw('<div id="app"></div>');
}));
Meteor.startup(Template.body.renderToDocument);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.link("/imports/startup/client");
global.Buffer = global.Buffer || require("buffer").Buffer; // hotfix for vis.js 
// not sure what side effects this may introduce....

document.ontouchmove = function (event) {
  event.preventDefault();
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"ui":{"workflows":{"lists":{"Checklist.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/workflows/lists/Checklist.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  Checklist: function () {
    return Checklist;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 3);
var Tabs, Tab;
module.link("material-ui/Tabs", {
  Tabs: function (v) {
    Tabs = v;
  },
  Tab: function (v) {
    Tab = v;
  }
}, 4);
var CardTitle, CardText;
module.link("material-ui/Card", {
  CardTitle: function (v) {
    CardTitle = v;
  },
  CardText: function (v) {
    CardText = v;
  }
}, 5);
var VerticalCanvas, GlassCard, Glass;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  },
  Glass: function (v) {
    Glass = v;
  }
}, 6);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 7);
var Table;
module.link("react-bootstrap", {
  Table: function (v) {
    Table = v;
  }
}, 8);
var Checkbox;
module.link("material-ui/Checkbox", {
  "default": function (v) {
    Checkbox = v;
  }
}, 9);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 10);
Session.setDefault('checklistPageTabIndex', 0);
Session.setDefault('checklistSearchFilter', '');
Session.setDefault('selectedChecklist', false);

var Checklist =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Checklist, _React$Component);

  function Checklist() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Checklist.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          opacity: Session.get('globalOpacity'),
          tab: {
            borderBottom: '1px solid lightgray',
            borderRight: 'none'
          },
          cell: {
            lineHeight: '24px'
          },
          rowText: Glass.darkroom({
            cursor: 'pointer'
          })
        },
        tabIndex: Session.get('checklistPageTabIndex'),
        checklistSearchFilter: Session.get('checklistSearchFilter'),
        currentChecklist: Session.get('selectedChecklist'),
        entry: []
      };

      if ((typeof Lists === "undefined" ? "undefined" : (0, _typeof2.default)(Lists)) === "object") {
        var list = Lists.findOne({
          _id: Session.get('selectedChecklist')
        });

        if (list) {
          data.entry = [];
          list.entry.forEach(function (task) {
            task.selected = false;

            if (get(task, 'flag.text' == "Completed")) {
              task.selected = true;
            }

            data.entry.push(task);
          });
        }
      }

      data.style = Glass.blur(data.style);
      data.style.appbar = Glass.darkroom(data.style.appbar);
      data.style.tab = Glass.darkroom(data.style.tab);
      if (process.env.NODE_ENV === "test") console.log("Checklist[data]", data);
      return data;
    }

    return getMeteorData;
  }(); // this could be a mixin


  _proto.handleTabChange = function () {
    function handleTabChange(index) {
      Session.set('checklistPageTabIndex', index);
    }

    return handleTabChange;
  }(); // this could be a mixin


  _proto.onNewTab = function () {
    function onNewTab() {
      console.log("onNewTab; we should clear things...");
      Session.set('selectedChecklist', false);
      Session.set('checklistDetailState', false);
    }

    return onNewTab;
  }();

  _proto.rowClick = function () {
    function rowClick(row, column, event, foo) {
      console.log("click", row, column, event, foo);
    }

    return rowClick;
  }();

  _proto.toggleTask = function () {
    function toggleTask(index) {
      var list = Lists.findOne({
        _id: Session.get('selectedChecklist')
      });

      if (list) {
        var query = {};

        if (list.entry[index]) {
          if (list.entry[index].flag.text === "Pending") {
            list.entry[index].flag.text = "Completed";
          } else {
            list.entry[index].flag.text = "Pending";
          }
        }

        list.date = new Date();
        delete list._id;
        delete list._document;
        console.log("list", list);
        Lists.update({
          _id: Session.get('selectedChecklist')
        }, {
          $set: list
        }, function (error, result) {
          if (error) {
            console.log("error", error);
          }
        });
      }
    }

    return toggleTask;
  }();

  _proto.render = function () {
    function render() {
      var listRows = [];

      for (var i = 0; i < this.data.entry.length; i++) {
        listRows.push(React.createElement("tr", {
          key: i,
          style: this.data.style.rowText,
          selected: this.data.entry[i].selected,
          onClick: this.rowClick.bind(this)
        }, React.createElement("td", {
          style: this.data.style.cell
        }, React.createElement(Checkbox, {
          checked: this.data.entry[i].selected,
          onClick: this.toggleTask.bind('this', i)
        })), React.createElement("td", {
          style: this.data.style.cell
        }, moment(this.data.entry[i].date).format("YYYY-MM-DD")), React.createElement("td", {
          style: this.data.style.cell
        }, this.data.entry[i].flag.text ? this.data.entry[i].flag.text : ''), React.createElement("td", {
          style: this.data.style.cell
        }, this.data.entry[i].item.display)));
      }

      return React.createElement("div", {
        className: "checklist"
      }, React.createElement(Table, {
        hover: true
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Checkbox"), React.createElement("th", {
        style: {
          width: '100px'
        }
      }, "Created"), React.createElement("th", null, "Flag"), React.createElement("th", null, "Task"))), React.createElement("tbody", null, listRows)));
    }

    return render;
  }();

  return Checklist;
}(React.Component);

Checklist.propTypes = {
  id: PropTypes.string
};
ReactMixin(Checklist.prototype, ReactMeteorData);
module.exportDefault(Checklist);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ChecklistTableRow.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/workflows/lists/ChecklistTableRow.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 0);
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function getStyles(props, context, state) {
  var tableRow = context.muiTheme.tableRow;
  var cellBgColor = 'inherit';

  if (props.hovered || state.hovered) {
    cellBgColor = tableRow.hoverColor;
  } else if (props.selected) {
    cellBgColor = tableRow.selectedColor;
  } else if (props.striped) {
    cellBgColor = tableRow.stripeColor;
  }

  return {
    root: {
      borderBottom: props.displayBorder && '1px solid ' + tableRow.borderColor,
      color: tableRow.textColor,
      height: tableRow.height
    },
    cell: {
      backgroundColor: cellBgColor
    }
  };
}

var ChecklistTableRow = function (_Component) {
  (0, _inherits3.default)(ChecklistTableRow, _Component);

  function ChecklistTableRow() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ChecklistTableRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ChecklistTableRow.__proto__ || (0, _getPrototypeOf2.default)(ChecklistTableRow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hovered: false
    }, _this.onCellClick = function (event, columnIndex) {
      if (_this.props.selectable && _this.props.onCellClick) {
        _this.props.onCellClick(event, _this.props.rowNumber, columnIndex);
      }

      event.ctrlKey = true;

      _this.onRowClick(event);
    }, _this.onCellHover = function (event, columnIndex) {
      if (_this.props.hoverable) {
        _this.setState({
          hovered: true
        });

        if (_this.props.onCellHover) _this.props.onCellHover(event, _this.props.rowNumber, columnIndex);

        _this.onRowHover(event);
      }
    }, _this.onCellHoverExit = function (event, columnIndex) {
      if (_this.props.hoverable) {
        _this.setState({
          hovered: false
        });

        if (_this.props.onCellHoverExit) _this.props.onCellHoverExit(event, _this.props.rowNumber, columnIndex);

        _this.onRowHoverExit(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ChecklistTableRow, [{
    key: 'onRowClick',
    value: function () {
      function onRowClick(event) {
        //console.log("zzzz");
        //if (this.props.selectable && this.props.onRowClick){
        //console.log("fffff");
        this.props.onRowClick(event, this.props.rowNumber); //}
      }

      return onRowClick;
    }()
  }, {
    key: 'onRowHover',
    value: function () {
      function onRowHover(event) {
        if (this.props.onRowHover) {
          this.props.onRowHover(event, this.props.rowNumber);
        }
      }

      return onRowHover;
    }()
  }, {
    key: 'onRowHoverExit',
    value: function () {
      function onRowHoverExit(event) {
        if (this.props.onRowHoverExit) this.props.onRowHoverExit(event, this.props.rowNumber);
      }

      return onRowHoverExit;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _this2 = this;

        var _props = this.props,
            className = _props.className,
            displayBorder = _props.displayBorder,
            hoverable = _props.hoverable,
            hovered = _props.hovered,
            onCellClick = _props.onCellClick,
            onCellHover = _props.onCellHover,
            onCellHoverExit = _props.onCellHoverExit,
            onRowClick = _props.onRowClick,
            onRowHover = _props.onRowHover,
            onRowHoverExit = _props.onRowHoverExit,
            rowNumber = _props.rowNumber,
            selectable = _props.selectable,
            selected = _props.selected,
            striped = _props.striped,
            style = _props.style,
            other = (0, _objectWithoutProperties3.default)(_props, ['className', 'displayBorder', 'hoverable', 'hovered', 'onCellClick', 'onCellHover', 'onCellHoverExit', 'onRowClick', 'onRowHover', 'onRowHoverExit', 'rowNumber', 'selectable', 'selected', 'striped', 'style']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var styles = getStyles(this.props, this.context, this.state);

        var rowColumns = _react2.default.Children.map(this.props.children, function (child, columnNumber) {
          if (_react2.default.isValidElement(child)) {
            return _react2.default.cloneElement(child, {
              columnNumber: columnNumber,
              hoverable: _this2.props.hoverable,
              key: _this2.props.rowNumber + '-' + columnNumber,
              onClick: _this2.onClick,
              onHover: _this2.onCellHover,
              onHoverExit: _this2.onCellHoverExit,
              style: (0, _simpleAssign2.default)({}, styles.cell, child.props.style)
            });
          }
        });

        return _react2.default.createElement('tr', (0, _extends3.default)({
          className: className,
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
        }, other), rowColumns);
      }

      return render;
    }()
  }]);
  return ChecklistTableRow;
}(_react.Component);

ChecklistTableRow.defaultProps = {
  displayBorder: true,
  hoverable: false,
  hovered: false,
  selectable: true,
  selected: false,
  striped: false
};
ChecklistTableRow.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};
process.env.NODE_ENV !== "production" ? ChecklistTableRow.propTypes = {
  /**
   * Children passed to table row.
   */
  children: PropTypes.node,

  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,

  /**
   * If true, row border will be displayed for the row.
   * If false, no border will be drawn.
   */
  displayBorder: PropTypes.bool,

  /**
   * Controls whether or not the row reponseds to hover events.
   */
  hoverable: PropTypes.bool,

  /**
   * Controls whether or not the row should be rendered as being
   * hovered. This property is evaluated in addition to this.state.hovered
   * and can be used to synchronize the hovered state with some other
   * external events.
   */
  hovered: PropTypes.bool,

  /**
   * @ignore
   * Called when a row cell is clicked.
   * rowNumber is the row number and columnId is
   * the column number or the column key.
   */
  onCellClick: PropTypes.func,

  /**
   * @ignore
   * Called when a table cell is hovered.
   * rowNumber is the row number of the hovered row
   * and columnId is the column number or the column key of the cell.
   */
  onCellHover: PropTypes.func,

  /**
   * @ignore
   * Called when a table cell is no longer hovered.
   * rowNumber is the row number of the row and columnId
   * is the column number or the column key of the cell.
   */
  onCellHoverExit: PropTypes.func,

  /**
   * @ignore
   * Called when row is clicked.
   */
  onRowClick: PropTypes.func,

  /**
   * @ignore
   * Called when a table row is hovered.
   * rowNumber is the row number of the hovered row.
   */
  onRowHover: PropTypes.func,

  /**
   * @ignore
   * Called when a table row is no longer hovered.
   * rowNumber is the row number of the row that is no longer hovered.
   */
  onRowHoverExit: PropTypes.func,

  /**
   * Number to identify the row. This property is
   * automatically populated when used with the TableBody component.
   */
  rowNumber: PropTypes.number,

  /**
   * If true, table rows can be selected. If multiple row
   * selection is desired, enable multiSelectable.
   * The default value is true.
   */
  selectable: PropTypes.bool,

  /**
   * Indicates that a particular row is selected.
   * This property can be used to programmatically select rows.
   */
  selected: PropTypes.bool,

  /**
   * Indicates whether or not the row is striped.
   */
  striped: PropTypes.bool,

  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object
} : void 0;
exports.default = ChecklistTableRow;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ChecklistsPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/workflows/lists/ChecklistsPage.jsx                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  ChecklistsPage: function () {
    return ChecklistsPage;
  }
});
var CardText, CardTitle;
module.link("material-ui/Card", {
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var Tab, Tabs;
module.link("material-ui/Tabs", {
  Tab: function (v) {
    Tab = v;
  },
  Tabs: function (v) {
    Tabs = v;
  }
}, 1);
var TextField, RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn;
module.link("material-ui", {
  TextField: function (v) {
    TextField = v;
  },
  RaisedButton: function (v) {
    RaisedButton = v;
  },
  Table: function (v) {
    Table = v;
  },
  TableBody: function (v) {
    TableBody = v;
  },
  TableHeader: function (v) {
    TableHeader = v;
  },
  TableHeaderColumn: function (v) {
    TableHeaderColumn = v;
  },
  TableRow: function (v) {
    TableRow = v;
  },
  TableRowColumn: function (v) {
    TableRowColumn = v;
  }
}, 2);
var Checklist;
module.link("/imports/ui/workflows/lists/Checklist", {
  Checklist: function (v) {
    Checklist = v;
  }
}, 3);
var ChecklistTableRow;
module.link("/imports/ui/workflows/lists/ChecklistTableRow", {
  "default": function (v) {
    ChecklistTableRow = v;
  }
}, 4);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 5);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 6);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 7);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 8);
var VerticalCanvas, GlassCard, Glass;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  },
  Glass: function (v) {
    Glass = v;
  }
}, 9);
var lightBaseTheme, darkBaseTheme;
module.link("material-ui/styles", {
  lightBaseTheme: function (v) {
    lightBaseTheme = v;
  },
  darkBaseTheme: function (v) {
    darkBaseTheme = v;
  }
}, 10);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 11);
Session.setDefault('checklistPageTabIndex', 0);
Session.setDefault('checklistSearchFilter', '');
Session.setDefault('selectedChecklist', false);
Session.setDefault('newTask', '');

var ChecklistsPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ChecklistsPage, _React$Component);

  function ChecklistsPage(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      newTask: '',
      newChecklistTitle: ''
    };
    return _this;
  }

  var _proto = ChecklistsPage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          opacity: Session.get('globalOpacity'),
          tab: {
            borderBottom: '1px solid lightgray',
            borderRight: 'none'
          },
          rowText: Glass.darkroom({
            cursor: 'pointer'
          }),
          textColor: {
            color: lightBaseTheme.palette.textColor
          },
          inputStyle: {
            color: lightBaseTheme.palette.textColor
          },
          errorStyle: {
            color: lightBaseTheme.palette.accent1Color
          },
          hintStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          },
          underlineStyle: {
            borderColor: lightBaseTheme.palette.textColor
          },
          floatingLabelStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          },
          floatingLabelFocusStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          }
        },
        state: {
          isLoggedIn: false
        },
        tabIndex: Session.get('checklistPageTabIndex'),
        checklistSearchFilter: Session.get('checklistSearchFilter'),
        currentChecklist: Session.get('selectedChecklist'),
        currentChecklistTitle: false,
        lists: []
      };

      if ((typeof Lists === "undefined" ? "undefined" : (0, _typeof2.default)(Lists)) === "object" && Lists.find().count() > 0) {
        data.lists = Lists.find().map(function (list) {
          var result = {
            _id: list._id,
            status: list.status,
            date: '',
            code: '',
            note: list.note
          };

          if (list.code && list.code.text) {
            result.code = list.code.text;
          }

          if (list.date) {
            result.date = list.date.toString();
          }

          return result;
        });
      }

      if (Session.get('selectedChecklist')) {
        var currentList = Lists.findOne({
          _id: Session.get('selectedChecklist')
        });
        data.currentChecklistTitle = get(currentList, 'code.text');
      }

      if (Meteor.user()) {
        data.state.isLoggedIn = true;
      }

      data.style = Glass.blur(data.style);
      data.style.appbar = Glass.darkroom(data.style.appbar);
      data.style.tab = Glass.darkroom(data.style.tab);
      if (process.env.NODE_ENV === "test") console.log("ChecklistsPage[data]", data);
      return data;
    }

    return getMeteorData;
  }(); // this could be a mixin


  _proto.handleTabChange = function () {
    function handleTabChange(index) {
      Session.set('checklistPageTabIndex', index);
    }

    return handleTabChange;
  }(); // this could be a mixin


  _proto.onNewTab = function () {
    function onNewTab() {
      console.log("onNewTab; we should clear things...");
      Session.set('selectedChecklist', false);
      Session.set('checklistDetailState', false);
    }

    return onNewTab;
  }();

  _proto.rowClick = function () {
    function rowClick(row, column, event, foo) {
      console.log("click", row, column, event);
    }

    return rowClick;
  }();

  _proto.fooClick = function () {
    function fooClick(i) {
      console.log("foo", i);
      Session.set('selectedChecklist', i);
      Session.set('checklistPageTabIndex', 1);
    }

    return fooClick;
  }();

  _proto.handleTouchTap = function () {
    function handleTouchTap(value) {
      console.log('handleTouchTap', value);
      console.log('selectedChecklistId', Session.get('selectedChecklist'));
      var selectedChecklist = Lists.findOne({
        _id: Session.get('selectedChecklist')
      });
      console.log('selectedChecklist', selectedChecklist);
      selectedChecklist.entry.push({
        "flag": {
          "text": "Pending",
          "coding": [{
            "system": "http://hl7.org/fhir/ValueSet/order-status",
            "code": "pending",
            "display": "Pending"
          }]
        },
        "deleted": false,
        "date": new Date(),
        "item": {
          "display": value
        }
      });
      Lists.update({
        _id: Session.get('selectedChecklist')
      }, {
        $addToSet: {
          'entry': {
            "flag": {
              "text": "Pending",
              "coding": [{
                "system": "http://hl7.org/fhir/ValueSet/order-status",
                "code": "pending",
                "display": "Pending"
              }]
            },
            "deleted": false,
            "date": new Date(),
            "item": {
              "display": value
            }
          }
        }
      });
      this.setState({
        newTask: ''
      });
    }

    return handleTouchTap;
  }();

  _proto.handleKeyPress = function () {
    function handleKeyPress(e, value) {
      console.log('handleKeyPress', e.key);
      this.setState({
        newTask: this.state.newTask + e.key
      });

      if (e.key === 'Enter') {
        this.handleTouchTap(this.state.newTask);
      }
    }

    return handleKeyPress;
  }();

  _proto.handleTitleTouchTap = function () {
    function handleTitleTouchTap(value) {
      console.log('handleTitleTouchTap', value);
      console.log('selectedChecklistId', Session.get('selectedChecklist'));
      var selectedChecklist = Lists.findOne({
        _id: Session.get('selectedChecklist')
      });
      Lists.update({
        _id: Session.get('selectedChecklist')
      }, {
        $set: {
          'code.text': value
        }
      });
      this.setState({
        newChecklistTitle: ''
      });
    }

    return handleTitleTouchTap;
  }();

  _proto.titleKeyPress = function () {
    function titleKeyPress(e, value) {
      console.log('titleKeyPress', e.key);
      this.setState({
        newChecklistTitle: this.state.newChecklistTitle + e.key
      });

      if (e.key === 'Enter') {
        this.handleTitleTouchTap(this.state.newChecklistTitle);
      }
    }

    return titleKeyPress;
  }();

  _proto.render = function () {
    function render() {
      var listRows = [];
      var checklistTitle = 'Checklists';

      if (this.data.currentChecklistTitle) {
        checklistTitle = this.data.currentChecklistTitle;
      } else {
        checklistTitle = React.createElement(TextField, {
          type: "newChecklistTitle",
          name: "newChecklistTitle",
          floatingLabelText: "Checklist Name",
          onKeyPress: this.titleKeyPress.bind(this),
          inputStyle: this.data.style.inputStyle,
          hintStyle: this.data.style.hintStyle,
          hintText: "...",
          errorStyle: this.data.style.errorStyle,
          underlineStyle: this.data.style.underlineStyle,
          floatingLabelStyle: this.data.style.floatingLabelStyle,
          floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
          value: this.state.newChecklistTitle,
          fullWidth: true
        });
      }

      for (var i = 0; i < this.data.lists.length; i++) {
        listRows.push(React.createElement(ChecklistTableRow, {
          key: i,
          style: this.data.style.rowText,
          onClick: this.fooClick.bind('this', this.data.lists[i]._id)
        }, React.createElement(TableRowColumn, {
          style: {
            width: '100px'
          }
        }, this.data.lists[i].status), React.createElement(TableRowColumn, null, this.data.lists[i].date), React.createElement(TableRowColumn, null, this.data.lists[i].code), React.createElement(TableRowColumn, null, this.data.lists[i].note)));
      }

      return React.createElement("div", {
        id: "checklistsPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, {
        height: "auto"
      }, React.createElement(CardTitle, {
        title: checklistTitle,
        titleStyle: this.data.style.rowText
      }), React.createElement(CardText, null, React.createElement(Tabs, {
        id: "checklistsPageTabs",
        "default": true,
        value: this.data.tabIndex,
        onChange: this.handleTabChange,
        initialSelectedIndex: 0
      }, React.createElement(Tab, {
        className: "checklistListTab",
        label: "Checklists",
        onActive: this.handleActive,
        style: this.data.style.tab,
        value: 0
      }, React.createElement(Table, {
        onCellClick: this.rowClick.bind(this)
      }, React.createElement(TableHeader, {
        displaySelectAll: false,
        adjustForCheckbox: false,
        style: this.data.style.rowText
      }, React.createElement(TableRow, null, React.createElement(TableHeaderColumn, {
        style: {
          width: '100px'
        }
      }, "Status"), React.createElement(TableHeaderColumn, null, "Created At"), React.createElement(TableHeaderColumn, null, "Name"), React.createElement(TableHeaderColumn, null, "Note"))), React.createElement(TableBody, {
        displayRowCheckbox: false,
        showRowHover: true
      }, listRows))), React.createElement(Tab, {
        className: "checklistDetailsTab",
        label: "Detail",
        onActive: this.handleActive,
        style: this.data.style.tab,
        value: 1
      }, React.createElement(TextField, {
        type: "newTask",
        name: "newTask",
        floatingLabelText: "New Task",
        onKeyPress: this.handleKeyPress.bind(this),
        inputStyle: this.data.style.inputStyle,
        hintStyle: this.data.style.hintStyle,
        hintText: "...",
        errorStyle: this.data.style.errorStyle,
        underlineStyle: this.data.style.underlineStyle,
        floatingLabelStyle: this.data.style.floatingLabelStyle,
        floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
        value: this.state.newTask,
        fullWidth: true
      }), React.createElement(Checklist, null)))))));
    }

    return render;
  }();

  return ChecklistsPage;
}(React.Component);

ReactMixin(ChecklistsPage.prototype, ReactMeteorData);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"users":{"UserTable.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/workflows/users/UserTable.jsx                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  UserTable: function () {
    return UserTable;
  }
});
var AvVideoCall;
module.link("material-ui/svg-icons/av/video-call", {
  "default": function (v) {
    AvVideoCall = v;
  }
}, 0);
var Avatar;
module.link("material-ui/Avatar", {
  "default": function (v) {
    Avatar = v;
  }
}, 1);
var Bert;
module.link("meteor/clinical:alert", {
  Bert: function (v) {
    Bert = v;
  }
}, 2);
var CommunicationPhone;
module.link("material-ui/svg-icons/communication/phone", {
  "default": function (v) {
    CommunicationPhone = v;
  }
}, 3);
var IconButton;
module.link("material-ui/IconButton", {
  "default": function (v) {
    IconButton = v;
  }
}, 4);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 5);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 6);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 7);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 8);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 9);
var Table;
module.link("react-bootstrap", {
  Table: function (v) {
    Table = v;
  }
}, 10);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 11);
var removeUserById;
module.link("/imports/api/users/methods", {
  removeUserById: function (v) {
    removeUserById = v;
  }
}, 12);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 13);
var CardHeader, CardText, CardTitle;
module.link("material-ui/Card", {
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 14);
var Dialog;
module.link("material-ui/Dialog", {
  "default": function (v) {
    Dialog = v;
  }
}, 15);
var Swipeable;
module.link("react-swipeable", {
  "default": function (v) {
    Swipeable = v;
  }
}, 16);
var FlatButton;
module.link("material-ui/FlatButton", {
  "default": function (v) {
    FlatButton = v;
  }
}, 17);
var sampleNotifications = [{
  primaryText: "Record copied",
  secondaryText: "Jan 20, 2014",
  icon: 'ContentCopy',
  color: 'green600'
}, {
  primaryText: "Medication warning",
  secondaryText: "Jan 10, 2014",
  icon: 'Warning',
  color: 'yellow600'
}, {
  primaryText: "New clinical note",
  secondaryText: "Jan 10, 2014",
  icon: 'AddCircleOutline',
  color: 'green600'
}, {
  primaryText: "Archive export",
  secondaryText: "Jan 10, 2014",
  icon: 'Archive',
  color: 'green600'
}, {
  primaryText: "Unencrypted email",
  secondaryText: "Jan 10, 2014",
  icon: 'Mail',
  color: 'orange600'
}, {
  primaryText: "Record copied",
  secondaryText: "Jan 10, 2014",
  icon: 'ContentPaste',
  color: 'green600'
}, {
  primaryText: "Record removed",
  secondaryText: "Jan 10, 2014",
  icon: 'RemoveCircleOutline',
  color: 'green600'
}, {
  primaryText: "Report!",
  secondaryText: "Jan 10, 2014",
  icon: 'Report',
  color: 'red600'
}, {
  primaryText: "Report!",
  secondaryText: "Jan 10, 2014",
  icon: 'Flag',
  color: 'orange600'
}, {
  primaryText: "Blocked!",
  secondaryText: "Jan 10, 2014",
  icon: 'Block',
  color: 'red600'
}, {
  primaryText: "Unarchive",
  secondaryText: "Jan 10, 2014",
  icon: 'Unarchive',
  color: 'green600'
}];
Session.setDefault('transferPatientDialogOpen', false);
Session.setDefault('outgoingPatient', {
  display: '',
  reference: ''
});
Session.setDefault('receivingUser', {
  display: '',
  reference: ''
});

var UserTable =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(UserTable, _React$Component);

  function UserTable() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = UserTable.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      // this should all be handled by props
      // or a mixin!
      var data = {
        style: {
          opacity: Session.get('globalOpacity')
        },
        state: {
          isAdmin: false
        },
        selected: [],
        users: [],
        outgoingPatient: Session.get('outgoingPatient'),
        receivingUser: Session.get('receivingUser'),
        dialogOpen: Session.get('transferPatientDialogOpen')
      };
      var query = {};
      var options = {
        sort: {
          'profile.name.text': 1
        }
      }; // number of items in the table should be set globally

      if (get(Meteor, 'settings.public.defaults.paginationLimit')) {
        options.limit = get(Meteor, 'settings.public.defaults.paginationLimit');
      } // but can be over-ridden by props being more explicit


      if (this.props.limit) {
        options.limit = this.props.limit;
      }

      data.users = Meteor.users.find(query, options).fetch();

      if (get(Meteor.user(), 'roles[0]') === 'sysadmin') {
        data.state.isAdmin = true;
      }

      if (Session.get('darkroomEnabled')) {
        data.style.color = 'black';
        data.style.background = 'white';
      } else {
        data.style.color = 'white';
        data.style.background = 'black';
      } // this could be another mixin


      if (Session.get('glassBlurEnabled')) {
        data.style.filter = 'blur(3px)';
        data.style.webkitFilter = 'blur(3px)';
      } // this could be another mixin


      if (Session.get('backgroundBlurEnabled')) {
        data.style.backdropFilter = 'blur(5px)';
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.handleCloseCatch = function () {
    function handleCloseCatch() {
      Session.set('transferPatientDialogOpen', false);
    }

    return handleCloseCatch;
  }();

  _proto.swiping = function () {
    function swiping(e, deltaX, deltaY, absX, absY, velocity) {//console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
      //alert("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
    }

    return swiping;
  }();

  _proto.swipingLeft = function () {
    function swipingLeft(e, absX) {
      console.log("You're Swiping to the Left...", e, absX); //alert("You're Swiping to the Left...", e, absX)
    }

    return swipingLeft;
  }();

  _proto.swiped = function () {
    function swiped(e, deltaX, deltaY, isFlick, velocity) {
      console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity);
    }

    return swiped;
  }();

  _proto.confirmTransfer = function () {
    function confirmTransfer() {
      console.log("confirmTransfer");
      var outgoingPatient = Session.get('outgoingPatient');
      var receivingUser = Session.get('receivingUser');
      Meteor.call('transferPatient', outgoingPatient, receivingUser);
      Session.set('transferPatientDialogOpen', false);
    }

    return confirmTransfer;
  }();

  _proto.swipedUp = function () {
    function swipedUp(e, deltaY, isFlick) {
      //alert("You Swiped Up...", e, deltaY, isFlick)
      console.log("You Swiped Up...", e, deltaY, isFlick); //this.transferPatient();

      var outgoingPatient = Session.get('outgoingPatient');
      var receivingUser = Session.get('receivingUser');
      Meteor.call('transferPatient', outgoingPatient, receivingUser);
      Session.set('transferPatientDialogOpen', false);
    }

    return swipedUp;
  }();

  _proto.renderAdminControls = function () {
    function renderAdminControls(isAdmin, i) {
      if (isAdmin) {
        return React.createElement("td", null, React.createElement(FlatButton, {
          label: "Remove",
          primary: true,
          onClick: this.removeUser.bind(this, this.data.users[i]._id)
        }));
      }
    }

    return renderAdminControls;
  }();

  _proto.renderAdminHeaders = function () {
    function renderAdminHeaders(isAdmin) {
      if (isAdmin) {
        return React.createElement("th", null, "remove");
      }
    }

    return renderAdminHeaders;
  }();

  _proto.renderRowAvatarHeader = function () {
    function renderRowAvatarHeader() {
      if (Meteor.settings.public.defaults.avatars && !(this.props.avatars == false)) {
        return React.createElement("th", {
          className: "avatar"
        }, "photo");
      }
    }

    return renderRowAvatarHeader;
  }();

  _proto.renderRowAvatar = function () {
    function renderRowAvatar(user, avatarStyle) {
      if (Meteor.settings.public.defaults.avatars && !(this.props.avatars == false)) {
        return React.createElement("td", {
          className: "avatar"
        }, React.createElement(Avatar, {
          src: user.profile ? user.profile.avatar : '/thumbnail-blank.png',
          style: avatarStyle
        }));
      }
    }

    return renderRowAvatar;
  }();

  _proto.renderDialButtonHeader = function () {
    function renderDialButtonHeader() {
      if (Meteor.settings.public.defaults.avatars) {
        return React.createElement("th", {
          className: "dial"
        }, "dial");
      }
    }

    return renderDialButtonHeader;
  }();

  _proto.renderDialButton = function () {
    function renderDialButton(user) {
      if (Meteor.settings.public.defaults.avatars) {
        return React.createElement("td", {
          className: "dial"
        }, React.createElement(CommunicationPhone, {
          onClick: this.videocallUser.bind(this, user),
          style: {
            color: 'green'
          }
        }));
      }
    }

    return renderDialButton;
  }();

  _proto.onRowClick = function () {
    function onRowClick(user) {
      //console.log('onRowClick', this.props.onClick)
      console.log('onRowClick.user', user);

      if (this.props.onClick) {
        this.props.onClick(user);
      }

      Session.set('selectedUser', user._id);
    }

    return onRowClick;
  }();

  _proto.videocallUser = function () {
    function videocallUser(user) {
      console.log('videocallUser', user);
      Meteor.call('sendInboxMessage', user._id);
    }

    return videocallUser;
  }();

  _proto.notifyUser = function () {
    function notifyUser(user) {
      console.log('notifyUser', user);
      Meteor.call('sendNotificationToUser', Random.choice(sampleNotifications).primaryText, Random.choice(sampleNotifications).secondaryText, user._id);
    }

    return notifyUser;
  }();

  _proto.transferPatient = function () {
    function transferPatient(receivingUser) {
      console.log('transferPatient()');
      console.log('receivingUser', receivingUser);
      Session.set('transferPatientDialogOpen', true);
      var user = new User(receivingUser);
      var user = {
        reference: receivingUser._id,
        display: user.fullName()
      };
      Session.set('receivingUser', user);
      var selectedPatient = Session.get('selectedPatient');
      console.log('selectedPatient', selectedPatient);
      var patient = Patients.findOne({
        _id: Session.get('selectedPatient')
      });
      var patient = {
        reference: patient._id,
        display: patient.displayName()
      };
      Session.set('outgoingPatient', patient);
    }

    return transferPatient;
  }();

  _proto.render = function () {
    function render() {
      var tableRows = [];

      for (var i = 0; i < this.data.users.length; i++) {
        tableRows.push(React.createElement("tr", {
          key: i,
          className: "userRow",
          style: {
            cursor: "pointer"
          },
          onClick: this.onRowClick.bind(this, this.data.users[i])
        }, this.renderRowAvatar(this.data.users[i], this.data.style.avatar), this.renderDialButton(this.data.users[i]), React.createElement("td", null, this.data.users[i].fullName()), React.createElement("td", null, this.data.users[i].defaultEmail()), React.createElement("td", {
          className: "dial",
          style: {
            cursor: 'pointer'
          }
        }, React.createElement(FlatButton, {
          label: "Notify",
          primary: true,
          onClick: this.notifyUser.bind(this, this.data.users[i])
        })), React.createElement("td", {
          className: "transfer",
          style: {
            width: '180px',
            cursor: 'pointer'
          }
        }, React.createElement(FlatButton, {
          label: "Transfer",
          primary: true,
          onClick: this.transferPatient.bind(this, this.data.users[i])
        })), this.renderAdminControls(this.data.state.isAdmin, i)));
      }

      var catchActions = [React.createElement(FlatButton, {
        label: "Confirm",
        primary: true,
        keyboardFocused: true,
        onClick: this.confirmTransfer
      }), React.createElement(FlatButton, {
        label: "Cancel",
        primary: true,
        onClick: this.handleCloseCatch
      })];
      return React.createElement(CardText, null, React.createElement(Table, null, React.createElement("thead", null, React.createElement("tr", null, this.renderRowAvatarHeader(), this.renderDialButtonHeader(), React.createElement("th", null, "full name"), React.createElement("th", null, "email"), React.createElement("th", null, "notify"), React.createElement("th", null, "transfer current patient"), this.renderAdminHeaders(this.data.state.isAdmin))), React.createElement("tbody", null, tableRows)), React.createElement(Dialog //title="Patient Transfer"
      , {
        actions: catchActions,
        modal: false,
        open: this.data.dialogOpen,
        onRequestClose: this.handleCloseCatch
      }, React.createElement(Swipeable, {
        onSwiping: this.swiping,
        onSwipingLeft: this.swipingLeft,
        onSwiped: this.swiped,
        onSwipedUp: this.swipedUp
      }, React.createElement(CardText, null, React.createElement("h6", {
        style: {
          color: 'gray'
        }
      }, "Receiving Practitioner"), React.createElement("h2", null, get(this, 'data.receivingUser.display')), React.createElement("h4", {
        className: "barcode"
      }, get(this, 'data.receivingUser.reference')), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null), React.createElement("h6", {
        style: {
          color: 'gray'
        }
      }, "Patient to Transfer"), React.createElement("h2", null, get(this, 'data.outgoingPatient.display')), React.createElement("h4", {
        className: "barcode"
      }, get(this, 'data.outgoingPatient.reference'))))));
    }

    return render;
  }();

  _proto.handleChange = function () {
    function handleChange(row, key, value) {
      var source = this.state.source;
      source[row][key] = value;
      this.setState({
        source: source
      });
    }

    return handleChange;
  }();

  _proto.handleSelect = function () {
    function handleSelect(selected) {
      this.setState({
        selected: selected
      });
    }

    return handleSelect;
  }();

  _proto.routeToHealthlog = function () {
    function routeToHealthlog(userId) {
      browserHistory.push('/weblog/' + userId);
    }

    return routeToHealthlog;
  }();

  _proto.removeUser = function () {
    function removeUser(userId, event) {
      event.preventDefault();
      console.log("removeUser", userId);
      removeUserById.call({
        _id: userId
      }, function (error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('User removed!', 'success');
        }
      });
    }

    return removeUser;
  }();

  return UserTable;
}(React.Component);

ReactMixin(UserTable.prototype, ReactMeteorData);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"components":{"AboutAppCard.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/AboutAppCard.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  AboutAppCard: function () {
    return AboutAppCard;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var CardTitle, CardText, CardHeader;
module.link("material-ui/Card", {
  CardTitle: function (v) {
    CardTitle = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardHeader: function (v) {
    CardHeader = v;
  }
}, 3);
var Link;
module.link("react-router", {
  Link: function (v) {
    Link = v;
  }
}, 4);
var Table;
module.link("react-bootstrap", {
  Table: function (v) {
    Table = v;
  }
}, 5);
var LinearProgress;
module.link("material-ui/LinearProgress", {
  "default": function (v) {
    LinearProgress = v;
  }
}, 6);
var orange500, blue500;
module.link("material-ui/styles/colors", {
  orange500: function (v) {
    orange500 = v;
  },
  blue500: function (v) {
    blue500 = v;
  }
}, 7);

var AboutAppCard =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(AboutAppCard, _React$Component);

  function AboutAppCard(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = AboutAppCard.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          page: {
            minHeight: '0px'
          }
        }
      };
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      var style = {
        marketingImage: {
          width: '80%',
          position: 'relative',
          left: '10%'
        },
        sectionHeader: {
          borderTop: '1px solid lightgray',
          width: '100%'
        },
        page: {
          minHeight: '1024px'
        }
      };
      return React.createElement("div", null, React.createElement(CardTitle, {
        title: "Acknowledgements"
      }), React.createElement(CardText, null, React.createElement("p", null, "This software is the result of a tremendous amount of work from the open source and international standards community.  In particular, we want to acknowledge the following generous sponsors and donors:"), React.createElement("br", null), React.createElement("h4", null, "University Support"), React.createElement("ul", null, React.createElement("li", null, "University of Chicago"), React.createElement("li", null, "University of California - Santa Cruz"), React.createElement("li", null, "University of Pennsylvania")), React.createElement("br", null), React.createElement("h4", null, "Startup Communities"), React.createElement("ul", null, React.createElement("li", null, "Polsky Center for Entrepreneurship"), React.createElement("li", null, "MATTER@Chicago")), React.createElement("br", null), React.createElement("h4", null, "Standards Development Communities"), React.createElement("ul", null, React.createElement("li", null, "Health Level Seven"), React.createElement("li", null, "World Wide Web Consortium")), React.createElement("br", null), React.createElement("h4", null, "Open Source Tech Community"), React.createElement("ul", null, React.createElement("li", null, "The Meteor Development Group"), React.createElement("li", null, "Meteor Meetup New York"), React.createElement("li", null, "Circle Continuous Integration"), React.createElement("li", null, "GitHub Source Control"), React.createElement("li", null, "The Linux Foundation"), React.createElement("li", null, "Mongo, Inc"))));
    }

    return render;
  }();

  return AboutAppCard;
}(React.Component);

ReactMixin(AboutAppCard.prototype, ReactMeteorData);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AdminSidebar.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/AdminSidebar.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  AdminSidebar: function () {
    return AdminSidebar;
  }
});
var LinkContainer;
module.link("react-router-bootstrap", {
  LinkContainer: function (v) {
    LinkContainer = v;
  }
}, 0);
var List, ListItem;
module.link("material-ui/List", {
  List: function (v) {
    List = v;
  },
  ListItem: function (v) {
    ListItem = v;
  }
}, 1);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 2);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 3);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 4);
var MenuItem;
module.link("/imports/ui/components/MenuItem", {
  "default": function (v) {
    MenuItem = v;
  }
}, 5);
var get, orderBy;
module.link("lodash", {
  get: function (v) {
    get = v;
  },
  orderBy: function (v) {
    orderBy = v;
  }
}, 6);
// Pick up any dynamic routes that are specified in packages, and include them
var dynamicModules = [];
Object.keys(Package).forEach(function (packageName) {
  if (Package[packageName].AdminSidebarElements) {
    // we try to build up a route from what's specified in the package
    Package[packageName].AdminSidebarElements.forEach(function (element) {
      dynamicModules.push(element);
    });
  }
});

var AdminSidebar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(AdminSidebar, _React$Component);

  function AdminSidebar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = AdminSidebar.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          position: 'fixed',
          top: '0px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2.4rem',
          opacity: Session.get('globalOpacity')
        },
        listItem: {
          display: 'inline-block',
          position: 'relative'
        }
      };
      return data;
    }

    return getMeteorData;
  }();

  _proto.handleLogout = function () {
    function handleLogout() {
      Meteor.logout();
    }

    return handleLogout;
  }();

  _proto.render = function () {
    function render() {
      //----------------------------------------------------------------------
      // Dynamic Modules  
      var sortedModules = orderBy(dynamicModules, ['primaryText'], ['asc']);
      var dynamicElements = [];
      sortedModules.map(function (element, index) {
        // the excludes array will hide routes
        // if(!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)){
        dynamicElements.push(React.createElement(LinkContainer, {
          to: element.to,
          key: index
        }, React.createElement(MenuItem, {
          primaryText: element.primaryText,
          href: element.href
        }))); // }
      });
      return React.createElement("div", {
        id: "adminSidebar"
      }, React.createElement(List, {
        style: {
          paddingLeft: '20px',
          position: 'static',
          width: '100%'
        }
      }, React.createElement(LinkContainer, {
        to: "/"
      }, React.createElement(MenuItem, {
        primaryText: "Admin Index",
        href: "/"
      })), React.createElement(LinkContainer, {
        to: "/users"
      }, React.createElement(MenuItem, {
        primaryText: "Users",
        href: "/users"
      })), React.createElement("hr", null), dynamicElements, React.createElement("hr", null), React.createElement(LinkContainer, {
        to: "/fhir-resources-index"
      }, React.createElement(MenuItem, {
        id: "fhirResourcePageItem",
        primaryText: "FHIR Resources",
        href: "/fhir-resources-index"
      })), React.createElement(LinkContainer, {
        to: "/data-management"
      }, React.createElement(MenuItem, {
        primaryText: "Data Management",
        href: "/theming"
      })), React.createElement("hr", null), React.createElement(LinkContainer, {
        to: "/theming"
      }, React.createElement(MenuItem, {
        primaryText: "Theming",
        href: "/theming"
      })), React.createElement("hr", null), React.createElement(LinkContainer, {
        to: "/about"
      }, React.createElement(MenuItem, {
        primaryText: "About",
        href: "/about"
      })), React.createElement(LinkContainer, {
        to: "/metadata"
      }, React.createElement(MenuItem, {
        primaryText: "Metadata",
        href: "/metadata"
      })), React.createElement(LinkContainer, {
        to: "/signin"
      }, React.createElement(MenuItem, {
        className: "logoutMenuItem",
        primaryText: "Logout",
        href: "/signin",
        onClick: this.handleLogout
      }))));
    }

    return render;
  }();

  return AdminSidebar;
}(React.Component);

AdminSidebar.propTypes = {};
AdminSidebar.defaultProps = {};
ReactMixin(AdminSidebar.prototype, ReactMeteorData);
module.exportDefault(AdminSidebar);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AuthenticatedNavigation.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/AuthenticatedNavigation.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  AuthenticatedNavigation: function () {
    return AuthenticatedNavigation;
  }
});
var ToolbarGroup, ToolbarTitle;
module.link("material-ui/Toolbar", {
  ToolbarGroup: function (v) {
    ToolbarGroup = v;
  },
  ToolbarTitle: function (v) {
    ToolbarTitle = v;
  }
}, 0);
var ActionAccountCircle;
module.link("material-ui/svg-icons/action/account-circle", {
  "default": function (v) {
    ActionAccountCircle = v;
  }
}, 1);
var ActionExitToApp;
module.link("material-ui/svg-icons/action/exit-to-app", {
  "default": function (v) {
    ActionExitToApp = v;
  }
}, 2);
var AvVideoCall;
module.link("material-ui/svg-icons/av/video-call", {
  "default": function (v) {
    AvVideoCall = v;
  }
}, 3);
var CardText;
module.link("material-ui/Card", {
  CardText: function (v) {
    CardText = v;
  }
}, 4);
var Glass;
module.link("meteor/clinical:glass-ui", {
  Glass: function (v) {
    Glass = v;
  }
}, 5);
var IconButton;
module.link("material-ui/IconButton", {
  "default": function (v) {
    IconButton = v;
  }
}, 6);
var IconMenu;
module.link("material-ui/IconMenu", {
  "default": function (v) {
    IconMenu = v;
  }
}, 7);
var MenuItem;
module.link("material-ui/MenuItem", {
  "default": function (v) {
    MenuItem = v;
  }
}, 8);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 9);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 10);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 11);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 12);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 13);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 14);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 15);
var MenuButton;
module.link("/imports/ui/components/MenuButton", {
  "default": function (v) {
    MenuButton = v;
  }
}, 16);
var NorthEastMenu;
module.link("/imports/ui/components/NorthEastMenu", {
  "default": function (v) {
    NorthEastMenu = v;
  }
}, 17);
Session.get('showNotificationMenu', true);
var style = {
  username: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    top: '-5px',
    cursor: 'pointer'
  }
};

var AuthenticatedNavigation =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(AuthenticatedNavigation, _React$Component);

  function AuthenticatedNavigation() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = AuthenticatedNavigation.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          position: 'fixed',
          top: '0px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2.4rem',
          opacity: Session.get('globalOpacity')
        },
        listItem: {
          display: 'inline-block',
          position: 'relative'
        },
        state: {
          showNotificationMenu: Session.get('showNotificationMenu')
        },
        glassText: Glass.darkroom({
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          top: '-5px',
          cursor: 'pointer'
        }),
        glassTextIcon: Glass.darkroom({
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          cursor: 'pointer'
        }),
        notifications: [],
        notificationCount: 0,
        notificationColor: 'green',
        isIncomingCall: false
      };

      if (Meteor.user()) {
        data.user = Meteor.user().fullName();

        if (get(Meteor.user(), 'profile.notifications')) {
          data.notifications = get(Meteor.user(), 'profile.notifications');
          data.notificationCount = Meteor.user().profile.notifications.length;
        }
      } else {
        data.user = '';
      } // data.style.glassText = Glass.blur(data.style.glassText);


      if (Session.get('glassBlurEnabled')) {
        data.glassText.filter = 'blur(3px)';
        data.glassText.WebkitFilter = 'blur(3px)';
      }

      if (data.notificationCount > 0) {
        data.notificationColor = 'orange';

        if (data.notifications) {
          data.notifications.forEach(function (notification) {
            if (notification.type == 'videocall') {
              data.isIncomingCall = true;
            }
          });
        }
      }

      process.env.NODE_ENV === 'test' && console.log("AuthenticatedNavigation[data]", data);
      return data;
    }

    return getMeteorData;
  }();

  _proto.userName = function () {
    function userName() {
      return this.data.user;
    }

    return userName;
  }();

  _proto.openNotifications = function () {
    function openNotifications() {
      // not every wants the notification menu, so we make sure it's configurable in the Meteor.settings file
      if (get(Meteor, 'settings.public.defaults.notificationMenu')) {
        browserHistory.push('/notifications');
      }
    }

    return openNotifications;
  }();

  _proto.render = function () {
    function render() {
      var currentIcon;

      if (this.data.isIncomingCall) {
        currentIcon = React.createElement(AvVideoCall, {
          onClick: this.openNotifications,
          style: {
            color: this.data.notificationColor
          }
        });
      } else {
        currentIcon = React.createElement(ActionAccountCircle, {
          onClick: this.openNotifications,
          style: {
            color: this.data.notificationColor
          }
        });
      }

      return React.createElement("div", {
        id: "authenticatedUserMenuToggle",
        onClick: this.toggleNotificationMenu,
        style: this.data.glassText
      }, React.createElement(ToolbarGroup, null, React.createElement(IconMenu, {
        id: "authenticatedUserMenu",
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom'
        },
        targetOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        open: false,
        iconButtonElement: React.createElement(NorthEastMenu, null, React.createElement(ToolbarTitle, {
          id: "notificationCount",
          text: this.data.notificationCount.toString(),
          style: this.data.glassText
        }), React.createElement(IconButton, {
          touch: true,
          style: this.data.glassTextIcon
        }, currentIcon), React.createElement(ToolbarTitle, {
          id: "authenticatedUsername",
          text: this.data.user,
          style: this.data.glassText,
          onClick: this.showProfile
        }))
      })));
    }

    return render;
  }();

  _proto.handleLogout = function () {
    function handleLogout() {
      Meteor.logout(function () {
        return browserHistory.push('/signin');
      });
    }

    return handleLogout;
  }();

  _proto.showProfile = function () {
    function showProfile() {
      browserHistory.push('/myprofile');
    }

    return showProfile;
  }();

  _proto.toggleNotificationMenu = function () {
    function toggleNotificationMenu() {
      // console.log("showNotificationMenu", Session.get('showNotificationMenu'));
      Session.toggle('showNotificationMenu');
    }

    return toggleNotificationMenu;
  }();

  return AuthenticatedNavigation;
}(React.Component);

ReactMixin(AuthenticatedNavigation.prototype, ReactMeteorData);
module.exportDefault(AuthenticatedNavigation);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DicomImage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/DicomImage.jsx                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

module.export({
  DicomImage: function () {
    return DicomImage;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactDom;
module.link("react-dom", {
  "default": function (v) {
    ReactDom = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 3);
var createReactClass;
module.link("create-react-class", {
  "default": function (v) {
    createReactClass = v;
  }
}, 4);
var cornerstone;
module.link("cornerstone-core", {
  "*": function (v) {
    cornerstone = v;
  }
}, 5);
var cornerstoneWADOImageLoader;
module.link("cornerstone-wado-image-loader", {
  "*": function (v) {
    cornerstoneWADOImageLoader = v;
  }
}, 6);
var cornerstoneWebImageLoader;
module.link("cornerstone-web-image-loader", {
  "*": function (v) {
    cornerstoneWebImageLoader = v;
  }
}, 7);
var cornerstoneTools;
module.link("cornerstone-tools", {
  "*": function (v) {
    cornerstoneTools = v;
  }
}, 8);
var Hammer;
module.link("hammerjs", {
  "default": function (v) {
    Hammer = v;
  }
}, 9);
var DicomImage = createReactClass({
  displayName: "DicomImage",
  getInitialState: function () {
    return {
      wwwc: '',
      zoom: 1.0
    };
  },
  render: function () {
    var viewportStyle = {
      height: 1333,
      width: '100%'
    };
    return React.createElement("div", {
      className: "viewportContainer",
      unselectable: "on",
      onContextMenu: this.returnFalse //onSelectStart={this.returnFalse}
      ,
      onMouseDown: this.returnFalse,
      style: viewportStyle
    }, React.createElement("div", {
      className: "viewportElement",
      style: {
        height: '100%'
      }
    }), React.createElement("div", {
      className: "topLeft dicomTag"
    }, this.props.title), React.createElement("div", {
      className: "bottomRight dicomTag"
    }, "Zoom: ", this.state.zoom), React.createElement("div", {
      className: "bottomLeft dicomTag"
    }, "WW/WC: ", this.state.wwwc));
  },
  onImageRendered: function () {
    //var domNode = $(this.getDOMNode());
    var domNode = ReactDom.findDOMNode(this);
    var topLeft = domNode.find(".topLeft");
    var topRight = domNode.find(".topRight");
    var bottomRight = domNode.find(".bottomRight");
    var bottomLeft = domNode.find(".bottomLeft");
    var element = domNode.find(".viewportElement").get(0);
    var viewport = cornerstone.getViewport(element);
    this.setState({
      wwwc: Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter),
      zoom: viewport.scale.toFixed(2)
    });
  },
  returnFalse: function (e) {
    e.stopPropagation();
    e.preventDefault();
  },
  // handleResize() {
  //   this.updateHeight();
  //   // var domNode = this.getDOMNode();
  //   var domNode = ReactDom.findDOMNode(this);
  //   var element = $(domNode).find('.viewportElement').get(0);
  //   cornerstone.resize(element, true);
  // },
  // updateHeight() {
  //   // var domNode = this.getDOMNode();
  //   var domNode = ReactDom.findDOMNode(this);
  //   var container = $(domNode);
  //   // Subtract the header height and some padding
  //   var windowHeight = $(window).height() - $("#header").height() - 10 ;
  //   container.css({
  //     height: windowHeight
  //   });
  // },
  componentDidMount: function () {
    //this.updateHeight();
    // var domNode = this.getDOMNode();
    var domNode = ReactDom.findDOMNode(this);
    var element = $(domNode).find('.viewportElement').get(0);
    $(element).on("CornerstoneImageRendered", this.onImageRendered);
    window.addEventListener('resize', this.handleResize);

    if ((0, _typeof2.default)(cornerstone) === "object") {
      cornerstone.enable(element);
      cornerstone.registerImageLoader('http', cornerstoneWebImageLoader.loadImage);
      cornerstone.registerImageLoader('https', cornerstoneWebImageLoader.loadImage);
      cornerstoneWebImageLoader.external.cornerstone = cornerstone;
      cornerstoneTools.external.cornerstone = cornerstone;
      cornerstoneTools.external.Hammer = Hammer; // var imageId = "example://1";
      // var imageId = 'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'

      if (this.props.imageUrl) {
        var imageUrl = this.props.imageUrl;
        console.log('DicomImage received the following imageUrl: ', imageUrl);
        cornerstone.loadImage(imageUrl).then(function (image) {
          cornerstone.displayImage(element, image);
          cornerstoneTools.mouseInput.enable(element);
          cornerstoneTools.mouseWheelInput.enable(element);
          cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button

          cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button

          cornerstoneTools.zoom.activate(element, 5); // zoom is the default tool for right mouse button

          cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel

          cornerstoneTools.touchInput.enable(element);
          cornerstoneTools.panTouchDrag.activate(element);
          cornerstoneTools.zoomTouchPinch.activate(element);
        });
      } else {
        console.info('this.props.imageUrl wasnt passed to the DicomImage react component.');
      }
    } else {
      console.info('Cornerstone.js not loaded.  DICOM Viewing is not currently supported.');
    } // start a new React render tree with our node and the children
    // passed in from above, this is the other side of the portal.
    //ReactDom.render(<div>{this.props.children}</div>, domNode);    

  },
  componentWillUnmount: function () {
    var domNode = ReactDom.findDOMNode(this);
    var element = $(domNode).find('.viewportElement').get(0);
    $(element).off("CornerstoneImageRendered", this.onImageRendered);
    window.removeEventListener('resize', this.handleResize);
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MenuButton.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/MenuButton.jsx                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  MenuButton: function () {
    return MenuButton;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var FlatButton;
module.link("material-ui", {
  FlatButton: function (v) {
    FlatButton = v;
  }
}, 1);

var MenuButton =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MenuButton, _React$Component);

  function MenuButton(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = MenuButton.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          active = _this$props.active,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props, ["active"]);
      return React.createElement(FlatButton, otherProps);
    }

    return render;
  }();

  return MenuButton;
}(React.Component);

module.exportDefault(MenuButton);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MenuItem.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/MenuItem.jsx                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  MenuItem: function () {
    return MenuItem;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ListItem;
module.link("material-ui", {
  ListItem: function (v) {
    ListItem = v;
  }
}, 1);

var MenuItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MenuItem, _React$Component);

  function MenuItem(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = MenuItem.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          active = _this$props.active,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props, ["active"]);
      return React.createElement(ListItem, otherProps, this.props.children);
    }

    return render;
  }();

  return MenuItem;
}(React.Component);

module.exportDefault(MenuItem);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MenuPatientSummary.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/MenuPatientSummary.jsx                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  "default": function () {
    return MenuPatientSummary;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ListItem;
module.link("material-ui/List", {
  ListItem: function (v) {
    ListItem = v;
  }
}, 1);

var MenuPatientSummary =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MenuPatientSummary, _React$Component);

  function MenuPatientSummary(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = MenuPatientSummary.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          active = _this$props.active,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props, ["active"]);
      return React.createElement("div", (0, _extends2.default)({
        id: "menuPatientSummary"
      }, otherProps), this.props.children);
    }

    return render;
  }();

  return MenuPatientSummary;
}(React.Component);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MenuTile.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/MenuTile.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  MenuTile: function () {
    return MenuTile;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var CardTitle, Card, CardText, CardActions;
module.link("material-ui", {
  CardTitle: function (v) {
    CardTitle = v;
  },
  Card: function (v) {
    Card = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardActions: function (v) {
    CardActions = v;
  }
}, 1);
var Glass, GlassCard;
module.link("meteor/clinical:glass-ui", {
  Glass: function (v) {
    Glass = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  }
}, 2);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 3);
var FaStreetView;
module.link("react-icons/fa", {
  FaStreetView: function (v) {
    FaStreetView = v;
  }
}, 4);
var IoMdClipboard;
module.link("react-icons/io", {
  IoMdClipboard: function (v) {
    IoMdClipboard = v;
  }
}, 5);
var FaHeartbeat;
module.link("react-icons/fa", {
  FaHeartbeat: function (v) {
    FaHeartbeat = v;
  }
}, 6);
var FaMobile;
module.link("react-icons/fa", {
  FaMobile: function (v) {
    FaMobile = v;
  }
}, 7);
var IoLogoNoSmoking;
module.link("react-icons/io", {
  IoLogoNoSmoking: function (v) {
    IoLogoNoSmoking = v;
  }
}, 8);
var FaEyeDropper;
module.link("react-icons/fa", {
  FaEyeDropper: function (v) {
    FaEyeDropper = v;
  }
}, 9);
var IoMdNuclear;
module.link("react-icons/io", {
  IoMdNuclear: function (v) {
    IoMdNuclear = v;
  }
}, 10);
var FaMapMarker;
module.link("react-icons/fa", {
  FaMapMarker: function (v) {
    FaMapMarker = v;
  }
}, 11);
var FaFlask;
module.link("react-icons/fa", {
  FaFlask: function (v) {
    FaFlask = v;
  }
}, 12);
var GoPulse;
module.link("react-icons/go", {
  GoPulse: function (v) {
    GoPulse = v;
  }
}, 13);
var FaBuilding;
module.link("react-icons/fa", {
  FaBuilding: function (v) {
    FaBuilding = v;
  }
}, 14);
var GoPerson;
module.link("react-icons/go", {
  GoPerson: function (v) {
    GoPerson = v;
  }
}, 15);
var MdAddAlert;
module.link("react-icons/md", {
  MdAddAlert: function (v) {
    MdAddAlert = v;
  }
}, 16);
var MdLocalPharmacy;
module.link("react-icons/md", {
  MdLocalPharmacy: function (v) {
    MdLocalPharmacy = v;
  }
}, 17);
var IoMdRibbon;
module.link("react-icons/io", {
  IoMdRibbon: function (v) {
    IoMdRibbon = v;
  }
}, 18);
var MdImportantDevices;
module.link("react-icons/md", {
  MdImportantDevices: function (v) {
    MdImportantDevices = v;
  }
}, 19);
var MdFingerprint;
module.link("react-icons/md", {
  "default": function (v) {
    MdFingerprint = v;
  }
}, 20);
var MdList;
module.link("react-icons/md", {
  "default": function (v) {
    MdList = v;
  }
}, 21);
var MdHearing;
module.link("react-icons/md", {
  "default": function (v) {
    MdHearing = v;
  }
}, 22);
var FaEye;
module.link("react-icons/fa", {
  "default": function (v) {
    FaEye = v;
  }
}, 23);
var IoMdErlenmeyerFlask;
module.link("react-icons/io", {
  "default": function (v) {
    IoMdErlenmeyerFlask = v;
  }
}, 24);
var IoMdErlenmeyerFlaskBubbles;
module.link("react-icons/io", {
  "default": function (v) {
    IoMdErlenmeyerFlaskBubbles = v;
  }
}, 25);
var FaList;
module.link("react-icons/fa", {
  "default": function (v) {
    FaList = v;
  }
}, 26);
var FaMedkit;
module.link("react-icons/fa", {
  "default": function (v) {
    FaMedkit = v;
  }
}, 27);
var IoMdMedkitNormal;
module.link("react-icons/io", {
  "default": function (v) {
    IoMdMedkitNormal = v;
  }
}, 28);
var IoMdMedkitOutline;
module.link("react-icons/io", {
  "default": function (v) {
    IoMdMedkitOutline = v;
  }
}, 29);
var FaMoon;
module.link("react-icons/fa", {
  "default": function (v) {
    FaMoon = v;
  }
}, 30);
var FaCheck;
module.link("react-icons/fa", {
  "default": function (v) {
    FaCheck = v;
  }
}, 31);
var GoBroadcast;
module.link("react-icons/go", {
  "default": function (v) {
    GoBroadcast = v;
  }
}, 32);
var GoBug;
module.link("react-icons/go", {
  "default": function (v) {
    GoBug = v;
  }
}, 33);
var GoOrganization;
module.link("react-icons/go", {
  "default": function (v) {
    GoOrganization = v;
  }
}, 34);
var IoMdPulseNormal;
module.link("react-icons/io", {
  "default": function (v) {
    IoMdPulseNormal = v;
  }
}, 35);
var IoMdPulseStrong;
module.link("react-icons/io", {
  "default": function (v) {
    IoMdPulseStrong = v;
  }
}, 36);
var IoMdLeaf;
module.link("react-icons/io", {
  "default": function (v) {
    IoMdLeaf = v;
  }
}, 37);
var IoMdNutrition;
module.link("react-icons/io", {
  "default": function (v) {
    IoMdNutrition = v;
  }
}, 38);
var MdDashboard;
module.link("react-icons/md", {
  "default": function (v) {
    MdDashboard = v;
  }
}, 39);
var MdDataUsage;
module.link("react-icons/md", {
  "default": function (v) {
    MdDataUsage = v;
  }
}, 40);
var style = {
  indexCardPadding: {
    width: '100%',
    display: 'inline-block',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '30px'
  },
  indexCard: {
    cursor: 'pointer',
    height: '142px',
    minHeight: '142px'
  },
  inactiveIndexCard: {
    opacity: .5,
    width: '100%',
    display: 'inline-block',
    paddingBottom: '30px'
  },
  thumbnail: {
    width: '85px',
    minHeight: '142px',
    position: 'absolute',
    left: '15px',
    top: '0px',
    color: 'white',
    backgroundColor: 'lightgray',
    padding: '10px',
    textAlign: 'center'
  },
  title: Glass.darkroom({
    marginTop: '10px',
    textAlign: 'left',
    fontSize: '48px',
    paddingLeft: '85px'
  }),
  subtitle: Glass.darkroom({
    textAlign: 'left',
    marginTop: '20px',
    textAlign: 'left',
    paddingLeft: '85px'
  })
};

var MenuTile =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MenuTile, _React$Component);

  function MenuTile(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = MenuTile.prototype;

  _proto.render = function () {
    function render() {
      var icon;

      switch (this.props.icon) {
        case "GoPulse":
          icon = React.createElement(GoPulse, {
            size: this.props.iconSize
          });
          break;

        case "MdList":
          icon = React.createElement(MdList, {
            size: this.props.iconSize
          });
          break;

        case "MdFingerprint":
          icon = React.createElement(MdFingerprint, {
            size: this.props.iconSize
          });
          break;

        case "MdImportantDevices":
          icon = React.createElement(MdImportantDevices, {
            size: this.props.iconSize
          });
          break;

        case "FaBuilding":
          icon = React.createElement(FaBuilding, {
            size: this.props.iconSize
          });
          break;

        case "FaMapMarker":
          icon = React.createElement(FaMapMarker, {
            size: this.props.iconSize
          });
          break;

        case "FaFlask":
          icon = React.createElement(FaFlask, {
            size: this.props.iconSize
          });
          break;

        case "FaMobile":
          icon = React.createElement(FaMobile, {
            size: this.props.iconSize
          });
          break;

        case "FaHeartbeat":
          icon = React.createElement(FaHeartbeat, {
            size: this.props.iconSize
          });
          break;

        case "MdAddAlert":
          icon = React.createElement(MdAddAlert, {
            size: this.props.iconSize
          });
          break;

        case "MdLocalPharmacy":
          icon = React.createElement(MdLocalPharmacy, {
            size: this.props.iconSize
          });
          break;

        case "IoMdClipboard":
          icon = React.createElement(IoMdClipboard, {
            size: this.props.iconSize
          });
          break;

        case "IoLogoNoSmoking":
          icon = React.createElement(IoLogoNoSmoking, {
            size: this.props.iconSize
          });
          break;

        case "FaStreetView":
          icon = React.createElement(FaStreetView, {
            size: this.props.iconSize
          });
          break;

        case "FaEyeDropper":
          icon = React.createElement(FaEyeDropper, {
            size: this.props.iconSize
          });
          break;

        case "GoPerson":
          icon = React.createElement(GoPerson, {
            size: this.props.iconSize
          });
          break;

        case "IoMdNuclear":
          icon = React.createElement(IoMdNuclear, {
            size: this.props.iconSize
          });
          break;

        case "MdHearing":
          icon = React.createElement(MdHearing, {
            size: this.props.iconSize
          });
          break;

        case "IoMdRibbon":
          icon = React.createElement(IoMdRibbon, {
            size: this.props.iconSize
          });
          break;

        default:
      }

      var _this$props = this.props,
          active = _this$props.active,
          id = _this$props.id,
          iconSize = _this$props.iconSize,
          title = _this$props.title,
          subtitle = _this$props.subtitle,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props, ["active", "id", "iconSize", "title", "subtitle"]);
      return React.createElement("div", {
        id: id,
        style: style.indexCardPadding,
        onClick: this.openLink.bind(this, this.props.path)
      }, React.createElement(Card, {
        className: "thumbnail",
        style: style.thumbnail,
        zDepth: 1
      }, icon), React.createElement(GlassCard, {
        className: "tile",
        style: style.indexCard
      }, React.createElement(CardTitle, {
        title: title,
        subtitle: subtitle,
        titleStyle: style.title,
        subtitleStyle: style.subtitle
      })));
    }

    return render;
  }();

  _proto.openLink = function () {
    function openLink(url) {
      console.log("openLink", url);
      browserHistory.push(url);
    }

    return openLink;
  }();

  return MenuTile;
}(React.Component);

module.exportDefault(MenuTile);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MobilePadding.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/MobilePadding.jsx                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  MobilePadding: function () {
    return MobilePadding;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);

var MobilePadding =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MobilePadding, _React$Component);

  function MobilePadding(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = MobilePadding.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {}
      }; //phone layout

      if (Session.get('appWidth') <= 1536) {
        data.style.width = Session.get('appWidth') - 40 + "px";
        data.style.marginLeft = "20px";
        data.style.marginRight = "20px";
        data.style.position = "absolute";
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        className: "mobilePadding",
        style: this.data.style
      }, this.props.children);
    }

    return render;
  }();

  return MobilePadding;
}(React.Component);

ReactMixin(MobilePadding.prototype, ReactMeteorData);
module.exportDefault(MobilePadding);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NorthEastMenu.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/NorthEastMenu.jsx                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  NorthEastMenu: function () {
    return NorthEastMenu;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);

var NorthEastMenu =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(NorthEastMenu, _React$Component);

  function NorthEastMenu(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = NorthEastMenu.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          active = _this$props.active,
          onKeyboardFocus = _this$props.onKeyboardFocus,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props, ["active", "onKeyboardFocus"]);
      return React.createElement("div", otherProps, this.props.children);
    }

    return render;
  }();

  return NorthEastMenu;
}(React.Component);

module.exportDefault(NorthEastMenu);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"OpacitySlider.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/OpacitySlider.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var Slider;
module.link("material-ui/Slider", {
  "default": function (v) {
    Slider = v;
  }
}, 2);
var createReactClass;
module.link("create-react-class", {
  "default": function (v) {
    createReactClass = v;
  }
}, 3);
Session.setDefault('globalOpacity', 0.95);
OpacitySlider = createReactClass({
  displayName: "OpacitySlider",
  mixins: [ReactMeteorData],
  getMeteorData: function () {
    var data = {
      style: {
        slider: {
          width: '300px'
        }
      },
      opacity: Session.get('globalOpacity')
    };

    if (this.props.style && this.props.style.display) {
      data.style.slider.display = this.props.style.display;
    }

    return data;
  },
  onChange: function (event, value) {
    Session.set('globalOpacity', value);
  },
  render: function () {
    return React.createElement("div", {
      className: "opacitySliderDiv",
      style: {
        width: "300px",
        top: '0px',
        right: '20px',
        position: 'relative'
      }
    }, React.createElement(Slider, {
      min: 0,
      max: 1,
      step: 0.01,
      name: "opacitySlider",
      value: this.data.opacity,
      onChange: this.onChange,
      style: this.data.style.slider
    }));
  }
});
module.exportDefault(OpacitySlider);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PatientSidebar.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/PatientSidebar.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  PatientSidebar: function () {
    return PatientSidebar;
  }
});
var List, ListItem;
module.link("material-ui/List", {
  List: function (v) {
    List = v;
  },
  ListItem: function (v) {
    ListItem = v;
  }
}, 0);
var MenuItem;
module.link("/imports/ui/components/MenuItem", {
  "default": function (v) {
    MenuItem = v;
  }
}, 1);
var LinkContainer;
module.link("react-router-bootstrap", {
  LinkContainer: function (v) {
    LinkContainer = v;
  }
}, 2);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 3);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 4);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 5);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 6);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 7);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 8);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 9);
// Pick up any dynamic routes that are specified in packages, and include them
var dynamicModules = [];
Object.keys(Package).forEach(function (packageName) {
  if (Package[packageName].SidebarElements) {
    // we try to build up a route from what's specified in the package
    Package[packageName].SidebarElements.forEach(function (element) {
      dynamicModules.push(element);
    });
  }
});

var PatientSidebar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PatientSidebar, _React$Component);

  function PatientSidebar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PatientSidebar.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          position: 'fixed',
          top: '0px',
          width: '100%',
          display: 'flex',
          // height: '6.4rem',
          alignItems: 'center',
          padding: '0 2.4rem',
          opacity: Session.get('globalOpacity')
        },
        listItem: {
          display: 'inline-block',
          position: 'relative'
        },
        indexRoute: '/'
      }; // but normally we just use the default route specified in settings.json

      if (get(Meteor, 'settings.public.defaults.route')) {
        data.indexRoute = get(Meteor, 'settings.public.defaults.route', '/');
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.handleLogout = function () {
    function handleLogout() {
      console.log("handleLogout");
      Meteor.logout();
      browserHistory.push('/signin');
    }

    return handleLogout;
  }();

  _proto.handleProfile = function () {
    function handleProfile() {
      browserHistory.push('/myprofile');
    }

    return handleProfile;
  }();

  _proto.render = function () {
    function render() {
      var index;

      if (get(Meteor, 'settings.public.defaults.sidebar.showIndex')) {
        index = React.createElement(LinkContainer, {
          to: this.data.indexRoute
        }, React.createElement(MenuItem, {
          id: "indexPageItem",
          className: "indexItem",
          href: this.data.indexRoute,
          primaryText: "Index"
        }));
      } //----------------------------------------------------------------------
      // Core Modules 


      var healthlog;

      if (get(Meteor, 'settings.public.defaults.sidebar.showHealthlog')) {
        healthlog = React.createElement(LinkContainer, {
          to: "/vitals-tracking"
        }, React.createElement(MenuItem, {
          primaryText: "Healthlog",
          href: "/vitals-tracking"
        }));
      } //----------------------------------------------------------------------
      // Dynamic Modules  


      var dynamicElements = [];
      dynamicModules.map(function (element, index) {
        // the excludes array will hide routes
        if (!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)) {
          dynamicElements.push(React.createElement(LinkContainer, {
            to: element.to,
            key: index
          }, React.createElement(MenuItem, {
            primaryText: element.primaryText,
            href: element.href
          })));
        }
      });
      var smartOnFhirImports = []; // we don't want SMART on FHIR links on iPhone (for now)
      // because they will be accessing records through HealthRecords

      if (Package['symptomatic:smart-on-fhir-client'] && !['iPhone'].includes(window.navigator.platform)) {
        smartOnFhirImports.push(React.createElement("div", null, React.createElement(LinkContainer, {
          to: "/import-chart"
        }, React.createElement(MenuItem, {
          primaryText: "Import Patient Record",
          href: "/import-chart"
        })), React.createElement(LinkContainer, {
          to: "/fast-import-chart"
        }, React.createElement(MenuItem, {
          primaryText: "Quick Import",
          href: "/fast-import-chart"
        }))));
      }

      var continuityOfCareElements;

      if (Package['symptomatic:continuity-of-care']) {
        continuityOfCareElements = React.createElement("div", null, React.createElement("hr", null), React.createElement(LinkContainer, {
          to: "/continuity-of-care"
        }, React.createElement(MenuItem, {
          id: "continuityOfCareItem",
          primaryText: "Continuity of Care",
          href: "/continuity-of-care"
        })), React.createElement(LinkContainer, {
          to: "/timeline-sidescroll"
        }, React.createElement(MenuItem, {
          id: "timelineItem",
          primaryText: "Timeline",
          href: "/timeline-sidescroll"
        })));
      }

      return React.createElement("div", {
        id: "patientSidebar"
      }, React.createElement(List, {
        style: {
          paddingLeft: '20px',
          position: 'static'
        }
      }, index, healthlog, continuityOfCareElements, React.createElement("hr", null), dynamicElements, React.createElement("hr", null), React.createElement(LinkContainer, {
        to: "/fhir-resources-index"
      }, React.createElement(MenuItem, {
        id: "fhirResourcePageItem",
        primaryText: "FHIR Resources",
        href: "/fhir-resources-index"
      })), React.createElement(LinkContainer, {
        to: "/data-management"
      }, React.createElement(MenuItem, {
        primaryText: "Data Management",
        href: "/data-management"
      })), React.createElement("hr", null), React.createElement(LinkContainer, {
        to: "/welcome/patient"
      }, React.createElement(MenuItem, {
        primaryText: "Getting Started",
        href: "/welcome/patient"
      })), smartOnFhirImports, React.createElement("hr", null), React.createElement(LinkContainer, {
        to: "/theming"
      }, React.createElement(MenuItem, {
        primaryText: "Theming",
        href: "/theming"
      })), React.createElement(LinkContainer, {
        to: "/about"
      }, React.createElement(MenuItem, {
        primaryText: "About",
        href: "/about"
      })), React.createElement(LinkContainer, {
        to: "/privacy"
      }, React.createElement(MenuItem, {
        primaryText: "Privacy",
        href: "/privacy"
      })), React.createElement(LinkContainer, {
        to: "/terms-and-conditions"
      }, React.createElement(MenuItem, {
        primaryText: "Terms and Conditions",
        href: "/terms-and-conditions"
      })), React.createElement(LinkContainer, {
        to: "/signin"
      }, React.createElement(MenuItem, {
        id: "logoutMenuItem",
        className: "logoutMenuItem",
        primaryText: "Logout",
        onClick: this.handleLogout
      }))));
    }

    return render;
  }();

  return PatientSidebar;
}(React.Component);

PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
module.exportDefault(PatientSidebar);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PractitionerSidebar.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/PractitionerSidebar.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  PractitionerSidebar: function () {
    return PractitionerSidebar;
  }
});
var List, ListItem;
module.link("material-ui/List", {
  List: function (v) {
    List = v;
  },
  ListItem: function (v) {
    ListItem = v;
  }
}, 0);
var MenuItem;
module.link("/imports/ui/components/MenuItem", {
  "default": function (v) {
    MenuItem = v;
  }
}, 1);
var LinkContainer;
module.link("react-router-bootstrap", {
  LinkContainer: function (v) {
    LinkContainer = v;
  }
}, 2);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 3);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 4);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 5);

var PractitionerSidebar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PractitionerSidebar, _React$Component);

  function PractitionerSidebar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PractitionerSidebar.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          position: 'fixed',
          top: '0px',
          width: '100%',
          display: 'flex',
          // height: '6.4rem',
          alignItems: 'center',
          padding: '0 2.4rem',
          opacity: Session.get('globalOpacity')
        },
        listItem: {
          display: 'inline-block',
          position: 'relative'
        }
      };
      return data;
    }

    return getMeteorData;
  }();

  _proto.handleLogout = function () {
    function handleLogout() {
      Meteor.logout();
    }

    return handleLogout;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "practitionerSidebar"
      }, React.createElement(List, {
        style: {
          paddingLeft: '20px',
          position: 'static'
        }
      }, React.createElement(LinkContainer, {
        to: "/"
      }, React.createElement(MenuItem, {
        id: "indexPageItem",
        className: "indexItem",
        href: "/",
        primaryText: "Index"
      })), React.createElement("hr", null), React.createElement(LinkContainer, {
        to: "/provider-directory"
      }, React.createElement(MenuItem, {
        primaryText: "Provider Directory",
        href: "/provider-directory"
      })), React.createElement(LinkContainer, {
        to: "/careplan-designer"
      }, React.createElement(MenuItem, {
        primaryText: "Careplan Designer",
        href: "/careplan-designer"
      })), React.createElement("hr", null), React.createElement(LinkContainer, {
        to: "/fhir-resources-index"
      }, React.createElement(MenuItem, {
        id: "fhirResourcePageItem",
        primaryText: "FHIR Resources",
        href: "/fhir-resources-index"
      })), React.createElement(LinkContainer, {
        to: "/data-management"
      }, React.createElement(MenuItem, {
        primaryText: "Data Management",
        href: "/theming"
      })), React.createElement(LinkContainer, {
        to: "/users"
      }, React.createElement(MenuItem, {
        primaryText: "Users",
        href: "/users"
      })), React.createElement("hr", null), React.createElement(LinkContainer, {
        to: "/theming"
      }, React.createElement(MenuItem, {
        primaryText: "Theming",
        href: "/theming"
      })), React.createElement(LinkContainer, {
        to: "/signin"
      }, React.createElement(MenuItem, {
        className: "logoutMenuItem",
        primaryText: "Logout",
        href: "/signin",
        onClick: this.handleLogout
      }))));
    }

    return render;
  }();

  return PractitionerSidebar;
}(React.Component);

ReactMixin(PractitionerSidebar.prototype, ReactMeteorData);
module.exportDefault(PractitionerSidebar);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PrivacyControlsCard.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/PrivacyControlsCard.jsx                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  PrivacyControlsCard: function () {
    return PrivacyControlsCard;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 3);
var Card, CardMedia, CardTitle, CardText, CardActions, Toggle;
module.link("material-ui", {
  Card: function (v) {
    Card = v;
  },
  CardMedia: function (v) {
    CardMedia = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardActions: function (v) {
    CardActions = v;
  },
  Toggle: function (v) {
    Toggle = v;
  }
}, 4);
var DynamicSpacer;
module.link("meteor/clinical:glass-ui", {
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  }
}, 5);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 6);
var Alert, Table;
module.link("react-bootstrap", {
  Alert: function (v) {
    Alert = v;
  },
  Table: function (v) {
    Table = v;
  }
}, 7);
var styles = {
  block: {
    maxWidth: 250
  },
  toggle: {
    marginBottom: 16
  },
  thumbOff: {
    backgroundColor: '#ffcccc'
  },
  trackOff: {
    backgroundColor: '#ff9d9d'
  },
  thumbSwitched: {
    backgroundColor: 'red'
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d'
  },
  labelStyle: {
    color: 'red'
  }
};

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

var disabledStyle = {
  backgroundColor: '#eeeeee',
  color: '#333333',
  borderColor: '#dddddd'
};

var PrivacyControlsCard =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PrivacyControlsCard, _React$Component);

  function PrivacyControlsCard(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = PrivacyControlsCard.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        consentToggles: {
          performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? true : false,
          medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? true : false,
          patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? true : false,
          geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? true : false,
          fileVault: get(Meteor, 'settings.public.fileVault') === "on" ? true : false
        },
        consentBsStyles: {
          performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? 'warning' : '',
          medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? 'warning' : '',
          patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? 'warning' : '',
          geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? 'warning' : '',
          fileVault: get(Meteor, 'settings.public.fileVault') === "on" ? 'success' : 'danger'
        },
        consentStyles: {
          performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? null : disabledStyle,
          medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? null : disabledStyle,
          patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? null : disabledStyle,
          geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? null : disabledStyle
        },
        accessTokens: []
      };

      if (['iPhone'].includes(window.navigator.platform)) {
        data.consentBsStyles.fileVault = 'success';
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.togglePerformance = function () {
    function togglePerformance(event, value) {
      console.log('togglePerformance', value);
      var newStatus = '';

      if (value === true) {
        newStatus = 'active';
      } else if (value === false) {
        newStatus = 'inactive';
      }

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.consents.performanceAnalytics.status': newStatus
        }
      });
    }

    return togglePerformance;
  }();

  _proto.toggleMedicalCodeLookup = function () {
    function toggleMedicalCodeLookup(event, value) {
      console.log('togglePerformance', value);
      var newStatus = '';

      if (value === true) {
        newStatus = 'active';
      } else if (value === false) {
        newStatus = 'inactive';
      }

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.consents.medicalCodeLookup.status': newStatus
        }
      });
    }

    return toggleMedicalCodeLookup;
  }();

  _proto.togglePatientEducation = function () {
    function togglePatientEducation(event, value) {
      console.log('togglePerformance', value);
      var newStatus = '';

      if (value === true) {
        newStatus = 'active';
      } else if (value === false) {
        newStatus = 'inactive';
      }

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.consents.patientEducationReferences.status': newStatus
        }
      });
    }

    return togglePatientEducation;
  }();

  _proto.toggleGeocoding = function () {
    function toggleGeocoding(event, value) {
      console.log('togglePerformance', value);
      var newStatus = '';

      if (value === true) {
        newStatus = 'active';
      } else if (value === false) {
        newStatus = 'inactive';
      }

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.consents.geocoding.status': newStatus
        }
      });
    }

    return toggleGeocoding;
  }();

  _proto.render = function () {
    function render() {
      var performanceAnalyticsText = '';
      var medicalCodeLookupText = '';
      var patientEducationReferencesText = '';
      var geocodingText = '';
      var accessTokensText = '';
      var encryptionText = '';

      if (this.data.consentToggles.performanceAnalytics) {
        performanceAnalyticsText = 'Sending performance analytics to Symptomatic helps us improve this application and make it better for you.  Analytics that we track through Google Analytics include metrics such as page visits, time spent on a page, type of device you are using, location that the app was accessed, and system errors.';
      } else {
        performanceAnalyticsText = 'This app will not send any performance analytics to Symptomatic.';
      }

      if (this.data.consentToggles.medicalCodeLookup) {
        medicalCodeLookupText = 'This app may fetch data and content from external websites to help interpret the data in the medical record.  This will typically involve looking up RxNorm codes to determine medication names and effects; looking up ICD10 codes to determine disease and condition names, looking up SNOMED-CT codes to determine anatomical clasifications, and looking up LOINC codes to determine laboratory tests.  ';
      } else {
        medicalCodeLookupText = 'This app will not look up medical codes from terminology servers.  Some functionality may be impacted.';
      }

      if (this.data.consentToggles.patientEducationReferences) {
        patientEducationReferencesText = 'This app may fetch additional content, such as patient education materials and medical illustrations, to help interpret and explain your medical records.';
      } else {
        patientEducationReferencesText = 'This app will not look up patient education materials from 3rd party sites.  Some functionality may be impacted.';
      }

      if (this.data.consentToggles.geocoding) {
        geocodingText = 'This app may contact Google Maps to retrieve the latitude/longitude of home addresses, medical offices, and other locations.  The app will send anonymized versions of these addresses without any identifying information.';
      } else {
        geocodingText = 'This app will not geocode addresses.  Some geomapping functionality may be impacted.';
      }

      if (this.data.accessTokens.length > 0) {
        accessTokensText = 'We have found the following Access Tokens associated with your account.';
      } else {
        accessTokensText = 'We did not find any Access Tokens associated with your account.';
      }

      var osText = getOS();
      var detectedFileEncryption = false;

      if (['iPhone'].includes(window.navigator.platform)) {
        encryptionText = "iPhone detected!  Devices running iOS 11.3 or later on an iPhone support Apple HealthRecord, which stores your records in an encrypted HIPAA compliant zone on your device.  Please make sure your device is upgraded to v11.3 or later. ";
        detectedFileEncryption = true;
      } else if (['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'Mac OS'].includes(window.navigator.platform)) {
        if (get(Meteor, 'settings.public.fileVault') === "on") {
          encryptionText = "We found FileVault running on your Mac!  This is an important step in establishing HIPAA compliance.";
        } else {
          encryptionText = "We don't detect FileVault running on your Mac!  This app will not store protected health information on this device, although some user account information and administrative data may be stored, such as username, password, HIPAA audit log,and consent authorizations.  This app allows you to export and save your health data to your local device; so after using this app, you may chose to store data on your local device; in which case, protecting your health information and privacy will be your responsibility.";
        }
      } // let accessTokenRows = [];
      // for (let index = 0; index < this.data.accessTokens.length; index++) {
      //   accessTokenRows.push(
      //     <tr className='accessTokenRow' key={i} >
      //       <td className='serviceName'>{ get(this, 'data.accessToken.serviceName') }</td>
      //       <td className='token'>{ get(this, 'data.accessToken.token') }</td>
      //       <td className='expiration'>{ get(this, 'data.accessToken.expiration') }</td>
      //     </tr>
      //   )
      // }


      return React.createElement("div", null, React.createElement(CardTitle, {
        title: "Privacy Controls"
      }), React.createElement(CardText, {
        style: {
          margin: '20px',
          marginTop: '0px'
        }
      }, React.createElement(Alert, {
        bsStyle: "success"
      }, React.createElement(Toggle, {
        label: "Symptomatic Core Services",
        defaultToggled: true,
        style: styles.toggle,
        disabled: true
      }), "This app may send core data to Symptomatic services, including account username/password, audit logs, consent, and other infrastructure data.  This data is necessary for this application to work and to maintain legal and regulatory compliance.  These core services avoid Protected Health Information (PHI) as much as possible, although medical record numbers and patient name is frequently included."), React.createElement(Alert, {
        bsStyle: this.data.consentBsStyles.fileVault
      }, React.createElement(Toggle, {
        label: "Disk Encryption (i.e. Encrypted Data at Rest)",
        defaultToggled: detectedFileEncryption,
        style: styles.toggle,
        disabled: true
      }), React.createElement("p", null, React.createElement("b", null, "Detected Operating System:  "), osText), React.createElement("p", null, encryptionText)), React.createElement(Alert, {
        bsStyle: this.data.consentBsStyles.performanceAnalytics,
        style: this.data.consentStyles.performanceAnalytics
      }, React.createElement(Toggle, {
        label: "Performance Analytics",
        defaultToggled: this.data.consentToggles.performanceAnalytics,
        onToggle: this.togglePerformance.bind(this)
      }), performanceAnalyticsText), React.createElement(Alert, {
        bsStyle: this.data.consentBsStyles.medicalCodeLookup,
        style: this.data.consentStyles.medicalCodeLookup
      }, React.createElement(Toggle, {
        label: "Medical Code Lookups - LOINC, SNOMED, and RxNORM",
        toggled: this.data.consentToggles.medicalCodeLookup,
        onToggle: this.toggleMedicalCodeLookup.bind(this)
      }), medicalCodeLookupText), React.createElement(Alert, {
        bsStyle: this.data.consentBsStyles.patientEducationReferences,
        style: this.data.consentStyles.patientEducationReferences
      }, React.createElement(Toggle, {
        label: "Patient Education References",
        toggled: this.data.consentToggles.patientEducationReferences,
        onToggle: this.togglePatientEducation.bind(this)
      }), patientEducationReferencesText), React.createElement(Alert, {
        bsStyle: this.data.consentBsStyles.geocoding,
        style: this.data.consentStyles.geocoding
      }, React.createElement(Toggle, {
        label: "Geocoding",
        toggled: this.data.consentToggles.geocoding,
        onToggle: this.toggleGeocoding.bind(this)
      }), geocodingText)));
    }

    return render;
  }();

  return PrivacyControlsCard;
}(React.Component);

ReactMixin(PrivacyControlsCard.prototype, ReactMeteorData);
module.exportDefault(PrivacyControlsCard);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PrivacyPolicyCard.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/PrivacyPolicyCard.jsx                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  PrivacyPolicyCard: function () {
    return PrivacyPolicyCard;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 3);
var Card, CardMedia, CardTitle, CardText, CardActions, Toggle;
module.link("material-ui", {
  Card: function (v) {
    Card = v;
  },
  CardMedia: function (v) {
    CardMedia = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardActions: function (v) {
    CardActions = v;
  },
  Toggle: function (v) {
    Toggle = v;
  }
}, 4);
var DynamicSpacer;
module.link("meteor/clinical:glass-ui", {
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  }
}, 5);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 6);
var Alert, Table;
module.link("react-bootstrap", {
  Alert: function (v) {
    Alert = v;
  },
  Table: function (v) {
    Table = v;
  }
}, 7);
var styles = {
  block: {
    maxWidth: 250
  },
  toggle: {
    marginBottom: 16
  },
  thumbOff: {
    backgroundColor: '#ffcccc'
  },
  trackOff: {
    backgroundColor: '#ff9d9d'
  },
  thumbSwitched: {
    backgroundColor: 'red'
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d'
  },
  labelStyle: {
    color: 'red'
  }
};

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

var disabledStyle = {
  backgroundColor: '#eeeeee',
  color: '#333333',
  borderColor: '#dddddd'
};

var PrivacyPolicyCard =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PrivacyPolicyCard, _React$Component);

  function PrivacyPolicyCard(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = PrivacyPolicyCard.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        consentToggles: {
          performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? true : false,
          medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? true : false,
          patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? true : false,
          geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? true : false,
          fileVault: get(Meteor, 'settings.public.fileVault') === "on" ? true : false
        },
        consentBsStyles: {
          performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? 'warning' : '',
          medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? 'warning' : '',
          patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? 'warning' : '',
          geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? 'warning' : '',
          fileVault: get(Meteor, 'settings.public.fileVault') === "on" ? 'success' : 'danger'
        },
        consentStyles: {
          performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? null : disabledStyle,
          medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? null : disabledStyle,
          patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? null : disabledStyle,
          geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? null : disabledStyle
        },
        accessTokens: []
      };
      return data;
    }

    return getMeteorData;
  }();

  _proto.togglePerformance = function () {
    function togglePerformance(event, value) {
      console.log('togglePerformance', value);
      var newStatus = '';

      if (value === true) {
        newStatus = 'active';
      } else if (value === false) {
        newStatus = 'inactive';
      }

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.consents.performanceAnalytics.status': newStatus
        }
      });
    }

    return togglePerformance;
  }();

  _proto.toggleMedicalCodeLookup = function () {
    function toggleMedicalCodeLookup(event, value) {
      console.log('togglePerformance', value);
      var newStatus = '';

      if (value === true) {
        newStatus = 'active';
      } else if (value === false) {
        newStatus = 'inactive';
      }

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.consents.medicalCodeLookup.status': newStatus
        }
      });
    }

    return toggleMedicalCodeLookup;
  }();

  _proto.togglePatientEducation = function () {
    function togglePatientEducation(event, value) {
      console.log('togglePerformance', value);
      var newStatus = '';

      if (value === true) {
        newStatus = 'active';
      } else if (value === false) {
        newStatus = 'inactive';
      }

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.consents.patientEducationReferences.status': newStatus
        }
      });
    }

    return togglePatientEducation;
  }();

  _proto.toggleGeocoding = function () {
    function toggleGeocoding(event, value) {
      console.log('togglePerformance', value);
      var newStatus = '';

      if (value === true) {
        newStatus = 'active';
      } else if (value === false) {
        newStatus = 'inactive';
      }

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.consents.geocoding.status': newStatus
        }
      });
    }

    return toggleGeocoding;
  }();

  _proto.render = function () {
    function render() {
      var performanceAnalyticsText = '';
      var medicalCodeLookupText = '';
      var patientEducationReferencesText = '';
      var geocodingText = '';
      var accessTokensText = '';
      var encryptionText = '';

      if (this.data.consentToggles.performanceAnalytics) {
        performanceAnalyticsText = 'Sending performance analytics to Symptomatic helps us improve this application and make it better for you.  Analytics that we track through Google Analytics include metrics such as page visits, time spent on a page, type of device you are using, location that the app was accessed, and system errors.';
      } else {
        performanceAnalyticsText = 'This app will not send any performance analytics to Symptomatic.';
      }

      if (this.data.consentToggles.medicalCodeLookup) {
        medicalCodeLookupText = 'This app may fetch data and content from external websites to help interpret the data in the medical record.  This will typically involve looking up RxNorm codes to determine medication names and effects; looking up ICD10 codes to determine disease and condition names, looking up SNOMED-CT codes to determine anatomical clasifications, and looking up LOINC codes to determine laboratory tests.  ';
      } else {
        medicalCodeLookupText = 'This app will not look up medical codes from terminology servers.  Some functionality may be impacted.';
      }

      if (this.data.consentToggles.patientEducationReferences) {
        patientEducationReferencesText = 'This app may fetch additional content, such as patient education materials and medical illustrations, to help interpret and explain your medical records.';
      } else {
        patientEducationReferencesText = 'This app will not look up patient education materials from 3rd party sites.  Some functionality may be impacted.';
      }

      if (this.data.consentToggles.geocoding) {
        geocodingText = 'This app may contact Google Maps to retrieve the latitude/longitude of home addresses, medical offices, and other locations.  The app will send anonymized versions of these addresses without any identifying information.';
      } else {
        geocodingText = 'This app will not geocode addresses.  Some geomapping functionality may be impacted.';
      }

      if (this.data.accessTokens.length > 0) {
        accessTokensText = 'We have found the following Access Tokens associated with your account.';
      } else {
        accessTokensText = 'We did not find any Access Tokens associated with your account.';
      }

      var osText = getOS();
      var detectedFileEncryption = false;

      if (['iPhone', 'iPad', 'iPod'].includes(window.navigator.platform)) {
        encryptionText = "iOS Detected!  Devices running iOS 11.3 or later support Apple HealthRecord, which stores your records in an encrypted HIPAA compliant zone on your device.  Please make sure your device is upgraded to v11.3 or later. ";
        detectedFileEncryption = true;
      } else if (['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'Mac OS'].includes(window.navigator.platform)) {
        if (get(Meteor, 'settings.public.fileVault') === "on") {
          encryptionText = "We found FileVault running on your Mac!  This is an important step in establishing HIPAA compliance.";
        } else {
          encryptionText = "We don't detect FileVault running on your Mac!  This app will not store protected health information on this device, although some user account information and administrative data may be stored, such as username, password, HIPAA audit log,and consent authorizations.  This app allows you to export and save your health data to your local device; so after using this app, you may chose to store data on your local device; in which case, protecting your health information and privacy will be your responsibility.";
        }
      } // let accessTokenRows = [];
      // for (let index = 0; index < this.data.accessTokens.length; index++) {
      //   accessTokenRows.push(
      //     <tr className='accessTokenRow' key={i} >
      //       <td className='serviceName'>{ get(this, 'data.accessToken.serviceName') }</td>
      //       <td className='token'>{ get(this, 'data.accessToken.token') }</td>
      //       <td className='expiration'>{ get(this, 'data.accessToken.expiration') }</td>
      //     </tr>
      //   )
      // }


      return React.createElement("div", null, React.createElement(CardTitle, {
        title: "Privacy Policy"
      }), React.createElement(CardText, {
        style: {
          margin: '20px'
        }
      }, React.createElement("p", null, "Symptomatic Timeline is an application is provided by Symptomatic, LLC, an Illinois company based out of the Polsky Center for Entrepreneurship (University of Chicago), and MATTER.health, a Chicago area health incubator."), React.createElement("p", null, "This app was initially produced by volunteers and the open source community.  Subsequent development was provided by consulting fees, and the app is now funded by purchases, subscriptions, and donations.  "), React.createElement("p", null, "Symptomatic Timeline is designed to not store protected health information (PHI) on our servers, which greatly reduces the risk of HIPAA breaches.  However, we have also implemented policies, procedures, audit trails, and encryption to be HIPAA compliant, as some of our other applications require this level of regulatory oversight.  We are happy and willing to sign business associate agreements (BAA) with covered entities that require them. "), React.createElement("p", null, "Users specifically approve each time their protected health information is accessed.  This app allows users to obtain a complete record of the data that it has stored about them.  This app allows users to delete all of the data that it has stored about them."), React.createElement("p", null, "In summary, this data fetches protected health information directly from FHIR compliant servers to the user\u2019s mobile device or desktop, displays it in a timeline, provides context to understand the medical chart, and then allows users to export/download the result.  The app does not directly store user PHI on our servers.")));
    }

    return render;
  }();

  return PrivacyPolicyCard;
}(React.Component);

ReactMixin(PrivacyPolicyCard.prototype, ReactMeteorData);
module.exportDefault(PrivacyPolicyCard);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProfileSidebar.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/ProfileSidebar.jsx                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  ProfileSidebar: function () {
    return ProfileSidebar;
  }
});
var List, ListItem;
module.link("material-ui/List", {
  List: function (v) {
    List = v;
  },
  ListItem: function (v) {
    ListItem = v;
  }
}, 0);
var MenuItem;
module.link("/imports/ui/components/MenuItem", {
  "default": function (v) {
    MenuItem = v;
  }
}, 1);
var LinkContainer;
module.link("react-router-bootstrap", {
  LinkContainer: function (v) {
    LinkContainer = v;
  }
}, 2);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 3);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 4);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 5);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 6);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 7);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 8);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 9);

var ProfileSidebar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ProfileSidebar, _React$Component);

  function ProfileSidebar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ProfileSidebar.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          position: 'fixed',
          top: '0px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2.4rem',
          opacity: Session.get('globalOpacity')
        },
        listItem: {
          display: 'inline-block',
          position: 'relative'
        },
        indexRoute: '/'
      }; // but normally we just use the default route specified in settings.json

      if (get(Meteor, 'settings.public.defaults.route')) {
        data.indexRoute = get(Meteor, 'settings.public.defaults.route', '/');
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.handleLogout = function () {
    function handleLogout() {
      console.log("handleLogout");
      Meteor.logout();
    }

    return handleLogout;
  }();

  _proto.handleProfile = function () {
    function handleProfile() {
      browserHistory.push('/myprofile');
    }

    return handleProfile;
  }();

  _proto.handlePreferences = function () {
    function handlePreferences() {
      browserHistory.push('/preferences');
    }

    return handlePreferences;
  }();

  _proto.handleLogout = function () {
    function handleLogout() {
      console.log("handleLogout");
      Meteor.logout();
    }

    return handleLogout;
  }();

  _proto.render = function () {
    function render() {
      // var index;
      // if(!get(Meteor, 'settings.public.defaults.sidebar.hideIndex')){
      //   index = <LinkContainer to={ this.data.indexRoute }>
      //     <MenuItem className="indexItem" href={ this.data.indexRoute } primaryText='Index' />
      //   </LinkContainer>;
      // }
      // //----------------------------------------------------------------------
      // // Core Modules 
      // var healthlog;
      // if(get(Meteor, 'settings.public.modules.healthlog')){
      //   allergies = <LinkContainer to='/weblog'>
      //     <MenuItem primaryText='Healthlog' href='/weblog' />
      //   </LinkContainer>;
      // }
      // //----------------------------------------------------------------------
      // // Dynamic Modules  
      // var dynamicElements = [];
      // dynamicModules.map(function(element, index){ 
      //   // the excludes array will hide routes
      //   if(!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)){
      //     dynamicElements.push(<LinkContainer to={element.to} key={index}>
      //       <MenuItem primaryText={element.primaryText} href={element.href} />
      //     </LinkContainer>);
      //   }
      // });
      //console.log('dynamicElements', dynamicElements);
      return React.createElement("div", {
        id: "profileSidebar"
      }, React.createElement(List, {
        style: {
          paddingLeft: '20px',
          position: 'static'
        }
      }, React.createElement(LinkContainer, {
        to: "/myprofile"
      }, React.createElement(MenuItem, {
        primaryText: "Demographics",
        href: "/myprofile"
      })), React.createElement(LinkContainer, {
        to: "/password"
      }, React.createElement(MenuItem, {
        primaryText: "Password",
        href: "/password"
      })), React.createElement(LinkContainer, {
        to: "/preferences"
      }, React.createElement(MenuItem, {
        id: "logoutMenuItem",
        primaryText: "Preferences",
        href: "/preferences",
        onClick: this.handlePreferences
      })), React.createElement(LinkContainer, {
        to: "/oauth-grants"
      }, React.createElement(MenuItem, {
        id: "logoutMenuItem",
        primaryText: "Authorization Grants",
        href: "/oauth-grants",
        onClick: this.handlePreferences
      })), React.createElement(LinkContainer, {
        to: "/signin"
      }, React.createElement(MenuItem, {
        id: "logoutMenuItem",
        className: "logoutMenuItem",
        primaryText: "Logout",
        href: "/signin",
        onClick: this.handleLogout
      }))));
    }

    return render;
  }();

  return ProfileSidebar;
}(React.Component);

ProfileSidebar.propTypes = {};
ProfileSidebar.defaultProps = {};
ReactMixin(ProfileSidebar.prototype, ReactMeteorData);
module.exportDefault(ProfileSidebar);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PublicNavigation.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/PublicNavigation.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  PublicNavigation: function () {
    return PublicNavigation;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var IndexLinkContainer;
module.link("react-router-bootstrap", {
  IndexLinkContainer: function (v) {
    IndexLinkContainer = v;
  }
}, 3);
var MenuItem;
module.link("/imports/ui/components/MenuItem", {
  "default": function (v) {
    MenuItem = v;
  }
}, 4);
var MenuButton;
module.link("/imports/ui/components/MenuButton", {
  "default": function (v) {
    MenuButton = v;
  }
}, 5);

var PublicNavigation =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PublicNavigation, _React$Component);

  function PublicNavigation() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PublicNavigation.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          title: {
            color: 'black',
            cursor: 'pointer'
          }
        }
      };
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "publicNavigation"
      }, React.createElement(IndexLinkContainer, {
        to: "signin"
      }, React.createElement(MenuButton, {
        id: "signinLink",
        label: "Signin",
        style: this.data.style.title,
        href: "/signin"
      })), React.createElement(IndexLinkContainer, {
        to: "signup"
      }, React.createElement(MenuButton, {
        id: "signupLink",
        label: "Register",
        style: this.data.style.title,
        href: "/signup"
      })));
    }

    return render;
  }();

  return PublicNavigation;
}(React.Component);

ReactMixin(PublicNavigation.prototype, ReactMeteorData);
module.exportDefault(PublicNavigation);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PublicSidebar.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/PublicSidebar.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  PublicSidebar: function () {
    return PublicSidebar;
  }
});
var List, ListItem;
module.link("material-ui", {
  List: function (v) {
    List = v;
  },
  ListItem: function (v) {
    ListItem = v;
  }
}, 0);
var MenuItem;
module.link("/imports/ui/components/MenuItem", {
  "default": function (v) {
    MenuItem = v;
  }
}, 1);
var IndexLinkContainer;
module.link("react-router-bootstrap", {
  IndexLinkContainer: function (v) {
    IndexLinkContainer = v;
  }
}, 2);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 3);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 4);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 5);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 6);
// Pick up any dynamic routes that are specified in packages, and include them
var publicModules = [];
Object.keys(Package).forEach(function (packageName) {
  if (Package[packageName].SidebarElements) {
    // we try to build up a route from what's specified in the package
    Package[packageName].SidebarElements.forEach(function (element) {
      publicModules.push(element);
    });
  }
});

var PublicSidebar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PublicSidebar, _React$Component);

  function PublicSidebar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PublicSidebar.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          position: 'fixed',
          top: '0px',
          width: '100%',
          display: 'flex',
          // height: '6.4rem',
          alignItems: 'center',
          padding: '0 2.4rem',
          opacity: Session.get('globalOpacity')
        },
        listItem: {
          display: 'inline-block',
          position: 'relative'
        }
      };
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      var index;

      if (get(Meteor, 'settings.public.defaults.sidebar.showIndex')) {
        index = React.createElement(IndexLinkContainer, {
          to: "/signup"
        }, React.createElement(MenuItem, {
          primaryText: "Register",
          href: "/signup"
        }));
      } //----------------------------------------------------------------------
      // Public Modules  


      var publicElements = [];
      publicModules.map(function (element, index) {
        // the excludes array will hide routes
        if (!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)) {
          publicElements.push(React.createElement(IndexLinkContainer, {
            to: element.to,
            key: index
          }, React.createElement(MenuItem, {
            primaryText: element.primaryText,
            href: element.href
          })));
        }
      });
      var registrationLinks;

      if (get(Meteor, 'settings.public.home.showRegistration')) {
        registrationLinks = React.createElement("div", null, React.createElement(IndexLinkContainer, {
          to: "/signin"
        }, React.createElement(MenuItem, {
          primaryText: "Sign In",
          href: "/signin"
        })), React.createElement(IndexLinkContainer, {
          to: "/signup"
        }, React.createElement(MenuItem, {
          primaryText: "Register",
          href: "/signup"
        })));
      }

      return React.createElement(List, {
        style: {
          paddingLeft: '20px',
          position: 'static'
        }
      }, index, registrationLinks, React.createElement(IndexLinkContainer, {
        to: "/about"
      }, React.createElement(MenuItem, {
        primaryText: "About",
        href: "/about"
      })), React.createElement(IndexLinkContainer, {
        to: "/privacy"
      }, React.createElement(MenuItem, {
        primaryText: "Privacy Page",
        href: "/privacy"
      })), React.createElement(IndexLinkContainer, {
        to: "/terms-and-conditions"
      }, React.createElement(MenuItem, {
        primaryText: "Terms and Conditions",
        href: "/terms-and-conditions"
      })));
    }

    return render;
  }();

  return PublicSidebar;
}(React.Component);

ReactMixin(PublicSidebar.prototype, ReactMeteorData);
module.exportDefault(PublicSidebar);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SciFiOrbital.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/SciFiOrbital.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  SciFiOrbital: function () {
    return SciFiOrbital;
  }
});
var Fade, GradientBackground, Parallax, Rotator, Scale, TrackingTiltPlane, Translate, View, Zoom, utils;
module.link("react-scifi", {
  Fade: function (v) {
    Fade = v;
  },
  GradientBackground: function (v) {
    GradientBackground = v;
  },
  Parallax: function (v) {
    Parallax = v;
  },
  Rotator: function (v) {
    Rotator = v;
  },
  Scale: function (v) {
    Scale = v;
  },
  TrackingTiltPlane: function (v) {
    TrackingTiltPlane = v;
  },
  Translate: function (v) {
    Translate = v;
  },
  View: function (v) {
    View = v;
  },
  Zoom: function (v) {
    Zoom = v;
  },
  utils: function (v) {
    utils = v;
  }
}, 0);
var circle14striped, circle34, colors;
module.link("/imports/ui/components/Shapes.js", {
  circle14striped: function (v) {
    circle14striped = v;
  },
  circle34: function (v) {
    circle34 = v;
  },
  colors: function (v) {
    colors = v;
  }
}, 1);
var GlassCard, VerticalCanvas;
module.link("meteor/clinical:glass-ui", {
  GlassCard: function (v) {
    GlassCard = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  }
}, 2);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 3);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 4);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 5);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 6);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 7);
var color;
module.link("onecolor", {
  "default": function (v) {
    color = v;
  }
}, 8);
var sharedStyles = {
  tile: {
    opacity: .5
  }
};
var _utils = utils,
    cssVendorPrefix = _utils.cssVendorPrefix;

var SciFiOrbital =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(SciFiOrbital, _React$Component);

  function SciFiOrbital(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      initialMount: false,
      showDemo: false,
      bgEndColor: color(colors.highlight.verydark),
      bgStartColor: color(colors.highlight.dark),
      lightCircle: color(colors.highlight.light),
      mediumCircle: color(colors.highlight.medium)
    };
    return _this;
  }

  var _proto = SciFiOrbital.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        orbital: {
          'top': Session.get('appHeight') - 380,
          'left': Session.get('appWidth') - 380,
          'position': 'absolute',
          'WebkitTransition': 'ease 1s',
          'transition': 'ease 1s'
        }
      };

      if (Session.get('showOrbital')) {
        data.orbital.left = Session.get('appWidth') + 380;
      }

      ;
      return data;
    }

    return getMeteorData;
  }();

  _proto.componentDidMount = function () {
    function componentDidMount() {
      var _this2 = this;

      setInterval(function () {
        _this2.setState(function (prevState) {
          return {
            bgEndColor: prevState.bgEndColor.hue(0.0005, true),
            bgStartColor: prevState.bgStartColor.hue(0.0005, true),
            lightCircle: prevState.lightCircle.hue(0.0005, true),
            mediumCircle: prevState.mediumCircle.hue(0.0005, true)
          };
        });
      }, 25);
      setTimeout(function () {
        _this2.showDemo();
      }, 300);
    }

    return componentDidMount;
  }();

  _proto.showDemo = function () {
    function showDemo() {
      this.setState({
        initialMount: true,
        showDemo: true
      });
    }

    return showDemo;
  }();

  _proto.hideDemo = function () {
    function hideDemo() {
      this.setState({
        showDemo: false
      });
    }

    return hideDemo;
  }();

  _proto.openLink = function () {
    function openLink(url) {
      console.log("openLink", url);
      browserHistory.push(url);
    }

    return openLink;
  }();

  _proto.render = function () {
    function render() {
      var _this3 = this;

      var _this$state = this.state,
          bgStartColor = _this$state.bgStartColor,
          bgEndColor = _this$state.bgEndColor,
          initialMount = _this$state.initialMount,
          lightCircle = _this$state.lightCircle,
          mediumCircle = _this$state.mediumCircle,
          showDemo = _this$state.showDemo;
      var contentStyle = {
        position: 'absolute',
        width: '360px',
        height: '360px'
      };
      var circlePosition = {
        position: 'absolute',
        top: 0,
        left: 0
      };
      var reactIsCool = (0, _objectSpread2.default)({
        color: lightCircle.hex(),
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        textAlign: 'center',
        fontFamily: 'Monaco, fixed-width',
        fontSize: '40px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }, cssVendorPrefix('userSelect', 'none'));
      return React.createElement(View, {
        id: "orbital",
        onMouseDown: function () {
          _this3.hideDemo();
        },
        onMouseUp: function () {
          _this3.showDemo();
        },
        onTouchStart: function () {
          _this3.hideDemo();
        },
        onTouchEnd: function () {
          _this3.showDemo();
        },
        style: this.data.orbital
      }, React.createElement(View, {
        style: contentStyle
      }, React.createElement(Fade, {
        show: showDemo
      }, React.createElement(Zoom, {
        show: showDemo,
        stifness: showDemo ? 160 : 170,
        damping: showDemo ? 13 : 26
      }, React.createElement(TrackingTiltPlane, {
        maxTiltDeg: 0
      }, React.createElement(Rotator, {
        spinDuration: 8000,
        spinDirection: "cw",
        style: circlePosition
      }, circle34(lightCircle.hex())), React.createElement(Translate, {
        z: -100,
        style: circlePosition
      }, React.createElement(Rotator, {
        spinDuration: 12000,
        spinDirection: "ccw"
      }, React.createElement(Scale, {
        scale: 1.1
      }, circle34(mediumCircle.hex())))), React.createElement(Rotator, {
        spinDuration: 5000,
        spinDirection: "ccw",
        style: circlePosition
      }, React.createElement(Scale, {
        scale: 0.9
      }, circle14striped(lightCircle.hex())))))), React.createElement("div", {
        style: reactIsCool
      }, React.createElement(TrackingTiltPlane, {
        maxTiltDeg: 0
      }, React.createElement(Zoom, {
        show: !showDemo && initialMount,
        stifness: !showDemo ? 150 : 170,
        damping: !showDemo ? 11 : 26
      }, React.createElement(Fade, {
        show: !showDemo && initialMount
      }, React.createElement(Parallax, {
        count: 5,
        distance: -200
      }, function (index) {
        return React.createElement(View, {
          style: {
            opacity: 1 - index / 5
          },
          flex: true,
          key: index
        }, "Symptomatic.io 2017 Abigail Watson");
      })))))));
    }

    return render;
  }();

  return SciFiOrbital;
}(React.Component);

ReactMixin(SciFiOrbital.prototype, ReactMeteorData);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Shapes.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Shapes.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  colors: function () {
    return colors;
  },
  circle34: function () {
    return circle34;
  },
  circle14: function () {
    return circle14;
  },
  circle14striped: function () {
    return circle14striped;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var colors = {
  highlight: {
    light: '#35EDE6',
    medium: '#134141',
    dark: '#102B2C',
    verydark: '#0D1214'
  }
};

function circle34(fillColor) {
  return React.createElement("svg", {
    width: "360px",
    height: "360px",
    viewBox: "0 0 100 100",
    x: "0px",
    y: "0px"
  }, React.createElement("path", {
    fill: fillColor,
    d: "M98.785,48.516C98.8,49.01,98.823,49.502,98.823,50c0,26.921-21.902,48.823-48.823,48.823 C23.079,98.823,1.177,76.921,1.177,50C1.177,23.079,23.079,1.177,50,1.177c8.847,0,17.146,2.378,24.311,6.51l0.595-1.016 C67.565,2.437,59.064,0,50,0C22.43,0,0,22.43,0,50s22.43,50,50,50s50-22.43,50-50c0-0.519-0.022-1.032-0.039-1.547L98.785,48.516z"
  }));
}

function circle14(fillColor) {
  return React.createElement("svg", {
    width: "360px",
    height: "360px",
    viewBox: "0 0 100 100",
    x: "0px",
    y: "0px"
  }, React.createElement("path", {
    fill: fillColor,
    d: "M91.391,50c0,22.859-18.531,41.391-41.391,41.391V100c27.614,0,50-22.386,50-50c0-7.871-1.824-15.314-5.064-21.938 l-7.737,3.777C89.881,37.323,91.391,43.484,91.391,50z"
  }));
}

function circle14striped(fillColor) {
  return React.createElement("svg", {
    width: "360px",
    height: "360px",
    viewBox: "0 0 100 100",
    x: "0px",
    y: "0px"
  }, React.createElement("g", {
    fill: fillColor
  }, React.createElement("path", {
    d: "M63.334,89.183c-0.219,0.074-0.438,0.151-0.658,0.223l2.562,8.222c0.316-0.102,0.629-0.212,0.943-0.319L63.334,89.183z"
  }), React.createElement("path", {
    d: "M66.038,88.167c-0.213,0.089-0.431,0.168-0.646,0.255l3.129,8.02c0.308-0.123,0.621-0.236,0.926-0.365L66.038,88.167z"
  }), React.createElement("path", {
    d: "M59.164,90.359c-0.226,0.052-0.449,0.109-0.677,0.156l1.689,8.445c0.326-0.067,0.646-0.15,0.97-0.224L59.164,90.359z"
  }), React.createElement("path", {
    d: "M74.791,83.146c-0.185,0.139-0.377,0.269-0.564,0.404l4.976,7.023c0.269-0.193,0.542-0.382,0.808-0.581L74.791,83.146z"
  }), React.createElement("path", {
    d: "M61.959,89.629c-0.221,0.066-0.445,0.127-0.668,0.189l2.273,8.304c0.319-0.09,0.641-0.176,0.958-0.271L61.959,89.629z"
  }), React.createElement("path", {
    d: "M60.57,90.023c-0.224,0.059-0.449,0.112-0.675,0.168l1.982,8.377c0.323-0.078,0.646-0.156,0.966-0.241L60.57,90.023z"
  }), React.createElement("path", {
    d: "M64.694,88.696c-0.217,0.083-0.433,0.167-0.65,0.246l2.848,8.125c0.312-0.112,0.621-0.232,0.932-0.351L64.694,88.696z"
  }), React.createElement("path", {
    d: "M67.357,87.574c-0.21,0.098-0.422,0.192-0.634,0.287l3.408,7.907c0.304-0.135,0.606-0.271,0.907-0.41L67.357,87.574z"
  }), React.createElement("path", {
    d: "M71.19,85.555c-0.198,0.119-0.401,0.23-0.603,0.347l4.215,7.506c0.288-0.165,0.578-0.325,0.863-0.495L71.19,85.555z"
  }), React.createElement("path", {
    d: "M73.615,83.985c-0.19,0.132-0.377,0.269-0.569,0.398l4.728,7.193c0.276-0.185,0.545-0.378,0.817-0.568L73.615,83.985z"
  }), React.createElement("path", {
    d: "M72.414,84.788c-0.194,0.126-0.388,0.253-0.584,0.375l4.475,7.355c0.282-0.175,0.56-0.356,0.837-0.536L72.414,84.788z"
  }), React.createElement("path", {
    d: "M68.657,86.944c-0.207,0.104-0.41,0.216-0.619,0.316l3.683,7.786c0.3-0.145,0.591-0.304,0.887-0.454L68.657,86.944z"
  }), React.createElement("path", {
    d: "M69.938,86.275c-0.203,0.111-0.409,0.219-0.614,0.327l3.95,7.648c0.294-0.154,0.588-0.309,0.878-0.47L69.938,86.275z"
  }), React.createElement("path", {
    d: "M91.231,46.548c0.019,0.23,0.045,0.459,0.06,0.691l8.596-0.498c-0.021-0.333-0.059-0.66-0.086-0.991L91.231,46.548z"
  }), React.createElement("path", {
    d: "M90.895,43.68c0.034,0.228,0.068,0.457,0.1,0.687l8.537-1.096c-0.044-0.329-0.092-0.657-0.143-0.984L90.895,43.68z"
  }), React.createElement("path", {
    d: "M91.102,45.109c0.027,0.229,0.041,0.461,0.064,0.691l8.569-0.797c-0.032-0.33-0.057-0.662-0.096-0.99L91.102,45.109z"
  }), React.createElement("path", {
    d: "M90.652,42.255c0.044,0.228,0.095,0.453,0.134,0.682l8.494-1.393c-0.056-0.328-0.125-0.651-0.188-0.977L90.652,42.255z"
  }), React.createElement("path", {
    d: "M99.928,47.491l-8.596,0.498c0.012,0.23,0.014,0.463,0.021,0.694l8.604-0.197C99.946,48.154,99.943,47.82,99.928,47.491z"
  }), React.createElement("path", {
    d: "M90.363,40.84c0.051,0.226,0.092,0.454,0.14,0.681l8.439-1.688c-0.067-0.325-0.126-0.653-0.199-0.976L90.363,40.84z"
  }), React.createElement("path", {
    d: "M75.928,82.254c-0.181,0.146-0.363,0.287-0.547,0.43l5.218,6.847c0.263-0.204,0.525-0.407,0.783-0.615L75.928,82.254z"
  }), React.createElement("path", {
    d: "M89.181,36.673c0.074,0.219,0.145,0.44,0.215,0.66l8.219-2.562c-0.102-0.316-0.201-0.633-0.309-0.946L89.181,36.673z"
  }), React.createElement("path", {
    d: "M55.989,99.631l-1.095-8.538c-0.23,0.027-0.459,0.062-0.69,0.086l0.797,8.571C55.333,99.718,55.66,99.67,55.989,99.631z"
  }), React.createElement("path", {
    d: "M88.689,35.314c0.082,0.217,0.173,0.429,0.252,0.647l8.128-2.849c-0.112-0.313-0.243-0.617-0.361-0.927L88.689,35.314z"
  }), React.createElement("path", {
    d: "M56.328,90.909c-0.229,0.035-0.46,0.058-0.689,0.089l1.096,8.538c0.328-0.045,0.659-0.081,0.986-0.131L56.328,90.909z"
  }), React.createElement("path", {
    d: "M89.629,38.046c0.066,0.221,0.127,0.445,0.19,0.668l8.302-2.273c-0.09-0.32-0.179-0.639-0.274-0.956L89.629,38.046z"
  }), React.createElement("path", {
    d: "M90.011,39.439c0.06,0.224,0.123,0.446,0.178,0.671l8.379-1.982c-0.078-0.323-0.169-0.642-0.254-0.962L90.011,39.439z"
  }), React.createElement("path", {
    d: "M57.75,90.655c-0.228,0.043-0.455,0.083-0.684,0.122l1.393,8.496c0.327-0.057,0.654-0.113,0.979-0.176L57.75,90.655z"
  }), React.createElement("path", {
    d: "M85.405,71.45c-0.12,0.198-0.25,0.389-0.374,0.585l7.245,4.648c0.177-0.28,0.361-0.556,0.533-0.84L85.405,71.45z"
  }), React.createElement("path", {
    d: "M90.603,58.048c-0.045,0.228-0.094,0.454-0.142,0.68l8.398,1.891c0.069-0.323,0.139-0.647,0.202-0.974L90.603,58.048z"
  }), React.createElement("path", {
    d: "M90.292,59.459c-0.053,0.226-0.101,0.453-0.156,0.678l8.331,2.184c0.081-0.321,0.148-0.647,0.224-0.971L90.292,59.459z"
  }), React.createElement("path", {
    d: "M89.086,63.62c-0.076,0.219-0.146,0.44-0.226,0.658l8.056,3.041c0.114-0.311,0.217-0.627,0.325-0.94L89.086,63.62z"
  }), React.createElement("path", {
    d: "M89.941,60.859c-0.061,0.225-0.126,0.446-0.19,0.669l8.247,2.473c0.093-0.318,0.186-0.637,0.272-0.958L89.941,60.859z"
  }), React.createElement("path", {
    d: "M89.546,62.25c-0.068,0.222-0.147,0.438-0.22,0.659l8.155,2.759c0.104-0.315,0.214-0.628,0.312-0.945L89.546,62.25z"
  }), React.createElement("path", {
    d: "M91.055,55.194c-0.029,0.229-0.055,0.46-0.088,0.688l8.512,1.301c0.047-0.327,0.085-0.657,0.126-0.987L91.055,55.194z"
  }), React.createElement("path", {
    d: "M90.856,56.626c-0.037,0.229-0.082,0.456-0.122,0.685l8.459,1.596c0.059-0.326,0.122-0.651,0.175-0.979L90.856,56.626z"
  }), React.createElement("path", {
    d: "M96.436,31.487c-0.464-1.162-0.954-2.309-1.5-3.426l-7.737,3.777c0.443,0.905,0.841,1.836,1.219,2.777L96.436,31.487z"
  }), React.createElement("path", {
    d: "M53.457,91.236c-1.141,0.094-2.292,0.154-3.457,0.154V100c1.435,0,2.851-0.074,4.254-0.193L53.457,91.236z"
  }), React.createElement("path", {
    d: "M99.978,49.235l-8.604,0.197c0.003,0.19,0.017,0.377,0.017,0.568c0,0.042-0.003,0.084-0.003,0.126l8.606,0.104 c0-0.077,0.006-0.152,0.006-0.229C100,49.743,99.981,49.491,99.978,49.235z"
  }), React.createElement("path", {
    d: "M91.213,53.759c-0.021,0.231-0.039,0.462-0.063,0.692l8.549,1.002c0.036-0.329,0.063-0.66,0.093-0.99L91.213,53.759z"
  }), React.createElement("path", {
    d: "M91.368,50.876c-0.005,0.231-0.009,0.463-0.018,0.693l8.6,0.404c0.013-0.331,0.019-0.662,0.025-0.994L91.368,50.876z"
  }), React.createElement("path", {
    d: "M91.322,52.319c-0.013,0.232-0.036,0.461-0.053,0.691l8.578,0.703c0.024-0.33,0.058-0.658,0.076-0.99L91.322,52.319z"
  }), React.createElement("path", {
    d: "M78.114,80.367c-0.17,0.157-0.34,0.314-0.513,0.469l5.683,6.465c0.248-0.221,0.492-0.445,0.735-0.672L78.114,80.367z"
  }), React.createElement("path", {
    d: "M82.962,75.026c-0.14,0.185-0.285,0.364-0.429,0.546l6.719,5.38c0.206-0.26,0.414-0.518,0.615-0.782L82.962,75.026z"
  }), React.createElement("path", {
    d: "M88.586,64.976c-0.084,0.216-0.168,0.432-0.255,0.646l7.944,3.321c0.126-0.306,0.245-0.615,0.365-0.925L88.586,64.976z"
  }), React.createElement("path", {
    d: "M82.07,76.162c-0.146,0.179-0.298,0.354-0.447,0.531l6.526,5.611c0.215-0.253,0.43-0.505,0.64-0.763L82.07,76.162z"
  }), React.createElement("path", {
    d: "M81.132,77.26c-0.152,0.174-0.299,0.354-0.455,0.525l6.33,5.838c0.224-0.245,0.434-0.502,0.652-0.752L81.132,77.26z"
  }), React.createElement("path", {
    d: "M79.16,79.37c-0.164,0.163-0.336,0.319-0.503,0.479l5.904,6.263c0.239-0.229,0.485-0.453,0.721-0.687L79.16,79.37z"
  }), React.createElement("path", {
    d: "M77.035,81.327c-0.176,0.151-0.348,0.306-0.525,0.454l5.455,6.662c0.255-0.212,0.502-0.435,0.753-0.651L77.035,81.327z"
  }), React.createElement("path", {
    d: "M80.162,78.329c-0.158,0.169-0.318,0.337-0.479,0.503l6.12,6.054c0.231-0.237,0.46-0.478,0.688-0.72L80.162,78.329z"
  }), React.createElement("path", {
    d: "M86.807,68.925c-0.105,0.206-0.207,0.415-0.316,0.618l7.555,4.135c0.157-0.292,0.303-0.591,0.454-0.887L86.807,68.925z"
  }), React.createElement("path", {
    d: "M87.45,67.632c-0.099,0.21-0.199,0.418-0.302,0.626l7.691,3.866c0.147-0.297,0.292-0.596,0.433-0.896L87.45,67.632z"
  }), React.createElement("path", {
    d: "M88.046,66.314c-0.092,0.214-0.191,0.423-0.286,0.634l7.822,3.596c0.136-0.302,0.279-0.602,0.41-0.907L88.046,66.314z"
  }), React.createElement("path", {
    d: "M86.125,70.198c-0.113,0.202-0.229,0.402-0.346,0.602l7.403,4.394c0.167-0.285,0.334-0.572,0.496-0.861L86.125,70.198z"
  }), React.createElement("path", {
    d: "M83.812,73.859c-0.134,0.188-0.266,0.379-0.402,0.565l6.904,5.144c0.196-0.267,0.386-0.539,0.577-0.811L83.812,73.859z"
  }), React.createElement("path", {
    d: "M84.627,72.666c-0.127,0.193-0.25,0.39-0.38,0.581l7.078,4.899c0.188-0.274,0.365-0.555,0.547-0.832L84.627,72.666z"
  })));
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"TermsConditionsCard.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/TermsConditionsCard.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  TermsConditionsCard: function () {
    return TermsConditionsCard;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var CardTitle, CardText, CardHeader;
module.link("material-ui/Card", {
  CardTitle: function (v) {
    CardTitle = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardHeader: function (v) {
    CardHeader = v;
  }
}, 3);
var Link;
module.link("react-router", {
  Link: function (v) {
    Link = v;
  }
}, 4);
var Table;
module.link("react-bootstrap", {
  Table: function (v) {
    Table = v;
  }
}, 5);
var LinearProgress;
module.link("material-ui/LinearProgress", {
  "default": function (v) {
    LinearProgress = v;
  }
}, 6);
var orange500, blue500;
module.link("material-ui/styles/colors", {
  orange500: function (v) {
    orange500 = v;
  },
  blue500: function (v) {
    blue500 = v;
  }
}, 7);

var TermsConditionsCard =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TermsConditionsCard, _React$Component);

  function TermsConditionsCard(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = TermsConditionsCard.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          page: {
            minHeight: '0px'
          }
        }
      };
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      var style = {
        marketingImage: {
          width: '80%',
          position: 'relative',
          left: '10%'
        },
        sectionHeader: {
          borderTop: '1px solid lightgray',
          width: '100%'
        },
        page: {
          minHeight: '1024px'
        }
      };
      return React.createElement("div", null, React.createElement(CardText, null, React.createElement("p", null, "The End-User License Agreement (this \"EULA\") is a legal agreement between you (\"Licenssee\") and Symptomatic, LLC (\"Licensor\"), the author of Symptomatic Timeline and Continuity of Care Document Viewer (\"Timeline\")."), React.createElement("p", null, "By installing this Software, Licensee agrees to be bound by the terms and conditions set forth in this EULA.  If Licenseee does not agree to the terms and conditions set fourth in this EULA, then Licensee may not download, install, or use the Software."), React.createElement("h4", null, "1.  Grant of License"), React.createElement("p", null, " Subject ot the terms of this EULA, Licensor hereby grants to Licensee a royalty-free, non-exclusive license to possess and to use a copy of the Symptomatic Timeline for Mac and iOS, available via download from the Apple App Store or the Symptomatic.io website."), React.createElement("p", null, " Licensee may install and use a maximum of one (1) copies of the Software and make multiple back-up copies of the Software, solely for Licensee's personal use."), React.createElement("h4", null, "2.  Title to Software"), " Licensor represents and warrants that it has the legal right to enter into and perform its obligations under this EULA, and that use by the Licensee of the Software, in accordance with the terms of this EULA, will not infrince upon the intellectual property rights of any third parties.", React.createElement("h4", null, "3.  Intellectual Property"), " All now known or hereafter known tangible and intangible rights, title, interest, copyrights and moral rights in and to the Software, including but not limited to all images, photographs, animations, video, audio, music, text, data, computer code, algorithms, and information are owned by Licensor.  The Software is protected by all applicable copyright laws and international treaties.", React.createElement("h4", null, "4.  No Support"), " Licensor has no obligation to provide support services for the Software.", React.createElement("h4", null, "5.  Jurisdiction"), " This EULA shall be deemed to have been made in, and shall be construed pursuant to the laws of the State of Illinois, without regard to conflicts of laws provisions thereof.  Any legal action or proceeding relating to this EULA shall be brought exclusively in courts located in Chicago, IL, and each party consents to the jurisdiction thereof.  The prevailing party in any action to enforce this EULA shall be entitled to recover costs and expenses including attorneys' fees.  This EULA is made with the exclusive jurisdiction of the United State, and its jurisdiction shall supersede any other jurisdiction of either party's election.", React.createElement("h4", null, "6.  Non-Transferable"), "  This EULA is not assignable or transferable by Licensee, and any attempt to do so would be void.", React.createElement("h4", null, "7.  Severability"), " No failure to exercise, and no delay in exercising, on the part of either party, any priviledge, any power or any rights hereunder will operate as a waiver thereof, nor will any single or partial exercise of any right or power hereunder preclude further exercise of any other right hereunder.  If any provision of this EULA shall be adjudged by any court of competent jurisdiction to be unenforceable or invalid, that provision shall be limited or eliminated ot the minimum extent necessary so that this EULA shall otherwise remain in full force and effect and enforceable.", React.createElement("h4", null, "8.  WARRANTY DISCLAIMER"), " LICENSOR, AND AUTHOR OF THE SOFTWARE, HEREBY EXPRESSLY DISCLAIM ANY WARRANTY FOR THE SOFTWARE.  THE SOFTWARE AND ANY RELATED DOCUMENTATION IS PROVIDED \"AS IS\" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.  LICENSSEE ACCEPTS ANY AND ALL RISK ARISING OUT OF USE OR PERFORMANCE OF THE SOFTWARE.", React.createElement("h4", null, "9.  LIMITATION OF LIABILITY"), "  LICENSOR SHALL NOT BE LIABLE TO LINCENSEE, OR ANY OTHER PERSON OR ENTITY CLAIMING THROUGH LICENSEE ANY LOSS OF PROFITS, INCOME, SAVINGS, OR ANY OTHER CONSEQUENTIAL, INCIDENTAL, SPECIAL, PUNITIVE, DIRECT OR INDIRECT DAMAGE, WHETHER ARISING IN CONTRACT, TORT, WARRANTY, OR OTHERWISE.  THESE LIMITATIONS SHALL APPLY REGARDLESS OF THE ESSENTIAL PURPOSE OF ANY LIMITED REMEDY.  UNDER NO CIRCUMSTANCES SHALL LICENSOR'S AGGREGATE LIABILITY TO LICENSEE, OR ANY OTHER PERSON OR ENTITY CLAIMING THROUGH LICENSEE, EXCEED THE FINANCIAL AMOUNT ACTUALLY PAID BY LICENSEE TO LICENSOR FOR THE SOFTWARE.", React.createElement("h4", null, "10.  Entire Agreement"), "  This EULA consitutes the entire agreement between Licensor and Licensee and supersedes all prior understandings of Licensor and Licensee, including any prior representation, statement, condition, or warranty with respect to the subject matter of this EULA."));
    }

    return render;
  }();

  return TermsConditionsCard;
}(React.Component);

ReactMixin(TermsConditionsCard.prototype, ReactMeteorData);
module.exportDefault(TermsConditionsCard);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layouts":{"App.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/layouts/App.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  App: function () {
    return App;
  }
});
var CardHeader, CardText, CardTitle;
module.link("material-ui/Card", {
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var teal400, teal600;
module.link("material-ui/styles/colors", {
  teal400: function (v) {
    teal400 = v;
  },
  teal600: function (v) {
    teal600 = v;
  }
}, 1);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 2);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 3);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 4);
var React, Component;
module.link("react", {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 5);
var Footer;
module.link("/imports/ui/layouts/Footer", {
  Footer: function (v) {
    Footer = v;
  }
}, 6);
var GlassApp;
module.link("/imports/ui/layouts/GlassApp", {
  GlassApp: function (v) {
    GlassApp = v;
  }
}, 7);
var GlassCard, VerticalCanvas, FullPageCanvas;
module.link("meteor/clinical:glass-ui", {
  GlassCard: function (v) {
    GlassCard = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  FullPageCanvas: function (v) {
    FullPageCanvas = v;
  }
}, 8);
var Header;
module.link("/imports/ui/layouts/Header", {
  Header: function (v) {
    Header = v;
  }
}, 9);
var DicomImage;
module.link("/imports/ui/components/DicomImage", {
  DicomImage: function (v) {
    DicomImage = v;
  }
}, 10);
var SciFiOrbital;
module.link("/imports/ui/components/SciFiOrbital", {
  SciFiOrbital: function (v) {
    SciFiOrbital = v;
  }
}, 11);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 12);
var SidebarTray;
module.link("/imports/ui/layouts/SidebarTray", {
  "default": function (v) {
    SidebarTray = v;
  }
}, 13);
var get, has;
module.link("lodash", {
  get: function (v) {
    get = v;
  },
  has: function (v) {
    has = v;
  }
}, 14);
var getMuiTheme;
module.link("material-ui/styles/getMuiTheme", {
  "default": function (v) {
    getMuiTheme = v;
  }
}, 15);
var MuiThemeProvider;
module.link("material-ui/styles/MuiThemeProvider", {
  "default": function (v) {
    MuiThemeProvider = v;
  }
}, 16);
var muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    primary2Color: teal600,
    pickerHeaderColor: teal400
  }
});
Session.setDefault('iFrameLocation', '');
Meteor.startup(function () {
  if (has(Meteor.settings, 'public.defaults.iFrameUrl')) {
    Session.set('iFrameLocation', get(Meteor.settings, 'public.defaults.iFrameUrl'));
  }

  if (has(Meteor.settings, 'public.defaults.iFrameEnabled')) {
    Session.set('secondPanelVisible', get(Meteor.settings, 'public.defaults.iFrameEnabled'));
  }
});

var App =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(App, _React$Component);

  function App(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = App.prototype;

  _proto.getChildContext = function () {
    function getChildContext() {
      return {
        // muiTheme: getMuiTheme(baseTheme)
        muiTheme: muiTheme
      };
    }

    return getChildContext;
  }(); // componentWillMount() {
  //   injectTapEventPlugin();
  // }


  _proto.renderSecondaryPanel = function () {
    function renderSecondaryPanel() {
      // RADIOLOGY
      if (Meteor.userId() && Session.equals('pathname', '/diagnostic-reports') && get(Meteor.settings, 'public.modules.fhir.DiagnosticReports')) {
        // the user is logged in as a normal user
        return React.createElement(GlassCard, {
          style: this.data.style.card
        }, React.createElement(DicomImage, null)); // Conditions (Zygote)
      } else if (Meteor.userId() && Session.equals('pathname', '/conditions') && get(Meteor, 'settings.public.apps.ZygoteAvatar')) {
        return React.createElement(GlassCard, {
          style: this.data.style.card,
          height: "auto"
        }, React.createElement(CardText, null, React.createElement("object", {
          id: "iframe",
          type: "text/html",
          data: "https://www.zygotebody.com/",
          style: this.data.style.content
        }, React.createElement("p", null, "unable to load ")))); // Website
      } else if (Meteor.userId() && Session.equals('pathname', '/videoconferencing')) {
        return React.createElement(GlassCard, {
          style: this.data.style.card,
          height: "auto"
        }, React.createElement(CardText, null, "Video!")); // Website
      } else if (Meteor.userId() && get(Meteor.settings, 'public.defaults.iFrameUrl')) {
        return React.createElement(GlassCard, {
          style: this.data.style.card,
          height: "auto"
        }, React.createElement(CardText, null, React.createElement("object", {
          id: "iframe",
          type: "text/html",
          data: this.data.browserWindowLocation,
          style: this.data.style.content
        }, React.createElement("p", null, "unable to load "))));
      } else {
        // anything else
        return React.createElement("div", null);
      }
    }

    return renderSecondaryPanel;
  }();

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          secondary: {
            position: 'absolute',
            top: ' 0px',
            width: '1024px',
            left: '0',
            transition: '1s'
          },
          card: {
            position: 'relative',
            //minHeight: '768px',
            width: '1024px' //height: Session.get('appHeight') - 240 + 'px'

          },
          content: {
            minHeight: '728px',
            width: '100%',
            height: Session.get('appHeight') - 280 + 'px'
          }
        },
        browserWindowLocation: 'https://www.ncbi.nlm.nih.gov'
      };

      if (Session.get('iFrameLocation')) {
        data.browserWindowLocation = Session.get('iFrameLocation');
      }

      if (Session.get('secondPanelVisible')) {
        if (Session.get('appWidth') > 1200) {
          data.style.secondary.visibility = 'visible';
          data.style.secondary.left = '1280px';
          data.style.secondary.width = Session.get('appWidth') - (1280 + 80) + 'px';
          data.style.card.width = '100%';
        } else {
          data.style.secondary.visibility = 'hidden';
          data.style.secondary.left = '4048px';
        }
      } else {
        data.style.secondary.visibility = 'hidden';
        data.style.secondary.left = '4048px';
      }

      if (process.env.NODE_ENV === "test") console.log("App[data]", data);
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      var orbital; // if(get(Meteor, 'settings.public.defaults.nfcOrbital')){
      //   orbital = <SciFiPage />;
      // }

      console.log('this.props.location.query', this.props.location.query);
      Session.set('window.location', this.props.location);
      Session.set('ehrLaunchContext', get(this, 'props.location.query.launch'));
      return React.createElement(MuiThemeProvider, {
        muiTheme: muiTheme
      }, React.createElement(GlassApp, null, React.createElement(SidebarTray, null, orbital, React.createElement(Header, null), React.createElement("div", {
        id: "primaryFlexPanel",
        className: "primaryFlexPanel"
      }, this.props.children), React.createElement("div", {
        id: "secondaryFlexPanel",
        className: "secondaryFlexPanel",
        style: this.data.style.secondary
      }, React.createElement(FullPageCanvas, null, this.renderSecondaryPanel())), React.createElement(Footer, null))));
    }

    return render;
  }();

  return App;
}(React.Component);

App.propTypes = {
  children: PropTypes.element.isRequired
};
App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
App.defaultProps = {};
ReactMixin(App.prototype, ReactMeteorData); // export default App;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AppBar.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/layouts/AppBar.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 0);
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.getStyles = getStyles;

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _menu = require('material-ui/svg-icons/navigation/menu');

var _menu2 = _interopRequireDefault(_menu);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _propTypes = require('material-ui/utils/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function getStyles(props, context) {
  var _context$muiTheme = context.muiTheme,
      appBar = _context$muiTheme.appBar,
      iconButtonSize = _context$muiTheme.button.iconButtonSize,
      zIndex = _context$muiTheme.zIndex;
  var flatButtonSize = 36;
  var styles = {
    root: {
      position: 'relative',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: appBar.height,
      lineHeight: appBar.height + 'px'
    },
    mainElement: {
      boxFlex: 1,
      flex: '1'
    },
    iconButtonStyle: {
      marginTop: (appBar.height - iconButtonSize) / 2,
      marginRight: 8,
      marginLeft: -16
    },
    iconButtonIconStyle: {
      fill: appBar.textColor,
      color: appBar.textColor
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: (iconButtonSize - flatButtonSize) / 2 + 1
    }
  };
  return styles;
}

var AppBar = function (_Component) {
  (0, _inherits3.default)(AppBar, _Component);

  function AppBar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AppBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AppBar.__proto__ || (0, _getPrototypeOf2.default)(AppBar)).call.apply(_ref, [this].concat(args))), _this), _this.handleTouchTapLeftIconButton = function (event) {
      if (_this.props.onLeftIconButtonTouchTap) {
        _this.props.onLeftIconButtonTouchTap(event);
      }
    }, _this.handleTouchTapRightIconButton = function (event) {
      if (_this.props.onRightIconButtonTouchTap) {
        _this.props.onRightIconButtonTouchTap(event);
      }
    }, _this.handleTitleTouchTap = function (event) {
      if (_this.props.onTitleTouchTap) {
        _this.props.onTitleTouchTap(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AppBar, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.props.iconElementLeft || !this.props.iconClassNameLeft, 'Material-UI: Properties iconElementLeft\n      and iconClassNameLeft cannot be simultaneously defined. Please use one or the other.') : void 0;
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.props.iconElementRight || !this.props.iconClassNameRight, 'Material-UI: Properties iconElementRight\n      and iconClassNameRight cannot be simultaneously defined. Please use one or the other.') : void 0;
      }

      return componentDidMount;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props = this.props,
            title = _props.title,
            titleId = _props.titleId,
            titleStyle = _props.titleStyle,
            iconStyleLeft = _props.iconStyleLeft,
            iconStyleRight = _props.iconStyleRight,
            onTitleTouchTap = _props.onTitleTouchTap,
            showMenuIconButton = _props.showMenuIconButton,
            iconElementLeft = _props.iconElementLeft,
            iconElementRight = _props.iconElementRight,
            iconClassNameLeft = _props.iconClassNameLeft,
            iconClassNameRight = _props.iconClassNameRight,
            onLeftIconButtonTouchTap = _props.onLeftIconButtonTouchTap,
            onRightIconButtonTouchTap = _props.onRightIconButtonTouchTap,
            className = _props.className,
            style = _props.style,
            zDepth = _props.zDepth,
            children = _props.children,
            other = (0, _objectWithoutProperties3.default)(_props, ['title', 'titleStyle', 'titleId', 'iconStyleLeft', 'iconStyleRight', 'onTitleTouchTap', 'showMenuIconButton', 'iconElementLeft', 'iconElementRight', 'iconClassNameLeft', 'iconClassNameRight', 'onLeftIconButtonTouchTap', 'onRightIconButtonTouchTap', 'className', 'style', 'zDepth', 'children']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var styles = getStyles(this.props, this.context);
        var menuElementLeft = void 0;
        var menuElementRight = void 0; // If the title is a string, wrap in an h1 tag.
        // If not, wrap in a div tag.

        var titleComponent = typeof title === 'string' || title instanceof String ? 'h1' : 'div';

        var titleElement = _react2.default.createElement(titleComponent, {
          id: titleId,
          onClick: this.handleTitleTouchTap,
          style: prepareStyles((0, _simpleAssign2.default)(styles.title, styles.mainElement, titleStyle))
        }, title);

        var iconLeftStyle = (0, _simpleAssign2.default)({}, styles.iconButtonStyle, iconStyleLeft);

        if (showMenuIconButton) {
          if (iconElementLeft) {
            var iconElementLeftProps = {};

            if (iconElementLeft.type.muiName === 'IconButton') {
              var iconElemLeftChildren = iconElementLeft.props.children;
              var iconButtonIconStyle = !(iconElemLeftChildren && iconElemLeftChildren.props && iconElemLeftChildren.props.color) ? styles.iconButtonIconStyle : null;
              iconElementLeftProps.iconStyle = (0, _simpleAssign2.default)({}, iconButtonIconStyle, iconElementLeft.props.iconStyle);
            }

            if (!iconElementLeft.props.onClick && this.props.onLeftIconButtonTouchTap) {
              iconElementLeftProps.onClick = this.handleTouchTapLeftIconButton;
            }

            menuElementLeft = _react2.default.createElement('div', {
              style: prepareStyles(iconLeftStyle)
            }, (0, _keys2.default)(iconElementLeftProps).length > 0 ? (0, _react.cloneElement)(iconElementLeft, iconElementLeftProps) : iconElementLeft);
          } else {
            menuElementLeft = _react2.default.createElement(_IconButton2.default, {
              style: iconLeftStyle,
              iconStyle: styles.iconButtonIconStyle,
              iconClassName: iconClassNameLeft,
              onClick: this.handleTouchTapLeftIconButton
            }, iconClassNameLeft ? '' : _react2.default.createElement(_menu2.default, {
              style: (0, _simpleAssign2.default)({}, styles.iconButtonIconStyle)
            }));
          }
        }

        var iconRightStyle = (0, _simpleAssign2.default)({}, styles.iconButtonStyle, {
          marginRight: -16,
          marginLeft: 'auto'
        }, iconStyleRight);

        if (iconElementRight) {
          var iconElementRightProps = {};

          switch (iconElementRight.type.muiName) {
            case 'IconMenu':
            case 'IconButton':
              var iconElemRightChildren = iconElementRight.props.children;

              var _iconButtonIconStyle = !(iconElemRightChildren && iconElemRightChildren.props && iconElemRightChildren.props.color) ? styles.iconButtonIconStyle : null;

              iconElementRightProps.iconStyle = (0, _simpleAssign2.default)({}, _iconButtonIconStyle, iconElementRight.props.iconStyle);
              break;

            case 'FlatButton':
              iconElementRightProps.style = (0, _simpleAssign2.default)({}, styles.flatButton, iconElementRight.props.style);
              break;

            default:
          }

          if (!iconElementRight.props.onClick && this.props.onRightIconButtonTouchTap) {
            iconElementRightProps.onClick = this.handleTouchTapRightIconButton;
          }

          menuElementRight = _react2.default.createElement('div', {
            style: prepareStyles(iconRightStyle)
          }, (0, _keys2.default)(iconElementRightProps).length > 0 ? (0, _react.cloneElement)(iconElementRight, iconElementRightProps) : iconElementRight);
        } else if (iconClassNameRight) {
          menuElementRight = _react2.default.createElement(_IconButton2.default, {
            style: iconRightStyle,
            iconStyle: styles.iconButtonIconStyle,
            iconClassName: iconClassNameRight,
            onClick: this.handleTouchTapRightIconButton
          });
        }

        return _react2.default.createElement(_Paper2.default, (0, _extends3.default)({}, other, {
          rounded: false,
          className: className,
          style: (0, _simpleAssign2.default)({}, styles.root, style),
          zDepth: zDepth
        }), menuElementLeft, titleElement, menuElementRight, children);
      }

      return render;
    }()
  }]);
  return AppBar;
}(_react.Component);

AppBar.muiName = 'AppBar';
AppBar.defaultProps = {
  showMenuIconButton: true,
  title: '',
  zDepth: 1
};
AppBar.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};
process.env.NODE_ENV !== "production" ? AppBar.propTypes = {
  /**
   * Can be used to render a tab inside an app bar for instance.
   */
  children: PropTypes.node,

  /**
   * Applied to the app bar's root element.
   */
  className: PropTypes.string,

  /**
   * The classname of the icon on the left of the app bar.
   * If you are using a stylesheet for your icons, enter the class name for the icon to be used here.
   */
  iconClassNameLeft: PropTypes.string,

  /**
   * Similiar to the iconClassNameLeft prop except that
   * it applies to the icon displayed on the right of the app bar.
   */
  iconClassNameRight: PropTypes.string,

  /**
   * The custom element to be displayed on the left side of the
   * app bar such as an SvgIcon.
   */
  iconElementLeft: PropTypes.element,

  /**
   * Similiar to the iconElementLeft prop except that this element is displayed on the right of the app bar.
   */
  iconElementRight: PropTypes.element,

  /**
   * Override the inline-styles of the element displayed on the left side of the app bar.
   */
  iconStyleLeft: PropTypes.object,

  /**
   * Override the inline-styles of the element displayed on the right side of the app bar.
   */
  iconStyleRight: PropTypes.object,

  /**
   * Callback function for when the left icon is selected via a touch tap.
   *
   * @param {object} event TouchTap event targeting the left `IconButton`.
   */
  onLeftIconButtonTouchTap: PropTypes.func,

  /**
   * Callback function for when the right icon is selected via a touch tap.
   *
   * @param {object} event TouchTap event targeting the right `IconButton`.
   */
  onRightIconButtonTouchTap: PropTypes.func,

  /**
   * Callback function for when the title text is selected via a touch tap.
   *
   * @param {object} event TouchTap event targeting the `title` node.
   */
  onTitleTouchTap: PropTypes.func,

  /**
   * Determines whether or not to display the Menu icon next to the title.
   * Setting this prop to false will hide the icon.
   */
  showMenuIconButton: PropTypes.bool,

  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,

  /**
   * The title to display on the app bar.
   */
  title: PropTypes.node,

  /**
   * Assign an ID to the title
   */
  titleId: PropTypes.string,

  /**
   * Override the inline-styles of the app bar's title element.
   */
  titleStyle: PropTypes.object,

  /**
   * The zDepth of the component.
   * The shadow of the app bar is also dependent on this property.
   */
  zDepth: _propTypes2.default.zDepth
} : void 0;
exports.default = AppBar;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Footer.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/layouts/Footer.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  Footer: function () {
    return Footer;
  }
});
var AppBar, FlatButton, ToolbarTitle;
module.link("material-ui", {
  AppBar: function (v) {
    AppBar = v;
  },
  FlatButton: function (v) {
    FlatButton = v;
  },
  ToolbarTitle: function (v) {
    ToolbarTitle = v;
  }
}, 0);
var Glass;
module.link("meteor/clinical:glass-ui", {
  Glass: function (v) {
    Glass = v;
  }
}, 1);
var ImageBlurOn;
module.link("material-ui/svg-icons/image/blur-on", {
  "default": function (v) {
    ImageBlurOn = v;
  }
}, 2);
var ImageExposure;
module.link("material-ui/svg-icons/image/exposure", {
  "default": function (v) {
    ImageExposure = v;
  }
}, 3);
var DeviceWifiTethering;
module.link("material-ui/svg-icons/device/wifi-tethering", {
  "default": function (v) {
    DeviceWifiTethering = v;
  }
}, 4);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 5);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 6);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 7);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 8);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 9);
var HTTP;
module.link("meteor/http", {
  HTTP: function (v) {
    HTTP = v;
  }
}, 10);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 11);
var has, get;
module.link("lodash", {
  has: function (v) {
    has = v;
  },
  get: function (v) {
    get = v;
  }
}, 12);
Session.setDefault('showThemingControls', false);
Session.setDefault('gender', false);
Session.setDefault('timelineBackground', false);
Session.setDefault('continuityOfCareDoc', null);

var Footer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Footer, _React$Component);

  function Footer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Footer.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        userId: Meteor.userId(),
        gender: Session.get('gender'),
        footerStyle: {
          position: 'fixed',
          bottom: '0px',
          width: '100%',
          // height: '6.4rem',
          alignItems: 'center',
          WebkitTransition: 'ease .2s',
          transition: 'ease .2s',
          margin: '0px',
          opacity: Session.get('globalOpacity')
        },
        westStyle: {
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          left: '0px' // height: '6.4rem'

        },
        displayThemeNavbar: false,
        status: '',
        style: {
          buttonText: Glass.darkroom({
            marginLeft: '20px'
          }),
          disabledButtonText: {
            color: 'lightgray'
          },
          southEastButtons: {
            fontSize: '18px',
            top: '-4px',
            cursor: 'pointer'
          }
        },
        pathname: Session.get('pathname')
      };

      if (Meteor.status()) {
        data.status = Meteor.status().status + " | " + process.env.NODE_ENV;
      }

      if (Session.get('showThemingControls')) {
        data.displayThemeNavbar = Session.get('showThemingControls');
        data.westStyle.bottom = '2.4rem';
      }

      data.style = Glass.blur(data.style);
      data.footerStyle = Glass.darkroom(data.footerStyle); //phone layout

      if (Session.get('appWidth') < 768) {
        data.westStyle.visibility = 'hidden';
      }

      if (get(Meteor, 'settings.public.defaults.disableFooter')) {
        data.footerStyle.display = 'none !important';
        data.footerStyle.visibility = 'hidden !important';
      } else {
        if (!Session.get('showNavbars')) {
          data.footerStyle.bottom = '-100px';
        }
      }

      if (get(Meteor, 'settings.public.defaults.disableSecondaryPanel')) {
        data.style.southEastButtons.cursor = 'none !important';
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.clickOnDarkroomButton = function () {
    function clickOnDarkroomButton() {
      Session.toggle('darkroomEnabled');
    }

    return clickOnDarkroomButton;
  }();

  _proto.clickOnBlurButton = function () {
    function clickOnBlurButton() {
      Session.toggle('glassBlurEnabled');
    }

    return clickOnBlurButton;
  }();

  _proto.clickOnThemingButton = function () {
    function clickOnThemingButton() {
      browserHistory.push('/theming');
    }

    return clickOnThemingButton;
  }();

  _proto.querySystemButton = function () {
    function querySystemButton(resourceType) {
      console.log("querying open.epic.com", resourceType);
      Meteor.call("queryEpic", resourceType, function (error, result) {
        if (error) {
          console.log("error", error);
        }

        if (result) {
          console.log("queryEpic[epic]", result);
        }
      });
    }

    return querySystemButton;
  }();

  _proto.openLink = function () {
    function openLink(url, callback) {
      console.log("openLink", url);

      if (typeof callback === "function") {
        callback();
      }

      browserHistory.push(url);
    }

    return openLink;
  }();

  _proto.exportContinuityOfCareDoc = function () {
    function exportContinuityOfCareDoc() {
      console.log('exportContinuityOfCareDoc');
      var continuityOfCareDoc = {
        resourceType: "Bundle",
        entry: []
      };

      if ((typeof AllergyIntollerances === "undefined" ? "undefined" : (0, _typeof2.default)(AllergyIntollerances)) === "object") {
        AllergyIntollerances.find().forEach(function (allergy) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/AllergyIntolerance/" + allergy._id,
            resource: allergy
          });
        });
      }

      if ((typeof CarePlans === "undefined" ? "undefined" : (0, _typeof2.default)(CarePlans)) === "object") {
        CarePlans.find().forEach(function (careplan) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/CarePlan/" + careplan._id,
            resource: careplan
          });
        });
      }

      if ((typeof Conditions === "undefined" ? "undefined" : (0, _typeof2.default)(Conditions)) === "object") {
        Conditions.find().forEach(function (condition) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Condition/" + condition._id,
            resource: condition
          });
        });
      }

      if ((typeof Devices === "undefined" ? "undefined" : (0, _typeof2.default)(Devices)) === "object") {
        Devices.find().forEach(function (device) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Device/" + device._id,
            resource: device
          });
        });
      }

      if ((typeof Goals === "undefined" ? "undefined" : (0, _typeof2.default)(Goals)) === "object") {
        Goals.find().forEach(function (goal) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Goal/" + goal._id,
            resource: goal
          });
        });
      }

      if ((typeof Immunizations === "undefined" ? "undefined" : (0, _typeof2.default)(Immunizations)) === "object") {
        Immunizations.find().forEach(function (immunization) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Immunization/" + immunization._id,
            resource: immunization
          });
        });
      }

      if ((typeof Medications === "undefined" ? "undefined" : (0, _typeof2.default)(Medications)) === "object") {
        Medications.find().forEach(function (medication) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Medication/" + medication._id,
            resource: medication
          });
        });
      }

      if ((typeof MedicationOrders === "undefined" ? "undefined" : (0, _typeof2.default)(MedicationOrders)) === "object") {
        MedicationOrders.find().forEach(function (medicationOrder) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/MedicationOrder/" + medicationOrder._id,
            resource: medicationOrder
          });
        });
      }

      if ((typeof MedicationStatements === "undefined" ? "undefined" : (0, _typeof2.default)(MedicationStatements)) === "object") {
        MedicationStatements.find().forEach(function (medicationStatement) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/MedicationStatement/" + medicationStatement._id,
            resource: medicationStatement
          });
        });
      }

      if ((typeof Observations === "undefined" ? "undefined" : (0, _typeof2.default)(Observations)) === "object") {
        Observations.find().forEach(function (observation) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Observation/" + observation._id,
            resource: observation
          });
        });
      }

      if ((typeof Organizations === "undefined" ? "undefined" : (0, _typeof2.default)(Organizations)) === "object") {
        Organizations.find().forEach(function (organization) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Organization/" + organization._id,
            resource: organization
          });
        });
      }

      if ((typeof Patients === "undefined" ? "undefined" : (0, _typeof2.default)(Patients)) === "object") {
        Patients.find().forEach(function (patient) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Patient/" + patient._id,
            resource: patient
          });
        });
      }

      if ((typeof Practitioners === "undefined" ? "undefined" : (0, _typeof2.default)(Practitioners)) === "object") {
        Practitioners.find().forEach(function (practitioner) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Practitioner/" + practitioner._id,
            resource: practitioner
          });
        });
      }

      if ((typeof Procedures === "undefined" ? "undefined" : (0, _typeof2.default)(Procedures)) === "object") {
        Procedures.find().forEach(function (procedure) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/Procedure/" + procedure._id,
            resource: procedure
          });
        });
      }

      if ((typeof RiskAssessments === "undefined" ? "undefined" : (0, _typeof2.default)(RiskAssessments)) === "object") {
        RiskAssessments.find().forEach(function (riskAssessment) {
          continuityOfCareDoc.entry.push({
            fullUrl: "/RiskAssessment/" + riskAssessment._id,
            resource: riskAssessment
          });
        });
      } // if(Meteor.user()){
      //   continuityOfCareDoc = get(Meteor.user(), 'profile.continuityOfCare');
      // }    


      Session.set('continuityOfCareDoc', continuityOfCareDoc);
    }

    return exportContinuityOfCareDoc;
  }();

  _proto.downloadContinuityOfCareDoc = function () {
    function downloadContinuityOfCareDoc() {
      var continuityOfCareDoc = Session.get('continuityOfCareDoc');
      var dataString = 'data:text/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(continuityOfCareDoc, null, 2));
      var downloadAnchorElement = document.getElementById('downloadAnchorElement');

      if (downloadAnchorElement) {
        downloadAnchorElement.setAttribute("href", dataString);
        var patientName = Meteor.user().displayName();
        console.log('Generating CCD for ', patientName);
        downloadAnchorElement.setAttribute("download", "continuity-of-care.fhir.ccd");
        downloadAnchorElement.click(); // window.open('data:text/csv;charset=utf-8,' + escape(continuityOfCareDoc), '_self');    
      } else {
        console.log('Couldnt find anchor element.');
      }
    }

    return downloadContinuityOfCareDoc;
  }(); // clearContinuityOfCareDoc(){
  //   Meteor.users.update({_id: Meteor.userId()}, {$unset: {
  //     'profile.continuityOfCare': ''
  //   }});
  // }


  _proto.transferCurrentPatient = function () {
    function transferCurrentPatient() {
      console.log('Transferring patient...');
      console.log('selectedPractitioner:  ', Session.get('selectedPractitioner'));

      if ((typeof Practitioners === "undefined" ? "undefined" : (0, _typeof2.default)(Practitioners)) === 'object') {
        var practitionerName = '';
        var selectedPractitioner = Practitioners.findOne({
          _id: Session.get('selectedPractitioner')
        });

        if (selectedPractitioner) {
          practitionerName = selectedPractitioner.displayName();
        }

        console.log('Practitioner Name:     ', practitionerName);
        console.log('selectedPatient:       ', Session.get('selectedPatient'));
        var displayText = '';
        var currentPatient = Patients.findOne({
          _id: Session.get('selectedPatient')
        });

        if (currentPatient) {
          displayText = currentPatient.displayName();
        }

        console.log('Patient Name:          ', displayText);

        if (Session.get('selectedPractitioner')) {
          Meteor.users.update({
            _id: Session.get('selectedPractitioner')
          }, {
            $set: {
              'profile.inbox': true,
              'profile.incomingPatient': {
                display: displayText,
                reference: Session.get('selectedPatient')
              }
            }
          });
        }
      }
    }

    return transferCurrentPatient;
  }();

  _proto.pinkBlueToggle = function () {
    function pinkBlueToggle() {
      console.log('pinkBlueToggle');

      if (Session.get('gender') === "Pink") {
        Session.set('gender', 'BabyBlue');
      } else if (Session.get('gender') == 'BabyBlue') {
        Session.set('gender', 'Pink');
      }
    }

    return pinkBlueToggle;
  }();

  _proto.toggleBackground = function () {
    function toggleBackground() {
      Session.toggle('timelineBackground');
    }

    return toggleBackground;
  }();

  _proto.toggleFilterMainTiles = function () {
    function toggleFilterMainTiles() {
      Session.toggle('filterMainTiles');
    }

    return toggleFilterMainTiles;
  }();

  _proto.searchBigchainForPractitioner = function () {
    function searchBigchainForPractitioner() {
      console.log("searchBigchainForPractitioner", Session.get('selectedPractitioner'));

      if ((typeof Practitioners === "undefined" ? "undefined" : (0, _typeof2.default)(Practitioners)) === "object") {
        var practitioner = Practitioners.findOne({
          _id: Session.get('selectedPractitioner')
        });
        var searchTerm = ''; // console.log('practitioner.name', practitioner.name)

        if (get(practitioner, 'name[0].text')) {
          searchTerm = get(practitioner, 'name[0].text');
          console.log('searchTerm', searchTerm);
          Meteor.call('searchBigchainForPractitioner', searchTerm, function (error, data) {
            if (error) console.log('error', error);

            if (data) {
              var parsedResults = [];
              data.forEach(function (result) {
                parsedResults.push(result.data);
              });
              console.log('parsedResults', parsedResults);
              Session.set('practitionerBlockchainData', parsedResults);
            }
          });
        }
      }
    }

    return searchBigchainForPractitioner;
  }();

  _proto.readPractitionersFromBlockchain = function () {
    function readPractitionersFromBlockchain() {
      //console.log("readPractitionersFromBlockchain");
      Meteor.call('readPractitionersFromBlockchain', function (error, data) {
        if (error) console.log('error', error);

        if (data) {
          var parsedResults = [];
          console.log('data', data);
          data.forEach(function (result) {
            delete result.data._document;
            parsedResults.push(result.data);
          });
          console.log('parsedResults', parsedResults);
          Session.set('blockchainPractitionerData', parsedResults);
        }
      });
    }

    return readPractitionersFromBlockchain;
  }();

  _proto.rotateZygote = function () {
    function rotateZygote() {
      console.log('rotateZygote');
      Session.toggle('rotated');
    }

    return rotateZygote;
  }();

  _proto.showPhonebook = function () {
    function showPhonebook() {
      console.log('showPhonebook');
      Session.toggle('showPhonebook');
    }

    return showPhonebook;
  }();

  _proto.fullscreenVideo = function () {
    function fullscreenVideo() {
      console.log('fullscreenVideo');
      Session.toggle('fullscreenVideo');
    }

    return fullscreenVideo;
  }();

  _proto.showOrbital = function () {
    function showOrbital() {
      Session.toggle('showOrbital');
    }

    return showOrbital;
  }();

  _proto.clearEndpoints = function () {
    function clearEndpoints() {
      console.log('Droping endpoints.....');
      Meteor.call('dropEndpoints');
      Session.set('edgeBundle', []);
    }

    return clearEndpoints;
  }();

  _proto.cornerstoneViewer = function () {
    function cornerstoneViewer() {
      browserHistory.push('/dicom-viewer');
    }

    return cornerstoneViewer;
  }();

  _proto.initBlockchainGraph = function () {
    function initBlockchainGraph() {
      Session.set('edgeBundle', Endpoints.find().map(function (endpoint) {
        var result = {
          name: endpoint.name,
          size: 1000,
          status: endpoint.status,
          managingOrganization: endpoint.managingOrganization,
          imports: []
        };

        if (endpoint.contact) {
          endpoint.contact.forEach(function (contact) {
            result.imports.push(contact.value);
          });
        }

        return result;
      }));
      browserHistory.push('/blockchain-graphs');
    }

    return initBlockchainGraph;
  }();

  _proto.configBlockchain = function () {
    function configBlockchain() {
      browserHistory.push('/blockchain-graph-config');
    }

    return configBlockchain;
  }();

  _proto.showLines = function () {
    function showLines() {
      Session.toggle('showEdgeBundleLines');
      console.log('selectedChecklist', Session.get('selectedChecklist'));
    }

    return showLines;
  }();

  _proto.searchConsents = function () {
    function searchConsents() {
      Session.set('consentDialogOpen', true);
    }

    return searchConsents;
  }();

  _proto.newList = function () {
    function newList() {
      Session.set('selectedChecklist', Lists.insert({
        "resourceType": "List",
        "code": {
          "text": ''
        },
        "note": '',
        "source": {
          "reference": "System/system"
        },
        "status": "current",
        "date": new Date(),
        "mode": "changes",
        "entry": []
      }));
      Session.set('checklistPageTabIndex', 1);
      console.log('selectedChecklist', Session.get('selectedChecklist'));
    }

    return newList;
  }();

  _proto.toggleStates = function () {
    function toggleStates() {
      if (Session.equals('powerOfAttorneyState', 'Illinois')) {
        Session.set('powerOfAttorneyState', 'North Carolina');
      } else if (Session.equals('powerOfAttorneyState', 'North Carolina')) {
        Session.set('powerOfAttorneyState', 'Illinois');
      }
    }

    return toggleStates;
  }();

  _proto.renderWestNavbar = function () {
    function renderWestNavbar(pathname) {
      console.log('Footer.renderWestNavbar', pathname);
      var self = this;
      var buttonRenderArray = [{
        pathname: '/fhir-resources-index',
        label: 'Filter Tiles',
        onClick: this.toggleFilterMainTiles
      }, {
        pathname: '/patients',
        label: 'Test',
        settings: 'settings.public.modules.fhir.Patients'
      }, {
        pathname: '/observations',
        label: 'Test',
        settings: 'settings.public.modules.fhir.Observations',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "Record Vitals",
          className: "querySystemButton",
          ref: "querySystemButton",
          onClick: this.openLink.bind(this, '/vitals-tracking', function () {
            Session.set('vitalsForm', {
              pulse: '',
              temperature: '',
              respiration: '',
              bloodPressure: '',
              notes: ''
            });
          }),
          style: this.data.style.buttonText
        }), React.createElement(FlatButton, {
          label: "Filter",
          className: "querySystemButton",
          ref: "querySystemButton"
        }))
      }, {
        pathname: '/checklists',
        label: 'New List',
        settings: 'settings.public.modules.apps.ChecklistManifesto',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "New List",
          className: "querySystemButton",
          ref: "querySystemButton",
          onClick: this.newList.bind(this),
          style: this.data.style.buttonText
        }))
      }, {
        pathname: '/continuity-of-care',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "Sidescroll Timeline",
          className: "horizontalTimeline",
          ref: "horizontalTimeline",
          onClick: this.openLink.bind(this, '/timeline-sidescroll'),
          style: this.data.style.buttonText
        }))
      }, {
        pathname: '/timeline',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "Continuity of Care",
          className: "ccdPage",
          ref: "ccdPage",
          onClick: this.openLink.bind(this, '/continuity-of-care'),
          style: this.data.style.buttonText
        }))
      }, {
        pathname: '/timeline-sidescroll',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "Continuity of Care",
          className: "ccdPage",
          ref: "ccdPage",
          onClick: this.openLink.bind(this, '/continuity-of-care'),
          style: this.data.style.buttonText
        }))
      }, {
        pathname: '/data-management',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "Prepare CCD",
          id: "exportContinuityOfCareDoc",
          className: "exportCcd",
          ref: "exportContinuityOfCareDoc",
          style: this.data.style.buttonText,
          onClick: this.exportContinuityOfCareDoc
        }), React.createElement(FlatButton, {
          label: "Download",
          id: "downloadContinuityOfCareDoc",
          className: "exportCcd",
          ref: "exportContinuityOfCareDoc",
          style: this.data.style.buttonText,
          onClick: this.downloadContinuityOfCareDoc
        }), React.createElement("a", {
          id: "downloadAnchorElement",
          style: {
            display: "none"
          }
        }))
      }, {
        pathname: '/zygote',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "Rotate",
          className: "querySystemButton",
          ref: "querySystemButton",
          onClick: this.rotateZygote.bind(this, 'Condition'),
          style: this.data.style.buttonText
        }))
      }, {
        pathname: '/videoconferencing',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "Phonebook",
          className: "querySystemButton",
          ref: "querySystemButton",
          onClick: this.showPhonebook.bind(this, 'Condition'),
          style: this.data.style.buttonText
        }), React.createElement(FlatButton, {
          label: "Fullscreen",
          className: "querySystemButton",
          ref: "querySystemButton",
          onClick: this.fullscreenVideo.bind(this),
          style: this.data.style.buttonText
        }), React.createElement(FlatButton, {
          label: "Orbital",
          className: "querySystemButton",
          ref: "querySystemButton",
          onClick: this.showOrbital.bind(this),
          style: this.data.style.buttonText
        }))
      }, {
        pathname: '/endpoints',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "Clear",
          className: "clearEndpoints",
          ref: "querySystemButton",
          onClick: this.clearEndpoints,
          style: this.data.style.buttonText
        }))
      }, {
        pathname: '/diagnostic-reports',
        component: React.createElement("div", null, React.createElement(FlatButton, {
          label: "Imaging Studies",
          ref: "cornerstoneViewer",
          onClick: this.openLink.bind(this, '/imaging-studies'),
          style: this.data.style.buttonText
        }))
      }];
      var renderDom;
      buttonRenderArray.forEach(function (buttonConfig) {
        // right route
        if (pathname === buttonConfig.pathname) {
          // right security/function enabled
          if (buttonConfig.settings && get(Meteor, buttonConfig.settings) === false) {
            // there was a settings criteria; and it was set to faulse            
            return false;
          } else {
            if (buttonConfig.component) {
              renderDom = buttonConfig.component;
            } else {
              renderDom = React.createElement("div", {
                style: {
                  marginTop: '-8px'
                }
              }, React.createElement(FlatButton, {
                label: buttonConfig.label,
                className: "filterTileButton",
                onClick: buttonConfig.onClick,
                style: self.data.style.buttonText
              }));
            }
          }
        }
      });
      return renderDom; // FHIR RESOURCES

      if (pathname === '/fhir-resources-index') {//   // PATIENTS
        // } else if ((pathname === '/patients') && get(Meteor, 'settings.public.modules.epic')) {
        //   // the user is logged in as a normal user
        //   return (
        //     <div></div>
        //   );
        // PRACTITIONERS
      } else if (pathname === '/practitioners' && get(Meteor, 'settings.public.modules.fhir.Practitioners')) {
        if (Package["symptomatic:blockchain-core"]) {
          return React.createElement("div", null, React.createElement(FlatButton, {
            label: "Read Practitioners on Bigchain",
            className: "querySystemButton",
            ref: "querySystemButton",
            onClick: this.readPractitionersFromBlockchain.bind(this),
            style: this.data.style.buttonText
          }), React.createElement(FlatButton, {
            label: "Query Practitioner History",
            className: "querySystemButton",
            ref: "querySystemButton",
            onClick: this.searchBigchainForPractitioner.bind(this),
            style: this.data.style.buttonText
          }));
        } // // OBSERVATIONS
        // } else if ((pathname === '/observations') && get(Meteor, 'settings.public.modules.fhir.Observations')) {
        //   // the user is logged in as a normal user
        //   return (
        //   );
        // // CHECKLISTS
        // } else if ((pathname === '/checklists') && get(Meteor, 'settings.public.modules.apps.ChecklistManifesto')) {
        //   return (
        //     <div>
        //       <FlatButton label='New List' className='querySystemButton' ref='querySystemButton' onClick={this.newList.bind(this)} style={this.data.style.buttonText} ></FlatButton>
        //     </div>
        //   );
        // // ORGANIZATIONS
        // } else if ((pathname === '/organizations') && get(Meteor, 'settings.public.modules.fhir.Organizations')) {
        //   return (
        //     <div>
        //     </div>
        //   );
        // // CONTINUITY OF CARE
        // } else if (pathname === '/continuity-of-care') {
        //   return (
        //     <div>
        //       <FlatButton label='Sidescroll Timeline' className='horizontalTimeline' ref='horizontalTimeline' onClick={this.openLink.bind(this, '/timeline-sidescroll')} style={this.data.style.buttonText} ></FlatButton>
        //       <FlatButton label='Import' className='importData' ref='importCcd' onClick={this.openLink.bind(this, '/data-management')} style={this.data.style.buttonText} ></FlatButton>
        //       <FlatButton label='Export CCD' id="exportContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.exportContinuityOfCareDoc}></FlatButton>
        //     </div>
        //   );
        // // TIMELINE
        // } else if ((pathname === '/timeline') || (pathname === '/timeline-sidescroll')) {
        //   return (
        //     <div>
        //       <FlatButton label='Continuity of Care' className='ccdPage' ref='ccdPage' onClick={this.openLink.bind(this, '/continuity-of-care')} style={this.data.style.buttonText} ></FlatButton>
        //       <FlatButton label='Background' id="toggleBackground" className='clearCcd' ref='toggleBackground' style={this.data.style.buttonText} onClick={this.toggleBackground}></FlatButton>
        //     </div>
        //   );
        // // DATA Management
        // } else if (pathname === '/data-management') {
        //   return (
        //     <div>
        //       <FlatButton label='Prepare CCD' id="exportContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.exportContinuityOfCareDoc}></FlatButton>
        //       <FlatButton label='Download' id="downloadContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.downloadContinuityOfCareDoc}></FlatButton>
        //       <a id="downloadAnchorElement" style={{display: "none"}} ></a>            
        //     </div>
        //   );
        // // CONDITIONS
        // } else if ((pathname === '/conditions') && get(Meteor, 'settings.public.modules.epic')) {
        //   return (
        //     <div></div>
        //   );
        // // ZYGOTE
        // } else if (pathname === '/zygote') {
        //   return (
        //     <div>
        //       <FlatButton label='Rotate' className='querySystemButton' ref='querySystemButton' onClick={this.rotateZygote.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
        //     </div>
        //   );
        // // VIDEOCONFERENCING
        // } else if (pathname === '/videoconferencing') {
        //   return (
        //     <div>
        //       <FlatButton label='Phonebook' className='querySystemButton' ref='querySystemButton' onClick={this.showPhonebook.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
        //       <FlatButton label='Fullscreen' className='querySystemButton' ref='querySystemButton' onClick={this.fullscreenVideo.bind(this)} style={this.data.style.buttonText} ></FlatButton>
        //       <FlatButton label='Orbital' className='querySystemButton' ref='querySystemButton' onClick={this.showOrbital.bind(this)} style={this.data.style.buttonText} ></FlatButton>
        //     </div>
        //   );
        // // ENDPOINTS
        // } else if (pathname === '/endpoints') {
        //   return (
        //     <div>
        //       <FlatButton label='Clear' className='clearEndpoints' ref='querySystemButton' onClick={this.clearEndpoints} style={this.data.style.buttonText} ></FlatButton>
        //     </div>
        //   );
        // // DIAGNOSTIC REPORTS
        // } else if (pathname === '/diagnostic-reports') {
        //   return (
        //     <div>
        //       <FlatButton label='Imaging Studies' ref='cornerstoneViewer' onClick={this.openLink.bind(this, '/imaging-studies')} style={this.data.style.buttonText} ></FlatButton>
        //     </div>
        //   );
        // IMAGING STUDIES

      } else if (pathname === '/imaging-studies') {
        return React.createElement("div", null, React.createElement(FlatButton, {
          label: "Cornerstone DICOM Viewer",
          ref: "cornerstoneViewer",
          onClick: this.cornerstoneViewer,
          style: this.data.style.buttonText
        })); // GRAPHS
      } else if (pathname === '/blockchain-graphs') {
        return React.createElement("div", null, React.createElement(FlatButton, {
          label: "Config",
          className: "configGraph",
          ref: "querySystemButton",
          onClick: this.configBlockchain,
          style: this.data.style.buttonText
        }), React.createElement(FlatButton, {
          label: "Lines",
          className: "configGraph",
          ref: "querySystemButton",
          onClick: this.showLines,
          style: this.data.style.buttonText
        })); // CONSENTS
      } else if (pathname === '/consents') {
        return React.createElement("div", null, React.createElement(FlatButton, {
          label: "Search",
          className: "configGraph",
          ref: "querySystemButton",
          onClick: this.searchConsents,
          style: this.data.style.buttonText
        })); // POWER OF ATTOURNEY
      } else if (pathname === '/power-of-attorney') {
        return React.createElement("div", null, React.createElement(FlatButton, {
          label: "State",
          className: "configGraph",
          ref: "querySystemButton",
          onClick: this.toggleStates,
          style: this.data.style.buttonText
        })); // NOTIFICATIONS
      } else if (pathname === '/notifications' && get(Meteor, 'settings.public.defaults.notificationMenu')) {
        return React.createElement("div", null, React.createElement(FlatButton, {
          label: "Transfer Current Patient",
          className: "querySystemButton",
          ref: "querySystemButton",
          onClick: this.transferCurrentPatient.bind(this),
          style: this.data.style.buttonText
        })); // WALLET DASHBOARD
      } else if (pathname === '/wallet-dashboard' || pathname.includes('authn')) {
        return React.createElement("div", null, React.createElement(FlatButton, {
          label: "Query HAPI for Provenances",
          className: "querySystemButton",
          ref: "querySystemButton",
          onClick: this.queryHapiProvenances.bind(this),
          style: this.data.style.buttonText
        }), React.createElement(FlatButton, {
          label: "Query HAPI for Consents",
          className: "querySystemButton",
          ref: "querySystemButton",
          onClick: this.queryHapiConsents.bind(this),
          style: this.data.style.buttonText
        }));
      } else {
        // anything else
        return React.createElement("div", null);
      }
    }

    return renderWestNavbar;
  }();

  _proto.webAuthn = function () {
    function webAuthn() {
      window.open('https://poc-node-1.fhirblocks.io/oauth2/wan-auth', 'MyWindow', "width=1024, height=600");
    }

    return webAuthn;
  }();

  _proto.queryHapiConsents = function () {
    function queryHapiConsents() {
      console.log('queryHapiConsents');
      HTTP.get('https://hapi.fhir.org/baseDstu3/Consent?_pretty=true&_format=json&_organization=Duke', function (error, result) {
        if (error) {
          console.error(error);
        }

        if (result) {
          // console.info(result)
          var resultContent = JSON.parse(result.content);
          console.info(resultContent);

          if (resultContent.resourceType === "Bundle") {
            resultContent.entry.forEach(function (record) {
              var consentValidator = ConsentSchema.newContext();
              consentValidator.validate(record.resource);
              console.log('IsValid: ', consentValidator.isValid());
              console.log('ValidationErrors: ', consentValidator.validationErrors());

              Consents._collection.upsert(record.resource.id, record.resource);
            });
          }
        }
      });
      Session.set('hapiResults', {});
    }

    return queryHapiConsents;
  }();

  _proto.queryHapiPatients = function () {
    function queryHapiPatients() {
      // 
      console.log('queryHapiPatients');
      HTTP.get('https://hapi.fhir.org/baseDstu3/Patient?_pretty=true&_format=json&_count=100&_agent=Duke', function (error, result) {
        if (error) {
          console.error(error);
        }

        if (result) {
          // console.info(result)
          var resultContent = JSON.parse(result.content);
          console.info(resultContent);

          if (resultContent.resourceType === "Bundle") {
            resultContent.entry.forEach(function (record) {
              var patientValidator = PatientSchema.newContext();
              patientValidator.validate(record.resource);
              console.log('IsValid: ', patientValidator.isValid());
              console.log('ValidationErrors: ', patientValidator.validationErrors());

              Patients._collection.upsert(record.resource.id, record.resource);
            });
          }
        }
      });
      Session.set('hapiPatients', {});
    }

    return queryHapiPatients;
  }();

  _proto.queryHapiProvenances = function () {
    function queryHapiProvenances() {
      // 
      console.log('queryHapiProvenances');
      HTTP.get('https://hapi.fhir.org/baseDstu3/Provenance?_pretty=true&_format=json&_count=100&_agent=Duke', function (error, result) {
        if (error) {
          console.error(error);
        }

        if (result) {
          // console.info(result)
          var resultContent = JSON.parse(result.content);
          console.info(resultContent);

          if (resultContent.resourceType === "Bundle") {
            resultContent.entry.forEach(function (record) {
              var provenanceValidator = ProvenanceSchema.newContext();
              provenanceValidator.validate(record.resource);
              console.log('IsValid: ', provenanceValidator.isValid());
              console.log('ValidationErrors: ', provenanceValidator.validationErrors());

              Provenances._collection.upsert(record.resource.id, record.resource);
            });
          }
        }
      });
      Session.set('hapiProvenances', {});
    }

    return queryHapiProvenances;
  }();

  _proto.queryHapiDocumentReferences = function () {
    function queryHapiDocumentReferences() {
      // 
      console.log('queryHapiProvenances');
      HTTP.get('https://hapi.fhir.org/baseDstu3/DocumentReference?_pretty=true&_format=json&_count=100', function (error, result) {
        if (error) {
          console.error(error);
        }

        if (result) {
          // console.info(result)
          var resultContent = JSON.parse(result.content);
          console.info(resultContent);

          if (resultContent.resourceType === "Bundle") {
            resultContent.entry.forEach(function (record) {
              var documentReferenceValidator = DocumentReferenceSchema.newContext();
              documentReferenceValidator.validate(record.resource);
              console.log('IsValid: ', documentReferenceValidator.isValid());
              console.log('ValidationErrors: ', documentReferenceValidator.validationErrors());

              DocumentReferences._collection.upsert(record.resource.id, record.resource);
            });
          }
        }
      });
      Session.set('hapiProvenances', {});
    }

    return queryHapiDocumentReferences;
  }();

  _proto.renderEastNavbar = function () {
    function renderEastNavbar(displayThemeNavbar) {
      console.log('Footer.renderEastNavbar');

      if (displayThemeNavbar) {
        return React.createElement("div", null);
      } else {
        return React.createElement("div", null, React.createElement(ToolbarTitle, {
          id: "privacyScreen",
          text: "privacy | ",
          style: {
            fontSize: '18px',
            top: '-4px',
            cursor: 'pointer'
          },
          onClick: this.clickOnBlurButton
        }), React.createElement(ToolbarTitle, {
          id: "connectionStatus",
          text: this.data.status,
          style: this.data.style.southEastButtons,
          onClick: this.openInfo
        }));
      }
    }

    return renderEastNavbar;
  }();

  _proto.openInfo = function () {
    function openInfo() {
      // if we haven't disabled the secondary panel
      if (get(Meteor, 'settings.public.defaults.disableSecondaryPanel') !== true) {
        // then toggle it when clicked
        Session.toggle('secondPanelVisible');
      }
    }

    return openInfo;
  }();

  _proto.render = function () {
    function render() {
      console.log('this.data.pathname', this.data.pathname);
      console.log('this.data.userId', this.data.userId);
      var westNavbar;

      if (this.data.userId) {
        westNavbar = this.renderWestNavbar(this.data.pathname);
      }

      return React.createElement("div", {
        id: "appFooter",
        style: this.data.footerStyle
      }, React.createElement(AppBar, {
        iconElementLeft: westNavbar,
        iconElementRight: this.renderEastNavbar(this.data.displayThemeNavbar),
        style: this.data.footerStyle,
        titleStyle: {
          color: 'black'
        }
      }));
    }

    return render;
  }();

  return Footer;
}(React.Component);

ReactMixin(Footer.prototype, ReactMeteorData);
module.exportDefault(Footer);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"GlassApp.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/layouts/GlassApp.jsx                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  GlassApp: function () {
    return GlassApp;
  }
});
var get, has;
module.link("lodash", {
  get: function (v) {
    get = v;
  },
  has: function (v) {
    has = v;
  }
}, 0);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 1);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 2);
var ReactDOM;
module.link("react-dom", {
  "default": function (v) {
    ReactDOM = v;
  }
}, 3);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 4);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 5);
Session.setDefault('backgroundImagePath', 'Flames.mp4');
Session.setDefault('backgroundColor', '#eeeeee');
Session.setDefault('darkroomEnabled', true);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);
Session.setDefault('showVideoBackground', false);

var GlassApp =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(GlassApp, _React$Component);

  function GlassApp(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = GlassApp.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      if (this.refs.BackgroundVideo) {
        ReactDOM.findDOMNode(this.refs.BackgroundVideo).play();
      }
    }

    return componentDidMount;
  }();

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        app: {
          style: {
            // default setting in case the theming package isn't loaded
            background: 'rgb(238, 238, 238)',
            width: '100%',
            height: '100%',
            position: 'fixed',
            left: '0px',
            top: '0px'
          },
          showVideoBackground: false
        },
        video: {
          style: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            zIndex: '0',
            WebkitTransform: 'translateX(-50%) translateY(-50%)',
            transform: 'translateX(-50%) translateY(-50%)'
          }
        }
      };

      if (Session.get('lastVideoRun')) {
        ReactDOM.findDOMNode(this.refs.BackgroundVideo).play();
      }

      if (has(Meteor.settings, 'public.theme.showVideoBackground')) {
        data.app.showVideoBackground = get(Meteor.settings, 'public.theme.showVideoBackground');
      }

      if (Meteor.user()) {
        // play a video if no background image or color has been set
        // and we're on a tablet or larger device (no phone)
        if (get(Meteor.user(), 'profile.theme')) {
          if (get(Meteor.user(), 'profile.theme.backgroundColor')) {
            data.app.style.background = get(Meteor.user(), 'profile.theme.backgroundColor');
          } else {
            data.app.style.background = 'inherit';
          }

          if (Meteor.user().profile.theme.backgroundImagePath) {
            if (Session.get('timelineBackground')) {
              data.app.style = {
                background: get(Meteor.user(), 'profile.theme.backgroundColor')
              };
            } else {
              data.app.style = {
                backgroundImage: 'url(' + Meteor.user().profile.theme.backgroundImagePath + ')',
                WebkitBackgroundSize: 'cover',
                MozBackgroundSize: 'cover',
                OBackgroundSize: 'cover',
                backgroundSize: 'cover'
              };
            }
          } // if (!Meteor.user().profile.theme.backgroundColor && !Meteor.user().profile.theme.backgroundImagePath && (Session.get('appWidth') > 768)) {
          //   data.video.source = Meteor.absoluteUrl() + 'Flames.mp4';
          // }

        } else {
          // user does not have a theme set
          this.useGlobalDefaultBackground(data.app.style);
        }
      } else {
        // user is not logged in
        this.useGlobalDefaultBackground(data.app.style);
      }

      data.app.style.width = '100%';
      data.app.style.height = '100%';
      data.app.style.position = 'fixed';
      if (process.env.NODE_ENV === "test") console.log("GlassApp[data]", data);
      if (process.env.NODE_ENV === "test") console.log("Meteor.settings", Meteor.settings);
      return data;
    }

    return getMeteorData;
  }();

  _proto.useGlobalDefaultBackground = function () {
    function useGlobalDefaultBackground(style) {
      if (has(Meteor.settings, 'public.theme.backgroundImagePath')) {
        style.backgroundImage = 'url(' + get(Meteor.settings, 'public.theme.backgroundImagePath') + ')';
      } else {
        if (get(Meteor.settings, 'public.theme.backgroundColor')) {
          style.backgroundColor = get(Meteor.settings, 'public.theme.backgroundColor');
          style.backgroundImage = 'none';
        } else {
          style.backgroundImage = 'none';
        }
      }

      style.WebkitBackgroundSize = 'cover';
      style.MozBackgroundSize = 'cover';
      style.OBackgroundSize = 'cover';
      style.backgroundSize = 'cover';
      return style;
    }

    return useGlobalDefaultBackground;
  }();

  _proto.renderBackground = function () {
    function renderBackground(showVideoBackground) {
      if (showVideoBackground) {
        var videoSrc = '/VideoBackgrounds/Circulation.mp4';

        if (Meteor.settings.public.theme.defaultVideo) {
          videoSrc = Meteor.settings.public.theme.defaultVideo;
        }

        return React.createElement("video", {
          ref: "BackgroundVideo",
          style: this.data.video.style,
          poster: "",
          autoPlay: true,
          loop: true
        }, React.createElement("source", {
          src: videoSrc,
          type: "video/mp4"
        }));
      }
    }

    return renderBackground;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "glassApp"
      }, this.renderBackground(this.data.app.showVideoBackground), React.createElement("div", {
        style: this.data.app.style
      }, this.props.children));
    }

    return render;
  }();

  return GlassApp;
}(React.Component);

ReactMixin(GlassApp.prototype, ReactMeteorData);
module.exportDefault(GlassApp);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Header.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/layouts/Header.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  Header: function () {
    return Header;
  }
});
var ActionAccountCircle;
module.link("material-ui/svg-icons/action/account-circle", {
  "default": function (v) {
    ActionAccountCircle = v;
  }
}, 0);
var ActionReorder;
module.link("material-ui/svg-icons/action/reorder", {
  "default": function (v) {
    ActionReorder = v;
  }
}, 1);
var AppBar;
module.link("/imports/ui/layouts/AppBar", {
  "default": function (v) {
    AppBar = v;
  }
}, 2);
var AuthenticatedNavigation;
module.link("../components/AuthenticatedNavigation", {
  AuthenticatedNavigation: function (v) {
    AuthenticatedNavigation = v;
  }
}, 3);
var baseTheme;
module.link("material-ui/styles/baseThemes/lightBaseTheme", {
  "default": function (v) {
    baseTheme = v;
  }
}, 4);
var getMuiTheme;
module.link("material-ui/styles/getMuiTheme", {
  "default": function (v) {
    getMuiTheme = v;
  }
}, 5);
var Glass;
module.link("meteor/clinical:glass-ui", {
  Glass: function (v) {
    Glass = v;
  }
}, 6);
var FlatButton, IconButton, TextField;
module.link("material-ui", {
  FlatButton: function (v) {
    FlatButton = v;
  },
  IconButton: function (v) {
    IconButton = v;
  },
  TextField: function (v) {
    TextField = v;
  }
}, 7);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 8);
var NavigationClose;
module.link("material-ui/svg-icons/navigation/close", {
  "default": function (v) {
    NavigationClose = v;
  }
}, 9);
var PublicNavigation;
module.link("../components/PublicNavigation", {
  PublicNavigation: function (v) {
    PublicNavigation = v;
  }
}, 10);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 11);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 12);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 13);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 14);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 15);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 16);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 17);
Sidebar = {
  lastUpdate: new Date(),
  toggle: function () {
    var currentUpdate = new Date();
    var timeDiff = currentUpdate - this.lastUpdate;

    if (timeDiff > 1000) {
      Session.toggle('drawerActive');
      console.log("timeDiff", timeDiff);
    }

    this.lastUpdate = currentUpdate;
  }
};

var Header =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Header, _React$Component);

  function Header() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Header.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          searchbar: Glass.darkroom({
            position: 'fixed',
            top: '0px',
            width: '66%',
            opacity: Session.get('globalOpacity'),
            WebkitTransition: 'ease .2s',
            transition: 'ease .2s',
            borderWidth: '3px 0px 0px 2px',
            borderBottomRightRadius: '65px',
            transformOrigin: 'right bottom',
            paddingRight: '200px',
            height: '0px'
          }),
          searchbarInput: Glass.darkroom({
            left: '0px',
            width: '80%',
            visibility: 'hidden'
          }),
          appbar: {
            position: 'fixed',
            top: '0px',
            width: '100%',
            opacity: Session.get('globalOpacity'),
            WebkitTransition: 'ease .2s',
            transition: 'ease .2s',
            background: 'white'
          },
          title: Glass.darkroom({
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            top: '-5px',
            cursor: 'pointer'
          })
        },
        app: {
          title: ''
        },
        isLogged: false
      };

      if (Session.get('showSearchbar')) {
        data.style.searchbar.height = '64px';
        data.style.searchbar.display = 'flex';
        data.style.searchbarInput.visibility = 'visible';
      } else {
        data.style.searchbar.height = 0;
        data.style.searchbar.display = 'none';
        data.style.searchbarInput.visibility = 'hidden';
      }

      if (Session.get('showNavbars')) {
        data.style.searchbar.top = '65px';
      } else {
        data.style.searchbar.top = '0px';
      }

      if (get(Meteor, 'settings.public.title')) {
        data.app.title = get(Meteor, 'settings.public.title');
      }

      if (Meteor.userId()) {
        data.isLoggedIn = true;
      }

      if (!Session.get('showNavbars')) {
        data.style.appbar.top = '-6.4em';
      }

      data.style = Glass.blur(data.style);
      data.style.appbar = Glass.darkroom(data.style.appbar);

      if (Meteor.user()) {
        data.hasUser = true;
      } else {
        data.hasUser = false;
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.getChildContext = function () {
    function getChildContext() {
      return {
        muiTheme: getMuiTheme(baseTheme)
      };
    }

    return getChildContext;
  }();

  _proto.clickOnBackdropBlurButton = function () {
    function clickOnBackdropBlurButton() {
      Session.toggle('backgroundBlurEnabled');
    }

    return clickOnBackdropBlurButton;
  }();

  _proto.toggleDrawerActive = function () {
    function toggleDrawerActive() {
      // this is hacky
      // taping on the Panel should autoclose the sidebar (we may even gray out the panel eventually)
      // and we set a small timeout on the toggleDrawerActive to let closeOpenedSidebar() do it's thing first
      Meteor.setTimeout(function () {
        //Sidebar.toggle();
        if (Session.equals('drawerActive', false)) {
          Session.set('drawerActive', true);
        }
      }, 200);
    }

    return toggleDrawerActive;
  }();

  _proto.renderNavigation = function () {
    function renderNavigation(hasUser) {
      if (get(Meteor, 'settings.public.home.showRegistration')) {
        if (hasUser) {
          return React.createElement(AuthenticatedNavigation, null);
        } else {
          return React.createElement(PublicNavigation, null);
        }
      }
    }

    return renderNavigation;
  }();

  _proto.goHome = function () {
    function goHome() {
      // not every wants the hexgrid menu, so we make sure it's configurable in the Meteor.settings file
      if (get(Meteor, 'settings.public.defaults.route')) {
        browserHistory.push(get(Meteor, 'settings.public.defaults.route', '/'));
      } else {
        browserHistory.push('/');
      }
    }

    return goHome;
  }();

  _proto.setGeojsonUrl = function () {
    function setGeojsonUrl(event, text) {
      console.log('setGeojsonUrl', text);
      Session.set('geojsonUrl', text);
    }

    return setGeojsonUrl;
  }();

  _proto.mapMyAddress = function () {
    function mapMyAddress() {
      if (get(Meteor.user(), 'profile.locations.home.position.latitude') && get(Meteor.user(), 'profile.locations.home.position.longitude')) {
        browserHistory.push('/maps');
      }
    }

    return mapMyAddress;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", null, React.createElement(AppBar, {
        id: "appHeader",
        title: this.data.app.title,
        onTitleTouchTap: this.goHome,
        iconStyleLeft: this.data.style.title,
        iconElementRight: this.renderNavigation(this.data.hasUser),
        style: this.data.style.appbar,
        titleStyle: this.data.style.title
      }, React.createElement(ActionReorder, {
        id: "sidebarToggleButton",
        style: {
          marginTop: '20px',
          marginLeft: '25px',
          marginRight: '10px',
          left: '0px',
          position: 'absolute',
          cursor: 'pointer'
        },
        onClick: this.toggleDrawerActive
      })), React.createElement(AppBar, {
        id: "appSearchBar",
        title: React.createElement("div", null, React.createElement(TextField, {
          hintText: "Search",
          style: this.data.style.searchbarInput,
          onChange: this.setGeojsonUrl.bind(this),
          fullWidth: true
        }), React.createElement(FlatButton, {
          label: "Map My Address",
          onClick: this.mapMyAddress.bind(this)
        })),
        style: this.data.style.searchbar,
        showMenuIconButton: false
      }));
    }

    return render;
  }();

  return Header;
}(React.Component);

Header.childContextTypes = {
  muiTheme: PropTypes.object
};
ReactMixin(Header.prototype, ReactMeteorData);
module.exportDefault(Header);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SidebarTray.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/layouts/SidebarTray.jsx                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  SidebarTray: function () {
    return SidebarTray;
  }
});
var AdminSidebar;
module.link("/imports/ui/components/AdminSidebar", {
  AdminSidebar: function (v) {
    AdminSidebar = v;
  }
}, 0);
var CardHeader, Drawer;
module.link("material-ui", {
  CardHeader: function (v) {
    CardHeader = v;
  },
  Drawer: function (v) {
    Drawer = v;
  }
}, 1);
var IndexLinkContainer, LinkContainer;
module.link("react-router-bootstrap", {
  IndexLinkContainer: function (v) {
    IndexLinkContainer = v;
  },
  LinkContainer: function (v) {
    LinkContainer = v;
  }
}, 2);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 3);
var ProfileSidebar;
module.link("/imports/ui/components/ProfileSidebar", {
  ProfileSidebar: function (v) {
    ProfileSidebar = v;
  }
}, 4);
var PatientSidebar;
module.link("/imports/ui/components/PatientSidebar", {
  PatientSidebar: function (v) {
    PatientSidebar = v;
  }
}, 5);
var PractitionerSidebar;
module.link("/imports/ui/components/PractitionerSidebar", {
  PractitionerSidebar: function (v) {
    PractitionerSidebar = v;
  }
}, 6);
var PublicSidebar;
module.link("/imports/ui/components/PublicSidebar", {
  PublicSidebar: function (v) {
    PublicSidebar = v;
  }
}, 7);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 8);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 9);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 10);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 11);
var User;
module.link("/imports/api/User", {
  "default": function (v) {
    User = v;
  }
}, 12);
var MenuItem;
module.link("/imports/ui/components/MenuItem", {
  "default": function (v) {
    MenuItem = v;
  }
}, 13);
var MenuPatientSummary;
module.link("/imports/ui/components/MenuPatientSummary", {
  "default": function (v) {
    MenuPatientSummary = v;
  }
}, 14);
var has, get;
module.link("lodash", {
  has: function (v) {
    has = v;
  },
  get: function (v) {
    get = v;
  }
}, 15);
Session.setDefault('backgroundImagePath', 'url(\"images\/ForestInMist.jpg\")');
Session.setDefault('backgroundColor', '#eeeeee');
Session.setDefault('darkroomEnabled', false);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);
Session.setDefault('drawerActive', false);
Session.setDefault('drawerActive', false);

var SidebarTray =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(SidebarTray, _React$Component);

  function SidebarTray(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = SidebarTray.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var currentUser = new User(Meteor.user());
      var data = {
        state: {
          drawerActive: Session.get('drawerActive'),
          dockedSidebar: false,
          isAdmin: false
        },
        style: {
          'width': '100%',
          'height': '100%',
          'position': 'absolute',
          'backgroundSize': 'cover',
          'WebkitBackgroundSize': 'cover',
          'MozBackgroundSize': 'cover',
          'OBackgroundSize': 'cover'
        },
        card: {
          title: 'Please log in',
          subtitle: 'Basic User',
          avatar: '/noAvatar.png'
        },
        isAdmin: false
      };

      if (Meteor.user()) {
        data.card.title = currentUser.fullName();

        if (Meteor.user().profile) {
          //data.card.subtitle = Meteor.user().profile.birthdate;
          data.card.avatar = Meteor.user().profile.avatar;
          data.card.subtitle = 'Patient';
        }

        if (Meteor.user().roles && Meteor.user().roles[0] === 'practitioner') {
          data.card.subtitle = 'Practitioner';
          data.state.isAdmin = false;
        }

        if (Meteor.user().roles && Meteor.user().roles[0] === 'sysadmin') {
          data.card.subtitle = 'Admin';
          data.state.isAdmin = true;
        }
      }

      if (Session.get('backgroundColor')) {
        data.style.background = Session.get('backgroundColor');
      }

      if (Session.get('backgroundImagePath')) {
        data.style.WebkitBackgroundSize = 'cover';
        data.style.MozBackgroundSize = 'cover';
        data.style.OBackgroundSize = 'cover';
        data.style.backgroundSize = 'cover';
        data.style.backgroundImagePath = Session.get('backgroundImagePath');
      }

      if (get(Meteor, 'settings.public.defaults.sidebar.docked')) {
        data.state.dockedSidebar = get(Meteor, 'settings.public.defaults.sidebar.docked');
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.toggleDrawerActive = function () {
    function toggleDrawerActive() {
      Meteor.setTimeout(function () {
        Session.toggle('drawerActive');
      }, 200);
    }

    return toggleDrawerActive;
  }();

  _proto.renderSidebar = function () {
    function renderSidebar(isAdmin) {
      if (Meteor.user()) {
        if (isAdmin) {
          return React.createElement(AdminSidebar, null);
        } else {
          if (get(Meteor.user(), 'roles[0]') === 'practitioner') {
            return React.createElement(PractitionerSidebar, null);
          } else {
            if (Meteor.userId() && ['/myprofile', '/preferences', 'oauth-grants', '/password'].includes(Session.get('pathname'))) {
              return React.createElement(ProfileSidebar, null);
            } else {
              return React.createElement(PatientSidebar, null);
            }
          }
        }
      } else {
        return React.createElement(PublicSidebar, null);
      }
    }

    return renderSidebar;
  }();

  _proto.closeOpenedSidebar = function () {
    function closeOpenedSidebar() {
      //Sidebar.close();
      if (Session.equals('drawerActive', true)) {
        Session.set('drawerActive', false);
      }
    }

    return closeOpenedSidebar;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "SidebarTray"
      }, React.createElement(Drawer, {
        open: this.data.state.drawerActive,
        docked: this.data.state.dockedSidebar,
        onRequestChange: this.closeOpenedSidebar
      }, React.createElement("div", {
        onClick: this.closeOpenedSidebar
      }, React.createElement(IndexLinkContainer, {
        id: "userIdentification",
        to: "/myprofile"
      }, React.createElement(MenuPatientSummary, null, React.createElement(CardHeader, {
        id: "patientSummaryCard",
        title: this.data.card.title,
        subtitle: this.data.card.subtitle,
        style: {
          cursor: 'pointer'
        }
      }))), this.renderSidebar(this.data.state.isAdmin))), React.createElement("div", {
        id: "mainPanel"
      }, React.createElement("div", {
        onClick: this.closeOpenedSidebar,
        style: {
          flex: 1,
          overflowY: 'auto',
          width: '100%'
        }
      }, this.props.children)));
    }

    return render;
  }();

  return SidebarTray;
}(React.Component);

ReactMixin(SidebarTray.prototype, ReactMeteorData);
module.exportDefault(SidebarTray);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pages":{"AppInfoPage.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/AppInfoPage.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  AppInfoPage: function () {
    return AppInfoPage;
  }
});
var CardText, CardTitle;
module.link("material-ui/Card", {
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var Col, Grid, Row;
module.link("react-bootstrap", {
  Col: function (v) {
    Col = v;
  },
  Grid: function (v) {
    Grid = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 1);
var blue500, orange500;
module.link("material-ui/styles/colors", {
  blue500: function (v) {
    blue500 = v;
  },
  orange500: function (v) {
    orange500 = v;
  }
}, 2);
var AboutAppCard;
module.link("/imports/ui/components/AboutAppCard", {
  AboutAppCard: function (v) {
    AboutAppCard = v;
  }
}, 3);
var GlassCard, VerticalCanvas, Glass;
module.link("meteor/clinical:glass-ui", {
  GlassCard: function (v) {
    GlassCard = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  Glass: function (v) {
    Glass = v;
  }
}, 4);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 5);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 6);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 7);
var TextField;
module.link("material-ui/TextField", {
  "default": function (v) {
    TextField = v;
  }
}, 8);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 9);
var styles = {
  errorStyle: {
    color: orange500
  },
  underlineStyle: {
    borderColor: orange500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};

var AppInfoPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(AppInfoPage, _React$Component);

  function AppInfoPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = AppInfoPage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        environment: '',
        userId: '',
        url: '',
        onlineStatus: get(Meteor.status(), 'status', ''),
        version: get(Meteor, 'settings.public.version.complete', ''),
        branch: get(Meteor, 'settings.public.version.branch', ''),
        commit: get(Meteor, 'settings.public.version.commit', ''),
        environmentData: {
          paddingTop: '0px'
        }
      };

      if (process.env.NODE_ENV) {
        data.environment = process.env.NODE_ENV;
      }

      if (Meteor.userId()) {
        data.environment = Meteor.userId();
      }

      if (Meteor.absoluteUrl()) {
        data.environment = Meteor.absoluteUrl();
      }

      if (Session.get('appWidth') > 768) {
        data.environmentData.paddingTop = '140px';
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "aboutPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, {
        height: "auto"
      }, React.createElement(Row, null, React.createElement(Col, {
        md: 4
      }, React.createElement(CardText, {
        style: this.data.environmentData
      }, React.createElement(TextField, {
        id: "appUserId",
        value: this.data.userId,
        errorText: "User ID",
        errorStyle: styles.errorStyle
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "appOnlineStatus",
        value: this.data.onlineStatus,
        errorText: "Connection",
        errorStyle: styles.errorStyle
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "appEnvironment",
        value: this.data.environment,
        errorText: "Environment",
        errorStyle: styles.errorStyle
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "appUrl",
        value: this.data.url,
        errorText: "Universal Resource Location",
        errorStyle: styles.errorStyle
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "appUrl",
        value: this.data.version,
        errorText: "Version",
        errorStyle: styles.errorStyle
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "appUrl",
        value: this.data.branch,
        errorText: "Branch",
        errorStyle: styles.errorStyle
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "appUrl",
        value: this.data.commit,
        errorText: "Commit",
        errorStyle: styles.errorStyle,
        style: {
          fontSize: '80%'
        }
      }), React.createElement("br", null))), React.createElement(Col, {
        md: 8
      }, React.createElement(AboutAppCard, null))))));
    }

    return render;
  }();

  return AppInfoPage;
}(React.Component);

ReactMixin(AppInfoPage.prototype, ReactMeteorData);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AuthorizationGrantsPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/AuthorizationGrantsPage.jsx                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  AuthorizationGrantsPage: function () {
    return AuthorizationGrantsPage;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var AboutAppCard;
module.link("/imports/ui/components/AboutAppCard", {
  AboutAppCard: function (v) {
    AboutAppCard = v;
  }
}, 1);
var VerticalCanvas, GlassCard, DynamicSpacer;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  },
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  }
}, 2);
var CardActions, CardHeader, CardText, CardTitle;
module.link("material-ui/Card", {
  CardActions: function (v) {
    CardActions = v;
  },
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 3);
var RaisedButton;
module.link("material-ui/RaisedButton", {
  "default": function (v) {
    RaisedButton = v;
  }
}, 4);
var Col, Grid, Row;
module.link("react-bootstrap", {
  Col: function (v) {
    Col = v;
  },
  Grid: function (v) {
    Grid = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 5);

if (Package['clinical:hl7-resource-consent']) {
  var _ConsentTable;

  module.link("meteor/clinical:hl7-resource-consent", {
    ConsentTable: function (v) {
      _ConsentTable = v;
    }
  }, 6);
}

var AuthorizationGrantsPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(AuthorizationGrantsPage, _React$Component);

  function AuthorizationGrantsPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = AuthorizationGrantsPage.prototype;

  _proto.render = function () {
    function render() {
      var consentElement; // if(Package['clinical:hl7-resource-consent']){

      consentElement = React.createElement(ConsentTable, {
        simplified: true,
        patient: "Jane Doe",
        noDataMessage: false
      }); // }

      return React.createElement("div", {
        id: "authorizationGrantsPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, {
        width: "768px"
      }, React.createElement(CardTitle, {
        title: "Advanced Care Directives",
        subtitle: "Consents, living wills, advanced care directives, and other legal documents."
      }), React.createElement(CardText, null, React.createElement(Grid, null, React.createElement(Row, null, React.createElement(Col, {
        md: 6
      }, React.createElement(RaisedButton // id='changePasswordButton'
      , {
        label: "Consent to View Personal Health Info" // onClick={this.changePassword.bind(this)}
        ,
        className: "muidocs-icon-action-delete",
        primary: true,
        style: {
          minWidth: '400px'
        }
      }), React.createElement("br", null), React.createElement("br", null), React.createElement(RaisedButton // id='changePasswordButton'
      , {
        label: "Consent to Treat" // onClick={this.changePassword.bind(this)}
        ,
        className: "muidocs-icon-action-delete",
        primary: true,
        style: {
          minWidth: '400px'
        }
      }), React.createElement("br", null), React.createElement("br", null), React.createElement(RaisedButton // id='changePasswordButton'
      , {
        label: "OAuth 2.0 Consent" // onClick={this.changePassword.bind(this)}
        ,
        className: "muidocs-icon-action-delete",
        primary: true,
        style: {
          minWidth: '400px'
        }
      }), React.createElement("br", null), React.createElement("br", null), React.createElement(RaisedButton // id='changePasswordButton'
      , {
        label: "My Final Days" // onClick={this.changePassword.bind(this)}
        ,
        className: "muidocs-icon-action-delete",
        primary: true,
        style: {
          minWidth: '400px'
        }
      }), React.createElement("br", null), React.createElement("br", null)), React.createElement(Col, {
        md: 6
      }, React.createElement(RaisedButton // id='changePasswordButton'
      , {
        label: "Quality of Life" // onClick={this.changePassword.bind(this)}
        ,
        className: "muidocs-icon-action-delete",
        primary: true,
        style: {
          minWidth: '400px'
        }
      }), React.createElement("br", null), React.createElement("br", null), React.createElement(RaisedButton // id='changePasswordButton'
      , {
        label: "Organ Donations" // onClick={this.changePassword.bind(this)}
        ,
        className: "muidocs-icon-action-delete",
        primary: true,
        style: {
          minWidth: '400px'
        }
      }), React.createElement("br", null), React.createElement("br", null), React.createElement(RaisedButton // id='changePasswordButton'
      , {
        label: "Organ Donations" // onClick={this.changePassword.bind(this)}
        ,
        className: "muidocs-icon-action-delete",
        primary: true,
        style: {
          minWidth: '400px'
        }
      }), React.createElement("br", null), React.createElement("br", null)))))), React.createElement(DynamicSpacer, null), React.createElement(GlassCard, {
        width: "768px"
      }, React.createElement(CardTitle, {
        title: "Consents & Authorizations",
        subtitle: "OAuth tokens, HIPAA consents, Advanced Directives, etc."
      }), React.createElement(CardText, null, consentElement))));
    }

    return render;
  }();

  return AuthorizationGrantsPage;
}(React.Component);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DicomViewerPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/DicomViewerPage.jsx                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  DicomViewerPage: function () {
    return DicomViewerPage;
  }
});
var CardText, CardTitle;
module.link("material-ui/Card", {
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var Col, Grid, Row;
module.link("react-bootstrap", {
  Col: function (v) {
    Col = v;
  },
  Grid: function (v) {
    Grid = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 1);
var blue500, orange500;
module.link("material-ui/styles/colors", {
  blue500: function (v) {
    blue500 = v;
  },
  orange500: function (v) {
    orange500 = v;
  }
}, 2);
var GlassCard, FullPageCanvas, VerticalCanvas, Glass;
module.link("meteor/clinical:glass-ui", {
  GlassCard: function (v) {
    GlassCard = v;
  },
  FullPageCanvas: function (v) {
    FullPageCanvas = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  Glass: function (v) {
    Glass = v;
  }
}, 3);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 4);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 5);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 6);
var TextField;
module.link("material-ui/TextField", {
  "default": function (v) {
    TextField = v;
  }
}, 7);
var DicomImage;
module.link("/imports/ui/components/DicomImage", {
  DicomImage: function (v) {
    DicomImage = v;
  }
}, 8);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 9);
var styles = {
  errorStyle: {
    color: orange500
  },
  underlineStyle: {
    borderColor: orange500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};

var DicomViewerPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DicomViewerPage, _React$Component);

  function DicomViewerPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = DicomViewerPage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {};
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "aboutPage"
      }, React.createElement(FullPageCanvas, null, React.createElement(Row, null, React.createElement(Col, {
        md: 6
      }, React.createElement(GlassCard, {
        height: "auto",
        s: true,
        style: {
          position: 'relative'
        }
      }, React.createElement(DicomImage, {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Normal_posteroanterior_%28PA%29_chest_radiograph_%28X-ray%29.jpg/800px-Normal_posteroanterior_%28PA%29_chest_radiograph_%28X-ray%29.jpg",
        title: "P/A"
      }))), React.createElement(Col, {
        md: 6
      }, React.createElement(GlassCard, {
        height: "auto",
        style: {
          position: 'relative'
        }
      }, React.createElement(DicomImage, {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Normal_lateral_chest_radiograph_%28X-ray%29.jpg/800px-Normal_lateral_chest_radiograph_%28X-ray%29.jpg",
        title: "Lateral"
      })))), React.createElement(Row, null, React.createElement(Col, {
        md: 4
      }, React.createElement(GlassCard, null)), React.createElement(Col, {
        md: 4
      }, React.createElement(GlassCard, null)), React.createElement(Col, {
        md: 4
      }, React.createElement(GlassCard, null)))));
    }

    return render;
  }();

  return DicomViewerPage;
}(React.Component);

ReactMixin(DicomViewerPage.prototype, ReactMeteorData);
module.exportDefault(DicomViewerPage);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"FhirResourcesIndex.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/FhirResourcesIndex.jsx                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var module1 = module;
module1.export({
  FhirResourcesIndex: function () {
    return FhirResourcesIndex;
  }
});
var Container, Col, Row;
module1.link("react-bootstrap", {
  Container: function (v) {
    Container = v;
  },
  Col: function (v) {
    Col = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 0);
var CardTitle, Card, CardText, CardActions;
module1.link("material-ui", {
  CardTitle: function (v) {
    CardTitle = v;
  },
  Card: function (v) {
    Card = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardActions: function (v) {
    CardActions = v;
  }
}, 1);
var Glass, GlassCard, FullPageCanvas, VerticalCanvas;
module1.link("meteor/clinical:glass-ui", {
  Glass: function (v) {
    Glass = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  },
  FullPageCanvas: function (v) {
    FullPageCanvas = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  }
}, 2);
var Meteor;
module1.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 3);
var Session;
module1.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 4);
var React;
module1.link("react", {
  "default": function (v) {
    React = v;
  }
}, 5);
var ReactMeteorData;
module1.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 6);
var ReactMixin;
module1.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 7);
var browserHistory;
module1.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 8);
var has, get;
module1.link("lodash", {
  has: function (v) {
    has = v;
  },
  get: function (v) {
    get = v;
  }
}, 9);
var PropTypes;
module1.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 10);
var MenuTile;
module1.link("/imports/ui/components/MenuTile", {
  MenuTile: function (v) {
    MenuTile = v;
  }
}, 11);
var FaStreetView;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaStreetView = v;
  }
}, 12);
var FaHeartbeat;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaHeartbeat = v;
  }
}, 13);
var FaEye;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaEye = v;
  }
}, 14);
var FaEyeDropper;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaEyeDropper = v;
  }
}, 15);
var FaFlask;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaFlask = v;
  }
}, 16);
var IoMdErlenmeyerFlask;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdErlenmeyerFlask = v;
  }
}, 17);
var IoMdErlenmeyerFlaskBubbles;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdErlenmeyerFlaskBubbles = v;
  }
}, 18);
var FaList;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaList = v;
  }
}, 19);
var FaMapMarker;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaMapMarker = v;
  }
}, 20);
var FaMedkit;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaMedkit = v;
  }
}, 21);
var IoMdMedkitNormal;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdMedkitNormal = v;
  }
}, 22);
var IoMdMedkitOutline;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdMedkitOutline = v;
  }
}, 23);
var FaMobile;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaMobile = v;
  }
}, 24);
var FaMoon;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaMoon = v;
  }
}, 25);
var FaBuilding;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaBuilding = v;
  }
}, 26);
var FaCheck;
module1.link("react-icons/fa", {
  "default": function (v) {
    FaCheck = v;
  }
}, 27);
var GoPulse;
module1.link("react-icons/go", {
  "default": function (v) {
    GoPulse = v;
  }
}, 28);
var GoBroadcast;
module1.link("react-icons/go", {
  "default": function (v) {
    GoBroadcast = v;
  }
}, 29);
var GoBug;
module1.link("react-icons/go", {
  "default": function (v) {
    GoBug = v;
  }
}, 30);
var GoPerson;
module1.link("react-icons/go", {
  "default": function (v) {
    GoPerson = v;
  }
}, 31);
var GoOrganization;
module1.link("react-icons/go", {
  "default": function (v) {
    GoOrganization = v;
  }
}, 32);
var IoMdClipboard;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdClipboard = v;
  }
}, 33);
var IoMdPulseNormal;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdPulseNormal = v;
  }
}, 34);
var IoMdPulseStrong;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdPulseStrong = v;
  }
}, 35);
var IoMdNuclear;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdNuclear = v;
  }
}, 36);
var IoLogoNoSmoking;
module1.link("react-icons/io", {
  "default": function (v) {
    IoLogoNoSmoking = v;
  }
}, 37);
var IoMdLeaf;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdLeaf = v;
  }
}, 38);
var IoMdRibbon;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdRibbon = v;
  }
}, 39);
var IoMdNutrition;
module1.link("react-icons/io", {
  "default": function (v) {
    IoMdNutrition = v;
  }
}, 40);
var MdLocalPhramacy;
module1.link("react-icons/md", {
  "default": function (v) {
    MdLocalPhramacy = v;
  }
}, 41);
var MdAddAlert;
module1.link("react-icons/md", {
  "default": function (v) {
    MdAddAlert = v;
  }
}, 42);
var MdList;
module1.link("react-icons/md", {
  "default": function (v) {
    MdList = v;
  }
}, 43);
var MdDashboard;
module1.link("react-icons/md", {
  "default": function (v) {
    MdDashboard = v;
  }
}, 44);
var MdDataUsage;
module1.link("react-icons/md", {
  "default": function (v) {
    MdDataUsage = v;
  }
}, 45);
var MdFingerprint;
module1.link("react-icons/md", {
  "default": function (v) {
    MdFingerprint = v;
  }
}, 46);
var MdHearing;
module1.link("react-icons/md", {
  "default": function (v) {
    MdHearing = v;
  }
}, 47);
var MdImportantDevices;
module1.link("react-icons/md", {
  "default": function (v) {
    MdImportantDevices = v;
  }
}, 48);
Session.setDefault('filterMainTiles', false);

var FhirResourcesIndex =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(FhirResourcesIndex, _React$Component);

  function FhirResourcesIndex(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = FhirResourcesIndex.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          sectionTitle: {
            display: 'inline-block'
          },
          spacer: {
            display: 'block'
          },
          column: {
            paddingLeft: '5px',
            paddingRight: '5px'
          }
        },
        user: {
          isAdmin: false,
          isPractitioner: false,
          isPatient: true
        },
        showUnderConstruction: true,
        showExperimental: true,
        local: {
          allergies: 0,
          carePlans: 0,
          conditions: 0,
          consents: 0,
          contracts: 0,
          devices: 0,
          diagnosticReports: 0,
          goals: 0,
          immunizations: 0,
          locations: 0,
          medications: 0,
          medicationOrders: 0,
          medicationStatements: 0,
          observations: 0,
          organizations: 0,
          practitioners: 0,
          procedures: 0,
          riskAssessments: 0
        },
        filterMainTiles: Session.get('filterMainTiles'),
        glassBlurEnabled: Session.get('glassBlurEnabled')
      };

      if ((typeof AllergyIntolerances === "undefined" ? "undefined" : (0, _typeof2.default)(AllergyIntolerances)) === "object") {
        data.local.allergies = AllergyIntolerances.find().count();
      }

      if ((typeof CarePlans === "undefined" ? "undefined" : (0, _typeof2.default)(CarePlans)) === "object") {
        data.local.carePlans = CarePlans.find().count();
      }

      if ((typeof Conditions === "undefined" ? "undefined" : (0, _typeof2.default)(Conditions)) === "object") {
        data.local.conditions = Conditions.find().count();
      }

      if ((typeof Consents === "undefined" ? "undefined" : (0, _typeof2.default)(Consents)) === "object") {
        data.local.consents = Consents.find().count();
      }

      if ((typeof Contracts === "undefined" ? "undefined" : (0, _typeof2.default)(Contracts)) === "object") {
        data.local.contracts = Contracts.find().count();
      }

      if ((typeof Devices === "undefined" ? "undefined" : (0, _typeof2.default)(Devices)) === "object") {
        data.local.devices = Devices.find().count();
      }

      if ((typeof DiagnosticReports === "undefined" ? "undefined" : (0, _typeof2.default)(DiagnosticReports)) === "object") {
        data.local.diagnosticReports = DiagnosticReports.find().count();
      }

      if ((typeof Goals === "undefined" ? "undefined" : (0, _typeof2.default)(Goals)) === "object") {
        data.local.goals = Goals.find().count();
      }

      if ((typeof Immunizations === "undefined" ? "undefined" : (0, _typeof2.default)(Immunizations)) === "object") {
        data.local.immunizations = Immunizations.find().count();
      }

      if ((typeof Locations === "undefined" ? "undefined" : (0, _typeof2.default)(Locations)) === "object") {
        data.local.locations = Locations.find().count();
      }

      if ((typeof Medicaitons === "undefined" ? "undefined" : (0, _typeof2.default)(Medicaitons)) === "object") {
        data.local.medications = Medicaitons.find().count();
      }

      if ((typeof MedicationOrders === "undefined" ? "undefined" : (0, _typeof2.default)(MedicationOrders)) === "object") {
        data.local.medicationOrders = MedicationOrders.find().count();
      }

      if ((typeof MedicationStatements === "undefined" ? "undefined" : (0, _typeof2.default)(MedicationStatements)) === "object") {
        data.local.medicationStatements = MedicationStatements.find().count();
      }

      if ((typeof Observations === "undefined" ? "undefined" : (0, _typeof2.default)(Observations)) === "object") {
        data.local.observations = Observations.find().count();
      }

      if ((typeof Organizations === "undefined" ? "undefined" : (0, _typeof2.default)(Organizations)) === "object") {
        data.local.organizations = Organizations.find().count();
      }

      if ((typeof Practitioners === "undefined" ? "undefined" : (0, _typeof2.default)(Practitioners)) === "object") {
        data.local.practitioners = Practitioners.find().count();
      }

      if ((typeof Procedures === "undefined" ? "undefined" : (0, _typeof2.default)(Procedures)) === "object") {
        data.local.procedures = Procedures.find().count();
      }

      if ((typeof RiskAssessments === "undefined" ? "undefined" : (0, _typeof2.default)(RiskAssessments)) === "object") {
        data.local.riskAssessments = RiskAssessments.find().count();
      }

      data.style.indexCard = Glass.darkroom(data.style.indexCard);
      var user = Meteor.user();

      if (user && user.roles) {
        user.roles.forEach(function (role) {
          if (role == "sysadmin") {
            data.user.isAdmin = true;
          } else if (role == "practitioner") {
            data.user.isPractitioner = true;
          } else if (role == "patient") {
            data.user.isPatient = true;
          }
        });
      }

      if (get(Meteor, 'settings.public.app.showUnderConstruction')) {
        data.showUnderConstruction = get(Meteor, 'settings.public.app.showUnderConstruction');
      }

      if (get(Meteor, 'settings.public.app.showExperimental')) {
        data.showExperimental = get(Meteor, 'settings.public.app.showExperimental');
      }

      data.style = Glass.blur(data.style);
      data.style.appbar = Glass.darkroom(data.style.appbar);
      if (process.env.NODE_ENV === "test") console.log("FhirResourcesIndex[data]", data);
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      var self = this;
      var tilesToRender = [];
      var tileConfigs = [{
        collection: "AllergyIntolerances",
        id: 'allergyIntoleranceTile',
        active: true,
        path: '/allergies',
        icon: 'FaStreetView',
        subtitle: 'Allergy Intolerances'
      }, {
        collection: "AuditEvents",
        id: 'auditEventsTile',
        active: true,
        path: '/audit-events',
        icon: 'IoMdClipboard',
        subtitle: 'Audit Events'
      }, {
        collection: "CarePlans",
        id: 'carePlansTile',
        active: true,
        path: '/care-plans',
        icon: 'IoMdClipboard',
        subtitle: 'Care Plan'
      }, {
        collection: "ClinicalImpressions",
        id: 'clinicalImpressionssTile',
        active: true,
        path: '/clinical-impressions',
        icon: 'MdHearing',
        subtitle: 'Clinical Impressions'
      }, {
        collection: "Conditions",
        id: 'conditionsTile',
        active: true,
        path: '/conditions',
        icon: 'FaHeartbeat',
        subtitle: 'Conditions'
      }, {
        collection: "Consents",
        id: 'consentsTile',
        active: true,
        path: '/consents',
        icon: 'IoMdClipboard',
        subtitle: 'Consents'
      }, {
        collection: "Contracts",
        id: 'contractsTile',
        active: true,
        path: '/contracts',
        icon: 'IoMdClipboard',
        subtitle: 'Contracts'
      }, {
        collection: "Communications",
        id: 'contractsTile',
        active: true,
        path: '/communications',
        icon: 'FaMobile',
        subtitle: 'Communications'
      }, {
        collection: "Devices",
        id: 'devicesTile',
        active: true,
        path: '/devices',
        icon: 'FaMobile',
        subtitle: 'Devices'
      }, {
        collection: "DiagnosticReports",
        id: 'diagnosticReportsTile',
        active: true,
        path: '/diagnostic-reports',
        icon: 'IoMdClipboard',
        subtitle: 'Diagnostic Reports'
      }, {
        collection: "Goals",
        id: 'goalsTile',
        active: true,
        path: '/goals',
        icon: 'IoLogoNoSmoking',
        subtitle: 'Goals'
      }, {
        collection: "Immunizations",
        id: 'immunizationsTile',
        active: true,
        path: '/immunizations',
        icon: 'FaEyeDropper',
        subtitle: 'Immunizations'
      }, {
        collection: "ImagingStudies",
        id: 'imagingStudiesTile',
        active: true,
        path: '/imaging-studies',
        icon: 'IoMdNuclear',
        subtitle: 'Imaging Studies'
      }, {
        collection: "Locations",
        id: 'locationsTile',
        active: true,
        path: '/locations',
        icon: 'FaMapMarker',
        subtitle: 'Locations'
      }, {
        collection: "Lists",
        id: 'listsTile',
        active: true,
        path: '/checklists',
        icon: 'FaMapMarker',
        subtitle: 'Lists'
      }, {
        collection: "Medications",
        id: 'medicationsTile',
        active: true,
        path: '/medications',
        icon: 'FaFlask',
        subtitle: 'Medications'
      }, {
        collection: "Observations",
        id: 'observationsTile',
        active: true,
        path: '/observations',
        icon: 'GoPulse',
        subtitle: 'Observations'
      }, {
        collection: "Organizations",
        id: 'organizationsTile',
        active: true,
        path: '/organizations',
        icon: 'FaBuilding',
        subtitle: 'Organizations'
      }, {
        collection: "Procedures",
        id: 'proceduresTile',
        active: true,
        path: '/procedures',
        icon: 'IoMdNuclear',
        subtitle: 'Procedures'
      }, {
        collection: "Patients",
        id: 'patientsTile',
        active: true,
        path: '/patients',
        icon: 'GoPerson',
        subtitle: 'Patients'
      }, {
        collection: "Persons",
        id: 'personsTile',
        active: true,
        path: '/persons',
        icon: 'GoPerson',
        subtitle: 'Persons'
      }, {
        collection: "Practitioners",
        id: 'practitionersTile',
        active: true,
        path: '/practitioners',
        icon: 'GoPerson',
        subtitle: 'Practitioners'
      }, {
        collection: "RiskAssessments",
        id: 'riskAssessmentsTile',
        active: true,
        path: '/risk-assessments',
        icon: 'MdAddAlert',
        subtitle: 'Risk Assessments'
      }, {
        collection: "MedicationStatements",
        id: 'medicationStatementsTile',
        active: true,
        path: '/medication-statements',
        icon: 'MdLocalPhramacy',
        subtitle: 'Medication Statements'
      }, {
        collection: "MedicationOrders",
        id: 'medicationOrderTile',
        active: true,
        path: '/medication-orders',
        icon: 'MdLocalPhramacy',
        subtitle: 'Medication Orders'
      }, {
        collection: "Questionnaires",
        id: 'questionnairesTile',
        active: true,
        path: '/questionnaires',
        icon: 'IoMdClipboard',
        subtitle: 'Questionnaires'
      }, {
        collection: "QuestionnaireResponses",
        id: 'questionnaireResponsesTile',
        active: true,
        path: '/questionnaire-responsess',
        icon: 'IoMdClipboard',
        subtitle: 'Questionnaire Responses'
      }, {
        collection: "Sequences",
        id: 'sequencesTile',
        active: true,
        path: '/sequences',
        icon: 'IoMdRibbon',
        subtitle: 'Sequences'
      }, {
        collection: "Subscriptions",
        id: 'subscriptionsTile',
        active: true,
        path: '/subscriptions',
        icon: '',
        subtitle: 'Subscriptions'
      }]; // first we need to figure out which tiles to render

      if (get(Meteor, 'settings.public.modules.fhir')) {
        var fhirResources = get(Meteor, 'settings.public.modules.fhir');
        var count = 0; // parse through each FHIR module specified in the Settings file

        Object.keys(fhirResources).forEach(function (key) {
          // is it enabled?
          if (fhirResources[key] === true) {
            // if so, see if there's a collection loaded up
            if (Mongo.Collection.get(key)) {
              var selectedConfig = {
                id: '',
                active: true,
                path: '/',
                icon: '',
                title: 0,
                subtitle: '' // parse through our config objects

              };
              tileConfigs.forEach(function (config) {
                // if we find a config object that matches the current key, assign it
                if (config.collection === key) {
                  selectedConfig = config;
                }
              }); // grab the count

              selectedConfig.title = Mongo.Collection.get(key).find().count(); // render out a tile

              var newTile = React.createElement(Col, {
                md: 4,
                lg: 2,
                style: self.data.style.column,
                key: key
              }, self.renderTile(self.data.user, selectedConfig)); // and add it to the array of tiles to render
              // check whether we want to limit tiles to just those that have records on the client

              if (self.data.filterMainTiles) {
                if (Mongo.Collection.get(key).find().count() > 0) {
                  tilesToRender.push(newTile);
                }
              } else {
                // or display them all (including tiles with 0 records)
                tilesToRender.push(newTile);
              }
            }

            ;
          }

          count++;
        });
      } //console.log('tilesToRender', tilesToRender)
      // var appRow = <Row>
      //   <Col sm={3} style={this.data.style.column} >
      //     {this.renderImportChart(this.data.user)}
      //   </Col>
      //   <Col sm={3} style={this.data.style.column} >
      //     {this.renderChecklists(this.data.user)}
      //   </Col>
      //   <Col sm={3} style={this.data.style.column}>
      //     {this.renderContinuityOfCare(this.data.user)}
      //   </Col>
      //   <Col sm={3} style={this.data.style.column}>
      //     {this.renderTimeline(this.data.user)}
      //   </Col>
      // </Row>


      return React.createElement("div", {
        id: "fhirResourcesIndexPage"
      }, React.createElement(FullPageCanvas, null, React.createElement("div", null, this.renderFhirSection(this.data.user), React.createElement(Row, null, tilesToRender))));
    }

    return render;
  }(); // renderTile()
  // // id, active, path, icon, subtitle
  // {
  //   id: 'immunizationsTile',
  //   active: true,
  //   path: '/immunizations',
  //   icon: 'EyeDropper',
  //   title: this.data.local.immunizations,
  //   subtitle: 'Immunizations'
  // }


  _proto.renderTile = function () {
    function renderTile(user, tileConfig) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return React.createElement(MenuTile, {
          id: tileConfig.id,
          className: "tile",
          active: tileConfig.active,
          path: tileConfig.path,
          icon: tileConfig.icon,
          iconSize: 85,
          title: tileConfig.title,
          subtitle: tileConfig.subtitle
        });
      }
    }

    return renderTile;
  }();

  _proto.renderFhirSection = function () {
    function renderFhirSection(user) {
      if (get(Meteor, 'settings.public.home.showFhirMenu')) {
        if (user.isAdmin || user.isPractitioner || user.isPatient || user.isUser) {
          return React.createElement("div", null, React.createElement("br", null), React.createElement(CardTitle, {
            title: "Fast Healthcare Interoperability Resources",
            style: this.data.style.sectionTitle
          }), React.createElement("br", null), React.createElement("br", null));
        }
      }
    }

    return renderFhirSection;
  }();

  _proto.renderExperimentalTiles = function () {
    function renderExperimentalTiles(user) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return React.createElement("div", null, React.createElement("div", {
          id: "familyMemberHistoriesTile",
          style: this.data.style.inactiveIndexCard,
          onClick: this.openLink.bind(this, '/family-member-histories')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          title: "Family Member History",
          subtitle: "Relevant medical histories of family members.",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "questionnairesTile",
          style: this.data.style.inactiveIndexCard,
          onClick: this.openLink.bind(this, '/questionnaires')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Questionnaires",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "questionnaireResponsesTile",
          style: this.data.style.inactiveIndexCard,
          onClick: this.openLink.bind(this, '/questionnaire-responses')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Questionnaire Responses",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "appointmentsTile",
          style: this.data.style.inactiveIndexCard,
          onClick: this.openLink.bind(this, '/appointments')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Appointments",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "slotsTile",
          style: this.data.style.inactiveIndexCard,
          onClick: this.openLink.bind(this, '/slots')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Slots",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "schedulesTile",
          style: this.data.style.inactiveIndexCard,
          onClick: this.openLink.bind(this, '/schedules')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Schedules",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "forumTile",
          style: this.data.style.indexCardPadding,
          onClick: this.openDiscussionForum.bind(this)
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Discussion Forum",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "weblogTile",
          style: this.data.style.indexCardPadding,
          onClick: this.openHealthlog.bind(this)
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Healthlog",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "dermatogramsTile",
          style: this.data.style.inactiveIndexCard,
          onClick: this.openLink.bind(this, '/dermatograms')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Dermatograms",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "telemedicineTile",
          style: this.data.style.inactiveIndexCard,
          onClick: this.openLink.bind(this, '/telemed')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Telemedicine",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "myGenomeTile",
          style: this.data.style.inactiveIndexCard,
          onClick: this.openLink.bind(this, '/my-genome')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "My Genome",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))), React.createElement("div", {
          id: "oAuthTile",
          style: this.data.style.indexCardPadding,
          onClick: this.openLink.bind(this, '/oauth-ui')
        }, React.createElement(GlassCard, {
          style: this.data.style.indexCard
        }, React.createElement(CardTitle, {
          subtitle: "Authorization & Trust",
          titleStyle: this.data.style.title,
          subtitleStyle: this.data.style.subtitle
        }))));
      }
    }

    return renderExperimentalTiles;
  }();

  _proto.renderImportChart = function () {
    function renderImportChart(user) {
      if (get(Meteor, 'settings.public.modules.apps.ImportChart')) {
        if (user.isPatient || user.isPractitioner || user.isAdmin) {
          return React.createElement(MenuTile, {
            id: "importChartTile",
            active: true,
            path: "/import-chart",
            icon: "MdList",
            iconSize: 85,
            subtitle: "Import Chart"
          });
        }
      }
    }

    return renderImportChart;
  }();

  _proto.renderChecklists = function () {
    function renderChecklists(user) {
      if (get(Meteor, 'settings.public.modules.apps.ChecklistManifesto') && get(Meteor, 'settings.public.modules.fhir.Lists')) {
        if (user.isPatient || user.isPractitioner || user.isAdmin) {
          return React.createElement(MenuTile, {
            id: "checklistsTile",
            active: true,
            path: "/checklists",
            icon: "MdList",
            iconSize: 85,
            subtitle: "Checklist Manifesto"
          });
        }
      }
    }

    return renderChecklists;
  }();

  _proto.renderZygote = function () {
    function renderZygote(user) {
      if (get(Meteor, 'settings.public.modules.apps.ZygoteAvatar')) {
        if (user.isPatient || user.isPractitioner || user.isAdmin) {
          return React.createElement(MenuTile, {
            id: "zygoteAvatarTile",
            active: true,
            path: "/zygote",
            icon: "MdFingerprint",
            iconSize: 85,
            subtitle: "Zygote"
          });
        }
      }
    }

    return renderZygote;
  }();

  _proto.renderVideoconferencing = function () {
    function renderVideoconferencing(user) {
      if (get(Meteor, 'settings.public.modules.apps.Videoconferencing')) {
        if (user.isPatient || user.isPractitioner || user.isAdmin) {
          return React.createElement(MenuTile, {
            id: "videoconferencingTile",
            active: true,
            path: "/videoconferencing",
            icon: "MdImportantDevices",
            iconSize: 85,
            subtitle: "Telemedicine"
          });
        }
      }
    }

    return renderVideoconferencing;
  }();

  _proto.renderContinuityOfCare = function () {
    function renderContinuityOfCare(user) {
      if (get(Meteor, 'settings.public.modules.apps.ContinuityOfCare')) {
        if (user.isPatient || user.isPractitioner || user.isAdmin) {
          return React.createElement(MenuTile, {
            id: "continuityOfCareTile",
            active: true,
            path: "/continuity-of-care",
            icon: "FaHeartbeat",
            iconSize: 85,
            subtitle: "Continuity of Care"
          });
        }
      }
    }

    return renderContinuityOfCare;
  }();

  _proto.renderTimeline = function () {
    function renderTimeline(user) {
      if (get(Meteor, 'settings.public.modules.apps.Timeline')) {
        if (user.isPatient || user.isPractitioner || user.isAdmin) {
          return React.createElement(MenuTile, {
            id: "timelineTile",
            active: true,
            path: "/timeline-sidescroll",
            icon: "Pulse",
            iconSize: 85,
            subtitle: "Timeline"
          });
        }
      }
    }

    return renderTimeline;
  }();

  _proto.openDiscussionForum = function () {
    function openDiscussionForum() {
      browserHistory.push('/forum');
    }

    return openDiscussionForum;
  }();

  _proto.openHealthlog = function () {
    function openHealthlog() {
      browserHistory.push('/weblog');
    }

    return openHealthlog;
  }();

  _proto.openUserManagement = function () {
    function openUserManagement() {
      browserHistory.push('/users');
    }

    return openUserManagement;
  }();

  _proto.openMyProfile = function () {
    function openMyProfile() {
      browserHistory.push('/myprofile');
    }

    return openMyProfile;
  }();

  _proto.openPatients = function () {
    function openPatients() {
      browserHistory.push('/patients');
    }

    return openPatients;
  }();

  _proto.openPractitioners = function () {
    function openPractitioners() {
      browserHistory.push('/practitioners');
    }

    return openPractitioners;
  }();

  _proto.openDataManagement = function () {
    function openDataManagement() {
      browserHistory.push('/data-management');
    }

    return openDataManagement;
  }();

  _proto.openObservations = function () {
    function openObservations() {
      browserHistory.push('/observations');
    }

    return openObservations;
  }();

  _proto.openInboundMessages = function () {
    function openInboundMessages() {
      browserHistory.push('/inbound');
    }

    return openInboundMessages;
  }();

  _proto.openOutboundMessages = function () {
    function openOutboundMessages() {
      browserHistory.push('/outbound');
    }

    return openOutboundMessages;
  }();

  _proto.openMedications = function () {
    function openMedications() {
      browserHistory.push('/medications');
    }

    return openMedications;
  }();

  _proto.openLink = function () {
    function openLink(url) {
      console.log("openLink", url);
      browserHistory.push(url);
    }

    return openLink;
  }();

  return FhirResourcesIndex;
}(React.Component);

FhirResourcesIndex.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(FhirResourcesIndex.prototype, ReactMeteorData);
module1.exportDefault(FhirResourcesIndex);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MainIndex.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/MainIndex.jsx                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  MainIndex: function () {
    return MainIndex;
  }
});
var Alert, Grid, Container, Col, Row;
module.link("react-bootstrap", {
  Alert: function (v) {
    Alert = v;
  },
  Grid: function (v) {
    Grid = v;
  },
  Container: function (v) {
    Container = v;
  },
  Col: function (v) {
    Col = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 0);
var CardTitle, Card, CardText, CardActions, TextField;
module.link("material-ui", {
  CardTitle: function (v) {
    CardTitle = v;
  },
  Card: function (v) {
    Card = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardActions: function (v) {
    CardActions = v;
  },
  TextField: function (v) {
    TextField = v;
  }
}, 1);
var Glass, GlassCard, FullPageCanvas, DynamicSpacer;
module.link("meteor/clinical:glass-ui", {
  Glass: function (v) {
    Glass = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  },
  FullPageCanvas: function (v) {
    FullPageCanvas = v;
  },
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  }
}, 2);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 3);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 4);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 5);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 6);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 7);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 8);
var has, get;
module.link("lodash", {
  has: function (v) {
    has = v;
  },
  get: function (v) {
    get = v;
  }
}, 9);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 10);
var MenuTile;
module.link("/imports/ui/components/MenuTile", {
  MenuTile: function (v) {
    MenuTile = v;
  }
}, 11);
var ObservationsTable;
module.link("meteor/clinical:hl7-resource-observation", {
  ObservationsTable: function (v) {
    ObservationsTable = v;
  }
}, 12);
var Checklist;
module.link("/imports/ui/workflows/lists/Checklist", {
  Checklist: function (v) {
    Checklist = v;
  }
}, 13);
var VitalMeasurements;
module.link("meteor/clinical:hl7-resource-observation", {
  VitalMeasurements: function (v) {
    VitalMeasurements = v;
  }
}, 14);
Session.setDefault('filterMainTiles', false);
Session.setDefault('selectedChecklist', false);

var MainIndex =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MainIndex, _React$Component);

  function MainIndex(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      newTask: '',
      newChecklistTitle: ''
    };
    return _this;
  }

  var _proto = MainIndex.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          sectionTitle: {
            display: 'inline-block'
          },
          spacer: {
            display: 'block'
          },
          column: {
            paddingLeft: '5px',
            paddingRight: '5px' //border: '1px solid orange'

          }
        },
        col: {
          md: 12,
          mdOffset: 0,
          lg: 6,
          lgOffset: 0
        },
        user: {
          isAdmin: false,
          isPractitioner: false,
          isPatient: true
        },
        showUnderConstruction: true,
        showExperimental: true,
        filterMainTiles: Session.get('filterMainTiles'),
        glassBlurEnabled: Session.get('glassBlurEnabled'),
        observationTableHeight: Session.get('appHeight') - 518
      };
      data.style.indexCard = Glass.darkroom(data.style.indexCard);
      data.style = Glass.blur(data.style);
      data.style.appbar = Glass.darkroom(data.style.appbar);
      if (process.env.NODE_ENV === "test") console.log("MainIndex[data]", data);
      return data;
    }

    return getMeteorData;
  }();

  _proto.handleKeyPress = function () {
    function handleKeyPress(e, value) {
      console.log('handleKeyPress', e.key);
      this.setState({
        newTask: this.state.newTask + e.key
      });

      if (e.key === 'Enter') {
        this.handleTouchTap(this.state.newTask);
      }
    }

    return handleKeyPress;
  }();

  _proto.handleTouchTap = function () {
    function handleTouchTap(value) {
      console.log('handleTouchTap', value);
      var listId;
      var selectedChecklist = Lists.findOne({
        'code.text': 'Scratchpad'
      });
      console.log('selectedChecklist', selectedChecklist);

      if (selectedChecklist) {
        listId = selectedChecklist._id;
      } else {
        var newChecklist = {
          "resourceType": "List",
          "code": {
            "text": "Scratchpad"
          },
          "note": "",
          "source": {
            "reference": "System/system"
          },
          "status": "current",
          "date": new Date(),
          "mode": "changes",
          "entry": []
        };
        listId = Lists._collection.insert(newChecklist);
        Session.set('selectedChecklist', listId);
      }

      Lists.update({
        _id: listId
      }, {
        $addToSet: {
          'entry': {
            "flag": {
              "text": "Pending",
              "coding": [{
                "system": "http://hl7.org/fhir/ValueSet/order-status",
                "code": "pending",
                "display": "Pending"
              }]
            },
            "deleted": false,
            "date": new Date(),
            "item": {
              "display": value
            }
          }
        }
      });
      this.setState({
        newTask: ''
      });
    }

    return handleTouchTap;
  }();

  _proto.render = function () {
    function render() {
      var self = this;
      var tilesToRender = [];
      var scratchpadVisibility = {};
      var healthLogSizing = 4;

      if (['iPad', 'iPhone', 'iPod'].includes(window.navigator.platform)) {
        scratchpadVisibility.display = 'none';
        healthLogSizing = 12;
      } else {
        healthLogSizing = 4;
      }

      return React.createElement("div", {
        id: "indexPage"
      }, React.createElement(FullPageCanvas, null, React.createElement(Col, {
        md: healthLogSizing
      }, React.createElement(VitalMeasurements, null), React.createElement(DynamicSpacer, null), React.createElement(GlassCard, {
        height: this.data.observationTableHeight
      }, React.createElement(ObservationsTable, {
        showSubjects: false,
        showDevices: false
      }))), React.createElement(Col, {
        md: 4,
        style: scratchpadVisibility
      }, React.createElement(GlassCard, {
        height: "auto"
      }, React.createElement(CardText, null, React.createElement(TextField, {
        type: "newTask",
        name: "newTask",
        floatingLabelText: "New Task",
        onKeyPress: this.handleKeyPress.bind(this),
        hintText: "...",
        value: this.state.newTask,
        floatingLabelFixed: true,
        fullWidth: true
      })), React.createElement(Checklist, null)))));
    }

    return render;
  }();

  _proto.renderTile = function () {
    function renderTile(user, tileConfig) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return React.createElement(MenuTile, {
          id: tileConfig.id,
          active: tileConfig.active,
          path: tileConfig.path,
          icon: tileConfig.icon,
          iconSize: 85,
          title: tileConfig.title,
          subtitle: tileConfig.subtitle
        });
      }
    }

    return renderTile;
  }();

  _proto.openLink = function () {
    function openLink(url) {
      console.log("openLink", url);
      browserHistory.push(url);
    }

    return openLink;
  }();

  return MainIndex;
}(React.Component);

MainIndex.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(MainIndex.prototype, ReactMeteorData);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MetadataPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/MetadataPage.jsx                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  MetadataPage: function () {
    return MetadataPage;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var CardTitle, CardText;
module.link("material-ui/Card", {
  CardTitle: function (v) {
    CardTitle = v;
  },
  CardText: function (v) {
    CardText = v;
  }
}, 3);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 4);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 5);
var GlassCard, VerticalCanvas;
module.link("meteor/clinical:glass-ui", {
  GlassCard: function (v) {
    GlassCard = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  }
}, 6);
Session.setDefault('conformanceStatement', '');
Meteor.call('getMetadata', function (error, result) {
  if (result) {
    Session.set('conformanceStatement', result);
  }
});

var MetadataPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MetadataPage, _React$Component);

  function MetadataPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = MetadataPage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        conformance: Session.get('conformanceStatement')
      };
      return data;
    }

    return getMeteorData;
  }();

  _proto.getMetadata = function () {
    function getMetadata() {
      Meteor.call('getMetadata', function (error, result) {
        if (result) {
          Session.set('conformanceStatement', result);
        }
      });
    }

    return getMetadata;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement(VerticalCanvas, null, React.createElement(GlassCard, null, React.createElement(CardTitle, {
        title: "Metadata"
      }), React.createElement(CardText, null, React.createElement("pre", null, JSON.stringify(this.data.conformance, null, 2)))));
    }

    return render;
  }();

  return MetadataPage;
}(React.Component);

ReactMixin(MetadataPage.prototype, ReactMeteorData);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MyProfilePage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/MyProfilePage.jsx                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  MyProfilePage: function () {
    return MyProfilePage;
  }
});
var Card, CardActions, CardHeader, CardText, CardTitle;
module.link("material-ui/Card", {
  Card: function (v) {
    Card = v;
  },
  CardActions: function (v) {
    CardActions = v;
  },
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var Col, Grid, Row;
module.link("react-bootstrap", {
  Col: function (v) {
    Col = v;
  },
  Grid: function (v) {
    Grid = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 1);
var Tab, Tabs;
module.link("material-ui/Tabs", {
  Tab: function (v) {
    Tab = v;
  },
  Tabs: function (v) {
    Tabs = v;
  }
}, 2);
var Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn;
module.link("material-ui/Table", {
  Table: function (v) {
    Table = v;
  },
  TableBody: function (v) {
    TableBody = v;
  },
  TableHeader: function (v) {
    TableHeader = v;
  },
  TableHeaderColumn: function (v) {
    TableHeaderColumn = v;
  },
  TableRow: function (v) {
    TableRow = v;
  },
  TableRowColumn: function (v) {
    TableRowColumn = v;
  }
}, 3);
var has, get;
module.link("lodash", {
  has: function (v) {
    has = v;
  },
  get: function (v) {
    get = v;
  }
}, 4);
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 5);
var Paper;
module.link("material-ui/Paper", {
  "default": function (v) {
    Paper = v;
  }
}, 6);
var Avatar;
module.link("material-ui/Avatar", {
  "default": function (v) {
    Avatar = v;
  }
}, 7);
var Divider;
module.link("material-ui/Divider", {
  "default": function (v) {
    Divider = v;
  }
}, 8);
var FlatButton;
module.link("material-ui/FlatButton", {
  "default": function (v) {
    FlatButton = v;
  }
}, 9);
var RaisedButton;
module.link("material-ui/RaisedButton", {
  "default": function (v) {
    RaisedButton = v;
  }
}, 10);
var FontIcon;
module.link("material-ui/FontIcon", {
  FontIcon: function (v) {
    FontIcon = v;
  }
}, 11);
var VerticalCanvas, GlassCard, Glass, DynamicSpacer;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  },
  Glass: function (v) {
    Glass = v;
  },
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  }
}, 12);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 13);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 14);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 15);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 16);
var TextField;
module.link("material-ui/TextField", {
  "default": function (v) {
    TextField = v;
  }
}, 17);
var MenuItem;
module.link("/imports/ui/components/MenuItem", {
  "default": function (v) {
    MenuItem = v;
  }
}, 18);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 19);
var removeUserById;
module.link("/imports/api/users/methods", {
  removeUserById: function (v) {
    removeUserById = v;
  }
}, 20);
var PatientCard;
module.link("meteor/clinical:hl7-resource-patient", {
  PatientCard: function (v) {
    PatientCard = v;
  }
}, 21);
var defaultState = {
  index: 0,
  hasConfirmedDelete: false,
  wantsToDelete: false,
  increment: 0,
  confirm: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};
Session.setDefault('myProfileState', defaultState);

var MyProfilePage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MyProfilePage, _React$Component);

  function MyProfilePage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = MyProfilePage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          tab: {
            borderBottom: '1px solid lightgray'
          },
          title: {
            left: '160px'
          },
          avatar: {
            position: 'relative',
            zIndex: 10,
            transition: '1s',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%'
          },
          photo: {
            position: 'absolute'
          },
          synopsis: {
            //position: 'relative',         
            paddingLeft: '160px'
          }
        },
        patient: {},
        state: {
          index: 0,
          hasConfirmedDelete: false,
          wantsToDelete: false,
          confirmed: '',
          increment: 0,
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        user: {
          _id: '',
          given: '',
          familiy: '',
          email: '',
          avatar: '',
          zip: '',
          longitude: '',
          latitude: '',
          profileImage: 'noAvatar.png',
          birthdate: ''
        },
        header: {
          avatar: 'noAvatar.png'
        },
        address: {
          line: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          latitude: '',
          longitude: '',
          latlng: '0.0, 0.0'
        },
        ccd: {
          AllergyIntolerances: 0,
          CarePlans: 0,
          Conditions: 0,
          Devices: 0,
          DiagnosticReports: 0,
          Goals: 0,
          ImagingStudies: 0,
          Immunizations: 0,
          Locations: 0,
          Medications: 0,
          MedicationStatements: 0,
          Observations: 0,
          Patients: 0,
          Persons: 0,
          Practitioners: 0,
          Procedures: 0,
          RelatedPersons: 0,
          Sequences: 0
        },
        minimongo: {
          AllergyIntolerances: 0,
          CarePlans: 0,
          Conditions: 0,
          Devices: 0,
          DiagnosticReports: 0,
          Goals: 0,
          ImagingStudies: 0,
          Immunizations: 0,
          Locations: 0,
          Medications: 0,
          MedicationStatements: 0,
          Observations: 0,
          Patients: 0,
          Persons: 0,
          Practitioners: 0,
          Procedures: 0,
          RelatedPersons: 0,
          Sequences: 0
        }
      };
      data.style.tab = Glass.darkroom(data.style.tab);

      if (Session.get('myProfileState')) {
        data.state = Session.get('myProfileState');
      }

      if (Meteor.user()) {
        data.user = {
          _id: Meteor.userId(),
          email: get(Meteor.user(), 'emails[0].address'),
          avatar: get(Meteor.user(), 'profile.avatar'),
          gender: '',
          birthdate: '',
          zip: '',
          longitude: '',
          latitude: '',
          profileImage: get(Meteor.user(), 'profile.avatar')
        }; // if (Meteor.user().profile && Meteor.user().profile.avatar) {

        if (get(Meteor.user(), 'profile.avatar')) {
          data.user.profileImage = get(Meteor.user(), 'profile.avatar');
          data.header.avatar = get(Meteor.user(), 'profile.avatar');
          data.patient.photo = [{
            url: get(Meteor.user(), 'profile.avatar')
          }];
        } // else {
        //   data.user.profileImage = 'thumbnail.png';
        //   data.header.avatar = 'thumbnail.png';
        //   data.patient.photo = [{url: 'thumbnail.png' }]
        // }
        // if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {


        if (get(Meteor.user(), 'profile.name')) {
          data.user.given = get(Meteor.user(), 'profile.name.given');
          data.user.family = get(Meteor.user(), 'profile.name.family');
          data.user.fullName = get(Meteor.user(), 'profile.name.given') + ' ' + get(Meteor.user(), 'profile.name.family');
          data.patient.name = [{
            given: [get(Meteor.user(), 'profile.name.given')],
            family: [get(Meteor.user(), 'profile.name.family')],
            text: get(Meteor.user(), 'profile.name.given') + ' ' + get(Meteor.user(), 'profile.name.family')
          }];
        } else {
          data.user.given = '';
          data.user.family = '';
          data.user.fullName = '';
          data.patient.name = [{
            given: [''],
            family: [''],
            text: ''
          }];
        }

        if (get(Meteor.user(), 'profile.gender')) {
          data.user.gender = get(Meteor.user(), 'profile.gender');
          data.patient.gender = get(Meteor.user(), 'profile.gender');
        } // if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.locations  && Meteor.user().profile.locations.home && Meteor.user().profile.locations.home.address){


        if (get(Meteor.user(), 'profile.locations.home.address')) {
          // if(Meteor.user().profile.locations.home.address.line){
          if (get(Meteor.user(), 'profile.locations.home.address.line')) {
            // data.address.line = Meteor.user().profile.locations.home.address.line;
            data.address.line = get(Meteor.user(), 'profile.locations.home.address.line');
          } // if(Meteor.user().profile.locations.home.address.city){


          if (get(Meteor.user(), 'profile.locations.home.address.city')) {
            // data.address.city = Meteor.user().profile.locations.home.address.city;
            data.address.city = get(Meteor.user(), 'profile.locations.home.address.city');
          } // if(Meteor.user().profile.locations.home.address.state){


          if (get(Meteor.user(), 'profile.locations.home.address.state')) {
            // data.address.state = Meteor.user().profile.locations.home.address.state;
            data.address.state = get(Meteor.user(), 'profile.locations.home.address.state');
          } // if(Meteor.user().profile.locations.home.address.postalCode){


          if (get(Meteor.user(), 'profile.locations.home.address.postalCode')) {
            // data.address.postalCode = Meteor.user().profile.locations.home.address.postalCode;
            data.address.postalCode = get(Meteor.user(), 'profile.locations.home.address.postalCode');
          } // if(Meteor.user().profile.locations.home.address.country){


          if (get(Meteor.user(), 'profile.locations.home.address.country')) {
            // data.address.country = Meteor.user().profile.locations.home.address.country;
            data.address.country = get(Meteor.user(), 'profile.locations.home.address.country');
          }
        }

        if (get(Meteor.user(), 'profile.locations.home.position')) {
          if (get(Meteor.user(), 'profile.locations.home.position.latitude') && get(Meteor.user(), 'profile.locations.home.position.longitude')) {
            data.address.latlng = get(Meteor.user(), 'profile.locations.home.position.latitude') + ', ' + get(Meteor.user(), 'profile.locations.home.position.longitude');
          }
        } // if(get(Meteor.user(), 'profile.continuityOfCare')){
        //   if(get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances')){
        //     data.ccd.AllergyIntolerances = get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances').length;
        //   }
        //   if(get(Meteor.user(), 'profile.continuityOfCare.carePlans')){
        //     data.ccd.CarePlans = get(Meteor.user(), 'profile.continuityOfCare.carePlans').length;
        //   }
        //   if(get(Meteor.user(), 'profile.continuityOfCare.conditions')){
        //     data.ccd.Conditions = get(Meteor.user(), 'profile.continuityOfCare.conditions').length;
        //   }
        //   if(get(Meteor.user(), 'profile.continuityOfCare.devices')){
        //     data.ccd.Devices = get(Meteor.user(), 'profile.continuityOfCare.devices').length;
        //   }
        //   if(get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports')){
        //     data.ccd.DiagnosticReports = get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports').length;
        //   }
        //   if(get(Meteor.user(), 'profile.continuityOfCare.goals')){
        //     data.ccd.Goals = get(Meteor.user(), 'profile.continuityOfCare.goals').length;
        //   }
        //   if(get(Meteor.user(), 'profile.continuityOfCare.imagingStudies')){
        //     data.ccd.ImagingStudies = get(Meteor.user(), 'profile.continuityOfCare.imagingStudies').length;
        //   }
        //   if(get(Meteor.user(), 'profile.continuityOfCare.immunizations')){
        //     data.ccd.Immunizations = get(Meteor.user(), 'profile.continuityOfCare.immunizations').length;
        //   }
        //   if(get(Meteor.user(), 'profile.continuityOfCare.locations')){
        //     data.ccd.Locations = get(Meteor.user(), 'profile.continuityOfCare.locations').length;
        //   }
        //   if(get(Meteor.user(), 'profile.continuityOfCare.medications')){
        //     data.ccd.Medications = get(Meteor.user(), 'profile.continuityOfCare.medications').length;
        //   }        
        //   if(get(Meteor.user(), 'profile.continuityOfCare.medicationStatements')){
        //     data.ccd.MedicationStatements = get(Meteor.user(), 'profile.continuityOfCare.medicationStatements').length;
        //   }        
        //   if(get(Meteor.user(), 'profile.continuityOfCare.observations')){
        //     data.ccd.Observations = get(Meteor.user(), 'profile.continuityOfCare.observations').length;
        //   }        
        //   if(get(Meteor.user(), 'profile.continuityOfCare.patients')){
        //     data.ccd.Patients = get(Meteor.user(), 'profile.continuityOfCare.patients').length;
        //   }           
        //   if(get(Meteor.user(), 'profile.continuityOfCare.persons')){
        //     data.ccd.Persons = get(Meteor.user(), 'profile.continuityOfCare.persons').length;
        //   }           
        //   if(get(Meteor.user(), 'profile.continuityOfCare.practitioners')){
        //     data.ccd.Practitioners = get(Meteor.user(), 'profile.continuityOfCare.practitioners').length;
        //   }           
        //   if(get(Meteor.user(), 'profile.continuityOfCare.procedures')){
        //     data.ccd.Procedures = get(Meteor.user(), 'profile.continuityOfCare.procedures').length;
        //   }           
        //   if(get(Meteor.user(), 'profile.continuityOfCare.relatedPersons')){
        //     data.ccd.RelatedPersons = get(Meteor.user(), 'profile.continuityOfCare.relatedPersons').length;
        //   }           
        //   if(get(Meteor.user(), 'profile.continuityOfCare.sequences')){
        //     data.ccd.Sequences = get(Meteor.user(), 'profile.continuityOfCare.sequences').length;
        //   }           
        // }


        var resourceTypes = ['AllergyIntolerances', 'CarePlans', 'Conditions', 'Devices', 'DiagnosticReports', 'Goals', 'Immunizations', 'Medications', 'MedicationOrders', 'Organizations', 'Observations', 'Practitioners', 'Procedures'];
        resourceTypes.forEach(function (resourceType) {
          if (Mongo.Collection.get(resourceType)) {
            data.minimongo[resourceType] = Mongo.Collection.get(resourceType).find().count();
          }
        });
      }

      if (Session.get('appWidth') > 768) {
        data.style.photo.height = '160px';
        data.style.photo.width = '160px';
        data.style.photo.left = '0px';
        data.style.photo.top = '74px';
        data.style.photo.position = 'absolute';
        data.style.photo.zIndex = 10;
        data.style.synopsis.marginLeft = '160px;'; //data.header.photo = null;
      } else {
        //data.style.photo.display = 'none';
        data.style.photo.height = '50px';
        data.style.photo.width = '50px';
        data.style.photo.left = '-50px';
        data.style.photo.top = '15px';
        data.style.title.left = '70px';
        data.style.synopsis.marginLeft = '0px;';
      }

      if (process.env.NODE_ENV === "test") console.log("MyProfilePage[data]", data);
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      var ccdResources = [];

      if (get(this, 'data.ccd.AllergyIntolerances')) {
        ccdResources.push(React.createElement(TableRow, {
          key: ""
        }, React.createElement(TableRowColumn, null, this.data.minimongo.AllergyIntolerances), React.createElement(TableRowColumn, null, "Allergies")));
      }

      if (get(this, 'data.minimongo.CarePlans')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "CarePlans"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.CarePlans), React.createElement(TableRowColumn, null, "CarePlans")));
      }

      if (get(this, 'data.minimongo.Conditions')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Conditions"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Conditions), React.createElement(TableRowColumn, null, "Conditions")));
      }

      if (get(this, 'data.minimongo.Devices')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Devices"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Devices), React.createElement(TableRowColumn, null, "Devices")));
      }

      if (get(this, 'data.minimongo.DiagnosticReports')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "DiagnosticReports"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.DiagnosticReports), React.createElement(TableRowColumn, null, "DiagnosticReports")));
      }

      if (get(this, 'data.minimongo.Goals')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Goals"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Goals), React.createElement(TableRowColumn, null, "Goals")));
      }

      if (get(this, 'data.minimongo.ImagingStudies')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "ImagingStudies"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.ImagingStudies), React.createElement(TableRowColumn, null, "ImagingStudies")));
      }

      if (get(this, 'data.minimongo.Immunizations')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Immunizations"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Immunizations), React.createElement(TableRowColumn, null, "Immunizations")));
      }

      if (get(this, 'data.minimongo.Locations')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Locations"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Locations), React.createElement(TableRowColumn, null, "Locations")));
      }

      if (get(this, 'data.minimongo.Medications')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Medications"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Medications), React.createElement(TableRowColumn, null, "Medications")));
      }

      if (get(this, 'data.minimongo.MedicationStatements')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "MedicationStatements"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.MedicationStatements), React.createElement(TableRowColumn, null, "MedicationStatements")));
      }

      if (get(this, 'data.minimongo.Observations')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Observations"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Observations), React.createElement(TableRowColumn, null, "Observations")));
      }

      if (get(this, 'data.minimongo.Patients')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Patients"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Patients), React.createElement(TableRowColumn, null, "Patients")));
      }

      if (get(this, 'data.minimongo.Persons')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Persons"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Persons), React.createElement(TableRowColumn, null, "Persons")));
      }

      if (get(this, 'data.minimongo.Practitioners')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Practitioners"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Practitioners), React.createElement(TableRowColumn, null, "Practitioners")));
      }

      if (get(this, 'data.minimongo.Procedures')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Procedures"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Procedures), React.createElement(TableRowColumn, null, "Procedures")));
      }

      if (get(this, 'data.minimongo.RelatedPersons')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "RelatedPersons"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.RelatedPersons), React.createElement(TableRowColumn, null, "RelatedPersons")));
      }

      if (get(this, 'data.minimongo.Sequences')) {
        ccdResources.push(React.createElement(TableRow, {
          key: "Sequences"
        }, React.createElement(TableRowColumn, null, this.data.minimongo.Sequences), React.createElement(TableRowColumn, null, "Sequences")));
      }

      var continuityOfCareCard; //if(ccdResources.length > 0){

      continuityOfCareCard = React.createElement("div", null, React.createElement(GlassCard, null, React.createElement(CardTitle, {
        title: "Continuity of Care",
        subtitle: "Healthcare data is attached to your profile via resources."
      }), React.createElement(CardText, null, React.createElement(Table, null, React.createElement(TableBody, {
        displayRowCheckbox: false,
        showRowHover: false
      }, React.createElement(TableRow, {
        style: {
          fontWeight: 'bold'
        }
      }, React.createElement(TableRowColumn, {
        style: {
          width: '20%'
        }
      }, "Count"), React.createElement(TableRowColumn, {
        style: {
          width: '80%'
        }
      }, "Resource")), ccdResources))), React.createElement(CardActions, null, React.createElement(FlatButton, {
        label: "Clear Local Cache",
        onClick: this.clearLocalCache.bind(this)
      }))), React.createElement(DynamicSpacer, null)); //}
      // var consentElement;
      // //if(Package['clinical:hl7-resource-consent']){
      //   consentElement = <div>
      //     <GlassCard>
      //       <CardTitle title="Consents & Authorizations" subtitle='OAuth tokens, HIPAA consents, Advanced Directives, etc.' />
      //       <CardText>
      //         <ConsentTable
      //           patient="Jane Doe"
      //           simplified={true}
      //           noDataMessage={false}
      //         />
      //       </CardText>
      //       <CardActions>
      //         <FlatButton 
      //           label='Edit' 
      //           onClick={this.editAuthorizations.bind(this)}
      //           />
      //       </CardActions>
      //     </GlassCard>
      //     <DynamicSpacer />
      //   </div>
      // //}

      return React.createElement("div", {
        id: "myProfilePage"
      }, React.createElement(VerticalCanvas, {
        style: {
          paddingBottom: '80px'
        }
      }, React.createElement(PatientCard // fullName={ get(this, 'data.user.fullName', '') }
      // email={ get(this, 'data.user.email', '') }
      // givenName={ get(this, 'data.user.givenName', '') }
      // familyName={ get(this, 'data.user.familyName', '') }
      // birthdate={this.data.user.birthdate}
      // gender={ get(this, 'data.user.gender', '') }
      // avatar={ get(this, 'data.user.avatar', '') }
      , {
        patient: get(this, 'data.patient'),
        updateGivenName: this.updateGivenName,
        updateFamilyName: this.updateFamilyName,
        updateBirthdate: this.updateBirthdate,
        updateGender: this.updateGender,
        updateAvatar: this.updateAvatar
      }), React.createElement(GlassCard, null, React.createElement(CardTitle, {
        title: "Home Address",
        subtitle: "last updated: yyyy/mm/dd",
        style: {
          "float": 'left'
        }
      }), React.createElement(CardTitle, {
        subtitle: this.data.address.latlng,
        style: {
          position: 'relative',
          right: '0px',
          top: '0px',
          "float": 'right'
        }
      }), React.createElement(CardText, null, React.createElement(Row, null, React.createElement(Col, {
        md: 12
      }, React.createElement(TextField, {
        id: "streetAddressInput",
        ref: "streetAddress",
        name: "streetAddress",
        type: "text",
        floatingLabelText: "Street Address",
        floatingLabelFixed: true,
        value: this.data.address.line,
        onChange: this.changeHomeStreetAddress.bind(this),
        fullWidth: true
      }))), React.createElement(Row, null, React.createElement(Col, {
        md: 3
      }, React.createElement(TextField, {
        id: "cityInput",
        ref: "city",
        name: "city",
        type: "text",
        floatingLabelText: "City",
        floatingLabelFixed: true,
        value: this.data.address.city,
        onChange: this.changeHomeCity.bind(this),
        fullWidth: true
      })), React.createElement(Col, {
        md: 3
      }, React.createElement(TextField, {
        id: "stateInput",
        ref: "state",
        name: "state",
        type: "text",
        floatingLabelText: "State",
        floatingLabelFixed: true,
        value: this.data.address.state,
        onChange: this.changeHomeState.bind(this),
        fullWidth: true
      })), React.createElement(Col, {
        md: 3
      }, React.createElement(TextField, {
        id: "postalCodeInput",
        ref: "postalCode",
        name: "postalCode",
        type: "text",
        floatingLabelText: "Postal Code",
        floatingLabelFixed: true,
        value: this.data.address.postalCode,
        onChange: this.changeHomeZip.bind(this),
        fullWidth: true
      })), React.createElement(Col, {
        md: 3
      }, React.createElement(TextField, {
        id: "countryInput",
        ref: "country",
        name: "country",
        type: "text",
        floatingLabelText: "Country",
        floatingLabelFixed: true,
        value: this.data.address.country,
        onChange: this.changeHomeCountry.bind(this),
        fullWidth: true
      })))), React.createElement(CardActions, null, React.createElement(FlatButton, {
        label: "Geocode",
        onClick: this.geocode.bind(this)
      }), React.createElement(FlatButton, {
        label: "Map My Address",
        onClick: this.mapMyAddress.bind(this)
      }))), React.createElement(DynamicSpacer, null), continuityOfCareCard, React.createElement(GlassCard, null, React.createElement(CardTitle, {
        title: "Preferences",
        subtitle: "Application preferences."
      }), React.createElement(CardText, null, React.createElement("div", {
        id: "profileSystemPane",
        style: {
          position: "relative"
        }
      }, React.createElement(Table, null, React.createElement(TableBody, {
        displayRowCheckbox: false,
        showRowHover: true
      }, ">", React.createElement(TableRow, null, React.createElement(TableRowColumn, {
        style: {
          width: '200px'
        }
      }, React.createElement(FlatButton, {
        label: "Show Navbars"
      })), React.createElement(TableRowColumn, null, "Display the header and footer navbars.")), React.createElement(TableRow, null, React.createElement(TableRowColumn, null, React.createElement(FlatButton, {
        label: "Show Search"
      })), React.createElement(TableRowColumn, null, "Display the search ribbon.")), React.createElement(TableRow, null, React.createElement(TableRowColumn, null, React.createElement(FlatButton, {
        label: "Autoheight"
      })), React.createElement(TableRowColumn, null, "Fit to use the available spaec.  Otherwise, use veritical scroll.")), React.createElement(TableRow, null, React.createElement(TableRowColumn, null, React.createElement(FlatButton, {
        label: "Margins"
      })), React.createElement(TableRowColumn, null, "Layout with or without border margins.")), React.createElement(TableRow, null, React.createElement(TableRowColumn, null, React.createElement(FlatButton, {
        label: "Card/Panel"
      })), React.createElement(TableRowColumn, null, "Card layout or Panel layout")), React.createElement(TableRow, null, React.createElement(TableRowColumn, null, React.createElement(FlatButton, {
        label: "Secondary"
      })), React.createElement(TableRowColumn, null, "Display the secondary iframe panel")), React.createElement(TableRow, null, React.createElement(TableRowColumn, null, React.createElement(FlatButton, {
        label: "Docks"
      })), React.createElement(TableRowColumn, null, "Display inbox dock")), React.createElement(TableRow, null, React.createElement(TableRowColumn, null, React.createElement(FlatButton, {
        label: "Narrow Navs"
      })), React.createElement(TableRowColumn, null, "Use narrow navbars")))), React.createElement("br", null), React.createElement("br", null), this.renderConfirmDelete(this.data.state.wantsToDelete)))), React.createElement(DynamicSpacer, null), React.createElement(GlassCard, null, React.createElement(CardTitle, {
        title: "Password Management",
        subtitle: "Reset your password."
      }), React.createElement(CardText, null, React.createElement("div", {
        id: "profilePasswordPane",
        style: {
          position: 'relative'
        }
      }, React.createElement(TextField, {
        id: "oldPasswordInput",
        ref: "oldPassword",
        name: "oldPassword",
        type: "text",
        floatingLabelText: "oldPassword",
        floatingLabelFixed: true,
        value: this.data.state.oldPassword,
        onChange: this.rememberOldPassword.bind(this),
        fullWidth: true
      }), React.createElement("br", null), React.createElement(Row, null, React.createElement(Col, {
        md: 6
      }, React.createElement(TextField, {
        id: "newPasswordInput",
        ref: "newPassword",
        name: "newPassword",
        type: "text",
        floatingLabelText: "newPassword",
        floatingLabelFixed: true,
        value: this.data.state.newPassword,
        onChange: this.rememberNewPassword.bind(this),
        fullWidth: true
      }), React.createElement("br", null)), React.createElement(Col, {
        md: 6
      }, React.createElement(TextField, {
        id: "confirmPasswordInput",
        ref: "confirmPassword",
        name: "confirmPassword",
        type: "text",
        floatingLabelText: "confirmPassword",
        floatingLabelFixed: true,
        value: this.data.state.confirmPassword,
        onChange: this.rememberConfirmPassword.bind(this),
        fullWidth: true
      }), React.createElement("br", null))), React.createElement(FlatButton, {
        id: "changePasswordButton",
        label: "Change Password",
        onClick: this.changePassword.bind(this),
        className: "muidocs-icon-action-delete"
      })))), React.createElement(DynamicSpacer, null), React.createElement(DynamicSpacer, null)));
    }

    return render;
  }();

  _proto.imgError = function () {
    function imgError() {
      this.refs.avatarImage.src = Meteor.absoluteUrl() + 'noAvatar.png';
    }

    return imgError;
  }();

  _proto.renderConfirmDelete = function () {
    function renderConfirmDelete(wantsToDelete) {
      return React.createElement("div", null, React.createElement(FlatButton, {
        id: "deleteUserButton",
        className: "muidocs-icon-action-delete",
        label: "Delete User",
        onClick: this.confirmDelete.bind(this)
      }));
    }

    return renderConfirmDelete;
  }();

  _proto.resetPreferences = function () {
    function resetPreferences() {}

    return resetPreferences;
  }();

  _proto.rememberOldPassword = function () {
    function rememberOldPassword(event, value) {
      var state = Session.get('myProfileState');
      state['oldPassword'] = value;
      Session.set('myProfileState', state);
    }

    return rememberOldPassword;
  }();

  _proto.rememberNewPassword = function () {
    function rememberNewPassword(event, value) {
      var state = Session.get('myProfileState');
      state['newPassword'] = value;
      Session.set('myProfileState', state);
    }

    return rememberNewPassword;
  }();

  _proto.rememberConfirmPassword = function () {
    function rememberConfirmPassword(event, value) {
      var state = Session.get('myProfileState');
      state['confirmPassword'] = value;
      Session.set('myProfileState', state);
    }

    return rememberConfirmPassword;
  }();

  _proto.changeState = function () {
    function changeState(field) {
      var state = Session.get('myProfileState');
      state[field] = this.refs[field].refs.input.value;
      Session.set('myProfileState', state);
    }

    return changeState;
  }();

  _proto.handleTabChange = function () {
    function handleTabChange(index) {
      var state = Session.get('myProfileState');
      state.index = index;
      Session.set('myProfileState', state);
    }

    return handleTabChange;
  }();

  _proto.updateGivenName = function () {
    function updateGivenName(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.name[0].given': value
        }
      });
    }

    return updateGivenName;
  }();

  _proto.updateFamilyName = function () {
    function updateFamilyName(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.name[0].family': value
        }
      });
    }

    return updateFamilyName;
  }();

  _proto.updateBirthdate = function () {
    function updateBirthdate(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.birthdate': value
        }
      });
    }

    return updateBirthdate;
  }();

  _proto.updateGender = function () {
    function updateGender(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.gender': value
        }
      });
    }

    return updateGender;
  }();

  _proto.updateAvatar = function () {
    function updateAvatar(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.avatar': value
        }
      });
    }

    return updateAvatar;
  }();

  _proto.changeHomeStreetAddress = function () {
    function changeHomeStreetAddress(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.locations.home.address.line': value
        }
      });
    }

    return changeHomeStreetAddress;
  }();

  _proto.changeHomeCity = function () {
    function changeHomeCity(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.locations.home.address.city': value
        }
      });
    }

    return changeHomeCity;
  }();

  _proto.changeHomeState = function () {
    function changeHomeState(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.locations.home.address.state': value
        }
      });
    }

    return changeHomeState;
  }();

  _proto.changeHomeZip = function () {
    function changeHomeZip(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.locations.home.address.postalCode': value
        }
      });
    }

    return changeHomeZip;
  }();

  _proto.changeHomeCountry = function () {
    function changeHomeCountry(event, value) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.locations.home.address.country': value
        }
      });
    }

    return changeHomeCountry;
  }();

  _proto.editAuthorizations = function () {
    function editAuthorizations() {
      browserHistory.push('/oauth-grants');
    }

    return editAuthorizations;
  }();

  _proto.geocode = function () {
    function geocode() {
      console.log('lets try geocoding something...');

      if (get(Meteor.user(), 'profile.locations.home.address')) {
        Meteor.call('geocode', get(Meteor.user(), 'profile.locations.home.address'));
      }
    }

    return geocode;
  }();

  _proto.mapMyAddress = function () {
    function mapMyAddress() {
      if (get(Meteor.user(), 'profile.locations.home.position.latitude') && get(Meteor.user(), 'profile.locations.home.position.longitude')) {
        browserHistory.push('/maps');
      }
    }

    return mapMyAddress;
  }();

  _proto.handleDelete = function () {
    function handleDelete() {
      var state = Session.get('myProfileState');
      state.wantsToDelete = true;
      Session.set('myProfileState', state);
    }

    return handleDelete;
  }();

  _proto.handleConfirm = function () {
    function handleConfirm(event, value) {
      var state = Session.get('myProfileState');
      state.confirm = value;
      Session.set('myProfileState', state);
    }

    return handleConfirm;
  }();

  _proto.clearLocalCache = function () {
    function clearLocalCache() {
      if (confirm("Are you absolutely sure?")) {
        var resourceTypes = ['AllergyIntolerances', 'CarePlans', 'Conditions', 'Devices', 'DiagnosticReports', 'Goals', 'Immunizations', 'Medications', 'MedicationOrders', 'MedicationStatements', 'Organizations', 'Observations', 'Practitioners', 'Procedures', 'RiskAssessments'];
        resourceTypes.forEach(function (resourceType) {
          if (Mongo.Collection.get(resourceType)) {
            Mongo.Collection.get(resourceType).find().forEach(function (record) {
              Mongo.Collection.get(resourceType).remove({
                _id: record._id
              });
            });
          }
        });
      }
    }

    return clearLocalCache;
  }();

  _proto.confirmDelete = function () {
    function confirmDelete() {
      if (confirm("Are you sure you want to delete your entire account?  This decision is permanent and can't be reversed.")) {
        var state = Session.get('myProfileState'); // janky, but it works, i guess

        if (state.confirm === Meteor.userId() || state.confirm === Meteor.user().emails[0].address) {
          if (process.env.NODE_ENV === "test") console.log('Confirm _id match.  Removing.');
          removeUserById.call({
            _id: Meteor.userId()
          }, function (error) {
            if (error) {
              Bert.alert(error.reason, 'danger');
            } else {
              Bert.alert('User removed!', 'success');
              browserHistory.push('/signin');
            }
          });
        } else {
          console.log('Hmmm...  yeah, lets wait a bit and make sure we have the right user.');
        }
      }
    }

    return confirmDelete;
  }();

  _proto.deleteAccount = function () {
    function deleteAccount() {
      console.log('deleteAccount');
    }

    return deleteAccount;
  }();

  _proto.changePassword = function () {
    function changePassword() {
      var state = Session.get('myProfileState');

      if (state.newPassword === state.confirmPassword) {
        console.log('Passwords match.  Lets send to the server and make it official.');
        Accounts.changePassword(state.oldPassword, state.newPassword, function (error, result) {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Password changed!', 'success');

            var _state = Session.get('myProfileState');

            _state.newPassword = '';
            _state.oldPassword = '';
            _state.confirmPassword = '';
            Session.set('myProfileState', _state);
          }
        });
      } else {
        console.log("Passwords don't match.  Please try again.");
        Bert.alert("Passwords don't match.  Please try again.", 'danger');
      }
    }

    return changePassword;
  }();

  return MyProfilePage;
}(React.Component);

ReactMixin(MyProfilePage.prototype, ReactMeteorData);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NotFound.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/NotFound.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var module1 = module;
module1.export({
  NotFound: function () {
    return NotFound;
  }
});
var Alert, Grid;
module1.link("react-bootstrap", {
  Alert: function (v) {
    Alert = v;
  },
  Grid: function (v) {
    Grid = v;
  }
}, 0);
var React;
module1.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var VerticalCanvas;
module1.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  }
}, 2);
var get;
module1.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 3);
var Meteor;
module1.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 4);

var NotFound = function () {
  return React.createElement("div", {
    id: "notFoundPage"
  }, React.createElement(VerticalCanvas, null, React.createElement("h4", {
    style: {
      textAlign: "center"
    }
  }, React.createElement("strong", null, "Error [404]"), ": ", window.location.pathname, " does not exist."), React.createElement("br", null), React.createElement(Grid, null, React.createElement(Alert, {
    bsStyle: "warning"
  }, React.createElement("strong", null, "General Troubleshooting"), " ", React.createElement("br", null), "Sometimes you simply request a URL that doesn't exist.", React.createElement("br", null), " ", React.createElement("br", null), React.createElement("ul", null, React.createElement("li", null, "Check the spelling of the URL.")), React.createElement("br", null), "Othertimes, the settings file might be pointing to the wrong location.", React.createElement("br", null), React.createElement("br", null), React.createElement("ol", null, React.createElement("li", null, "Make sure you are using the correct settings file.", React.createElement("pre", null, "meteor --settings /path/to/settings.json")), React.createElement("li", null, "Check the default route in the settings file.", React.createElement("pre", null, "Meteor.settings.public.defaults.route")), React.createElement("li", null, "Make sure you've added the plugin that contains the dashboard component:", React.createElement("pre", null, "meteor add namespace:my-package"))), React.createElement("br", null), React.createElement("strong", null, "Developer Troubleshooting"), " ", React.createElement("br", null), "If you are a developer, your package might not be exporting a route correctly.", React.createElement("br", null), " ", React.createElement("br", null), React.createElement("ul", null, React.createElement("li", null, "Make sure that a ", React.createElement("strong", null, "DynamicRoute"), " is exported from the ", React.createElement("strong", null, "index.jsx"), " file of your custom package."), React.createElement("li", null, "Make sure that your ", React.createElement("strong", null, "index.js"), " is added as the main ES6 module of your package."), React.createElement("li", null, "Make sure that you've added your package to the application."))))));
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NotificationsPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/NotificationsPage.jsx                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  NotificationsPage: function () {
    return NotificationsPage;
  }
});
var List, ListItem;
module.link("material-ui/List", {
  List: function (v) {
    List = v;
  },
  ListItem: function (v) {
    ListItem = v;
  }
}, 0);
var blue600, gray600, green600, orange600, red600, yellow600;
module.link("material-ui/styles/colors", {
  blue600: function (v) {
    blue600 = v;
  },
  gray600: function (v) {
    gray600 = v;
  },
  green600: function (v) {
    green600 = v;
  },
  orange600: function (v) {
    orange600 = v;
  },
  red600: function (v) {
    red600 = v;
  },
  yellow600: function (v) {
    yellow600 = v;
  }
}, 1);
var GlassCard, Glass, DynamicSpacer, VerticalCanvas;
module.link("meteor/clinical:glass-ui", {
  GlassCard: function (v) {
    GlassCard = v;
  },
  Glass: function (v) {
    Glass = v;
  },
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  }
}, 2);
var CardHeader, CardText, CardTitle;
module.link("material-ui/Card", {
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 3);
var ActionInfo;
module.link("material-ui/svg-icons/action/info", {
  "default": function (v) {
    ActionInfo = v;
  }
}, 4);
var AddCircleOutline;
module.link("material-ui/svg-icons/content/add-circle-outline", {
  "default": function (v) {
    AddCircleOutline = v;
  }
}, 5);
var Archive;
module.link("material-ui/svg-icons/content/archive", {
  "default": function (v) {
    Archive = v;
  }
}, 6);
var Avatar;
module.link("material-ui/Avatar", {
  "default": function (v) {
    Avatar = v;
  }
}, 7);
var Block;
module.link("material-ui/svg-icons/content/block", {
  "default": function (v) {
    Block = v;
  }
}, 8);
var Clear;
module.link("material-ui/svg-icons/content/clear", {
  "default": function (v) {
    Clear = v;
  }
}, 9);
var ContentCopy;
module.link("material-ui/svg-icons/content/content-copy", {
  "default": function (v) {
    ContentCopy = v;
  }
}, 10);
var ContentPaste;
module.link("material-ui/svg-icons/content/content-paste", {
  "default": function (v) {
    ContentPaste = v;
  }
}, 11);
var Divider;
module.link("material-ui/Divider", {
  "default": function (v) {
    Divider = v;
  }
}, 12);
var Error;
module.link("material-ui/svg-icons/alert/error", {
  "default": function (v) {
    Error = v;
  }
}, 13);
var ErrorOutline;
module.link("material-ui/svg-icons/alert/error-outline", {
  "default": function (v) {
    ErrorOutline = v;
  }
}, 14);
var Flag;
module.link("material-ui/svg-icons/content/flag", {
  "default": function (v) {
    Flag = v;
  }
}, 15);
var Mail;
module.link("material-ui/svg-icons/content/mail", {
  "default": function (v) {
    Mail = v;
  }
}, 16);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 17);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 18);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 19);
var RemoveCircleOutline;
module.link("material-ui/svg-icons/content/remove-circle-outline", {
  "default": function (v) {
    RemoveCircleOutline = v;
  }
}, 20);
var Report;
module.link("material-ui/svg-icons/content/report", {
  "default": function (v) {
    Report = v;
  }
}, 21);
var Subheader;
module.link("material-ui/Subheader", {
  "default": function (v) {
    Subheader = v;
  }
}, 22);
var Unarchive;
module.link("material-ui/svg-icons/content/unarchive", {
  "default": function (v) {
    Unarchive = v;
  }
}, 23);
var Warning;
module.link("material-ui/svg-icons/alert/warning", {
  "default": function (v) {
    Warning = v;
  }
}, 24);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 25);
var FlatButton;
module.link("material-ui/FlatButton", {
  "default": function (v) {
    FlatButton = v;
  }
}, 26);
var Dialog;
module.link("material-ui/Dialog", {
  "default": function (v) {
    Dialog = v;
  }
}, 27);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 28);
var Swipeable;
module.link("react-swipeable", {
  "default": function (v) {
    Swipeable = v;
  }
}, 29);
Session.setDefault('currentPatientReference', {
  display: '',
  reference: ''
}); // import { SwipeEventExample } from '/imports/ui/components/SwipeEventExample';

var sampleNotifications = [{
  primaryText: "Record copied",
  secondaryText: "Jan 20, 2014",
  icon: 'ContentCopy',
  color: 'green600'
}, {
  primaryText: "Medication warning",
  secondaryText: "Jan 10, 2014",
  icon: 'Warning',
  color: 'yellow600'
}, {
  primaryText: "New clinical note",
  secondaryText: "Jan 10, 2014",
  icon: 'AddCircleOutline',
  color: 'green600'
}, {
  primaryText: "Archive export",
  secondaryText: "Jan 10, 2014",
  icon: 'Archive',
  color: 'green600'
}, {
  primaryText: "Unencrypted email",
  secondaryText: "Jan 10, 2014",
  icon: 'Mail',
  color: 'orange600'
}, {
  primaryText: "Record copied",
  secondaryText: "Jan 10, 2014",
  icon: 'ContentPaste',
  color: 'green600'
}, {
  primaryText: "Record removed",
  secondaryText: "Jan 10, 2014",
  icon: 'RemoveCircleOutline',
  color: 'green600'
}, {
  primaryText: "Report!",
  secondaryText: "Jan 10, 2014",
  icon: 'Report',
  color: 'red600'
}, {
  primaryText: "Report!",
  secondaryText: "Jan 10, 2014",
  icon: 'Flag',
  color: 'orange600'
}, {
  primaryText: "Blocked!",
  secondaryText: "Jan 10, 2014",
  icon: 'Block',
  color: 'red600'
}, {
  primaryText: "Unarchive",
  secondaryText: "Jan 10, 2014",
  icon: 'Unarchive',
  color: 'green600'
}];
Session.setDefault('catchDialogOpen', false);

var NotificationsPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(NotificationsPage, _React$Component);

  function NotificationsPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = NotificationsPage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          notification: Glass.darkroom({
            borderTop: '1px solid lightgray'
          }),
          title: Glass.darkroom()
        },
        catchDialog: {
          open: false,
          patient: {
            display: '',
            reference: ''
          }
        },
        notifications: [] // notifications: sampleNotifications

      };

      if (Session.get('currentPatientReference')) {
        data.catchDialog.patient = Session.get('currentPatientReference');
      }

      if (get(Meteor.user(), 'profile.incomingPatient')) {
        data.catchDialog.patient = get(Meteor.user(), 'profile.incomingPatient');
        data.catchDialog.open = true;
      }

      if (get(Meteor.user(), 'profile.notifications')) {
        data.notifications = get(Meteor.user(), 'profile.notifications');
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.onNotificationClick = function () {
    function onNotificationClick(message) {
      console.log('lets try to remove this item...', message);
      Meteor.call('removeSpecificNotification', message);
    }

    return onNotificationClick;
  }();

  _proto.handleCloseCatch = function () {
    function handleCloseCatch() {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $unset: {
          'profile.incomingPatient': ''
        }
      });
    }

    return handleCloseCatch;
  }();

  _proto.swiping = function () {
    function swiping(e, deltaX, deltaY, absX, absY, velocity) {//console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
      //alert("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
    }

    return swiping;
  }();

  _proto.swipingLeft = function () {
    function swipingLeft(e, absX) {
      console.log("You're Swiping to the Left...", e, absX); //alert("You're Swiping to the Left...", e, absX)
    }

    return swipingLeft;
  }();

  _proto.swiped = function () {
    function swiped(e, deltaX, deltaY, isFlick, velocity) {//console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
    }

    return swiped;
  }();

  _proto.swipedUp = function () {
    function swipedUp(e, deltaY, isFlick) {
      console.log("You Swiped Up...", e, deltaY, isFlick);
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.inbox': true,
          'profile.incomingPatient': {
            reference: Meteor.userId(),
            display: Meteor.user().fullName()
          }
        }
      });
    }

    return swipedUp;
  }();

  _proto.render = function () {
    function render() {
      var self = this;
      var notificationItems = [];
      this.data.notifications.forEach(function (notification, index) {
        var newNotification = React.createElement(ListItem, {
          key: index,
          leftAvatar: React.createElement(Avatar, {
            icon: React.createElement(Warning, null),
            backgroundColor: yellow600
          }),
          rightIcon: React.createElement(Clear, null),
          primaryText: notification.primaryText,
          secondaryText: notification.secondaryText,
          style: self.data.style.notification,
          Sidebar: true,
          onClick: self.onNotificationClick.bind(this, notification.primaryText)
        });
        notificationItems.push(newNotification);
      });
      var catchActions = [React.createElement(FlatButton, {
        label: "Accept",
        primary: true,
        keyboardFocused: true,
        onClick: this.handleCloseCatch
      }), React.createElement(FlatButton, {
        label: "Dismiss",
        primary: true,
        onClick: this.handleCloseCatch
      })];
      console.log('notificationItems', notificationItems);
      var notificationPanel;

      if (this.data.notifications.length > 0) {
        notificationPanel = React.createElement(GlassCard, {
          height: "auto"
        }, React.createElement(CardTitle, {
          title: "Notifications",
          titleStyle: this.data.style.title
        }), React.createElement(CardText, null, React.createElement(List, null, notificationItems)));
      }

      return React.createElement("div", {
        id: "notificationsPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(Swipeable, {
        onSwiping: this.swiping,
        onSwipingLeft: this.swipingLeft,
        onSwiped: this.swiped,
        onSwipedUp: this.swipedUp
      }, notificationPanel, React.createElement(Dialog, {
        actions: catchActions,
        modal: false,
        open: this.data.catchDialog.open,
        onRequestClose: this.handleCloseCatch
      }, React.createElement(CardText, null, React.createElement("h2", null, get(this, 'data.catchDialog.patient.display')), React.createElement("h4", {
        className: "barcode"
      }, get(this, 'data.catchDialog.patient.reference')))))));
    }

    return render;
  }();

  return NotificationsPage;
}(React.Component);

ReactMixin(NotificationsPage.prototype, ReactMeteorData);
module.exportDefault(NotificationsPage);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PasswordManagementPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/PasswordManagementPage.jsx                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  PasswordManagementPage: function () {
    return PasswordManagementPage;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var AboutAppCard;
module.link("/imports/ui/components/AboutAppCard", {
  AboutAppCard: function (v) {
    AboutAppCard = v;
  }
}, 1);
var VerticalCanvas, GlassCard;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  }
}, 2);
var CardActions, CardHeader, CardText, CardTitle;
module.link("material-ui/Card", {
  CardActions: function (v) {
    CardActions = v;
  },
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 3);

var PasswordManagementPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PasswordManagementPage, _React$Component);

  function PasswordManagementPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = PasswordManagementPage.prototype;

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "passwordManagementPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, {
        height: "auto",
        width: "768px"
      }, React.createElement(CardTitle, {
        title: "Password Management"
      }), React.createElement(CardText, null))));
    }

    return render;
  }();

  return PasswordManagementPage;
}(React.Component);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PreferencesPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/PreferencesPage.jsx                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  PreferencesPage: function () {
    return PreferencesPage;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var AboutAppCard;
module.link("/imports/ui/components/AboutAppCard", {
  AboutAppCard: function (v) {
    AboutAppCard = v;
  }
}, 1);
var VerticalCanvas, GlassCard;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  }
}, 2);
var CardActions, CardHeader, CardText, CardTitle;
module.link("material-ui/Card", {
  CardActions: function (v) {
    CardActions = v;
  },
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 3);

var PreferencesPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PreferencesPage, _React$Component);

  function PreferencesPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = PreferencesPage.prototype;

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "preferencesPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, {
        height: "auto",
        width: "768px"
      }, React.createElement(CardTitle, {
        title: "Preferences"
      }), React.createElement(CardText, null))));
    }

    return render;
  }();

  return PreferencesPage;
}(React.Component);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PrivacyPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/PrivacyPage.jsx                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  PrivacyPage: function () {
    return PrivacyPage;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var PrivacyPolicyCard;
module.link("/imports/ui/components/PrivacyPolicyCard", {
  PrivacyPolicyCard: function (v) {
    PrivacyPolicyCard = v;
  }
}, 1);
var PrivacyControlsCard;
module.link("/imports/ui/components/PrivacyControlsCard", {
  PrivacyControlsCard: function (v) {
    PrivacyControlsCard = v;
  }
}, 2);
var GlassCard, VerticalCanvas, DynamicSpacer;
module.link("meteor/clinical:glass-ui", {
  GlassCard: function (v) {
    GlassCard = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  }
}, 3);
var Card, CardMedia, CardTitle, CardText, CardActions;
module.link("material-ui", {
  Card: function (v) {
    Card = v;
  },
  CardMedia: function (v) {
    CardMedia = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardActions: function (v) {
    CardActions = v;
  }
}, 4);

var PrivacyPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PrivacyPage, _React$Component);

  function PrivacyPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = PrivacyPage.prototype;

  _proto.render = function () {
    function render() {
      var privacyControls;

      if (Meteor.userId()) {
        privacyControls = React.createElement(PrivacyControlsCard, null);
      }

      return React.createElement("div", {
        id: "privacyPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, {
        height: "auto"
      }, React.createElement(PrivacyPolicyCard, null), privacyControls)));
    }

    return render;
  }();

  return PrivacyPage;
}(React.Component);

module.exportDefault(PrivacyPage);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"RecoverPassword.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/RecoverPassword.jsx                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  RecoverPassword: function () {
    return RecoverPassword;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var Row, Col, Alert, FormGroup, FormControl, Button;
module.link("react-bootstrap", {
  Row: function (v) {
    Row = v;
  },
  Col: function (v) {
    Col = v;
  },
  Alert: function (v) {
    Alert = v;
  },
  FormGroup: function (v) {
    FormGroup = v;
  },
  FormControl: function (v) {
    FormControl = v;
  },
  Button: function (v) {
    Button = v;
  }
}, 3);
var handleRecoverPassword;
module.link("/imports/client/entry/handleRecoverPassword", {
  handleRecoverPassword: function (v) {
    handleRecoverPassword = v;
  }
}, 4);
var MobilePadding;
module.link("/imports/ui/components/MobilePadding", {
  MobilePadding: function (v) {
    MobilePadding = v;
  }
}, 5);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 6);
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 7);
var Bert;
module.link("meteor/clinical:alert", {
  Bert: function (v) {
    Bert = v;
  }
}, 8);
var RaisedButton;
module.link("material-ui/RaisedButton", {
  "default": function (v) {
    RaisedButton = v;
  }
}, 9);
var TextField;
module.link("material-ui/TextField", {
  "default": function (v) {
    TextField = v;
  }
}, 10);
var Theme;
module.link("/imports/api/Theme", {
  "default": function (v) {
    Theme = v;
  }
}, 11);
var lightBaseTheme, darkBaseTheme;
module.link("material-ui/styles", {
  lightBaseTheme: function (v) {
    lightBaseTheme = v;
  },
  darkBaseTheme: function (v) {
    darkBaseTheme = v;
  }
}, 12);
var VerticalCanvas;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  }
}, 13);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 14);

var RecoverPassword =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(RecoverPassword, _React$Component);

  function RecoverPassword() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RecoverPassword.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      handleRecoverPassword({
        component: this
      });
    }

    return componentDidMount;
  }();

  _proto.handleSubmit = function () {
    function handleSubmit(event) {
      event.preventDefault();
    }

    return handleSubmit;
  }();

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          textColor: {
            color: lightBaseTheme.palette.textColor
          },
          inputStyle: {
            color: lightBaseTheme.palette.textColor
          },
          errorStyle: {
            color: lightBaseTheme.palette.accent1Color
          },
          hintStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          },
          underlineStyle: {
            borderColor: lightBaseTheme.palette.textColor
          },
          floatingLabelStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          },
          floatingLabelFocusStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          }
        }
      };

      if (get(Meteor, 'settings.public.theme.darkroomTextEnabled')) {
        data.style.textColor.color = darkBaseTheme.palette.textColor;
        data.style.inputStyle.color = darkBaseTheme.palette.textColor;
        data.style.errorStyle.color = darkBaseTheme.palette.accent1Color;
        data.style.hintStyle.color = darkBaseTheme.palette.secondaryTextColor;
        data.style.underlineStyle.color = darkBaseTheme.palette.textColor;
        data.style.floatingLabelStyle.color = darkBaseTheme.palette.secondaryTextColor;
        data.style.floatingLabelFocusStyle.color = darkBaseTheme.palette.secondaryTextColor;
      }

      if (process.env.NODE_ENV === "test") console.log("Signin[data]", data);
      return data;
    }

    return getMeteorData;
  }();

  _proto.recoverPassword = function () {
    function recoverPassword() {
      console.log("recoverPassword");
    }

    return recoverPassword;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "recoverPasswordPage"
      }, React.createElement(MobilePadding, null, React.createElement(VerticalCanvas, null, React.createElement("h4", {
        className: "page-header",
        style: this.data.style.underlineStyle
      }, "Recover Password"), React.createElement(Alert, {
        bsStyle: "info"
      }, "Enter your email address below to receive a link to reset your password."), React.createElement("form", {
        ref: "recoverPassword",
        className: "recover-password",
        onSubmit: this.handleSubmit
      }, React.createElement(FormGroup, null, React.createElement(TextField, {
        id: "recoverPasswordEmailInput",
        ref: "emailAddress",
        name: "emailAddress",
        type: "email",
        floatingLabelText: "Email Address",
        inputStyle: this.data.style.inputStyle,
        hintStyle: this.data.style.hintStyle,
        errorStyle: this.data.style.errorStyle,
        underlineStyle: this.data.style.underlineStyle,
        floatingLabelStyle: this.data.style.floatingLabelStyle,
        floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
        fullWidth: true
      }), React.createElement("br", null)), React.createElement(RaisedButton, {
        id: "recoverPasswordButton",
        type: "submit",
        onClick: this.recoverPassword,
        label: "Recover Password",
        primary: true
      })))));
    }

    return render;
  }();

  return RecoverPassword;
}(React.Component);

ReactMixin(RecoverPassword.prototype, ReactMeteorData);
module.exportDefault(RecoverPassword);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ResetPassword.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/ResetPassword.jsx                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  ResetPassword: function () {
    return ResetPassword;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button;
module.link("react-bootstrap", {
  Row: function (v) {
    Row = v;
  },
  Col: function (v) {
    Col = v;
  },
  Alert: function (v) {
    Alert = v;
  },
  FormGroup: function (v) {
    FormGroup = v;
  },
  ControlLabel: function (v) {
    ControlLabel = v;
  },
  FormControl: function (v) {
    FormControl = v;
  },
  Button: function (v) {
    Button = v;
  }
}, 1);
var handleResetPassword;
module.link("/imports/client/entry/handleResetPassword", {
  handleResetPassword: function (v) {
    handleResetPassword = v;
  }
}, 2);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 3);
var VerticalCanvas;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  }
}, 4);

var ResetPassword =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ResetPassword, _React$Component);

  function ResetPassword() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ResetPassword.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      handleResetPassword({
        component: this,
        token: this.props.params.token
      });
    }

    return componentDidMount;
  }();

  _proto.handleSubmit = function () {
    function handleSubmit(event) {
      event.preventDefault();
    }

    return handleSubmit;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement(Row, null, React.createElement(Col, {
        xs: 12,
        sm: 6,
        md: 4
      }, React.createElement("h4", {
        className: "page-header"
      }, "Reset Password"), React.createElement(Alert, {
        bsStyle: "info"
      }, "To reset your password, enter a new one below. You will be logged in with your new password."), React.createElement("form", {
        ref: "resetPassword",
        className: "reset-password",
        onSubmit: this.handleSubmit
      }, React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "New Password"), React.createElement(FormControl, {
        type: "password",
        ref: "newPassword",
        name: "newPassword",
        placeholder: "New Password"
      })), React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "Repeat New Password"), React.createElement(FormControl, {
        type: "password",
        ref: "repeatNewPassword",
        name: "repeatNewPassword",
        placeholder: "Repeat New Password"
      })), React.createElement(Button, {
        type: "submit",
        bsStyle: "success"
      }, "Reset Password & Signin"))));
    }

    return render;
  }();

  return ResetPassword;
}(React.Component);

ResetPassword.propTypes = {
  params: PropTypes.object
};
module.exportDefault(ResetPassword);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Signin.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/Signin.jsx                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  Signin: function () {
    return Signin;
  }
});
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 1);
var MobilePadding;
module.link("/imports/ui/components/MobilePadding", {
  MobilePadding: function (v) {
    MobilePadding = v;
  }
}, 2);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 3);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 4);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 5);
var FullPageCanvas, GlassCard;
module.link("meteor/clinical:glass-ui", {
  FullPageCanvas: function (v) {
    FullPageCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  }
}, 6);
var CardText, CardActions, CardTitle, TextField, RaisedButton;
module.link("material-ui", {
  CardText: function (v) {
    CardText = v;
  },
  CardActions: function (v) {
    CardActions = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  },
  TextField: function (v) {
    TextField = v;
  },
  RaisedButton: function (v) {
    RaisedButton = v;
  }
}, 7);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 8);
var Row, Col;
module.link("react-bootstrap", {
  Row: function (v) {
    Row = v;
  },
  Col: function (v) {
    Col = v;
  }
}, 9);
var lightBaseTheme, darkBaseTheme;
module.link("material-ui/styles", {
  lightBaseTheme: function (v) {
    lightBaseTheme = v;
  },
  darkBaseTheme: function (v) {
    darkBaseTheme = v;
  }
}, 10);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 11);

if (Package['symptomatic:smart-on-fhir-client']) {
  var _OAuth;

  module.link("meteor/symptomatic:smart-on-fhir-client", {
    OAuth: function (v) {
      _OAuth = v;
    }
  }, 12);
}

Session.setDefault('signinWithSearch', '');

var Signin =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Signin, _React$Component);

  function Signin() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Signin.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          textColor: {
            color: lightBaseTheme.palette.textColor
          },
          inputStyle: {
            color: lightBaseTheme.palette.textColor
          },
          errorStyle: {
            color: lightBaseTheme.palette.accent1Color
          },
          hintStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          },
          underlineStyle: {
            borderColor: lightBaseTheme.palette.textColor
          },
          floatingLabelStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          },
          floatingLabelFocusStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          }
        },
        endpoints: [],
        services: []
      };

      if (Endpoints.find().count() > 0) {
        data.endpoints = Endpoints.find({
          'name': {
            $regex: Session.get('signinWithSearch'),
            $options: 'i'
          }
        }).fetch();
      }

      if (Package['symptomatic:smart-on-fhir-client']) {
        if (ServiceConfiguration) {
          data.services = ServiceConfiguration.configurations.find().fetch();
        }
      }

      if (get(Meteor, 'settings.theme.darkroomTextEnabled')) {
        data.style.textColor.color = darkBaseTheme.palette.textColor;
        data.style.inputStyle.color = darkBaseTheme.palette.textColor;
        data.style.errorStyle.color = darkBaseTheme.palette.accent1Color;
        data.style.hintStyle.color = darkBaseTheme.palette.secondaryTextColor;
        data.style.underlineStyle.color = darkBaseTheme.palette.textColor;
        data.style.floatingLabelStyle.color = darkBaseTheme.palette.secondaryTextColor;
        data.style.floatingLabelFocusStyle.color = darkBaseTheme.palette.secondaryTextColor;
      }

      if (process.env.NODE_ENV === "test") console.log("Signin[data]", data);
      return data;
    }

    return getMeteorData;
  }();

  _proto.handleSubmit = function () {
    function handleSubmit(event) {
      event.preventDefault();
    }

    return handleSubmit;
  }();

  _proto.forgotPasswordRoute = function () {
    function forgotPasswordRoute() {
      browserHistory.push('/recover-password');
    }

    return forgotPasswordRoute;
  }();

  _proto.signInWith = function () {
    function signInWith(serviceName, event) {
      console.log('Signin.signInWith', serviceName);
      var self = this;
      var options = {
        requestPermissions: ['OBSERVATION.READ', 'OBSERVATION.SEARCH', 'PATIENT.READ', 'PATIENT.SEARCH', 'PRACTITIONER.READ', 'PRACTITIONER.SEARCH', 'patient/*.read', 'patient/*.search', 'openid', 'profile', 'user/*.*', 'launch', 'online_access']
      };
      console.log('Accounts.oauth.serviceNames', Accounts.oauth.serviceNames()); //console.log('Accounts.oauth.credentialRequestCompleteHandler()');

      var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(function (error, result) {
        if (error) {
          console.log('error', error);
        }

        browserHistory.push(get(Meteor, 'settings.public.defaults.route', '/'));
        console.log('Callback complete!');
      });
      var credentialResult = OAuth.requestCredential(options, credentialRequestCompleteCallback);
      console.log('credentialResult', credentialResult);
      Meteor.call('fetchAccessToken', serviceName, function (err, result) {
        if (result) {
          console.log('result.accessToken', result.accessToken);
          Session.set('oauthAccessToken', result.accessToken);
        }
      });
    }

    return signInWith;
  }();

  _proto.handleTouchTap = function () {
    function handleTouchTap(event, foo, value) {
      if (process.env.NODE_ENV === "test") {
        console.log('Signin.handleTouchTap', event, foo, value);
        console.log("this", this);
      }

      var self = this;
      Meteor.loginWithPassword(this.refs.emailAddress.input.value, this.refs.password.input.value, function (error) {
        if (error) {
          Bert.alert(error.reason, 'warning');
        } else {
          Bert.alert('Logged in!', 'success'); // we might have received a custom path to route to
          // depending on which signin component we used

          if (self.props.state && self.props.state.nextPathname) {
            browserHistory.push(location.state.nextPathname);
          } else if (Roles.userIsInRole(Meteor.userId(), 'practitioner') && get(Meteor.user(), 'profile.firstTimeVisit')) {
            browserHistory.push('/welcome/practitioner');
          } else if (Roles.userIsInRole(Meteor.userId(), 'sysadmin') && get(Meteor.user(), 'profile.firstTimeVisit')) {
            browserHistory.push('/welcome/sysadmin');
          } else if (get(Meteor, 'settings.public.defaults.route')) {
            // but normally we just use the default route specified in settings.json
            browserHistory.push(get(Meteor, 'settings.public.defaults.route', '/'));
          } else {
            // and fall back to the root if not specified
            browserHistory.push('/');
          }
        }
      });
    }

    return handleTouchTap;
  }();

  _proto.handleKeyPress = function () {
    function handleKeyPress(e) {
      if (e.key === 'Enter') {
        this.handleTouchTap(e);
      }
    }

    return handleKeyPress;
  }();

  _proto.handleSearch = function () {
    function handleSearch(event, serviceName, foo) {
      console.log('Signin.handleSearch', serviceName);
      Session.set('signinWithSearch', serviceName);
    }

    return handleSearch;
  }();

  _proto.render = function () {
    function render() {
      var signinButtons = [];
      var self = this;

      if (this.data.services.length > 0) {
        this.data.services.forEach(function (service) {
          signinButtons.push(React.createElement("div", {
            key: service.service
          }, React.createElement(RaisedButton, {
            label: service.service,
            id: service.service + "Button",
            primary: true,
            onClick: self.signInWith.bind(this, service.service),
            fullWidth: true,
            labelStyle: {
              textTransform: 'capitalize'
            }
          }), React.createElement("br", null), React.createElement("br", null)));
        });
      }

      var buttons = React.createElement("div", null, signinButtons);
      var signInWith;

      if (Package['symptomatic:smart-on-fhir-client'] && get(Meteor, 'settings.publich.registration.signInWith')) {
        signInWith = React.createElement(Col, {
          lgOffset: 4,
          mdOffset: 2,
          lg: 2,
          md: 3
        }, React.createElement(GlassCard, {
          zDepth: 3,
          height: "auto"
        }, React.createElement(CardTitle, {
          title: "Sign in with..."
        }), React.createElement(CardText, null, React.createElement(TextField, {
          type: "searchSignIns",
          ref: "searchSignIns",
          name: "searchSignIns",
          floatingLabelText: "Search...",
          onKeyPress: this.handleKeyPress.bind(this),
          onChange: this.handleSearch.bind(this),
          inputStyle: this.data.style.inputStyle,
          hintStyle: this.data.style.hintStyle,
          errorStyle: this.data.style.errorStyle,
          underlineStyle: this.data.style.underlineStyle,
          floatingLabelStyle: this.data.style.floatingLabelStyle,
          floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
          fullWidth: true
        })), React.createElement(CardActions, null, buttons)));
      }

      return React.createElement("div", {
        id: "signinPage"
      }, React.createElement(MobilePadding, null, React.createElement(FullPageCanvas, null, React.createElement(Row, null, React.createElement(Col, {
        lg: 5,
        md: 6,
        sm: 12
      }, React.createElement("h4", {
        className: "page-header",
        style: this.data.style.underlineStyle
      }, "Sign In"), React.createElement(Row, null, React.createElement(Col, {
        mdOffset: 2,
        md: 10
      }, React.createElement("form", {
        ref: "signin",
        className: "signin"
      }, React.createElement(TextField, {
        type: "email",
        ref: "emailAddress",
        name: "emailAddress",
        floatingLabelText: "Email Address",
        onKeyPress: this.handleKeyPress.bind(this),
        inputStyle: this.data.style.inputStyle,
        hintStyle: this.data.style.hintStyle,
        errorStyle: this.data.style.errorStyle,
        underlineStyle: this.data.style.underlineStyle,
        floatingLabelStyle: this.data.style.floatingLabelStyle,
        floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
        fullWidth: true
      }), React.createElement("br", null), React.createElement("br", null), React.createElement(TextField, {
        type: "password",
        ref: "password",
        name: "password",
        floatingLabelText: "Password",
        onKeyPress: this.handleKeyPress.bind(this),
        inputStyle: this.data.style.inputStyle,
        hintStyle: this.data.style.hintStyle,
        errorStyle: this.data.style.errorStyle,
        underlineStyle: this.data.style.underlineStyle,
        floatingLabelStyle: this.data.style.floatingLabelStyle,
        floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
        fullWidth: true
      }), React.createElement("br", null), React.createElement("br", null), React.createElement(RaisedButton, {
        id: "signinButton",
        onClick: this.handleTouchTap.bind(this),
        label: "Signin",
        primary: true
      }), React.createElement(RaisedButton, {
        id: "forgotPasswordButton",
        onClick: this.forgotPasswordRoute,
        label: "Forgot password?",
        style: {
          marginLeft: "20px"
        }
      })))), React.createElement("br", null), React.createElement("br", null)), signInWith))));
    }

    return render;
  }();

  return Signin;
}(React.Component);

ReactMixin(Signin.prototype, ReactMeteorData);
module.exportDefault(Signin);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Signup.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/Signup.jsx                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  Signup: function () {
    return Signup;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var TextField;
module.link("material-ui/TextField", {
  "default": function (v) {
    TextField = v;
  }
}, 3);
var Row, Col;
module.link("react-bootstrap", {
  Row: function (v) {
    Row = v;
  },
  Col: function (v) {
    Col = v;
  }
}, 4);
var VerticalCanvas, Theme;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  Theme: function (v) {
    Theme = v;
  }
}, 5);
var MobilePadding;
module.link("/imports/ui/components/MobilePadding", {
  MobilePadding: function (v) {
    MobilePadding = v;
  }
}, 6);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 7);
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 8);
var Roles;
module.link("meteor/alanning:roles", {
  Roles: function (v) {
    Roles = v;
  }
}, 9);
var RaisedButton;
module.link("material-ui/RaisedButton", {
  "default": function (v) {
    RaisedButton = v;
  }
}, 10);
var lightBaseTheme, darkBaseTheme;
module.link("material-ui/styles", {
  lightBaseTheme: function (v) {
    lightBaseTheme = v;
  },
  darkBaseTheme: function (v) {
    darkBaseTheme = v;
  }
}, 11);
var has, get, set;
module.link("lodash", {
  has: function (v) {
    has = v;
  },
  get: function (v) {
    get = v;
  },
  set: function (v) {
    set = v;
  }
}, 12);
if (process.env.NODE_ENV === "test") console.log("Signup[lightBaseTheme]", lightBaseTheme);
if (process.env.NODE_ENV === "test") console.log("Signup[darkBaseTheme]", darkBaseTheme);

var Signup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Signup, _React$Component);

  function Signup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      form: {
        familyName: '',
        givenName: '',
        emailAddress: '',
        password: '',
        accessCode: ''
      }
    };
    return _this;
  }

  var _proto = Signup.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {//handleSignup({ component: this });
    }

    return componentDidMount;
  }();

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          textColor: {
            color: lightBaseTheme.palette.textColor
          },
          inputStyle: {
            color: lightBaseTheme.palette.textColor
          },
          errorStyle: {
            color: lightBaseTheme.palette.accent1Color
          },
          hintStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          },
          underlineStyle: {
            borderColor: lightBaseTheme.palette.textColor
          },
          floatingLabelStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          },
          floatingLabelFocusStyle: {
            color: lightBaseTheme.palette.secondaryTextColor
          }
        },
        errorText: {
          accessCode: '',
          givenName: '',
          familyName: '',
          emailAddress: '',
          password: ''
        }
      };

      if (get(Meteor, 'settings.public.theme.darkroomTextEnabled')) {
        data.style.textColor.color = darkBaseTheme.palette.textColor;
        data.style.inputStyle.color = darkBaseTheme.palette.textColor;
        data.style.errorStyle.color = darkBaseTheme.palette.accent1Color;
        data.style.hintStyle.color = darkBaseTheme.palette.secondaryTextColor;
        data.style.underlineStyle.color = darkBaseTheme.palette.textColor;
        data.style.floatingLabelStyle.color = darkBaseTheme.palette.secondaryTextColor;
        data.style.floatingLabelFocusStyle.color = darkBaseTheme.palette.secondaryTextColor;
      }

      switch (Session.get('signUpErrorMessage')) {
        case 'Password may not be empty':
          data.errorText.accessCode = '';
          data.errorText.givenName = '';
          data.errorText.familyName = '';
          data.errorText.emailAddress = '';
          data.errorText.password = 'Password may not be empty';
          break;

        case 'Email already exists.':
          data.errorText.accessCode = '';
          data.errorText.givenName = '';
          data.errorText.familyName = '';
          data.errorText.emailAddress = 'Email already exists.';
          data.errorText.password = '';
          break;

        default:
          data.errorText.accessCode = '';
          data.errorText.givenName = '';
          data.errorText.familyName = '';
          data.errorText.emailAddress = '';
          data.errorText.password = '';
      } // if(process.env.NODE_ENV === "test") console.log("Signup[data]", data);


      return data;
    }

    return getMeteorData;
  }();

  _proto.handleSubmit = function () {
    function handleSubmit(event) {
      event.preventDefault();
    }

    return handleSubmit;
  }();

  _proto.signinRoute = function () {
    function signinRoute() {
      browserHistory.push('/signin');
    }

    return signinRoute;
  }();

  _proto.render = function () {
    function render() {
      var formData = this.state.form;
      var acccessCode;

      if (get(Meteor, 'settings.public.defaults.registration.displayAccessCode')) {
        acccessCode = React.createElement(TextField, {
          id: "accessCodeInput",
          name: "accessCode",
          type: "text",
          floatingLabelText: "Have an access code?",
          inputStyle: this.data.style.inputStyle,
          hintStyle: this.data.style.hintStyle,
          errorText: this.data.errorText.accessCode,
          errorStyle: this.data.style.errorStyle,
          underlineStyle: this.data.style.underlineStyle,
          floatingLabelStyle: this.data.style.floatingLabelStyle,
          floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
          onChange: this.changeState.bind(this, 'accessCode'),
          value: get(formData, 'accessCode'),
          floatingLabelFixed: true
        });
      }

      return React.createElement("div", {
        id: "signupPage"
      }, React.createElement(MobilePadding, null, React.createElement(VerticalCanvas, null, React.createElement("h4", {
        className: "page-header",
        style: this.data.style.underlineStyle
      }, "Sign Up"), React.createElement("form", {
        ref: "signup",
        className: "signup",
        onSubmit: this.handleSubmit
      }, React.createElement(Row, null, React.createElement(Col, {
        xs: 6,
        sm: 6
      }, React.createElement(TextField, {
        id: "givenNameInput",
        name: "givenName",
        floatingLabelText: "Given Name",
        inputStyle: this.data.style.inputStyle,
        hintStyle: this.data.style.hintStyle,
        errorText: this.data.errorText.givenName,
        errorStyle: this.data.style.errorStyle,
        underlineStyle: this.data.style.underlineStyle,
        floatingLabelStyle: this.data.style.floatingLabelStyle,
        floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
        onKeyPress: this.handleKeyPress.bind(this),
        onChange: this.changeState.bind(this, 'givenName'),
        value: get(formData, 'givenName'),
        hintText: "Jane",
        floatingLabelFixed: true,
        fullWidth: true
      }), React.createElement("br", null)), React.createElement(Col, {
        xs: 6,
        sm: 6
      }, React.createElement(TextField, {
        id: "familyNameInput",
        name: "familyName",
        type: "text",
        floatingLabelText: "Family Name",
        inputStyle: this.data.style.inputStyle,
        hintStyle: this.data.style.hintStyle,
        errorText: this.data.errorText.familyName,
        errorStyle: this.data.style.errorStyle,
        underlineStyle: this.data.style.underlineStyle,
        floatingLabelStyle: this.data.style.floatingLabelStyle,
        floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
        onKeyPress: this.handleKeyPress.bind(this),
        onChange: this.changeState.bind(this, 'familyName'),
        floatingLabelFixed: true,
        hintText: "Doe",
        value: get(formData, 'familyName'),
        fullWidth: true
      }), React.createElement("br", null))), React.createElement(TextField, {
        id: "emailAddressInput",
        name: "emailAddress",
        type: "text",
        floatingLabelText: "Email Address",
        inputStyle: this.data.style.inputStyle,
        errorText: this.data.errorText.emailAddress,
        errorStyle: this.data.style.errorStyle,
        hintStyle: this.data.style.hintStyle,
        underlineStyle: this.data.style.underlineStyle,
        floatingLabelStyle: this.data.style.floatingLabelStyle,
        floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
        onKeyPress: this.handleKeyPress.bind(this),
        onChange: this.changeState.bind(this, 'emailAddress'),
        value: get(formData, 'emailAddress'),
        hintText: "janedoe@gmail.com",
        floatingLabelFixed: true,
        fullWidth: true
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "passwordInput",
        name: "password",
        type: "password",
        floatingLabelText: "Password",
        inputStyle: this.data.style.inputStyle,
        errorText: this.data.errorText.password,
        errorStyle: this.data.style.errorStyle,
        hintStyle: this.data.style.hintStyle,
        underlineStyle: this.data.style.underlineStyle,
        floatingLabelStyle: this.data.style.floatingLabelStyle,
        floatingLabelFocusStyle: this.data.style.floatingLabelFocusStyle,
        onKeyPress: this.handleKeyPress.bind(this),
        onChange: this.changeState.bind(this, 'password'),
        value: get(formData, 'password'),
        hintText: "**********",
        floatingLabelFixed: true,
        fullWidth: true
      }), React.createElement("br", null), acccessCode, React.createElement("br", null), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null), React.createElement(RaisedButton, {
        id: "signupButton",
        onClick: this.handleTouchTap.bind(this),
        label: "Sign Up",
        primary: true
      }), React.createElement(RaisedButton, {
        id: "alreadyHaveAccountButton",
        onClick: this.signinRoute,
        label: "Already have an account?",
        style: {
          marginLeft: '20px'
        }
      })))));
    }

    return render;
  }();

  _proto.updateFormData = function () {
    function updateFormData(formData, field, textValue) {
      // if(process.env.NODE_ENV === "test") console.log("ObservationDetail.updateFormData", formData, field, textValue);
      switch (field) {
        case "familyName":
          set(formData, 'familyName', textValue);
          break;

        case "givenName":
          set(formData, 'givenName', textValue);
          break;

        case "emailAddress":
          set(formData, 'emailAddress', textValue);
          break;

        case "password":
          set(formData, 'password', textValue);
          break;

        case "accessCode":
          set(formData, 'accessCode', textValue);
          break;
      }

      if (process.env.NODE_ENV === "test") console.log("formData", formData);
      return formData;
    }

    return updateFormData;
  }();

  _proto.changeState = function () {
    function changeState(field, event, textValue) {
      // if(process.env.NODE_ENV === "test") console.log("   ");
      if (process.env.NODE_ENV === "test") console.log("Signup.changeState", field, textValue); // if(process.env.NODE_ENV === "test") console.log("this.state", this.state);

      var formData = Object.assign({}, this.state.form);
      formData = this.updateFormData(formData, field, textValue); // if(process.env.NODE_ENV === "test") console.log("formData", formData);

      this.setState({
        form: formData
      });
    }

    return changeState;
  }();

  _proto.handleTouchTap = function () {
    function handleTouchTap() {
      var newUserData = {
        email: get(this, 'state.form.emailAddress', ''),
        password: get(this, 'state.form.password', ''),
        profile: {
          name: {
            given: get(this, 'state.form.givenName', ''),
            family: get(this, 'state.form.familyName', ''),
            text: get(this, 'state.form.givenName', '') + ' ' + get(this, 'state.form.familyName', '')
          }
        },
        accessCode: get(this, 'state.form.accessCode', '')
      };
      console.log('SignUp.handleTouchTap', this, newUserData);
      console.log(newUserData);
      Accounts.createUser(newUserData, function (error, result) {
        if (error) {
          console.log('Accounts.createUser().error' + error.reason); // Meteor.call('debugToServer', 'Accounts.createUser()', error)

          Session.set('signUpErrorMessage', error.reason); // for some reason, we're getting an "Email already exists!" on signup
          //if (!error.reason.includes("Email already exists.")) {

          Bert.alert(error.reason, 'danger'); //}
        }

        if (result) {
          console.log("Accounts.createUser[result]", result);
          console.log("Accounts.createUser[Meteor.userId()]", Meteor.userId());
          console.log("Accounts.createUser[Roles.userIsInRole(Meteor.userId()]", Roles.userIsInRole(Meteor.userId())); // if this is a patient's first visit, we want to send them to a welcome screen
          // where they can fill out HIPAA

          if (Roles.userIsInRole(Meteor.userId(), 'patient') && get(Meteor.user(), 'profile.firstTimeVisit')) {
            console.log('Routing to /welcome/patient');
            browserHistory.push('/welcome/patient'); // and if they're a practitioner, we probably need to collect some credentialing data
            // and inform them about their obligations regarding HIPAA
          } else if (Roles.userIsInRole(Meteor.userId(), 'practitioner') && get(Meteor.user(), 'profile.firstTimeVisit')) {
            console.log('Routing to /welcome/practitioner');
            browserHistory.push('/welcome/practitioner');
          } else if (Roles.userIsInRole(Meteor.userId(), 'sysadmin') && get(Meteor.user(), 'profile.firstTimeVisit')) {
            console.log('Routing to /welcome/sysadmin');
            browserHistory.push('/welcome/sysadmin');
          } else {
            // otherwise we go to the default route specified in the settings.json file
            if (get(Meteor, 'settings.public.defaults.route')) {
              console.log('Meteor.settings.public.defaults.route', get(Meteor, 'settings.public.defaults.route', '/'));
              browserHistory.push(get(Meteor, 'settings.public.defaults.route', '/'));
            } else {
              // and if all else fails, just go to the root 
              console.log('Routing to /');
              browserHistory.push('/');
            }
          }
        }
      });
    }

    return handleTouchTap;
  }();

  _proto.handleKeyPress = function () {
    function handleKeyPress(e) {
      if (e.key === 'Enter') {
        this.handleTouchTap.bind(this);
      }
    }

    return handleKeyPress;
  }();

  return Signup;
}(React.Component);

ReactMixin(Signup.prototype, ReactMeteorData);
module.exportDefault(Signup);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"TermsConditionsPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/TermsConditionsPage.jsx                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  TermsConditionsPage: function () {
    return TermsConditionsPage;
  }
});
var CardTitle;
module.link("material-ui", {
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var DefaultPrivacyPolicyCard;
module.link("/imports/ui/components/PrivacyPolicyCard", {
  DefaultPrivacyPolicyCard: function (v) {
    DefaultPrivacyPolicyCard = v;
  }
}, 2);
var GlassCard, VerticalCanvas;
module.link("meteor/clinical:glass-ui", {
  GlassCard: function (v) {
    GlassCard = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  }
}, 3);
var TermsConditionsCard;
module.link("../components/TermsConditionsCard", {
  TermsConditionsCard: function (v) {
    TermsConditionsCard = v;
  }
}, 4);

var TermsConditionsPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TermsConditionsPage, _React$Component);

  function TermsConditionsPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = TermsConditionsPage.prototype;

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "TermsConditionsPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, {
        height: "auto"
      }, React.createElement(CardTitle, {
        title: "Terms and Conditions"
      }), React.createElement(TermsConditionsCard, null))));
    }

    return render;
  }();

  return TermsConditionsPage;
}(React.Component);

module.exportDefault(TermsConditionsPage);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ThemePage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/ThemePage.jsx                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  ThemePage: function () {
    return ThemePage;
  }
});
var CardActions, CardText, CardTitle;
module.link("material-ui/Card", {
  CardActions: function (v) {
    CardActions = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var Tab, Tabs, FlatButton, FontIcon, RaisedButton, TextField;
module.link("material-ui", {
  Tab: function (v) {
    Tab = v;
  },
  Tabs: function (v) {
    Tabs = v;
  },
  FlatButton: function (v) {
    FlatButton = v;
  },
  FontIcon: function (v) {
    FontIcon = v;
  },
  RaisedButton: function (v) {
    RaisedButton = v;
  },
  TextField: function (v) {
    TextField = v;
  }
}, 1);
var get, has;
module.link("lodash", {
  get: function (v) {
    get = v;
  },
  has: function (v) {
    has = v;
  }
}, 2);
var Alert, Grid, Container, Col, Row;
module.link("react-bootstrap", {
  Alert: function (v) {
    Alert = v;
  },
  Grid: function (v) {
    Grid = v;
  },
  Container: function (v) {
    Container = v;
  },
  Col: function (v) {
    Col = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 3);
var Bert;
module.link("meteor/clinical:alert", {
  Bert: function (v) {
    Bert = v;
  }
}, 4);
var Image;
module.link("react-bootstrap", {
  Image: function (v) {
    Image = v;
  }
}, 5);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 6);
var OpacitySlider;
module.link("/imports/ui/components/OpacitySlider", {
  "default": function (v) {
    OpacitySlider = v;
  }
}, 7);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 8);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 9);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 10);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 11);
var VerticalCanvas, FullPageCanvas, Theme, GlassCard, DynamicSpacer;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  FullPageCanvas: function (v) {
    FullPageCanvas = v;
  },
  Theme: function (v) {
    Theme = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  },
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  }
}, 12);
var setUserTheme;
module.link("../../api/users/methods", {
  setUserTheme: function (v) {
    setUserTheme = v;
  }
}, 13);
var defaultState = {
  index: 0
};
Session.setDefault('themePageState', defaultState);

var ThemePage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ThemePage, _React$Component);

  function ThemePage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = ThemePage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      // this should all be handled by props
      // or a mixin!
      var data = {
        style: {
          opacity: Session.get('globalOpacity')
        },
        state: defaultState,
        colors: {
          colorA: '',
          colorB: '',
          colorC: '',
          colorD: '',
          colorE: '',
          colorF: ''
        }
      };

      if (Session.get('themePageState')) {
        data.state = Session.get('themePageState');
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.resetTheme = function () {
    function resetTheme() {
      console.log('reset theme...');
      var resetString = '';

      if (has(Meteor.settings, 'public.theme.backgroundImagePath')) {
        resetString = get(Meteor.settings, 'public.theme.backgroundImagePath');
      }

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.theme.backgroundImagePath': resetString
        }
      });
    }

    return resetTheme;
  }();

  _proto.render = function () {
    function render() {
      var _this = this;

      var backgroundThumbnail = {
        width: '100%',
        display: 'inline-block',
        marginRight: '0px',
        marginBottom: '0px',
        height: '115px',
        objectFit: 'cover'
      }; // deep clone

      var redTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      redTile.background = '#A64C4C';
      var blueTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      blueTile.background = '#89cff0';
      var grayTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      grayTile.background = '#999999';
      var greenTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      greenTile.background = '#AEC9A8';
      var purpleTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      purpleTile.background = '#800080';
      var orangeTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      orangeTile.background = '#ffa500';
      var goldenrodTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      goldenrodTile.background = 'goldenrod';
      var blackTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      blackTile.background = '#000000';
      var charcoalTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      charcoalTile.background = '#222222';
      var grayTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      grayTile.background = '#999999';
      var smokeTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      smokeTile.background = '#dddddd';
      var eggshellTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      eggshellTile.background = '#eeeeee';
      var whiteTile = JSON.parse(JSON.stringify(backgroundThumbnail));
      whiteTile.background = '#FFFFFF'; // Pick up any dynamic routes that are specified in packages, and include them

      var themingAssets = [];
      Object.keys(Package).forEach(function (packageName) {
        if (Package[packageName].ThemingAssets) {
          // we try to build up a route from what's specified in the package
          Package[packageName].ThemingAssets.forEach(function (asset) {
            themingAssets.push(asset);
          });
        }
      });
      return React.createElement("div", {
        id: "aboutPage"
      }, React.createElement(FullPageCanvas, null, React.createElement(Row, null, React.createElement(Col, {
        md: 3
      }, React.createElement(GlassCard, null, React.createElement(CardTitle, {
        title: "Theme",
        subtitle: "Pick a background and color!"
      }), React.createElement(CardText, null, React.createElement(TextField, {
        ref: "colorA",
        name: "colorA",
        type: "text",
        floatingLabelText: "Color A",
        floatingLabelFixed: true,
        value: this.data.colors.colorA
      }), React.createElement("br", null), React.createElement(TextField, {
        ref: "colorB",
        name: "colorB",
        type: "text",
        floatingLabelText: "Color B",
        floatingLabelFixed: true,
        value: this.data.colors.colorB
      }), React.createElement("br", null), React.createElement(TextField, {
        ref: "colorC",
        name: "colorC",
        type: "text",
        floatingLabelText: "Color C",
        floatingLabelFixed: true,
        value: this.data.colors.colorC
      }), React.createElement("br", null), React.createElement(TextField, {
        ref: "colorD",
        name: "colorD",
        type: "text",
        floatingLabelText: "Color D",
        floatingLabelFixed: true,
        value: this.data.colors.colorD
      }), React.createElement("br", null), React.createElement(TextField, {
        ref: "colorE",
        name: "colorE",
        type: "text",
        floatingLabelText: "Color E",
        floatingLabelFixed: true,
        value: this.data.colors.colorE
      }), React.createElement("br", null), React.createElement(TextField, {
        ref: "colorF",
        name: "colorF",
        type: "text",
        floatingLabelText: "Color F",
        floatingLabelFixed: true,
        value: this.data.colors.colorF
      }), React.createElement("br", null))), React.createElement(DynamicSpacer, null), React.createElement(GlassCard, null, React.createElement(CardTitle, {
        title: "Opacity"
      }), React.createElement(OpacitySlider, null)), React.createElement(DynamicSpacer, null), React.createElement(RaisedButton, {
        id: "darkroomButton",
        primary: false,
        fullWidth: true,
        icon: React.createElement(FontIcon, {
          className: "muidocs-icon-image-exposure"
        }),
        onClick: this.clickOnDarkroomButton,
        style: {
          backgroundColor: '#dddddd'
        }
      }, "Darkroom"), React.createElement(DynamicSpacer, null), React.createElement(RaisedButton, {
        id: "resetTheme",
        primary: false,
        onClick: this.resetTheme,
        fullWidth: true
      }, " Reset Theme "), React.createElement(DynamicSpacer, null), React.createElement(DynamicSpacer, null)), React.createElement(Col, {
        md: 9
      }, React.createElement(Row, {
        id: "backgroundImageGallary"
      }, themingAssets.map(function (asset) {
        return React.createElement(Col, {
          md: 2
        }, React.createElement(GlassCard, {
          style: {
            marginBottom: '20px'
          }
        }, React.createElement(Image, {
          name: asset.name,
          ref: asset.name,
          src: asset.src,
          style: backgroundThumbnail,
          responsive: true,
          onClick: _this.onImageClick.bind(_this, asset.src)
        })));
      })), React.createElement(DynamicSpacer, null), React.createElement(Row, null, React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: purpleTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: orangeTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: redTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: greenTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: blueTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: goldenrodTile,
        onClick: this.onColorClick
      })))), React.createElement(DynamicSpacer, null), React.createElement(Row, null, React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: whiteTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: eggshellTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: smokeTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: grayTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: charcoalTile,
        onClick: this.onColorClick
      }))), React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, null, React.createElement(Image, {
        responsive: true,
        style: blackTile,
        onClick: this.onColorClick
      }))))))));
    }

    return render;
  }();

  _proto.handleTabChange = function () {
    function handleTabChange(index) {
      var state = Session.get('themePageState');
      state.index = index;
      Session.set('themePageState', state);
    }

    return handleTabChange;
  }();

  _proto.handleActive = function () {
    function handleActive() {//console.log('Special one activated');
    }

    return handleActive;
  }();

  _proto.onColorClick = function () {
    function onColorClick(event) {
      Session.set('backgroundImagePath', false);
      Session.set('backgroundColor', event.currentTarget.style['background-color']);
      setUserTheme.call({
        _id: Meteor.userId(),
        backgroundColor: event.currentTarget.style['background-color']
      }, function (error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Background color updated!', 'success');
        }
      });
    }

    return onColorClick;
  }();

  _proto.onImageClick = function () {
    function onImageClick(path, event) {
      console.log('onImageClick', path, event);

      if (!path) {
        path = 'backgrounds/medical/' + event.currentTarget['src'].split('/')[5];
      }

      Session.set('backgroundColor', false);
      Session.set('backgroundImagePath', path);
      setUserTheme.call({
        _id: Meteor.userId(),
        backgroundImagePath: path
      }, function (error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Background image updated!', 'success');
        }
      });
    }

    return onImageClick;
  }();

  _proto.onVideoClick = function () {
    function onVideoClick() {
      //console.log("onVideoClick");
      Session.set('backgroundImagePath', false);
      Session.set('backgroundColor', false);
      Session.set('lastVideoRun', new Date()); // we're calling setUserTheme without any parameters, which will reset the theme
      // and use the default video background

      setUserTheme.call({
        _id: Meteor.userId()
      }, function (error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Background image updated!', 'success');
        }
      });
    }

    return onVideoClick;
  }();

  _proto.clickOnDarkroomButton = function () {
    function clickOnDarkroomButton() {
      Session.toggle('darkroomEnabled');
    }

    return clickOnDarkroomButton;
  }();

  return ThemePage;
}(React.Component);

ReactMixin(ThemePage.prototype, ReactMeteorData);
module.exportDefault(ThemePage);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"UsersPage.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/UsersPage.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  UsersPage: function () {
    return UsersPage;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 3);
var TextField;
module.link("material-ui/TextField", {
  "default": function (v) {
    TextField = v;
  }
}, 4);
var RaisedButton;
module.link("material-ui/RaisedButton", {
  "default": function (v) {
    RaisedButton = v;
  }
}, 5);
var VerticalCanvas, GlassCard;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  }
}, 6);
var CardText, CardActions;
module.link("material-ui/Card", {
  CardText: function (v) {
    CardText = v;
  },
  CardActions: function (v) {
    CardActions = v;
  }
}, 7);
var Tabs, Tab;
module.link("material-ui/Tabs", {
  Tabs: function (v) {
    Tabs = v;
  },
  Tab: function (v) {
    Tab = v;
  }
}, 8);
var UserTable;
module.link("/imports/ui/workflows/users/UserTable", {
  UserTable: function (v) {
    UserTable = v;
  }
}, 9);
var userCardTabbedState = {
  index: 0,
  id: "",
  username: "",
  email: "",
  given: "",
  family: ""
};
Session.setDefault('userCardTabbedState', userCardTabbedState);

var UsersPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(UsersPage, _React$Component);

  function UsersPage() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = UsersPage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      // this should all be handled by props
      // or a mixin!
      var data = {
        style: {
          opacity: Session.get('globalOpacity')
        },
        state: userCardTabbedState
      };

      if (Session.get('userCardTabbedState')) {
        data.state = Session.get('userCardTabbedState');
      }

      if (Session.get('darkroomEnabled')) {
        data.style.color = "black";
        data.style.background = "white";
      } else {
        data.style.color = "white";
        data.style.background = "black";
      } // this could be another mixin


      if (Session.get('glassBlurEnabled')) {
        data.style.filter = "blur(3px)";
        data.style.WebkitFilter = "blur(3px)";
      } // this could be another mixin


      if (Session.get('backgroundBlurEnabled')) {
        data.style.backdropFilter = "blur(5px)";
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.handleSaveButton = function () {
    function handleSaveButton() {}

    return handleSaveButton;
  }(); // this could be a mixin


  _proto.handleTabChange = function () {
    function handleTabChange(index) {
      var state = Session.get('userCardTabbedState');
      state["index"] = index;
      Session.set('userCardTabbedState', state);
    }

    return handleTabChange;
  }(); // this could be a mixin


  _proto.changeState = function () {
    function changeState(field, event, value) {
      var state = Session.get('userCardTabbedState');
      state[field] = value;
      Session.set('userCardTabbedState', state);
    }

    return changeState;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "usersPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, null, React.createElement(Tabs, {
        "default": true,
        index: this.data.state.index,
        onChange: this.handleTabChange
      }, React.createElement(Tab, {
        label: "Users",
        onActive: this.handleActive,
        style: {
          backgroundColor: 'white',
          color: 'black',
          borderBottom: '1px solid lightgray'
        }
      }, React.createElement(UserTable, null)), React.createElement(Tab, {
        label: "New",
        style: {
          padded: "20px",
          backgroundColor: 'white',
          color: 'black',
          borderBottom: '1px solid lightgray'
        }
      }, React.createElement(CardText, null, React.createElement(TextField, {
        id: "userIdInput",
        ref: "id",
        name: "id",
        type: "text",
        floatingLabelText: "id",
        value: this.data.state.id,
        onChange: this.changeState.bind(this, 'id')
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "userUsernameInput",
        ref: "username",
        name: "username",
        type: "text",
        floatingLabelText: "username",
        value: this.data.state.username,
        onChange: this.changeState.bind(this, 'username')
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "userEmailInput",
        ref: "email",
        name: "email",
        type: "text",
        floatingLabelText: "email",
        value: this.data.state.email,
        onChange: this.changeState.bind(this, 'email')
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "userFamilyInput",
        ref: "family",
        name: "family",
        type: "text",
        floatingLabelText: "family",
        value: this.data.state.family,
        onChange: this.changeState.bind(this, 'family')
      }), React.createElement("br", null), React.createElement(TextField, {
        id: "userGivenInput",
        ref: "given",
        name: "given",
        type: "text",
        floatingLabelText: "given",
        value: this.data.state.given,
        onChange: this.changeState.bind(this, 'given')
      }), React.createElement("br", null)), React.createElement(CardActions, null, React.createElement(RaisedButton, {
        label: "Save",
        primary: true,
        onClick: this.handleSaveButton
      }), React.createElement(RaisedButton, {
        label: "Clear",
        onClick: this.handleCancelButton
      })))))));
    }

    return render;
  }();

  return UsersPage;
}(React.Component);

UsersPage.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(UsersPage.prototype, ReactMeteorData);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WelcomeAdminPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/WelcomeAdminPage.jsx                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  WelcomeAdminPage: function () {
    return WelcomeAdminPage;
  }
});
var CardActions, CardText, CardTitle;
module.link("material-ui/Card", {
  CardActions: function (v) {
    CardActions = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var Alert;
module.link("react-bootstrap", {
  Alert: function (v) {
    Alert = v;
  }
}, 1);
var FlatButton;
module.link("material-ui/FlatButton", {
  "default": function (v) {
    FlatButton = v;
  }
}, 2);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 3);
var VerticalCanvas, GlassCard;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  }
}, 4);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 5);

var WelcomeAdminPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(WelcomeAdminPage, _React$Component);

  function WelcomeAdminPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = WelcomeAdminPage.prototype;

  _proto.handleGo = function () {
    function handleGo() {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.firstTimeVisit': false
        }
      });
      browserHistory.push('/');
    }

    return handleGo;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "welcomeAdminPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, null, React.createElement(CardTitle, {
        title: "New Admin Setup"
      }), React.createElement(CardText, null, React.createElement(Alert, {
        bsStyle: "danger"
      }, React.createElement("b", null, "This is software is NOT running in HIPAA Compliance Mode.")), React.createElement("p", null, "To enable HIPAA compliance, you'll need to remove the autopublish packages, write your own pub/sub functions, and then connect to a production Mongo database ", React.createElement("i", null, " that has data encryption at rest enabled"), "."), React.createElement("pre", null, "# meteor remove autopublish ", React.createElement("br", null), "# meteor remove clinical:autopublish ", React.createElement("br", null), "# MONGO_URL=mongodb://[username]:[password]hostname.com:27017/databasename meteor --settings settings.prod.json")), React.createElement(CardTitle, {
        title: "Admin Checklist"
      }), React.createElement(CardText, null, React.createElement("p", null, "Let's make sure your site is configured correctly...")), React.createElement(CardActions, null, React.createElement(FlatButton, {
        id: "acceptWelcomePageButton",
        label: "Accept",
        onClick: this.handleGo
      })))));
    }

    return render;
  }();

  return WelcomeAdminPage;
}(React.Component);

module.exportDefault(WelcomeAdminPage);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WelcomePatientPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/WelcomePatientPage.jsx                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  WelcomePatientPage: function () {
    return WelcomePatientPage;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 3);
var CardActions, CardText, CardTitle, FlatButton, Step, Stepper, StepContent, StepLabel, RaisedButton, TextField;
module.link("material-ui", {
  CardActions: function (v) {
    CardActions = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  },
  FlatButton: function (v) {
    FlatButton = v;
  },
  Step: function (v) {
    Step = v;
  },
  Stepper: function (v) {
    Stepper = v;
  },
  StepContent: function (v) {
    StepContent = v;
  },
  StepLabel: function (v) {
    StepLabel = v;
  },
  RaisedButton: function (v) {
    RaisedButton = v;
  },
  TextField: function (v) {
    TextField = v;
  }
}, 4);
var FullPageCanvas, GlassCard, DynamicSpacer;
module.link("meteor/clinical:glass-ui", {
  FullPageCanvas: function (v) {
    FullPageCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  },
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  }
}, 5);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 6);
var Alert, Grid, Container, Col, Row;
module.link("react-bootstrap", {
  Alert: function (v) {
    Alert = v;
  },
  Grid: function (v) {
    Grid = v;
  },
  Container: function (v) {
    Container = v;
  },
  Col: function (v) {
    Col = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 7);
var TermsConditionsCard;
module.link("../components/TermsConditionsCard", {
  TermsConditionsCard: function (v) {
    TermsConditionsCard = v;
  }
}, 8);
var PrivacyPolicyCard;
module.link("../components/PrivacyPolicyCard", {
  PrivacyPolicyCard: function (v) {
    PrivacyPolicyCard = v;
  }
}, 9);
var PrivacyControlsCard;
module.link("../components/PrivacyControlsCard", {
  PrivacyControlsCard: function (v) {
    PrivacyControlsCard = v;
  }
}, 10);
var FaInfoCircle;
module.link("react-icons/fa", {
  FaInfoCircle: function (v) {
    FaInfoCircle = v;
  }
}, 11);
var FaMars;
module.link("react-icons/fa", {
  FaMars: function (v) {
    FaMars = v;
  }
}, 12);
var FaVenus;
module.link("react-icons/fa", {
  FaVenus: function (v) {
    FaVenus = v;
  }
}, 13);
var FaMercury;
module.link("react-icons/fa", {
  FaMercury: function (v) {
    FaMercury = v;
  }
}, 14);
var FaTransgenderAlt;
module.link("react-icons/fa", {
  FaTransgenderAlt: function (v) {
    FaTransgenderAlt = v;
  }
}, 15);
var FaTransgender;
module.link("react-icons/fa", {
  FaTransgender: function (v) {
    FaTransgender = v;
  }
}, 16);
var Image;
module.link("react-bootstrap", {
  Image: function (v) {
    Image = v;
  }
}, 17);
var MedicalRecordImporter;
module.link("meteor/symptomatic:continuity-of-care", {
  MedicalRecordImporter: function (v) {
    MedicalRecordImporter = v;
  }
}, 18);
Session.setDefault('genderMaleBtn', false);
Session.setDefault('genderOtherBtn', false);
Session.setDefault('genderFemaleBtn', false);
Session.setDefault('karyotypeXyBtn', false);
Session.setDefault('karyotypeXxBtn', false);
Session.setDefault('karyotypeXoBtn', false);
Session.setDefault('karyotypeXxxyBtn', false);
Session.setDefault('karyotypeXxyBtn', false);
Session.setDefault('karyotypeUnknownBtn', true);
Session.setDefault('anatomyPhallicBtn', false);
Session.setDefault('anatomyYanicBtn', false);
Session.setDefault('anatomyUndisclosedBtn', false);

var WelcomePatientPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(WelcomePatientPage, _React$Component);

  function WelcomePatientPage(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleNext = function () {
      var stepIndex = _this.state.stepIndex;

      _this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      });
    };

    _this.handlePrev = function () {
      var stepIndex = _this.state.stepIndex;

      if (stepIndex > 0) {
        _this.setState({
          stepIndex: stepIndex - 1
        });
      }
    };

    _this.state = {
      finished: false,
      stepIndex: 0
    };
    return _this;
  }

  var _proto = WelcomePatientPage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {},
        buttons: {
          gender: {
            male: Session.get('genderMaleBtn'),
            other: Session.get('genderOtherBtn'),
            female: Session.get('genderFemaleBtn')
          },
          karyotype: {
            xy: Session.get('karyotypeXyBtn'),
            xx: Session.get('karyotypeXxBtn'),
            xo: Session.get('karyotypeXoBtn'),
            xxy: Session.get('karyotypeXxyBtn'),
            xxxy: Session.get('karyotypeXxxyBtn'),
            unknown: Session.get('karyotypeUnknownBtn')
          },
          anatomy: {
            phallic: Session.get('anatomyPhallicBtn'),
            yanic: Session.get('anatomyYanicBtn'),
            undisclosed: Session.get('anatomyUndisclosedBtn')
          }
        },
        name: {
          family: get(Meteor.user(), 'profile.name.family'),
          given: get(Meteor.user(), 'profile.name.given')
        }
      };
      return data;
    }

    return getMeteorData;
  }();

  _proto.handleGo = function () {
    function handleGo() {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.firstTimeVisit': false
        }
      });
      browserHistory.push('/');
    }

    return handleGo;
  }();

  _proto.getStepContent = function () {
    function getStepContent(stepIndex) {
      switch (stepIndex) {
        case 0:
          return 'Select campaign settings...';

        case 1:
          return 'What is an ad group anyways?';

        case 2:
          return 'This is the bit I really care about!';

        case 3:
          return 'This is the bit I really care about!';

        case 4:
          return 'This is the bit I really care about!';

        default:
          return 'You\'re a long way from home sonny jim!';
      }
    }

    return getStepContent;
  }();

  _proto.renderStepActions = function () {
    function renderStepActions(step) {
      var stepIndex = this.state.stepIndex;
      var actionButtonLabel;

      switch (stepIndex) {
        case 0:
          actionButtonLabel = 'Next';
          break;

        case 1:
          actionButtonLabel = 'Accept';
          break;

        case 2:
          actionButtonLabel = 'Accept';
          break;

        case 3:
          actionButtonLabel = 'Accept';
          break;

        case 4:
          actionButtonLabel = 'Next';
          break;

        case 5:
          actionButtonLabel = 'Next';
          break;

        case 6:
          actionButtonLabel = 'Next';
          break;

        case 7:
          actionButtonLabel = 'Next';
          break;

        case 8:
          actionButtonLabel = 'Next';
          break;

        case 9:
          actionButtonLabel = 'Finish';
          break;

        default:
          break;
      }

      return React.createElement("div", {
        style: {
          margin: '12px 0'
        }
      }, React.createElement(RaisedButton, {
        label: actionButtonLabel,
        disableTouchRipple: true,
        disableFocusRipple: true,
        primary: true,
        onClick: this.handleNext,
        style: {
          marginRight: 12
        }
      }), step > 0 && React.createElement(FlatButton, {
        label: "Back",
        disabled: stepIndex === 0,
        disableTouchRipple: true,
        disableFocusRipple: true,
        onClick: this.handlePrev
      }));
    }

    return renderStepActions;
  }();

  _proto.onMaleDermatogramClick = function () {
    function onMaleDermatogramClick() {
      console.log('onMaleDermatogramClick');
      Session.set('genderMaleBtn', true);
      Session.set('anatomyPhallicBtn', true);
      Session.set('genderFemaleBtn', false);
      Session.set('anatomyYanicBtn', false);
    }

    return onMaleDermatogramClick;
  }();

  _proto.onFemaleDermatogramClick = function () {
    function onFemaleDermatogramClick() {
      console.log('onFemaleDermatogramClick');
      Session.set('genderFemaleBtn', true);
      Session.set('anatomyYanicBtn', true);
      Session.set('genderMaleBtn', false);
      Session.set('anatomyPhallicBtn', false);
    }

    return onFemaleDermatogramClick;
  }();

  _proto.toggleAnatomyUndisclosed = function () {
    function toggleAnatomyUndisclosed() {
      Session.toggle('anatomyUndisclosedBtn');
    }

    return toggleAnatomyUndisclosed;
  }();

  _proto.toggleAnatomyYanic = function () {
    function toggleAnatomyYanic() {
      Session.toggle('anatomyYanicBtn');
    }

    return toggleAnatomyYanic;
  }();

  _proto.toggleAnatomyPhalic = function () {
    function toggleAnatomyPhalic() {
      Session.toggle('anatomyPhallicBtn');
    }

    return toggleAnatomyPhalic;
  }();

  _proto.toggleKaryotypeUnknown = function () {
    function toggleKaryotypeUnknown() {
      Session.set('karyotypeXyBtn', false);
      Session.set('karyotypeXxBtn', false);
      Session.set('karyotypeXoBtn', false);
      Session.set('karyotypeXxxyBtn', false);
      Session.set('karyotypeXxyBtn', false);
      Session.set('karyotypeUnknownBtn', true);
    }

    return toggleKaryotypeUnknown;
  }();

  _proto.toggleKaryotypeXx = function () {
    function toggleKaryotypeXx() {
      Session.set('karyotypeXyBtn', false);
      Session.set('karyotypeXxBtn', true);
      Session.set('karyotypeXoBtn', false);
      Session.set('karyotypeXxxyBtn', false);
      Session.set('karyotypeXxyBtn', false);
      Session.set('karyotypeUnknownBtn', false);
    }

    return toggleKaryotypeXx;
  }();

  _proto.toggleKaryotypeXy = function () {
    function toggleKaryotypeXy() {
      Session.set('karyotypeXyBtn', true);
      Session.set('karyotypeXxBtn', false);
      Session.set('karyotypeXoBtn', false);
      Session.set('karyotypeXxxyBtn', false);
      Session.set('karyotypeXxyBtn', false);
      Session.set('karyotypeUnknownBtn', false);
    }

    return toggleKaryotypeXy;
  }();

  _proto.toggleKaryotypeXxy = function () {
    function toggleKaryotypeXxy() {
      Session.set('karyotypeXyBtn', false);
      Session.set('karyotypeXxBtn', false);
      Session.set('karyotypeXoBtn', false);
      Session.set('karyotypeXxxyBtn', false);
      Session.set('karyotypeXxyBtn', true);
      Session.set('karyotypeUnknownBtn', false);
    }

    return toggleKaryotypeXxy;
  }();

  _proto.toggleKaryotypeXxxy = function () {
    function toggleKaryotypeXxxy() {
      Session.set('karyotypeXyBtn', false);
      Session.set('karyotypeXxBtn', false);
      Session.set('karyotypeXoBtn', false);
      Session.set('karyotypeXxxyBtn', true);
      Session.set('karyotypeXxyBtn', false);
      Session.set('karyotypeUnknownBtn', false);
    }

    return toggleKaryotypeXxxy;
  }();

  _proto.toggleKaryotypeXo = function () {
    function toggleKaryotypeXo() {
      Session.set('karyotypeXyBtn', false);
      Session.set('karyotypeXxBtn', false);
      Session.set('karyotypeXoBtn', true);
      Session.set('karyotypeXxxyBtn', false);
      Session.set('karyotypeXxyBtn', false);
      Session.set('karyotypeUnknownBtn', false);
    }

    return toggleKaryotypeXo;
  }();

  _proto.toggleFemaleGender = function () {
    function toggleFemaleGender() {
      Session.set('genderMaleBtn', false);
      Session.set('genderOtherBtn', false);
      Session.set('genderFemaleBtn', true);
    }

    return toggleFemaleGender;
  }();

  _proto.toggleMaleGender = function () {
    function toggleMaleGender() {
      Session.set('genderMaleBtn', true);
      Session.set('genderOtherBtn', false);
      Session.set('genderFemaleBtn', false);
    }

    return toggleMaleGender;
  }();

  _proto.toggleOtherGender = function () {
    function toggleOtherGender() {
      Session.set('genderMaleBtn', false);
      Session.set('genderOtherBtn', true);
      Session.set('genderFemaleBtn', false);
    }

    return toggleOtherGender;
  }();

  _proto.render = function () {
    function render() {
      var _this$state = this.state,
          finished = _this$state.finished,
          stepIndex = _this$state.stepIndex;
      var contentStyle = {
        margin: '0 16px'
      };
      var dermatogramRow;
      var welcomeIntro;

      if (Package['symptomatic:continuity-of-care']) {
        // if(['iPhone'].includes(window.navigator.platform)){
        //   dermatogramRow = <Row>
        //     <Col sm={6} style={{textAlign: 'center'}}>
        //       <RaisedButton
        //         label="Female"
        //         backgroundColor="gray"
        //         labelColor= "#ffffff"
        //         color='#ffffff'
        //         icon={<FaVenus color="#ffffff" style={{width: '100%'}} />}                  
        //         primary={ get(this, 'data.buttons.gender.female') }
        //         onClick= { this.onFemaleDermatogramClick }
        //         style={{marginRight: '20px', width: '200px', height: '200px'}}
        //       />
        //     </Col>
        //     <Col sm={6} style={{textAlign: 'center'}}>
        //       <RaisedButton
        //         label="Male"
        //         backgroundColor="gray"
        //         labelColor= "#ffffff"
        //         color='#ffffff'
        //         icon={<FaMars color="#ffffff" style={{width: '100%'}} />}                  
        //         primary={ get(this, 'data.buttons.gender.male') }
        //         style={{marginRight: '20px', width: '200px', height: '200px'}}
        //         onClick= { this.onMaleDermatogramClick }
        //         />
        //     </Col>
        //   </Row>
        // } else {
        dermatogramRow = React.createElement(Row, null, React.createElement(Col, {
          xs: 6,
          style: {
            textAlign: 'center'
          }
        }, React.createElement(Image, {
          responsive: true,
          src: "/packages/symptomatic_continuity-of-care/assets/dermatogram-female-front.png",
          onClick: this.onFemaleDermatogramClick,
          style: {
            maxHeight: '400px',
            display: 'inline-block',
            cursor: 'pointer'
          }
        })), React.createElement(Col, {
          xs: 6,
          style: {
            textAlign: 'center'
          }
        }, React.createElement(Image, {
          responsive: true,
          src: "/packages/symptomatic_continuity-of-care/assets/dermatogram-male-front.png",
          onClick: this.onMaleDermatogramClick,
          style: {
            maxHeight: '400px',
            display: 'inline-block',
            cursor: 'pointer'
          }
        }))); // }

        if (['iPhone'].includes(window.navigator.platform)) {
          welcomeIntro = React.createElement("div", null, React.createElement("p", {
            style: {
              fontSize: '18px'
            }
          }, "We've detected that you're using iOS and may have HealthRecords installed.  Would you like to import them?"), React.createElement(RaisedButton // backgroundColor="gray"
          // labelColor= "#ffffff"
          // color='#ffffff'
          , {
            primary: true,
            style: {
              marginRight: '20px',
              fontWeight: 200
            },
            onClick: MedicalRecordImporter.healthRecord(),
            label: "Import Apple HealthRecords"
          }));
        } else {
          welcomeIntro = React.createElement("div", null, React.createElement("p", {
            style: {
              fontSize: '18px'
            }
          }, "We just scanned the usual places on this device where medical records are stored, and didn't find any.  Autoimport is not currently available, but that's okay!  We can continue with manual configuration and setup.  "));
        }
      }

      var mainPanel;

      switch (stepIndex) {
        case 0:
          mainPanel = React.createElement("div", null, React.createElement(Alert, {
            bsStyle: "warning"
          }, React.createElement("b", {
            style: {
              fontSize: '18px',
              fontWeight: 200
            }
          }, "This software is in ", React.createElement("b", null, "BETA"), " and is not in production yet.  Some features have not been implemented yet, and no warrantees are being made.  Functionality is currently limited to Apple HealthRecord data.")), React.createElement(CardText, null, React.createElement("h1", {
            style: {
              fontSize: '72px',
              fontWeight: 200
            }
          }, "Welcome!"), React.createElement(DynamicSpacer, null), welcomeIntro, React.createElement(DynamicSpacer, null), React.createElement("p", {
            style: {
              fontSize: '18px'
            }
          }, "You can come back to this setup page at any time and resume where you left off.  "), this.renderStepActions(0)));
          break;

        case 1:
          mainPanel = React.createElement("div", null, React.createElement(CardText, null, React.createElement(PrivacyPolicyCard, null), this.renderStepActions(1)));
          break;

        case 2:
          mainPanel = React.createElement("div", null, React.createElement(CardText, null, React.createElement(PrivacyControlsCard, null), this.renderStepActions(1)));
          break;

        case 3:
          mainPanel = React.createElement("div", null, React.createElement(CardTitle, {
            title: "Terms and Conditions"
          }), React.createElement(CardText, null, React.createElement(TermsConditionsCard, null), this.renderStepActions(2)));
          break;

        case 4:
          mainPanel = React.createElement("div", null, React.createElement(CardTitle, {
            title: "Names and Aliases"
          }), React.createElement(CardText, null, React.createElement(Grid, null, React.createElement("p", null, "When you registered your username and password, you provided the following given and family name."), React.createElement(TextField, {
            id: "givenInput",
            name: "givenInput",
            floatingLabelText: "Given",
            hintText: "Jane",
            value: this.data.name.given,
            floatingLabelFixed: true,
            fullWidth: true,
            style: {
              marginRight: '20px'
            }
          }), React.createElement(TextField, {
            id: "familyInput",
            name: "familyInput",
            floatingLabelText: "Family",
            hintText: "Doe",
            value: this.data.name.family,
            floatingLabelFixed: true,
            fullWidth: true
          }), React.createElement("br", null), React.createElement(DynamicSpacer, null), React.createElement("p", null, "Please enter your full legal name, as it appears on your driver's license or passport.  We will parse out given and family names, and allow you to specify nicknames and aliases."), React.createElement(TextField, {
            id: "nameInput",
            name: "humanNameInput",
            floatingLabelText: "Full Name",
            hintText: "Jane Doe",
            floatingLabelFixed: true,
            fullWidth: true
          }), React.createElement("br", null), React.createElement("p", null, React.createElement(FaInfoCircle, null), " People spell their names differently all over the world.  Sometimes they list their family name last (common in the United States), but sometimes they list it first (Asia).  In some parts of the world, people only receive one name.  And othertimes they receive three or four names with suffixes."), this.renderStepActions(3))));
          break;

        case 5:
          mainPanel = React.createElement("div", null, React.createElement(CardTitle, {
            title: "Sex and Gender"
          }), React.createElement(CardText, null, React.createElement("p", null, "For the vast majority of people, sex and gender is determined at birth, and is simply a matter of being male or female."), React.createElement(DynamicSpacer, null), dermatogramRow, React.createElement(DynamicSpacer, null), React.createElement("p", null, "Sometimes sex and gender can get complicated.  If your legal or administrative gender differs from your birth sex, please list what appears on your driver's license or passport."), React.createElement(RaisedButton // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
          // target="_blank"
          , {
            label: "Female",
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            icon: React.createElement(FaVenus, {
              color: "#ffffff"
            }),
            primary: get(this, 'data.buttons.gender.female'),
            onClick: this.toggleFemaleGender,
            style: {
              marginRight: '20px'
            }
          }), React.createElement(RaisedButton // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
          // target="_blank"
          , {
            label: "Other",
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            icon: React.createElement(FaTransgenderAlt, {
              color: "#ffffff"
            }),
            primary: get(this, 'data.buttons.gender.other'),
            onClick: this.toggleOtherGender,
            style: {
              marginRight: '20px'
            }
          }), React.createElement(RaisedButton // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
          // target="_blank"
          , {
            label: "Male",
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            icon: React.createElement(FaMars, {
              color: "#ffffff"
            }),
            primary: get(this, 'data.buttons.gender.male'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleMaleGender
          }), React.createElement(DynamicSpacer, null), React.createElement("p", null, "Please specify your anatomy.  This is completely optional, and you can use Symptomatic without specifying.   If you chose to specify, it will enables functionality such as maternity tracking and breast cancer screening or prostate cancer screening."), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: get(this, 'data.buttons.anatomy.yanic'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleAnatomyYanic,
            label: "Yanic "
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: get(this, 'data.buttons.anatomy.phallic'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleAnatomyPhallic,
            label: "Phallic "
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: get(this, 'data.buttons.anatomy.undisclosed'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleAnatomyUndisclosed,
            label: "Prefer Not to Say"
          }), React.createElement(DynamicSpacer, null), React.createElement("p", null, "Please specify your karyotype, if known.  Relying on your anatomy is not a reliable proxy for chromosomal karyotype (for example, androgen insensitivity syndrome).  Unless you have had children or had a karyotype test, it's best to leave this 'unknown'."), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: get(this, 'data.buttons.karyotype.unknown'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleKaryotypeUnknown,
            label: "Unknown"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: get(this, 'data.buttons.karyotype.xx'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleKaryotypeXx,
            label: "XX"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: get(this, 'data.buttons.karyotype.xy'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleKaryotypeXy,
            label: "XY"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: get(this, 'data.buttons.karyotype.xxy'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleKaryotypeXxy,
            label: "XXY"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: get(this, 'data.buttons.karyotype.xxxy'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleKaryotypeXxxy,
            label: "XX/XY"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: get(this, 'data.buttons.karyotype.xo'),
            style: {
              marginRight: '20px'
            },
            onClick: this.toggleKaryotypeXo,
            label: "XO"
          }), React.createElement(DynamicSpacer, null), this.renderStepActions(4)));
          break;

        case 6:
          mainPanel = React.createElement("div", null, React.createElement(CardTitle, {
            title: "Dermatology"
          }), React.createElement(CardText, null, React.createElement(DynamicSpacer, null), React.createElement("p", null, "Please specify your skin type (Fitzpatric Scale) and melanin count.  This is optional, and enables some dermatology and cancer screening functionality."), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            label: "Type I"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            label: "Type II"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            label: "Type III"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            label: "Type IV"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            label: "Type V"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            label: "Type VI"
          }), React.createElement(DynamicSpacer, null), this.renderStepActions(5)));
          break;

        case 7:
          mainPanel = React.createElement("div", null, React.createElement(Alert, {
            bsStyle: "warning"
          }, React.createElement("b", {
            style: {
              fontSize: '14px',
              fontWeight: 200
            }
          }, "This software is in ", React.createElement("b", null, "BETA"), " and is not in production yet.  Some features have not been implemented yet, and no warrantees are being made.  Functionality is currently limited to Apple HealthRecord data.")), React.createElement(DynamicSpacer, null), React.createElement(CardTitle, {
            title: "Facebook Profile"
          }), React.createElement(CardText, null, React.createElement("p", null, "Your Facebook profile contains a lot of information that may be relevant to your healthcare.  We're primarily interested in gathering a) your care circle that you rely on in emergencies and times of illness, b) mental health conditions that you may have blogged about, and c) any photos of injuries you may have shared."), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            label: "Import Facebook Profile",
            disabled: true
          }), React.createElement(DynamicSpacer, null), this.renderStepActions(6)));
          break;

        case 8:
          mainPanel = React.createElement("div", null, React.createElement(CardText, null, React.createElement(DynamicSpacer, null), React.createElement("p", null, "Your medical charts may be spread out through many healthcare systems.  Using industry standard interoperability protocols, we're going to try to fetch those records and consolidate them."), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            disabled: true,
            label: "Epic MyChart"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            disabled: true,
            style: {
              marginRight: '20px'
            },
            label: "Cerner CareAnywhere"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            disabled: true,
            style: {
              marginRight: '20px'
            },
            label: "Allscripts FollowMyHealth"
          }), React.createElement(DynamicSpacer, null), this.renderStepActions(7)));
          break;

        case 9:
          mainPanel = React.createElement("div", null, React.createElement(CardText, null, React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            label: "Continuity of Care Document"
          }), React.createElement(RaisedButton, {
            backgroundColor: "gray",
            labelColor: "#ffffff",
            color: "#ffffff",
            primary: false,
            style: {
              marginRight: '20px'
            },
            label: "MyTimeline"
          }), React.createElement(DynamicSpacer, null), this.renderStepActions(8)));
          break;

        default:
          break;
      }

      var stepperStyle = {
        marginBottom: '20px'
      };

      if (['iPhone'].includes(window.navigator.platform)) {
        stepperStyle.display = 'none';
      }

      return React.createElement("div", {
        id: "welcomePatientPage"
      }, React.createElement(FullPageCanvas, null, React.createElement(Col, {
        md: 2
      }, React.createElement(GlassCard, {
        style: stepperStyle,
        height: "auto"
      }, React.createElement(Stepper, {
        activeStep: stepIndex,
        orientation: "vertical"
      }, React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Getting Started")), React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Privacy Policy")), React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Privacy Controls")), React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Terms and Conditions")), React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Name")), React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Sex & Gender")), React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Dermatology")), React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Import Facebook Profile")), React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Import Medical Charts")), React.createElement(Step, null, React.createElement(StepLabel, {
        style: {
          fontSize: '18px',
          fontWeight: 200
        }
      }, "Your Timeline"))))), React.createElement(Col, {
        md: 10,
        style: {
          marginBottom: '20px'
        }
      }, React.createElement(GlassCard, {
        height: "auto"
      }, mainPanel))));
    }

    return render;
  }();

  return WelcomePatientPage;
}(React.Component);

ReactMixin(WelcomePatientPage.prototype, ReactMeteorData);
module.exportDefault(WelcomePatientPage);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WelcomePractitionerPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/pages/WelcomePractitionerPage.jsx                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  WelcomePractitionerPage: function () {
    return WelcomePractitionerPage;
  }
});
var CardActions, CardHeader, CardText, CardTitle;
module.link("material-ui/Card", {
  CardActions: function (v) {
    CardActions = v;
  },
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var Alert;
module.link("react-bootstrap", {
  Alert: function (v) {
    Alert = v;
  }
}, 1);
var FlatButton;
module.link("material-ui/FlatButton", {
  "default": function (v) {
    FlatButton = v;
  }
}, 2);
var RaisedButton;
module.link("material-ui/RaisedButton", {
  "default": function (v) {
    RaisedButton = v;
  }
}, 3);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 4);
var VerticalCanvas, GlassCard;
module.link("meteor/clinical:glass-ui", {
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  }
}, 5);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 6);

var WelcomePractitionerPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(WelcomePractitionerPage, _React$Component);

  function WelcomePractitionerPage(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = WelcomePractitionerPage.prototype;

  _proto.handleGo = function () {
    function handleGo() {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.firstTimeVisit': false
        }
      });
      browserHistory.push('/');
    }

    return handleGo;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "welcomePractitionerPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, null, React.createElement(CardTitle, {
        title: "Privacy Policy"
      }), React.createElement(CardText, null, React.createElement("p", null, "Welcome to the Meteor on FHIR Interface Engine demo - a next-gen healh information exchange, running on the latest web technologies."), React.createElement(Alert, {
        bsStyle: "danger"
      }, React.createElement("b", null, "This is software is NOT running in HIPAA Compliance Mode.")), React.createElement("p", null, "For demonstration purposes, this software is currently running on an insecure hosting platform that does not guarantee HIPAA security.  Do not store protected health information (PHI) in this instance.  This software is for demonstration and evaluation purposes only.  By accepting this policy, you agree not to store PHI in this system.  In an actual production environment, we would work with you and your team to install this software in a secured HIPAA compliance datacenter or cloud service provider."), React.createElement("p", null, "To enable HIPAA compliance, you'll need to remove the autopublish packages, write your own pub/sub functions, and then connect to a production Mongo database ", React.createElement("i", null, " that has data encryption at rest enabled"), "."), React.createElement("pre", null, "# meteor remove autopublish ", React.createElement("br", null), "# meteor remove clinical:autopublish ", React.createElement("br", null), "# MONGO_URL=mongodb://[username]:[password]hostname.com:27017/databasename meteor --settings settings.prod.json"), React.createElement("p", null, "Please note that Mongo encrypted data at rest is an enterprise grade feature.  Please contact sales@symptomatic.io for licensing details."), React.createElement("p", null, "All software is provided 'as is'.  This is a work in progress, and some features are still under construction or marked experimental.")), React.createElement(CardTitle, {
        title: "End User License Agreement"
      }), React.createElement(CardText, null, React.createElement("p", null, "The End-User License Agreement (this \"EULA\") is a legal agreement between you (\"Licenssee\") and Symptomatic Systems (\"Licensor\"), the author of Symptomatic Continuity of Care Document Generator, including all HTML files, Javascript files, graphics, animations, data, technology, development tools, scripts and programs, both in object code and source code (the \"Software\"), the deliverables provided pursuant to this EULA, which may include associated media, printed materials, and \"online\" or electronic documentation."), React.createElement("p", null, "By installing this Software, Licensee agrees to be bound by the terms and conditions set forth in this EULA.  If Licenseee does not agree to the terms and conditions set fourth in this EULA, then Licensee may not download, install, or use the Software."), React.createElement("h4", null, "1.  Grant of License"), React.createElement("h5", null, "A) Scope of License"), " Subject ot the terms of this EULA, Licensor hereby grants to Licensee a royalty-free, non-exclusive license to possess and to use a copy of the Continuity of Care Document Builder for Mac, available via download from the Symptomatic.io website.", React.createElement("h5", null, "B) Installation and Use"), "  Licensee may install and use a maximum of one (1) copies of the Software and make multiple back-up copies of the Software, solely for Licensee's personal use.", React.createElement("h5", null, "C) Reporudction and Distribution"), "  Licensee may reproduce and distribute an .", React.createElement("h4", null, "2.  Description of Rights and Limitations"), React.createElement("h4", null, "3.  Title to Software"), " Licensor represents and warrants that it has the legal right to enter into and perform its obligations under this EULA, and that use by the Licensee of the Software, in accordance with the terms of this EULA, will not infrince upon the intellectual property rights of any third parties.", React.createElement("h4", null, "4.  Intellectual Property"), " All now known or hereafter known tangible and intangible rights, title, interest, copyrights and moral rights in and to the Software, including but not limited to all images, photographs, animations, video, audio, music, text, data, computer code, algorithms, and information are owned by Licensor.  The Software is protected by all applicable copyright laws and international treaties.", React.createElement("h4", null, "5.  No Support"), " Licensor has no obligation to provide support services for the Software.", React.createElement("h4", null, "6.  Duration"), React.createElement("h4", null, "7.  Jurisdiction"), " This EULA shall be deemed to have been made in, and shall be construed pursuant to the laws of the State of Illinois, without regard to conflicts of laws provisions thereof.  Any legal action or proceeding relating to this EULA shall be brought exclusively in courts located in Chicago, IL, and each party consents to the jurisdiction thereof.  The prevailing party in any action to enforce this EULA shall be entitled to recover costs and expenses including attorneys' fees.  This EULA is made with the exclusive jurisdiction of the United State, and its jurisdiction shall supersede any other jurisdiction of either party's election.", React.createElement("h4", null, "8.  Non-Transferable"), "  This EULA is not assignable or transferable by Licensee, and any attempt to do so would be void.", React.createElement("h4", null, "9.  Severability"), " No failure to exercise, and no delay in exercising, on the part of either party, any priviledge, any power or any rights hereunder will operate as a waiver thereof, nor will any single or partial exercise of any right or power hereunder preclude further exercise of any other right hereunder.  If any provision of this EULA shall be adjudged by any court of competent jurisdiction to be unenforceable or invalid, that provision shall be limited or eliminated ot the minimum extent necessary so that this EULA shall otherwise remain in full force and effect and enforceable.", React.createElement("h4", null, "10.  WARRANTY DISCLAIMER"), " LICENSOR, AND AUTHOR OF THE SOFTWARE, HEREBY EXPRESSLY DISCLAIM ANY WARRANTY FOR THE SOFTWARE.  THE SOFTWARE AND ANY RELATED DOCUMENTATION IS PROVIDED \"AS IS\" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.  LICENSSEE ACCEPTS ANY AND ALL RISK ARISING OUT OF USE OR PERFORMANCE OF THE SOFTWARE.", React.createElement("h4", null, "11.  LIMITATION OF LIABILITY"), "  LICENSOR SHALL NOT BE LIABLE TO LINCENSEE, OR ANY OTHER PERSON OR ENTITY CLAIMING THROUGH LICENSEE ANY LOSS OF PROFITS, INCOME, SAVINGS, OR ANY OTHER CONSEQUENTIAL, INCIDENTAL, SPECIAL, PUNITIVE, DIRECT OR INDIRECT DAMAGE, WHETHER ARISING IN CONTRACT, TORT, WARRANTY, OR OTHERWISE.  THESE LIMITATIONS SHALL APPLY REGARDLESS OF THE ESSENTIAL PURPOSE OF ANY LIMITED REMEDY.  UNDER NO CIRCUMSTANCES SHALL LICENSOR'S AGGREGATE LIABILITY TO LICENSEE, OR ANY OTHER PERSON OR ENTITY CLAIMING THROUGH LICENSEE, EXCEED THE FINANCIAL AMOUNT ACTUALLY PAID BY LICENSEE TO LICENSOR FOR THE SOFTWARE.", React.createElement("h4", null, "12.  Entire Agreement"), "  This EULA consitutes the entire agreement between Licensor and Licensee and supersedes all prior understandings of Licensor and Licensee, including any prior representation, statement, condition, or warranty with respect to the subject matter of this EULA."), React.createElement(CardActions, null, React.createElement(FlatButton, {
        id: "acceptWelcomePageButton",
        label: "Accept",
        onClick: this.handleGo
      })))));
    }

    return render;
  }();

  return WelcomePractitionerPage;
}(React.Component);

module.exportDefault(WelcomePractitionerPage);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"api":{"users":{"methods.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/users/methods.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  insertUser: function () {
    return insertUser;
  },
  updateUser: function () {
    return updateUser;
  },
  removeUserById: function () {
    return removeUserById;
  },
  setUserAvatar: function () {
    return setUserAvatar;
  },
  setUserTheme: function () {
    return setUserTheme;
  },
  changeUserPassword: function () {
    return changeUserPassword;
  }
});
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var Roles;
module.link("meteor/alanning:roles", {
  Roles: function (v) {
    Roles = v;
  }
}, 1);
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 2);
var SimpleSchema;
module.link("simpl-schema", {
  "default": function (v) {
    SimpleSchema = v;
  }
}, 3);
var ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod: function (v) {
    ValidatedMethod = v;
  }
}, 4);
var insertUser = new ValidatedMethod({
  name: 'users.insert',
  // validate: null,
  validate: function () {
    return true;
  },
  // validate: new SimpleSchema({
  //   title: { type: String },
  //   createdAt: { type: Date },
  // }).validator(),
  run: function (document) {
    Meteor.users.insert(document);
  }
});
var updateUser = new ValidatedMethod({
  name: 'users.update',
  // validate: null,
  validate: function () {
    return true;
  },
  // validate: new SimpleSchema({
  //   _id: { type: String },
  //   'update.title': { type: String, optional: true },
  // }).validator(),
  run: function (_ref) {
    var _id = _ref._id,
        update = _ref.update;
    Meteor.users.update(_id, {
      $set: update
    });
  }
});
var removeUserById = new ValidatedMethod({
  name: 'users.removeById',
  validate: new SimpleSchema({
    _id: {
      type: String
    }
  }).validator(),
  run: function (_ref2) {
    var _id = _ref2._id;
    console.log("Removing user " + _id);
    Meteor.users.remove({
      _id: _id
    });
  }
});
var setUserAvatar = new ValidatedMethod({
  name: 'users.setAvatar',
  validate: new SimpleSchema({
    _id: {
      type: String
    },
    avatar: {
      type: String
    }
  }).validator(),
  run: function (_ref3) {
    var _id = _ref3._id,
        avatar = _ref3.avatar;
    Meteor.users.update(_id, {
      $set: {
        'profile.avatar': avatar
      }
    });
  }
});
var setUserTheme = new ValidatedMethod({
  name: 'users.setTheme',
  validate: new SimpleSchema({
    _id: {
      type: String
    },
    backgroundColor: {
      type: String,
      optional: true
    },
    backgroundImagePath: {
      type: String,
      optional: true
    },
    video: {
      type: String,
      optional: true
    }
  }).validator(),
  run: function (_ref4) {
    var _id = _ref4._id,
        backgroundColor = _ref4.backgroundColor,
        backgroundImagePath = _ref4.backgroundImagePath;
    Meteor.users.update(_id, {
      $unset: {
        'profile.theme.backgroundImagePath': "",
        'profile.theme.backgroundColor': ""
      }
    });

    if (backgroundColor) {
      Meteor.users.update(_id, {
        $set: {
          'profile.theme.backgroundColor': backgroundColor
        }
      });
    }

    if (backgroundImagePath) {
      Meteor.users.update(_id, {
        $set: {
          'profile.theme.backgroundImagePath': backgroundImagePath
        }
      });
    }
  }
});
var changeUserPassword = new ValidatedMethod({
  name: 'users.changePassword',
  validate: new SimpleSchema({
    _id: {
      type: String
    },
    password: {
      type: String
    }
  }).validator(),
  run: function (_ref5) {
    var _id = _ref5._id,
        avatar = _ref5.avatar;
    Meteor.users.update(_id, {
      $set: {
        'profile.avatar': avatar
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Theme.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/Theme.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var darkBaseTheme, lightBaseTheme;
module.link("material-ui/styles", {
  darkBaseTheme: function (v) {
    darkBaseTheme = v;
  },
  lightBaseTheme: function (v) {
    lightBaseTheme = v;
  }
}, 0);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 1);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 2);
module.exportDefault(Theme = {
  palette: function (style) {
    if (!style) {
      style = {};
    }

    if (Meteor.settings && Meteor.settings.theme && Meteor.settings.theme.darkroomTextEnabled) {
      style.textColor = {
        color: lightBaseTheme.palette.textColor
      };
      style.inputStyle = {
        color: lightBaseTheme.palette.textColor
      };
      style.errorStyle = {
        color: lightBaseTheme.palette.accent1Color
      };
      style.hintStyle = {
        color: lightBaseTheme.palette.textColor
      };
      style.underlineStyle = {
        color: lightBaseTheme.palette.secondaryTextColor
      };
      style.floatingLabelStyle = {
        color: lightBaseTheme.palette.textColor
      };
      style.floatingLabelFocusStyle = {
        color: lightBaseTheme.palette.textColor
      };
    } else {
      style.textColor = {
        color: darkBaseTheme.palette.textColor
      };
      style.inputStyle = {
        color: darkBaseTheme.palette.textColor
      };
      style.errorStyle = {
        color: darkBaseTheme.palette.accent1Color
      };
      style.hintStyle = {
        color: darkBaseTheme.palette.textColor
      };
      style.underlineStyle = {
        borderColor: darkBaseTheme.palette.secondaryTextColor
      };
      style.floatingLabelStyle = {
        color: darkBaseTheme.palette.textColor
      };
      style.floatingLabelFocusStyle = {
        color: darkBaseTheme.palette.textColor
      };
    }

    return style;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"User.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/User.js                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  "default": function () {
    return User;
  }
});
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 0);

var User =
/*#__PURE__*/
function () {
  function User(document) {
    if (document) {
      Object.assign(this, document);
    }
  }
  /**
   * @summary The personal name of the user account.
   * @memberOf User
   * @name userName
   * @version 1.2.3
   * @returns {String} A name representation of the user account
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.userName());
   * ```
   */


  var _proto = User.prototype;

  _proto.userName = function () {
    function userName() {
      return this.isSelf() ? "You" : this.username;
    }

    return userName;
  }();

  _proto.isTrue = function () {
    function isTrue() {
      return true;
    }

    return isTrue;
  }();
  /**
   * @summary Gets the full name of the user.
   * @memberOf User
   * @name fullName
   * @version 1.2.3
   * @returns {String}
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.fullName());
   * ```
   */


  _proto.fullName = function () {
    function fullName() {
      // if we're using an HL7 FHIR HumanName resource
      if (this.profile && this.profile.name && this.profile.name.text) {
        // the following assumes a Person, RelatedPerson, or Practitioner resource
        // which only has a single name specified
        return this.profile.name.text;
      } else if (this.profile && this.profile.name) {
        // the following assumes a Patient resource
        // where multiple names and aliases may be specified
        return this.profile.name[0].text; // if we're using traditional Meteor naming convention
      } else if (this.profile && this.profile.fullName) {
        return this.profile.fullName;
      } else {
        return "---";
      }
    }

    return fullName;
  }();
  /**
   * @summary Gets the given (first) name of the user.
   * @memberOf User
   * @name givenName
   * @version 1.2.3
   * @returns {String}
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.givenName());
   * ```
   */


  _proto.givenName = function () {
    function givenName() {
      if (this.profile && this.profile.name) {
        // if we're using an HL7 FHIR HumanName resource
        return this.profile.name[0].given;
      } else if (this.profile && this.profile.fullName) {
        // if we're using traditional Meteor naming convention
        var names = this.profile.fullName.split(" ");
        return names[0];
      } else {
        return "";
      }
    }

    return givenName;
  }();
  /**
   * @summary Gets the family (last) name of the user.
   * @memberOf User
   * @name familyName
   * @version 1.2.3
   * @returns {String}
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.familyName());
   * ```
   */


  _proto.familyName = function () {
    function familyName() {
      if (this.profile && this.profile.name) {
        // if we're using an HL7 FHIR HumanName resource
        return this.profile.name[0].family;
      } else if (this.profile && this.profile.fullName) {
        // if we're using traditional Meteor naming convention
        var names = this.profile.fullName.split(" ");
        return names[names.length - 1];
      } else {
        return "---";
      }
    }

    return familyName;
  }();
  /**
   * @summary Gets the default email that an account is associated.  Defined as the first verified email in the emails array.
   * @memberOf User
   * @name defaultEmail
   * @version 1.2.3
   * @returns {String}
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.defaultEmail());
   * ```
   */


  _proto.defaultEmail = function () {
    function defaultEmail() {
      return this.emails && this.emails[0].address;
    }

    return defaultEmail;
  }();
  /**
   * Get the default email address for the user
   * @method defaultEmail
   * @returns {String} The users default email address
   */


  _proto.getEmails = function () {
    function getEmails() {
      var result = [];

      if (this && this.emails) {
        this.emails.forEach(function (email) {
          result.push(email.address);
        });
      }

      if (get(this, 'services.google.email')) {
        result.push(get(this, 'services.google.email'));
      }

      if (result.length > 0) {
        return result;
      } else {
        return [];
      }
    }

    return getEmails;
  }();

  _proto.getPrimaryEmail = function () {
    function getPrimaryEmail() {
      if (this.emails) {
        return this.emails[0].address;
      } else {
        return "---";
      }
    }

    return getPrimaryEmail;
  }();

  return User;
}();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"client":{"entry":{"getInputValue.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/client/entry/getInputValue.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  getInputValue: function () {
    return getInputValue;
  }
});
var ReactDOM;
module.link("react-dom", {
  "default": function (v) {
    ReactDOM = v;
  }
}, 0);

var getInputValue = function (component) {
  return ReactDOM.findDOMNode(component).value;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"handleRecoverPassword.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/client/entry/handleRecoverPassword.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  handleRecoverPassword: function () {
    return handleRecoverPassword;
  }
});
var $;
module.link("jquery", {
  "default": function (v) {
    $ = v;
  }
}, 0);
module.link("jquery-validation");
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 1);
var Bert;
module.link("meteor/clinical:alert", {
  Bert: function (v) {
    Bert = v;
  }
}, 2);
var getInputValue;
module.link("./getInputValue", {
  getInputValue: function (v) {
    getInputValue = v;
  }
}, 3);
var component;

var handleRecoverPassword = function (options) {
  console.log('disabled; replace jquery with ajv.js');
  $(options.component.refs.recoverPassword).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      }
    },
    submitHandler: function () {
      Accounts.forgotPassword({
        email: getInputValue(component.refs.emailAddress)
      }, function (error) {
        if (error) {
          Bert.alert(error.reason, 'warning');
        } else {
          Bert.alert('Check your inbox for a reset link!', 'success');
        }
      });
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"handleResetPassword.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/client/entry/handleResetPassword.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  handleResetPassword: function () {
    return handleResetPassword;
  }
});
var $;
module.link("jquery", {
  "default": function (v) {
    $ = v;
  }
}, 0);
module.link("jquery-validation");
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 1);
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 2);
var Bert;
module.link("meteor/clinical:alert", {
  Bert: function (v) {
    Bert = v;
  }
}, 3);
var getInputValue;
module.link("./getInputValue", {
  getInputValue: function (v) {
    getInputValue = v;
  }
}, 4);
var component;
var token;

var handleReset = function () {
  var password = getInputValue(component.refs.newPassword);
  Accounts.resetPassword(token, password, function (error) {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Password reset!', 'success');
    }
  });
};

var validate = function () {
  $(component.refs.resetPassword).validate({
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]'
      }
    },
    messages: {
      newPassword: {
        required: 'Enter a new password, please.',
        minlength: 'Use at least six characters, please.'
      },
      repeatNewPassword: {
        required: 'Repeat your new password, please.',
        equalTo: 'Hmm, your passwords don\'t match. Try again?'
      }
    },
    submitHandler: function () {
      handleReset();
    }
  });
};

var handleResetPassword = function (options) {
  component = options.component;
  token = options.token;
  $(component.refs.resetPassword).validate({
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]'
      }
    },
    messages: {
      newPassword: {
        required: 'Enter a new password, please.',
        minlength: 'Use at least six characters, please.'
      },
      repeatNewPassword: {
        required: 'Repeat your new password, please.',
        equalTo: 'Hmm, your passwords don\'t match. Try again?'
      }
    },
    submitHandler: function () {
      var password = getInputValue(component.refs.newPassword);
      Accounts.resetPassword(token, password, function (error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          browserHistory.push('/');
          Bert.alert('Password reset!', 'success');
        }
      });
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"client":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/client/index.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

module.link("bootstrap/dist/css/bootstrap.min.css");
module.link("bootstrap/dist/js/bootstrap.min.js");
module.link("./routes.js");
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 1);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 2);
// OAuth Access Token
Session.setDefault('accessToken', '');
Meteor.startup(function () {
  // var console = {};
  // console.log = function(){};
  // window.console = console;
  document.title = get(Meteor, 'settings.public.title');
  console.log('Bert', Bert);
  Bert.defaults.style = 'growl-top-right'; // Global session variables for user interface elements

  Session.set('showNavbars', true);
  Session.set('showSearchbar', false);
  Session.set('hasPagePadding', true);
  Session.set('appSurfaceOffset', true);
  Session.set('selectedChromosome', 1);
  Session.set('showOrbital', false); // In some applications, we want a default OAuth provider and service name
  // This is usually due to the app having a single parent organization.
  // (i.e. not for AppOrchard apps)

  if (get(Meteor, 'settings.private.defaultOauth.serviceName')) {
    Meteor.call('fetchAccessToken', get(Meteor, 'settings.private.defaultOauth.serviceName'), function (err, result) {
      if (result) {
        console.log(result);
        Session.set('accessToken', result.accessToken);
      }
    });
  } // Set the default scopes for different OAuth services  


  Accounts.ui.config({
    requestPermissions: {
      facebook: ['user_likes'],
      github: ['user', 'repo'],
      MeteorOnFhir: ['OBSERVATION.READ', 'OBSERVATION.SEARCH', 'PATIENT.READ', 'PATIENT.SEARCH', 'PRACTITIONER.READ', 'PRACTITIONER.SEARCH', 'patient/*.read', 'patient/*.search', 'openid', 'profile', 'user/*.*', 'launch', 'online_access']
    },
    requestOfflineToken: {
      google: true
    },
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });
}); // -----------------------------------------------------------------------------
// Buffer API
// https://github.com/meteor/meteor/blob/master/History.md#v15-2017-05-30

global.Buffer = global.Buffer || require("buffer").Buffer; // -----------------------------------------------------------------------------
// Security

if (Package['clinical:hl7-resource-patient'] && (typeof Patients === "undefined" ? "undefined" : (0, _typeof2.default)(Patients)) === "object") {
  Patients.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-allergy-intolerance'] && (typeof AllergyIntolerances === "undefined" ? "undefined" : (0, _typeof2.default)(AllergyIntolerances)) === "object") {
  AllergyIntolerances.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-audit-event'] && (typeof AuditEvents === "undefined" ? "undefined" : (0, _typeof2.default)(AuditEvents)) === "object") {
  AuditEvents.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-careplan']) {
  if ((typeof CarePlans === "undefined" ? "undefined" : (0, _typeof2.default)(CarePlans)) === "object") {
    CarePlans.allow({
      update: function () {
        return true;
      },
      insert: function () {
        return true;
      },
      remove: function () {
        return true;
      }
    });
  }

  if ((typeof Goals === "undefined" ? "undefined" : (0, _typeof2.default)(Goals)) === "object") {
    Goals.allow({
      update: function () {
        return true;
      },
      insert: function () {
        return true;
      },
      remove: function () {
        return true;
      }
    });
  }
}

if (Package['clinical:hl7-resource-condition'] && (typeof Conditions === "undefined" ? "undefined" : (0, _typeof2.default)(Conditions)) === "object") {
  Conditions.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-device'] && (typeof Devices === "undefined" ? "undefined" : (0, _typeof2.default)(Devices)) === "object") {
  Devices.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-endpoint'] && (typeof Endpoints === "undefined" ? "undefined" : (0, _typeof2.default)(Endpoints)) === "object") {
  Endpoints.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-diagnostic-report'] && (typeof DiagnosticReports === "undefined" ? "undefined" : (0, _typeof2.default)(DiagnosticReports)) === "object") {
  DiagnosticReports.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-immunization'] && (typeof Immunizations === "undefined" ? "undefined" : (0, _typeof2.default)(Immunizations)) === "object") {
  Immunizations.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-list'] && (typeof Lists === "undefined" ? "undefined" : (0, _typeof2.default)(Lists)) === "object") {
  Lists.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-location'] && (typeof Locations === "undefined" ? "undefined" : (0, _typeof2.default)(Locations)) === "object") {
  Locations.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-medication'] && (typeof Medications === "undefined" ? "undefined" : (0, _typeof2.default)(Medications)) === "object") {
  Medications.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-medication-order'] && (typeof MedicationOrders === "undefined" ? "undefined" : (0, _typeof2.default)(MedicationOrders)) === "object") {
  MedicationOrders.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-medication-statement'] && (typeof MedicationStatements === "undefined" ? "undefined" : (0, _typeof2.default)(MedicationStatements)) === "object") {
  MedicationStatements.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-observation'] && (typeof Observations === "undefined" ? "undefined" : (0, _typeof2.default)(Observations)) === "object") {
  Observations.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-organization'] && (typeof Organizations === "undefined" ? "undefined" : (0, _typeof2.default)(Organizations)) === "object") {
  Organizations.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-person'] && (typeof Persons === "undefined" ? "undefined" : (0, _typeof2.default)(Persons)) === "object") {
  Persons.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-patient'] && (typeof Patients === "undefined" ? "undefined" : (0, _typeof2.default)(Patients)) === "object") {
  Patients.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-practitioner'] && (typeof Practitioners === "undefined" ? "undefined" : (0, _typeof2.default)(Practitioners)) === "object") {
  Practitioners.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-procedure'] && (typeof Procedures === "undefined" ? "undefined" : (0, _typeof2.default)(Procedures)) === "object") {
  Procedures.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}

if (Package['clinical:hl7-resource-risk-assessment'] && (typeof RiskAssessments === "undefined" ? "undefined" : (0, _typeof2.default)(RiskAssessments)) === "object") {
  RiskAssessments.allow({
    update: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/client/routes.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var CardText, CardTitle;
module.link("material-ui/Card", {
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var IndexRoute, Route, Router, browserHistory;
module.link("react-router", {
  IndexRoute: function (v) {
    IndexRoute = v;
  },
  Route: function (v) {
    Route = v;
  },
  Router: function (v) {
    Router = v;
  },
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 2);
var render;
module.link("react-dom", {
  render: function (v) {
    render = v;
  }
}, 3);
var App;
module.link("/imports/ui/layouts/App", {
  App: function (v) {
    App = v;
  }
}, 4);
var AppInfoPage;
module.link("/imports/ui/pages/AppInfoPage", {
  AppInfoPage: function (v) {
    AppInfoPage = v;
  }
}, 5);
var MainIndex;
module.link("/imports/ui/pages/MainIndex", {
  MainIndex: function (v) {
    MainIndex = v;
  }
}, 6);
var FhirResourcesIndex;
module.link("/imports/ui/pages/FhirResourcesIndex", {
  FhirResourcesIndex: function (v) {
    FhirResourcesIndex = v;
  }
}, 7);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 8);
var NotFound;
module.link("/imports/ui/pages/NotFound", {
  NotFound: function (v) {
    NotFound = v;
  }
}, 9);
var NotificationsPage;
module.link("/imports/ui/pages/NotificationsPage", {
  NotificationsPage: function (v) {
    NotificationsPage = v;
  }
}, 10);
var PrivacyPage;
module.link("/imports/ui/pages/PrivacyPage", {
  PrivacyPage: function (v) {
    PrivacyPage = v;
  }
}, 11);
var TermsConditionsPage;
module.link("/imports/ui/pages/TermsConditionsPage", {
  TermsConditionsPage: function (v) {
    TermsConditionsPage = v;
  }
}, 12);
var RecoverPassword;
module.link("/imports/ui/pages/RecoverPassword", {
  RecoverPassword: function (v) {
    RecoverPassword = v;
  }
}, 13);
var ResetPassword;
module.link("/imports/ui/pages/ResetPassword", {
  ResetPassword: function (v) {
    ResetPassword = v;
  }
}, 14);
var Signin;
module.link("/imports/ui/pages/Signin", {
  Signin: function (v) {
    Signin = v;
  }
}, 15);
var Signup;
module.link("/imports/ui/pages/Signup", {
  Signup: function (v) {
    Signup = v;
  }
}, 16);
var ThemePage;
module.link("/imports/ui/pages/ThemePage", {
  ThemePage: function (v) {
    ThemePage = v;
  }
}, 17);
var UsersPage;
module.link("/imports/ui/pages/UsersPage", {
  UsersPage: function (v) {
    UsersPage = v;
  }
}, 18);
var WelcomePatientPage;
module.link("/imports/ui/pages/WelcomePatientPage", {
  WelcomePatientPage: function (v) {
    WelcomePatientPage = v;
  }
}, 19);
var WelcomePractitionerPage;
module.link("/imports/ui/pages/WelcomePractitionerPage", {
  WelcomePractitionerPage: function (v) {
    WelcomePractitionerPage = v;
  }
}, 20);
var WelcomeAdminPage;
module.link("/imports/ui/pages/WelcomeAdminPage", {
  WelcomeAdminPage: function (v) {
    WelcomeAdminPage = v;
  }
}, 21);
var DicomViewerPage;
module.link("/imports/ui/pages/DicomViewerPage", {
  DicomViewerPage: function (v) {
    DicomViewerPage = v;
  }
}, 22);
var MyProfilePage;
module.link("/imports/ui/pages/MyProfilePage", {
  MyProfilePage: function (v) {
    MyProfilePage = v;
  }
}, 23);
var PreferencesPage;
module.link("/imports/ui/pages/PreferencesPage", {
  PreferencesPage: function (v) {
    PreferencesPage = v;
  }
}, 24);
var PasswordManagementPage;
module.link("/imports/ui/pages/PasswordManagementPage", {
  PasswordManagementPage: function (v) {
    PasswordManagementPage = v;
  }
}, 25);
var AuthorizationGrantsPage;
module.link("/imports/ui/pages/AuthorizationGrantsPage", {
  AuthorizationGrantsPage: function (v) {
    AuthorizationGrantsPage = v;
  }
}, 26);
var MetadataPage;
module.link("/imports/ui/pages/MetadataPage", {
  MetadataPage: function (v) {
    MetadataPage = v;
  }
}, 27);
var ChecklistsPage;
module.link("/imports/ui/workflows/lists/ChecklistsPage", {
  ChecklistsPage: function (v) {
    ChecklistsPage = v;
  }
}, 28);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 29);
// Pick up any dynamic routes that are specified in packages, and include them
var dynamicRoutes = [];
Object.keys(Package).forEach(function (packageName) {
  if (Package[packageName].DynamicRoutes) {
    // we try to build up a route from what's specified in the package
    Package[packageName].DynamicRoutes.forEach(function (route) {
      dynamicRoutes.push(route);
    });
  }
}); // we're storing the current route URL in a reactive variable
// which will be used to update active controls
// mostly used to toggle header and footer buttons

Session.setDefault('pathname', window.location.pathname);
browserHistory.listen(function (event) {
  Session.set('pathname', event.pathname);
}); // patient authentication function

var requireAuth = function (nextState, replace) {
  // do we even need to authorize?
  if (get(Meteor, 'settings.public.defaults.requireAuthorization')) {
    // yes, this is a restricted page
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      // we're in the compiled desktop app that somebody purchased or downloaded
      // so no need to go to the landing page
      // lets just take them to the signin page
      if (Meteor.isDesktop) {
        replace({
          pathname: '/signin',
          state: {
            nextPathname: nextState.location.pathname
          }
        });
      } else {
        // we're in the general use case
        // user is trying to access a route that requires authorization, but isn't signed in
        // redirect them to the landing page
        if (get(Meteor, 'settings.public.defaults.landingPage')) {
          replace({
            pathname: get(Meteor, 'settings.public.defaults.landingPage'),
            state: {
              nextPathname: nextState.location.pathname
            }
          });
        } else {
          replace({
            pathname: '/landing-page',
            state: {
              nextPathname: nextState.location.pathname
            }
          });
        }
      }
    }
  } else {
    // apparently we don't need to authorize;
    // so lets just continue (i.e. everybody is authorized)
    if (get(Meteor, 'settings.public.defaults.route')) {
      // hey, a default route is specified
      // lets go there
      replace({
        pathname: get(Meteor, 'settings.public.defaults.route'),
        state: {
          nextPathname: nextState.location.pathname
        }
      });
    } // can't find anywhere else to go to, so lets just go to the root path 
    // ¯\_(ツ)_/¯

  }
}; // practitioner authentication function


var requirePractitioner = function (nextState, replace) {
  if (!Roles.userIsInRole(Meteor.userId(), 'practitioner')) {
    replace({
      pathname: '/need-to-be-practitioner',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
}; // practitioner authentication function


var requreSysadmin = function (nextState, replace) {
  if (!Roles.userIsInRole(Meteor.userId(), 'sysadmin')) {
    replace({
      pathname: '/need-to-be-sysadmin',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};

Meteor.startup(function () {
  render(React.createElement(Router, {
    history: browserHistory
  }, React.createElement(Route, {
    path: "/",
    component: App
  }, React.createElement(IndexRoute, {
    name: "index",
    component: MainIndex,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "fhirResources",
    path: "/fhir-resources-index",
    component: FhirResourcesIndex
  }), React.createElement(Route, {
    name: "signin",
    path: "/signin",
    component: Signin
  }), React.createElement(Route, {
    name: "recover-password",
    path: "/recover-password",
    component: RecoverPassword
  }), React.createElement(Route, {
    name: "reset-password",
    path: "/reset-password/:token",
    component: ResetPassword
  }), React.createElement(Route, {
    name: "signup",
    path: "/signup",
    component: Signup
  }), React.createElement(Route, {
    name: "about",
    path: "/about",
    component: AppInfoPage
  }), React.createElement(Route, {
    name: "privacy",
    path: "/privacy",
    component: PrivacyPage
  }), React.createElement(Route, {
    name: "termsConditions",
    path: "/terms-and-conditions",
    component: TermsConditionsPage
  }), React.createElement(Route, {
    name: "theming",
    path: "/theming",
    component: ThemePage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "myprofile",
    path: "/myprofile",
    component: MyProfilePage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "users",
    path: "/users",
    component: UsersPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "welcomePatient",
    path: "/welcome/patient",
    component: WelcomePatientPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "welcomePractitioner",
    path: "/welcome/practitioner",
    component: WelcomePractitionerPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "welcomeAdmin",
    path: "/welcome/sysadmin",
    component: WelcomeAdminPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "dicomViewer",
    path: "/dicom-viewer",
    component: DicomViewerPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "checklists",
    path: "/checklists",
    component: ChecklistsPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "notifications",
    path: "/notifications",
    component: NotificationsPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "password",
    path: "/password",
    component: PasswordManagementPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "preferences",
    path: "/preferences",
    component: PreferencesPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "oauthGrants",
    path: "/oauth-grants",
    component: AuthorizationGrantsPage,
    onEnter: requireAuth
  }), React.createElement(Route, {
    name: "metadataPage",
    path: "/metadata",
    component: MetadataPage
  }), dynamicRoutes.map(function (route) {
    return React.createElement(Route, {
      name: route.name,
      key: route.name,
      path: route.path,
      component: route.component,
      onEnter: route.requireAuth ? requireAuth : null
    });
  }), React.createElement(Route, {
    path: "*",
    component: NotFound
  }))), document.getElementById('app'));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"i18n":{"en.i18n.json.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// i18n/en.i18n.json.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Package['universe:i18n'].i18n.addTranslations('en','',{"components":{"userMenu":{"logout":"Logout","login":"Sign In","join":"Join"},"connectionNotification":{"tryingToConnect":"Trying to connect","connectionIssue":"There seems to be a connection issue"},"listHeader":{"deleteConfirm":"Are you sure you want to delete the list","selectAction":"Select an action","makePublic":"Make Public","makePrivate":"Make Private","delete":"Delete","makeListPublic":"Make list public","makeListPrivate":"Make list private","deleteList":"Delete list","cancel":"Cancel","typeToAdd":"Type to add new tasks"},"listList":{"newList":"New List","newListError":"Could not create list."},"loading":{"loading":"Loading"},"mobileMenu":{"showMenu":"Show Menu"},"todoItem":{"taskName":"Task name"}},"pages":{"authPageJoin":{"emailRequired":"Email required","passwordRequired":"Password required","passwordConfirm":"Please confirm your password","join":"Join.","joinReason":"Joining allows you to make private lists","yourEmail":"Your Email","password":"Password","confirmPassword":"Confirm Password","joinNow":"Join Now","haveAccountSignIn":"Have an account? Sign in"},"authPageSignIn":{"emailRequired":"Email required","passwordRequired":"Password required","signIn":"Sign In.","signInReason":"Signing in allows you to view private lists","yourEmail":"Your Email","password":"Password","signInButton":"Sign in","needAccount":"Need an account? Join Now."},"listPage":{"noTasks":"No tasks here","addAbove":"Add new tasks using the field above","loading":"Loading tasks..."},"notFoundPage":{"pageNotFound":"Page not found"}},"api":{"lists":{"insert":{"list":"List"},"makePrivate":{"notLoggedIn":"Must be logged in to make private lists.","lastPublicList":"Cannot make the last public list private."},"makePublic":{"notLoggedIn":"Must be logged in.","accessDenied":"You don't have permission to edit this list."},"updateName":{"accessDenied":"You don't have permission to edit this list."},"remove":{"accessDenied":"'You don't have permission to remove this list.'","lastPublicList":"Cannot delete the last public list."}},"todos":{"insert":{"accessDenied":"Cannot add todos to a private list that is not yours"},"setCheckedStatus":{"accessDenied":"Cannot edit todos in a private list that is not yours"},"updateText":{"accessDenied":"Cannot edit todos in a private list that is not yours"},"remove":{"accessDenied":"Cannot remove todos in a private list that is not yours"},"item":{"taskName":"Task name"}}}});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fr.i18n.json.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// i18n/fr.i18n.json.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Package['universe:i18n'].i18n.addTranslations('fr','',{"components":{"userMenu":{"logout":"Se déconnecter","login":"Connecter","join":"Joindre"},"connectionNotification":{"tryingToConnect":"Tentative de connexion","connectionIssue":"Il semble y avoir un problème de connexion"},"listHeader":{"deleteConfirm":"Etes-vous sûr de vouloir supprimer la liste","selectAction":"Sélectionnez une action","makePublic":"Rendre publique","makePrivate":"Rendre privé","delete":"Effacer","makeListPublic":"Ouvrir la liste pour le public","makeListPrivate":"Fermer la liste au public","deleteList":"Effacer la liste","cancel":"Annuler","typeToAdd":"Tapez pour ajouter de nouvelles tâches"},"listList":{"newList":"Nouvelle liste","newListError":"La liste ne peut être créé."},"loading":{"loading":"Chargement"},"mobileMenu":{"showMenu":"Afficher le menu"},"todoItem":{"taskName":"Nom de la tâche"}},"pages":{"authPageJoin":{"emailRequired":"Email est obligatoire","passwordRequired":"Mot de passe est obligatoire","passwordConfirm":"S'il vous plaît confirmer votre mot de passe","join":"Joindre.","joinReason":"Rejoindre vous permet de faire des listes privées","yourEmail":"Votre email","password":"Mot de passe","confirmPassword":"Confirmez le mot de passe","joinNow":"Joindre","haveAccountSignIn":"Avoir un compte? Se connecter"},"authPageSignIn":{"emailRequired":"Email est obligatoire","passwordRequired":"Mot de passe est obligatoire","signIn":"Se connecter.","signInReason":"Connectez-vous pour afficher les listes privées","yourEmail":"Votre email","password":"Mot de passe","signInButton":"Se connecter","needAccount":"Besoin d'un compte? S'inscrire maintenant."},"listPage":{"noTasks":"Aucune tâche ici","addAbove":"Ajouter de nouvelles tâches ci-dessus","loading":"Chargement sauvé tâches..."},"notFoundPage":{"pageNotFound":"Page non trouvée"}},"api":{"lists":{"insert":{"list":"Liste"},"makePrivate":{"notLoggedIn":"Doit être connecté pour réaliser des listes privées.","lastPublicList":"Vous ne pouvez pas faire la dernière liste publique privée."},"makePublic":{"notLoggedIn":"Doit être connecté.","accessDenied":"Vous n'êtes pas autorisé à modifier cette liste."},"updateName":{"accessDenied":"Vous n'êtes pas autorisé à modifier cette liste."},"remove":{"accessDenied":"'Vous n'êtes pas autorisé à supprimer cette liste.'","lastPublicList":"Vous ne pouvez pas supprimer la dernière liste publique."}},"todos":{"insert":{"accessDenied":"Vous ne pouvez pas ajouter todo à une liste privée qui ne vous appartient pas"},"setCheckedStatus":{"accessDenied":"Vous ne pouvez pas modifier todos dans une liste privée qui ne vous appartient pas"},"updateText":{"accessDenied":"Vous ne pouvez pas modifier todos dans une liste privée qui ne vous appartient pas"},"remove":{"accessDenied":"Vous ne pouvez pas supprimer todos dans une liste privée qui ne vous appartient pas"},"item":{"taskName":"Nom de la tâche"}}}});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"shared":{"publications.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// shared/publications.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css",
    ".less",
    ".jsx",
    ".i18n.json"
  ]
});

require("/client/template.main.js");
require("/i18n/en.i18n.json.js");
require("/i18n/fr.i18n.json.js");
require("/shared/publications.js");
require("/client/main.js");