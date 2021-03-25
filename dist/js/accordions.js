"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* -------------------------------------------------
Accordion class to handle the opening/closing
of any accoridon content!
------------------------------------------------- */
var Accordion = /*#__PURE__*/function () {
  function Accordion(block) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Accordion);

    // The block is the whole AccordionBlock container
    this.block = block; // Here we can add some custom settings!

    this.settings = {
      "class": 'js-accordion',
      duration: 750 //ms

    };
    this.openEvents = 0;
    this.closeEvents = 0; // ObjectAssign all the user's options

    for (var key in this.settings) {
      // Just check if the key exists in the user's options and if it does override the defaults
      if (options[key]) this.settings[key] = options[key];
    } // Initialise the accordion block


    this.init();
  }

  _createClass(Accordion, [{
    key: "init",
    value: function init() {
      var _this = this;

      // This will store all the relevant elements for us
      this.elements = {}; // Find the item elements. This will be found using this.settings.class followed by --item

      this.elements.items = this.block.querySelectorAll(".".concat(this.settings["class"], "--item")) || false; // Ideally we want the elements in an array, not a nodeList

      this.items = []; // Loop the nodeList and push each element inside of an object to the items array

      for (var i = 0; i < this.elements.items.length; i++) {
        this.items.push({
          item: this.elements.items[i],
          // Find the trigger element
          trigger: this.elements.items[i].querySelector(".".concat(this.settings["class"], "--trigger")) || false,
          // Find the target element
          target: this.elements.items[i].querySelector(".".concat(this.settings["class"], "--target")) || false,
          open: false,
          // We'll use this for the animations :)
          height: {
            current: 0,
            target: 0,
            full: 0
          }
        });
      } // loop the items


      this.items.forEach(function (item) {
        // If we have both a trigger and a target
        if (item.trigger && item.target) {
          // When we click the trigger
          item.trigger.addEventListener('click', function (e) {
            e.preventDefault(); // Set the item's current height to it's current height ¯\_(ツ)_/¯

            item.height.current = item.target.offsetHeight; // Set the target's height to auto!

            item.target.style.height = 'auto'; // Save the target's height

            item.height.full = item.target.offsetHeight; // Set the target's height to auto!

            item.target.style.height = item.height.current + 'px';

            if (item.open) {
              // It is no longer open
              item.open = false; // Toggle some classes for css usage

              item.item.classList.add("".concat(_this.settings["class"], "--closed"));
              item.item.classList.remove("".concat(_this.settings["class"], "--open")); // Set the target height to 0!

              item.height.target = 0; // Now we need to animate this change

              _this.close(item);
            } else {
              // It is no longer closed
              item.open = true; // Toggle some classes for css usage

              item.item.classList.add("".concat(_this.settings["class"], "--open"));
              item.item.classList.remove("".concat(_this.settings["class"], "--closed")); // Set the target height to full!

              item.height.target = item.height.full; // Now we need to animate this change

              _this.open(item);
            }
          });
        }
      });
    }
  }, {
    key: "ease",
    value: function ease(a, b) {
      // Some carzy easing maths I dont understand ¯\_(ツ)_/¯
      return ((1 - a / b ^ 2) - 1) * 30 / this.settings.duration * b;
    }
  }, {
    key: "open",
    value: function open() {
      var _this2 = this;

      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      // We need to make sure we have an item, and that it's not already completely open
      if (item && item.target.offsetHeight < item.height.target) {
        window.requestAnimationFrame(function () {
          // Add an eased amount to our current height
          item.height.current += _this2.ease(item.height.current, item.height.full); // Apply this Math.ceil(height) to our target

          item.target.style.height = Math.ceil(item.height.current) + 'px'; // Continue this function :)

          _this2.open(item);
        });
      }
    }
  }, {
    key: "close",
    value: function close() {
      var _this3 = this;

      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      // We need to make sure we have an item, and that it's not already completely shut
      if (item && item.target.offsetHeight > item.height.target) {
        window.requestAnimationFrame(function () {
          // Remove an eased amount to our current height
          item.height.current -= _this3.ease(item.height.current, item.height.full); // Apply this Math.floor(height) to our target

          item.target.style.height = Math.floor(item.height.current) + 'px'; // Continue this function :)

          _this3.close(item);
        });
      }
    }
  }]);

  return Accordion;
}();

exports["default"] = Accordion;