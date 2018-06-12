import Component from '@ember/component';
import layout from '../templates/components/sui-segment';

export default Component.extend({
    layout,
    classNames: ['ui', 'segment'],
    classNameBindings: ['active', 'colour', 'basic', 'disabled', 'loading']
});
