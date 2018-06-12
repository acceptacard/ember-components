import Component from '@ember/component';

export default Component.extend({
    classNames: ['ui', 'segment'],
    classNameBindings: ['active', 'colour', 'basic', 'disabled', 'loading']
});
