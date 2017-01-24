import Service from 'ember-service';
import service from 'ember-service/inject';
import get from 'ember-metal/get';

export default Service.extend({
  fastboot: service(),

  /**
   * TEMP:
   * As Fastboot is only termporarily being served to crawlers, we don't want the returned host
   * to be the herokuapp url.
   */
  getHost() {
    if (get(this, 'fastboot.isFastBoot')) {
      return 'https://kitsu.io';
    }
    const loc = window.location;
    return `${loc.protocol}//${loc.host}`;
  },

  getPath() {
    return get(this, 'fastboot.isFastBoot') ?
      get(this, 'fastboot.request.path') : window.location.pathname;
  },

  getFullURL() {
    const host = this.getHost();
    const path = this.getPath();
    return `${host}${path}`;
  }
});
