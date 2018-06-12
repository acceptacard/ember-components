import Service from '@ember/service';
import { computed } from '@ember/object';
import { filter } from '@ember/object/computed';
import { inject } from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default Service.extend({

    session: inject(),
    store: inject(),
    notify: inject('notification-messages'),
    localStorage: storageFor('basket'),

    items: null,

    init() {
        this._super(...arguments);
        // TODO: Check it exists, if not, create blank array
        if (!(typeof this.get('localStorage.items') === "undefined")) {
            this.set('items', this.get('localStorage.items'));
        } else {
            this.set('items', []);
            this.set('localStorage.items', []);
        }

        // this.add(this.get('store').createRecord('product', {
        //     productId: 9,
        //     name: 'Miura M010',
        //     image: 'https://www.secure-operations.com/images/terminal_only/terminals/m10.jpg',
        //     identifier: '106958801',
        //     purchasePrice: 9900,
        //     rentalPrice: 0,
        //     depositPrice: 0
        // }));
        // this.add(this.get('store').createRecord('product', {
        //     productId: 9,
        //     name: 'Miura M010',
        //     image: 'https://www.secure-operations.com/images/terminal_only/terminals/m10.jpg',
        //     identifier: '106958801',
        //     purchasePrice: 0,
        //     rentalPrice: 1000,
        //     depositPrice: 0
        // }));
        // this.add(this.get('store').createRecord('product', {
        //     productId: 9,
        //     name: 'Miura M010',
        //     image: 'https://www.secure-operations.com/images/terminal_only/terminals/m10.jpg',
        //     identifier: '106958801',
        //     purchasePrice: 9900,
        //     rentalPrice: 1300,
        //     depositPrice: 5000
        // }));
        // this.add(this.get('store').createRecord('product', {
        //     productId: 9,
        //     name: 'Miura M010',
        //     image: 'https://www.secure-operations.com/images/terminal_only/terminals/m10.jpg',
        //     identifier: '106958801',
        //     purchasePrice: 9900,
        //     rentalPrice: 1300,
        //     depositPrice: 5000
        // }));

    },

    add(item) {
        console.log(item);
        let userId = this.get('session.session.content.userId');
        let random = userId + "_" + Math.floor(Math.random() * 1000000);
        console.log(random);
        item.set('uniqueId', random);
        this.get('items').pushObject(item);
        this.updateStore();
        return random;
    },

    remove(item) {
        this.get('notify').success('Item Removed');
        this.get('items').removeObject(item);
        this.updateStore();
    },

    updateStore() {
        this.set('localStorage.items', this.get('items'));
    },

    empty() {
        this.get('items').clear();
        this.updateStore();
    },

    hasItems: computed('items.[]', function() {
        return this.get('items').length > 0;
    }),

    basketPurchaseValue: computed('items.[]', function() {
        let total = 0;
        this.get('items').forEach((item) => {
            total += item.purchasePrice / 100;
        });
        return total;
    }),

    basketDepositValue: computed('items.[]', function() {
        let total = 0;
        this.get('items').forEach((item) => {
            total += item.depositPrice / 100;
        });
        return total;
    }),

    basketRentalValue: computed('items.[]', function() {
        let total = 0;
        this.get('items').forEach((item) => {
            total += item.rentalPrice / 100;
        });
        return total;
    }),

    numberOfItems: computed('items.[]', function() {
        return this.get('items').length;
    }),

    numberUniqueItems() {

    }

});
