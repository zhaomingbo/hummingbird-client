import Route from 'ember-route';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import DataErrorMixin from 'client/mixins/routes/data-error';
import CanonicalRedirectMixin from 'client/mixins/routes/canonical-redirect';

export default Route.extend(DataErrorMixin, CanonicalRedirectMixin, {
  model({ slug }) {
    if (slug.match(/\D+/)) {
      return get(this, 'store').query('group', { filter: { slug } }).then(records => (
        get(records, 'firstObject')
      ));
    }
    return get(this, 'store').findRecord('group', slug);
  },

  afterModel(model) {
    set(this, 'breadcrumb', get(model, 'name'));
    set(this, 'headTags', [{
      type: 'meta',
      tagId: 'meta-og-title',
      attrs: {
        property: 'og:title',
        content: get(model, 'name')
      }
    }, {
      type: 'meta',
      tagId: 'meta-og-description',
      attrs: {
        property: 'og:description',
        content: get(model, 'tagline')
      }
    }, {
      type: 'meta',
      tagId: 'meta-description',
      attrs: {
        name: 'description',
        content: get(model, 'tagline')
      }
    }, {
      type: 'meta',
      tagId: 'meta-og-image',
      attrs: {
        property: 'og:image',
        content: get(model, 'avatar.large') || get(model, 'avatar')
      }
    }, {
      type: 'meta',
      tagId: 'meta-twitter-label1',
      attrs: {
        property: 'twitter:label1',
        content: 'Members'
      }
    }, {
      type: 'meta',
      tagId: 'meta-twitter-data1',
      attrs: {
        property: 'twitter:data1',
        content: get(model, 'membersCount')
      }
    }]);
  },

  serialize(model) {
    return { slug: get(model, 'slug') };
  }
});
