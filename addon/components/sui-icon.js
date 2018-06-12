import Component from '@ember/component';
import layout from '../templates/components/sui-icon';

export default Component.extend({
    tagName: 'i',
    classNames: ['icon'],
    classNameBindings: ['name']
});
