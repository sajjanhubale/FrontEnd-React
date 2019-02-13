const initialState = {
    selectedContactDetails:null
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CONTACT_DETAILS":
            return {
                ...state,
                selectedContactDetails: action.payload
            };
        default:
            return state

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedContact: (selectedContactDetails) => {
            dispatch({
                type: "CONTACT_DETAILS",
                payload: selectedContactDetails
            })
        }
    }
}

export { mapDispatchToProps };
export default contactReducer;
