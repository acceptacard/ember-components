import Component from '@ember/component';
import {computed} from '@ember/object';
import {isPresent} from '@ember/utils';

export default Component.extend({
    classNames: ['ui', 'label'],
    classNameBindings: ['colour'],

    labelText: computed('text', function () {
        let text = this.get('text');

        if (this.get('uppercase') && isPresent(text)) {
            return text.toUpperCase();
        } else {
            return text;
        }
    }),

    didReceiveAttrs: function () {
        this._super(...arguments);

        if (this.get('link')) {
            this.set('tagName', 'a');
        } else {
            this.set('tagName', 'div');
        }
    },

    click: function () {
        if (isPresent(this.get('clicked'))) {
            return this.get('clicked')();
        }
    }
});
