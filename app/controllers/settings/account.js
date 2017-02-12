import Controller from 'ember-controller';
import get from 'ember-metal/get';
import { task } from 'ember-concurrency';

export default Controller.extend({
  deleteAccount: task(function* () {
    yield get(this, 'session.account').destroyRecord().then(() => {
      get(this, 'session').invalidate();
    }).catch((error) => {
      get(this, 'raven').catchException(error);
    });
  }).drop()
});
