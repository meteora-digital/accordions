# Accordions (under construction)

Accordions is an es6 Class which can be used to easily control the opening / closing of accordion content.

## Installation

with webpack

```bash
yarn add accordions
```

## HTML Usage

```html
<section class="[ js-accordion ]">
  <div class="[ js-accordion--item ]">
    <div class="[ js-accordion--trigger ]">Heading Here</div>
    <div class="[ js-accordion--target ]">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut sodales lectus, ac dictum nibh. Sed commodo auctor leo eu rhoncus. Vivamus tincidunt porttitor leo, ac lacinia augue aliquet at. Nulla convallis, lorem at euismod blandit, odio lectus interdum erat, in ornare eros eros in velit. Fusce auctor ante leo, nec dictum augue efficitur ac. Vestibulum mattis velit eros, vel luctus dui elementum non. Ut leo diam, maximus eu mi eget, suscipit pharetra dolor. Donec laoreet vel ante a sagittis. Nam mattis, arcu id finibus imperdiet, libero metus fringilla dolor, in luctus orci arcu eu sapien. Sed sagittis maximus mi, nec imperdiet odio suscipit at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum posuere ante vestibulum euismod mattis.</p>
    </div>
  </div>
</section>
```

```es6
import Accordion from 'accordions';

new Accordion(document.querySelector('.js-accordion'), {
  class: 'js-accordion',
  duration: 750, //ms
  closeOthers: true,
});
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

