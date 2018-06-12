import Component from '@ember/component';
import {isPresent} from "@ember/utils";

export default Component.extend({
    classNames: ['ui', 'menu'],

    didRender: function () {
        this.$('.popup.item').popup({
            on: 'click'
        });

        this.$('.dropdown.item, .dropdown.label').dropdown();

        if (isPresent(this.get('browse'))) {
            this.$('.browse.item').popup({
                inline: true,
                position: 'bottom left',
                on: 'click',
                lastResort: true,
                closable: true
            });

            let popup = this.$('.browse.item');

            // Close popup if a menu item is clicked.
            this.$('.ui.fluid.popup a').on('click', function () {
                popup.popup('hide');
            });
        }
    }
});
