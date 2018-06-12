import Component from '@ember/component';
import layout from '../templates/components/sui-form';

export default Component.extend({
    layout,
    classNames: ['ui', 'form'],
    classNameBindings: ['disabled']
});
