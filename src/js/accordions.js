/*--------------------------------------------------------------------------------
Import External Modules
--------------------------------------------------------------------------------*/

import Tween from '@meteora-digital/tween';

/*--------------------------------------------------------------------------------
Accordion functionality
--------------------------------------------------------------------------------*/

export default class Accordion {
  constructor(section, options = {}) {
    // The parent container
    this.section = section;
    // We will store the accordion items here
    this.items = [];

    // The user settings / defaults
    this.settings = {
      fps: 60,
      duration: 400,
      multiple: false,
    }

    // Object assign the settings
    for (let key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this.settings[key] = options[key];
    }
  }

  // This will set up an accoridon item and place it into the items array
  add(element, options = {}) {
    if (element.nodeType) {
      const Item = new AccordionItem(element, options, this.settings);

      // If we have a trigger and a target and they are both elements
      if (Item.trigger && Item.trigger.nodeType && Item.target && Item.target.nodeType) {

        // Add a click event to the item
        Item.trigger.addEventListener('click', (e) => {
          e.preventDefault();

          // If the item is active
          if (Item.active) {
            // Close it
            Item.close();
          }

          // Otherwise open it, and maybe close the rest
          else {
            // If we dont want multiple open at once, close the other items
            if (this.settings.multiple != true) {
              this.items.filter((i) => i != Item && i.active).forEach((i) => i.close());
            }

            // Open the item
            Item.open();
          }
        });

        // Slap this AccordionItem into the items array
        this.items.push(Item);
      }
    };
  }
}

class AccordionItem {
  constructor(element, options = {}, base = {}) {
    // Grab the element
    this.element = element;
    // This will store some height data for us
    this.height = {};

    // The user and default settings
    this.settings = {
      active: false,
      trigger: this.element.firstElementChild,
      target: this.element.lastElementChild,
    }

    // Object assign the settings
    for (let key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this[key] = options[key];
    }

    // reset the settings to become the Accordion settings because we dont need them now
    this.settings = base;

    // The animation controller
    this.controller = new Tween({
      fps: this.settings.fps,
    });

    // Initialise the styles
    if (this.active) this.element.classList.add('active');
    this.target.style.height = (this.active) ? 'auto' : '0px';
  }

  open() {
    if (this.active == false) {
      // Animate the accordion item
      this.animate();
      // No longer active
      this.active = true;
    }
  }

  close() {
    if (this.active) {
      // Animate the accordion item
      this.animate();
      // No longer active
      this.active = false;
    }
  }

  animate() {
    // Grab the current height
    this.height.current = this.target.clientHeight;

    // Some trickery to grab some height details because we can't animate the 'auto' value
    if (this.active == false) {
      this.target.style.height = 'auto';
      this.height.new = this.target.clientHeight;
      this.target.style.height = this.height.current + 'px';
      // Also add an active class
      this.element.classList.add('active');
    } else {
      // Remove the active class if it's no longer active
      this.element.classList.remove('active');
    }

    // Tween the height of the target element
    this.controller.tween({
      // We will always animate from the current height
      from: this.height.current,
      // If it is active, set the height to 0 otherwise set it to full height
      to: (this.active) ? 0 : this.height.new,
    }, (value) => this.target.style.height = value + 'px', this.settings.duration);
  }
}