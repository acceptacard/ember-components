import Component from '@ember/component';
import layout from '../templates/components/sui-pagination-menu';

export default Component.extend({
    layout,
    classNames: ['ui', 'stackable', 'pagination', 'menu'],

    init() {
        this._super(...arguments)
        this.set('defaultLinks', {
            'first': {
                icon: 'step backward icon'
            },
            'prev': {
                icon: 'horizontally flipped play icon'
            },
            'next': {
                icon: 'play icon'
            },
            'last': {
                icon: 'step forward icon'
            }
        })
    },

    actions: {
        updatePaginationParams: function (link) {
            let decodedLink = decodeURIComponent(link);
            let queryParams = [];
            let splitLink = decodedLink.split('?');

            if (splitLink.length > 1) {
                splitLink.slice(1)[0].split('&').forEach(pairs => {
                    let index = pairs.split('=')[0];
                    let value = pairs.split('=')[1];

                    // If a nested query param (E.g. page[offset]).
                    let firstBracket = index.indexOf('[');

                    if (firstBracket > -1) {
                        let lastBracket = index.indexOf(']');
                        let key = index.substring(firstBracket + 1, lastBracket);
                        let param = {};
                        param[key] = value;

                        queryParams.pushObject(param);
                    } else {
                        let param = {};
                        param[index] = value;

                        queryParams.pushObject(param);
                    }
                });

            } else {
                queryParams.pushObject({offset: '0'});
            }

            // Call action on parent controller.
            this.get('updatePaginationParams')(queryParams);
        }
    }
});
