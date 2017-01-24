import { helper } from 'ember-helper';
import { htmlSafe } from 'ember-string';
import canUseDOM from 'ember-metrics/utils/can-use-dom';
/* global emojione */

export function emojify([str]) {
  const emojified = canUseDOM ? emojione.toImage(str) : str;
  return htmlSafe(emojified);
}

export default helper(emojify);
