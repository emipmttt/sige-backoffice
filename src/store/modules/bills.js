import api from "../../sevices/api"
export default {
  namespaced: true,
  state: {},
  actions: {
    // eslint-disable-next-line no-empty-pattern
    async addBills({}, bills) {

      const createBillsResponse = await api.post("/bills/create", {
        bills
      })

      return createBillsResponse

    },

    // eslint-disable-next-line no-empty-pattern
    async getBills({}, query) {

      const createBillsResponse = await api.post("/bills/get", query)

      return createBillsResponse

    },

    // eslint-disable-next-line no-empty-pattern
    async searchBills({}, text) {

      const searchBillsResponse = await api.post("/bills/search", {
        text
      })

      return searchBillsResponse;

    }

  }


}