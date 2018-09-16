import store from '../store';

export const checkTickets = () => {
    return store.getState().protectedData.tickets !== undefined? true : false;
}

export const generateFullName = (obj) => { 
    return obj? `${obj.firstName} ${obj.lastName}` : undefined;
}

export const formatDate = (date) => {
    return date? new Date(date).toDateString() : undefined;
}