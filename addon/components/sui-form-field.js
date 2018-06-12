import Component from '@ember/component';
import {isPresent, isNone} from '@ember/utils';
import layout from '../templates/components/sui-form-field';

export default Component.extend({
    layout,
    classNames: ['field'],
    classNameBindings: ['required', 'disabled', 'error'],

    didReceiveAttrs: function () {
        // Set the form field to an error state if some validation errors for it are supplied in the "errors" attribute.
        if (isPresent(this.get('errors'))) {
            this.set('error', true);
        } else if (isNone(this.get('error'))) {
            this.set('error', false);
        }
    }
});
