import Base from 'client/models/-base';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Base.extend({
  locale: attr('string'),
  notes: attr('string'),

  animeCharacter: belongsTo('anime-character'),
  person: belongsTo('person'),
  licensor: belongsTo('producer')
});
