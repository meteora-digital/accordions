# Accordions

Accordions is a class which can be used to easily control the opening / closing of accordion content.

## Installation

```bash
npm i accordions
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

const AccordionContent = new Accordion(document.querySelector('.js-accordion'), {
  fps: 60,
  duration: 400,
  multiple: false,
});
```

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| fps | number | the number of frames per second that we animate the content | 60 |
| duration | number | number in milliseconds that the content will open or close in | 400 |
| multiple | boolean | if false opening an item will close the others | false |


#### Adding Accordion Items

```javascript
AccordionContent.add(element, {
  active: false,
  minHeight: 0,
  trigger: element.firstElementChild,
  target: element.lastElementChild,
});
```

The add method will load the accordion with a new item.
the tween() method takes 2 arguments. 
The first argument is the element containing the accordion content.
The second argument is the user options

| Option | Type | Description | Defaults |
|--------|------|-------------|----------|
| active | boolean | If true the item will be open on page load | false |
| minHeight | number | Just in case you dont want the accordion to close all the way | 0 |
| trigger | element | The element that we will click on to open the accordion item | the accordion item element's first child |
| target | element | The element that we will open and close to reveal some content | the accordion item element's last child |


## License
[MIT](https://choosealicense.com/licenses/mit/)

