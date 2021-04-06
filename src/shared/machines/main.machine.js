import views from "./views.partial.js";
import modal from "./modal.partial.js";
import loading from "./loading.partial.js";

export default {

    type: "parallel",

    context: {
        employees: [],
        selectedEmployee: null,
    },

    states: {
        views,
        loading,
        modal
    },

};
