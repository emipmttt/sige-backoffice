import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "@/config/firebase";
import bills from "./modules/bills"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

    bills

  },
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
    async get_users({
      commit
    }) {
      const user_query = await firebase.firestore().collection("users").get();
      var users = [];
      user_query.forEach((user) => {
        users.push({
          id: user.id,
          ...user.data()
        });
      });
      commit('update_state', ["users", users])
    },
    // eslint-disable-next-line no-empty-pattern
    // search_bills({}, search_text) {
    // }
  },
})