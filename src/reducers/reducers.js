let defaultState = {
    example1: 'example',
    example2: 'test',
};

const reducers = (state=defaultState, action) => {
    switch (action.type) {
        case 'EXAMPLE':
            return {
                ...state,
                example1: 'newPropOne'
            }
        case 'EXAMPLE-TWO':
            return {
                ...state,
                example2: action.payload
            }
        default: return state;
    }
}

export default reducers;