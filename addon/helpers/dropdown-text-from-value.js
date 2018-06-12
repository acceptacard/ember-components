import { helper } from '@ember/component/helper';

export function dropdownTextFromValue([dropdownOptions, value]) {
  let option = dropdownOptions.findBy('value', value);
  return (option ? option['text'] : '');
}

export default helper(dropdownTextFromValue);
