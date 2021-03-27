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
      duration: 300,
      //ms
      closeOthers: true
    }; // ObjectAssign all the user's options

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

      // Ideally we want the elements in an array, not a nodeList
      this.AccordionItems = []; // Find the item elements. This will be found using this.settings.class followed by --item

      this.elements = this.block.querySelectorAll(".".concat(this.settings["class"], "--item")) || false; // Loop the nodeList and push each element inside of an object to the items array

      for (var i = 0; i < this.elements.length; i++) {
        this.AccordionItems.push(new AccordionItem(this.elements[i], this.settings));
      } // If we wanna close the others when an item opens


      if (this.settings.closeOthers) {
        // For each accordion item
        this.AccordionItems.forEach(function (AccordionItem) {
          try {
            // Add a click handler
            AccordionItem.trigger.addEventListener('click', function (e) {
              e.preventDefault(); // Loop all open accordions (not this one!) and close them

              _this.AccordionItems.filter(function (item) {
                return item.data.open && item.trigger != AccordionItem.trigger;
              }).forEach(function (item) {
                item.item.classList.remove("".concat(_this.settings["class"], "--open"));
                item.data.open = false;
                item.close();
              });
            });
          } catch (err) {
            // We'll probably reach here if we don't have a trigger element
            console.log(err);
          }
        });
      }
    }
  }]);

  return Accordion;
}();

exports["default"] = Accordion;

var AccordionItem = /*#__PURE__*/function () {
  function AccordionItem(item, settings) {
    _classCallCheck(this, AccordionItem);

    this.item = item; // Our accordion settings

    this.settings = settings; // Some settings for the item

    this.data = {
      open: false,
      // We'll use this for the animations
      height: {
        current: 0,
        full: 0
      }
    }; // Used for fps control

    this.time = {
      previous: Date.now(),
      current: Date.now(),
      elapsed: 0,
      interval: 16.6666666667 // (1000ms / 60 = 16.6666666667ms) = 60fps

    };
    this.init();
  }

  _createClass(AccordionItem, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      // Find the trigger element
      this.trigger = this.item.querySelector(".".concat(this.settings["class"], "--trigger")) || false; // Find the target element

      this.target = this.item.querySelector(".".concat(this.settings["class"], "--target")) || false; // If we have both a trigger and a target

      if (this.trigger && this.target) {
        // When we click the trigger
        this.trigger.addEventListener('click', function (e) {
          e.preventDefault(); // Set the item's current height to it's current height

          _this2.data.height.current = _this2.target.offsetHeight; // Set the target's height to auto!

          _this2.target.style.height = 'auto'; // Save the target's height

          _this2.data.height.full = _this2.target.offsetHeight; // Set the target's height to auto!

          _this2.target.style.height = _this2.data.height.current + 'px';

          if (_this2.data.open) {
            // It is no longer open
            _this2.data.open = false; // Toggle some classes for css usage

            _this2.item.classList.remove("".concat(_this2.settings["class"], "--open")); // Now we need to animate this change


            _this2.close();
          } else {
            // It is no longer close
            _this2.data.open = true; // Toggle some classes for css usage

            _this2.item.classList.add("".concat(_this2.settings["class"], "--open")); // Now we need to animate this change


            _this2.open();
          }
        });
      }
    }
  }, {
    key: "ease",
    value: function ease() {
      // Grab the current time
      this.time.current = Date.now(); // The amount of time that has passed since the last time we called this function

      this.time.elapsed = this.time.current - this.time.previous; // If the time has been more than our interval

      if (this.time.elapsed >= this.time.interval) {
        // Reset the previous time var
        this.time.previous = this.time.current - this.time.elapsed % this.time.interval; // return some carzy easing maths I dont understand ¯\_(ツ)_/¯

        return ((1 - this.data.height.current / this.data.height.full ^ 2) - 1) * this.time.interval / this.settings.duration * this.data.height.full;
      } // Otherwise return 0


      return 0;
    }
  }, {
    key: "open",
    value: function open() {
      var _this3 = this;

      window.requestAnimationFrame(function () {
        // Add an eased amount to our current height
        _this3.data.height.current += _this3.ease(); // Apply this Math.ceil(height) to our target

        _this3.target.style.height = Math.ceil(_this3.data.height.current) + 'px'; // If it's not already completely open, continue this function

        if (_this3.target.offsetHeight < _this3.data.height.full && _this3.data.open === true) _this3.open();
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this4 = this;

      window.requestAnimationFrame(function () {
        // Remove an eased amount to our current height
        _this4.data.height.current -= _this4.ease(); // Apply this Math.floor(height) to our target

        _this4.target.style.height = Math.floor(_this4.data.height.current) + 'px'; // If it's not already completely shut, continue this function

        if (_this4.target.offsetHeight > 0 && _this4.data.open === false) _this4.close();
      });
    }
  }]);

  return AccordionItem;
}();