import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import service from 'ember-service/inject';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: 'section',
  classNames: ['media--main-characters'],
  store: service(),

  getCharacters: task(function* (mediaType, mediaId) {
    return yield get(this, 'store').query(`${mediaType}-character`, {
      filter: { [`${mediaType}_id`]: mediaId },
      include: 'character',
      sort: 'role',
      page: { limit: 4 }
    });
  }).restartable(),

  didReceiveAttrs() {
    this._super(...arguments);
    const type = get(this, 'media.modelType');
    const id = get(this, 'media.id');
    const taskInstance = get(this, 'getCharacters').perform(type, id);
    set(this, 'taskInstance', taskInstance);
  },
});
