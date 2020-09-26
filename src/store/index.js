import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "@/config/firebase";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    users: [],
    courses: []
  },
  mutations: {
    update_state(state, data) {
      state[data[0]] = data[1]
    }
  },
  actions: {
    async get_courses({
      commit
    }) {
      const course_query = await firebase
        .firestore()
        .collection("courses")
        .get();

      var courses = [];
      course_query.forEach((course) => {
        courses.push({
          id: course.id,
          ...course.data()
        });
      });
      commit("update_state", ["courses", courses])
    },
  },
  modules: {}
})