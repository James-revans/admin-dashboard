export default {
    initial: "hidden",
    
    on: {
        LOADING_SHOW : ".show.loader",
        LOADING_HIDE : ".hidden",
    },

    states: {
        hidden: {},
        show: {
            initial : "loader",

            states: {
                loader : {},
            }
        },
    },
};
