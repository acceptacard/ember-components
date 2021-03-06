import Component from '@ember/component';
import {schedule} from '@ember/runloop';
import layout from '../templates/components/sui-html-popup';

export default Component.extend({
    layout,
    currentPopup: null,

    didInsertElement: function () {
        this.set('currentPopup', this.$().popup({
            lastResort: true,
            popup: this.$('.ui.popup')
        }));
    },

    didReceiveAttrs: function () {
        schedule('afterRender', () => {
            if (this.get('show')) {
                this.get('currentPopup').popup('show');
            } else {
                this.get('currentPopup').popup('hide');
            }
        });
    }
});
