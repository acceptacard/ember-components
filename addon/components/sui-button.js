import Component from '@ember/component';
import {isPresent} from "@ember/utils";
import layout from '../templates/components/sui-button';

export default Component.extend({
    layout,
    classNames: ['ui', 'button'],
    classNameBindings: [
        'loading', 'disabled'
    ],

    didInsertElement: function () {
        this._super(...arguments);

        if (isPresent(this.get('popup'))) {
            this.$().popup({
                on: 'click',
                inline: true,
                position: 'bottom left',
                hoverable: false
            });
        }
    },

    click: function () {
        if (isPresent(this.get('toggle'))) {
            if (this.$().hasClass('active')) {
                this.$().removeClass('active');
            } else {
                this.$().addClass('active');
            }
        }

        if (isPresent(this.get('onClick'))) {
            this.get('onClick')();
        }
    }
});
