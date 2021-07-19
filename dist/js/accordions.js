"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tween = _interopRequireDefault(require("@meteora-digital/tween"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*--------------------------------------------------------------------------------
Accordion functionality
--------------------------------------------------------------------------------*/
var Accordion = /*#__PURE__*/function () {
  function Accordion(section) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Accordion);

    // The parent container
    this.section = section; // We will store the accordion items here

    this.items = []; // The user settings / defaults

    this.settings = {
      fps: 60,
      duration: 400,
      multiple: false
    }; // Object assign the settings

    for (var key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this.settings[key] = options[key];
    }
  } // This will set up an accoridon item and place it into the items array


  _createClass(Accordion, [{
    key: "add",
    value: function add(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (element.nodeType) {
        var Item = new AccordionItem(element, options, this.settings); // If we have a trigger and a target and they are both elements

        if (Item.trigger && Item.trigger.nodeType && Item.target && Item.target.nodeType) {
          // Add a click event to the item
          Item.trigger.addEventListener('click', function (e) {
            e.preventDefault(); // If the item is active

            if (Item.active) {
              // Close it
              Item.close();
            } // Otherwise open it, and maybe close the rest
            else {
                // If we dont want multiple open at once, close the other items
                if (_this.settings.multiple != true) {
                  _this.items.filter(function (i) {
                    return i != Item && i.active;
                  }).forEach(function (i) {
                    return i.close();
                  });
                } // Open the item


                Item.open();
              }
          }); // Slap this AccordionItem into the items array

          this.items.push(Item);
        }
      }

      ;
    }
  }]);

  return Accordion;
}();

exports["default"] = Accordion;

var AccordionItem = /*#__PURE__*/function () {
  function AccordionItem(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, AccordionItem);

    // Grab the element
    this.element = element; // This will store some height data for us

    this.height = {}; // The user and default settings

    this.settings = {
      active: false,
      trigger: this.element.firstElementChild,
      target: this.element.lastElementChild
    }; // Object assign the settings

    for (var key in this.settings) {
      if (this.settings.hasOwnProperty(key)) {
        options.hasOwnProperty(key) ? this[key] = options[key] : this[key] = this.settings[key];
      }
    } // reset the settings to become the Accordion settings because we dont need them now


    this.settings = base; // The animation controller

    this.controller = new _tween["default"]({
      fps: this.settings.fps
    }); // Initialise the styles

    if (this.active) this.element.classList.add('active');
    this.target.style.height = this.active ? 'auto' : '0px';
  }

  _createClass(AccordionItem, [{
    key: "open",
    value: function open() {
      if (this.active == false) {
        // Animate the accordion item
        this.animate(); // No longer active

        this.active = true;
      }
    }
  }, {
    key: "close",
    value: function close() {
      if (this.active) {
        // Animate the accordion item
        this.animate(); // No longer active

        this.active = false;
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this2 = this;

      // Grab the current height
      this.height.current = this.target.clientHeight; // Some trickery to grab some height details because we can't animate the 'auto' value

      if (this.active == false) {
        this.target.style.height = 'auto';
        this.height["new"] = this.target.clientHeight;
        this.target.style.height = this.height.current + 'px'; // Also add an active class

        this.element.classList.add('active');
      } else {
        // Remove the active class if it's no longer active
        this.element.classList.remove('active');
      } // Tween the height of the target element


      this.controller.tween({
        // We will always animate from the current height
        from: this.height.current,
        // If it is active, set the height to 0 otherwise set it to full height
        to: this.active ? 0 : this.height["new"]
      }, function (value) {
        return _this2.target.style.height = value + 'px';
      }, this.settings.duration);
    }
  }]);

  return AccordionItem;
}();