import Route from 'ember-route';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import service from 'ember-service/inject';

export default Route.extend({
  i18n: service(),

  model() {
    return this.modelFor('groups.group.group-page');
  },

  afterModel(model) {
    const desc = `Group members of ${get(model, 'group.name')}. ${get(model, 'group.tagline')}`;
    set(this, 'headTags', [{
      type: 'meta',
      tagId: 'meta-description',
      attrs: {
        name: 'description',
        content: desc
      }
    }, {
      type: 'meta',
      tagId: 'meta-og-description',
      attrs: {
        property: 'og:description',
        content: desc
      }
    }]);
  },

  titleToken(model) {
    const group = get(model, 'group.name');
    return get(this, 'i18n').t('titles.groups.group.group-page.members', { group });
  }
});
