import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import es from 'vuetify/src/locale/es.ts'

export default new Vuetify({
  lang: {
    locales: {
      es
    },
    current: 'es',
  },
});