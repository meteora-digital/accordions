/* -------------------------------------------------
Accordion class to handle the opening/closing
of any accoridon content!
------------------------------------------------- */

export default class Accordion {
  constructor(block, options = {}) {
    // The block is the whole AccordionBlock container
    this.block = block;
    // Here we can add some custom settings!
    this.settings = {
      class: 'js-accordion',
      duration: 300, //ms
      closeOthers: true,
    }

    // ObjectAssign all the user's options
    for (let key in this.settings) {
      // Just check if the key exists in the user's options and if it does override the defaults
      if (options[key] != undefined) this.settings[key] = options[key];
    }

    // Initialise the accordion block
    this.init();
  }

  init() {
    // Ideally we want the elements in an array, not a nodeList
    this.AccordionItems = [];
    // Find the item elements. This will be found using this.settings.class followed by --item
    this.elements = this.block.querySelectorAll(`.${this.settings.class}--item`) || false;
    // Loop the nodeList and push each element inside of an object to the items array
    for (let i = 0; i < this.elements.length; i++) this.AccordionItems.push(new AccordionItem(this.elements[i], this.settings));

    // If we wanna close the others when an item opens
    if (this.settings.closeOthers) {
      // For each accordion item
      this.AccordionItems.forEach((AccordionItem) => {
        try {
          // Add a click handler
          AccordionItem.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            // Loop all open accordions (not this one!) and close them
            this.AccordionItems.filter((item) => item.data.open && item.trigger != AccordionItem.trigger).forEach((item) => {
              item.item.classList.remove(`${this.settings.class}--open`);
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
}

class AccordionItem {
  constructor(item, settings) {
    this.item = item;

    // Our accordion settings
    this.settings = settings;

    // Some settings for the item
    this.data = {
      open: false,
      // We'll use this for the animations
      height: {
        current: 0,
        full: 0,
      }
    }

    // Used for fps control
    this.time = {
      previous: Date.now(),
      current: Date.now(),
      elapsed: 0,
      interval: 16.6666666667, // (1000ms / 60 = 16.6666666667ms) = 60fps
    }

    this.init();
  }

  init() {
    // Find the trigger element
    this.trigger = this.item.querySelector(`.${this.settings.class}--trigger`) || false;
    // Find the target element
    this.target = this.item.querySelector(`.${this.settings.class}--target`) || false;

    // If we have both a trigger and a target
    if (this.trigger && this.target) {
      // When we click the trigger
      this.trigger.addEventListener('click', (e) => {
        e.preventDefault();

        // Set the item's current height to it's current height
        this.data.height.current = this.target.offsetHeight;

        // Set the target's height to auto!
        this.target.style.height = 'auto';

        // Save the target's height
        this.data.height.full = this.target.offsetHeight;

        // Set the target's height to auto!
        this.target.style.height = this.data.height.current + 'px';

        if (this.data.open) {
          // It is no longer open
          this.data.open = false;

          // Toggle some classes for css usage
          this.item.classList.remove(`${this.settings.class}--open`);

          // Now we need to animate this change
          this.close();
        } else {
          // It is no longer close
          this.data.open = true;

          // Toggle some classes for css usage
          this.item.classList.add(`${this.settings.class}--open`);

          // Now we need to animate this change
          this.open();
        }
      });
    }
  }

  ease() {
    // Grab the current time
    this.time.current = Date.now();
    // The amount of time that has passed since the last time we called this function
    this.time.elapsed = this.time.current - this.time.previous;
    // If the time has been more than our interval
    if (this.time.elapsed >= this.time.interval) {
      // Reset the previous time var
      this.time.previous = this.time.current - (this.time.elapsed % this.time.interval);
      // return some carzy easing maths I dont understand ¯\_(ツ)_/¯
      return ((1 - (this.data.height.current / this.data.height.full)^2) - 1) * this.time.interval / this.settings.duration * this.data.height.full;
    }
    // Otherwise return 0
    return 0;
  }

  open() {
    window.requestAnimationFrame(() => {
      // Add an eased amount to our current height
      this.data.height.current += this.ease();
      // Apply this Math.ceil(height) to our target
      this.target.style.height = Math.ceil(this.data.height.current) + 'px';
      // If it's not already completely open, continue this function
      if (this.target.offsetHeight < this.data.height.full && this.data.open === true) this.open();
    });
  }

  close() {
    window.requestAnimationFrame(() => {
      // Remove an eased amount to our current height
      this.data.height.current -= this.ease();
      // Apply this Math.floor(height) to our target
      this.target.style.height = Math.floor(this.data.height.current) + 'px';
      // If it's not already completely shut, continue this function
      if (this.target.offsetHeight > 0 && this.data.open === false) this.close();
    });
  }
}