const credReducer = (state = [], action) => {
    switch(action.type){
        case "setCred": return [...state, action.value];
        case "resetCred": return [...action.value];
        case "spliceCred": {
            let lista = [...state];
            lista.splice(action.index, 1)
            return [...lista];
        }
        case "popCred":{
            let lista = [...state];
            lista.pop()
            return [...lista];
        }
        default: return state;
    }
}

export default credReducer;