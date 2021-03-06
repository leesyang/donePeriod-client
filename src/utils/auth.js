// ----- local storage -----
export const loadAuthToken = () => {
    try {
        return localStorage.getItem('authToken');
    } catch (e) {}
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
    return date? new Date(date).toLocaleDateString("en-US") : undefined;
}

export const dateTimer = (date) => {
    const daysDiff = new Date(date).getDate() - new Date(Date.now()).getDate();
    return daysDiff;
}