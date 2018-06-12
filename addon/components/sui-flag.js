import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
    tagName: 'i',
    classNames: ['flag'],
    classNameBindings: ['country'],

    country: computed('name', function() {
        return this.get('name').toLowerCase();
    })
});
