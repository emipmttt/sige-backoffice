import api from "../../services/api"
/*eslint no-empty-pattern: "error"*/
export default {
  namespaced: true,
  state: {},
  actions: {
    // eslint-disable-next-line no-empty-pattern
    async addBills(_, bills) {

      const createBillsResponse = await api.post("/bills/create", {
        bills
      })

      return createBillsResponse

    },
    async updateBills(_, bill) {

      const id = bill.id;
      delete bill.id;

      const createBillsResponse = await api.post("/bills/update", {
        id,
        bill
      })

      return createBillsResponse

    },

    // eslint-disable-next-line no-empty-pattern
    async deleteBills({ }, id) {

      const createBillsResponse = await api.post("/bills/delete", {
        id
      })

      return createBillsResponse

    },

    // eslint-disable-next-line no-empty-pattern
    async getBills({ }, query) {

      const createBillsResponse = await api.post("/bills/get", query)

      return createBillsResponse

    },

    // eslint-disable-next-line no-empty-pattern
    async searchBills({ }, {
      text,
      type
    }) {

      const searchBillsResponse = await api.post("/bills/search", {
        text,
        type
      })

      return searchBillsResponse;

    }

  }


}