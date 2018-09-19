// ----- local storage -----
export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};

// ----- notes -----
export const getNewestNote = array => {
    let sortedArray = array.sort(function(a,b) {
      let aNote = new Date (a.created);
      let bNote = new Date (b.created);
      return aNote - bNote;
    })
    return sortedArray[sortedArray.length - 1];
}

export const formatDateShort = (date) => {
    //let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date? new Date(date).toLocaleDateString("en-US") : undefined;
}