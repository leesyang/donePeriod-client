import store from '../store';

export const checkTickets = () => {
    if(store.getState().protectedData.tickets !== undefined) {
        return true;
    }
    else {
        return false;
    }
}