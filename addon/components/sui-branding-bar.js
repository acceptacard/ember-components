import Component from '@ember/component';
import layout from '../templates/components/sui-branding-bar';

export default Component.extend({
    layout,
    classNames: ['ui', 'menu', 'browse', 'large', 'top', 'attached'],

    classNameBindings: ['poweredByPcs']

});
