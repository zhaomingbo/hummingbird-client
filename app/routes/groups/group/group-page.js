import Route from 'ember-route';
import CoverPageMixin from 'client/mixins/routes/cover-page';

export default Route.extend(CoverPageMixin, {
  breadcrumb: null,

  model() {
    const model = this.modelFor('groups.group');
    return { group: model };
  }
});
