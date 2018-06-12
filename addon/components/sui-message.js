import Component from '@ember/component';
import layout from '../templates/components/sui-message';

export default Component.extend({
    layout,
    classNames: ['ui', 'floating', 'icon', 'message'],
    classNameBindings: ['error'],

});
