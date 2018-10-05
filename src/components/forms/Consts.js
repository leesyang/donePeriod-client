export const ticketOpt = {};

ticketOpt.type = [
    { text: 'Incident', value: 'Incident'},
    { text: 'Repair', value: 'Repair'},
    { text: 'Purchase', value: 'Purchase'},
]

ticketOpt.priority = [
    { text: 'Urgent', value: 'Urgent'},
    { text: 'High', value: 'High' },
    { text: 'Normal', value: 'Normal' },
    { text: 'Low', value: 'Low' }
]

ticketOpt.status = [
    { text: 'Work in progress', value: 'Work in progress', iconColor: '#FFC400'}, /*pub-mix*/
    { text: 'Delayed', value: 'Delayed', iconColor: '#FF7452'}, /*salmon-sashimi*/
    { text: 'Completed', value: 'Complete', iconColor: '#36B37E'}, /*our-kellie*/ 
    { text: 'Archived', value: 'Archived', iconColor: '#6554C0'}, /*da-juice*/
]

ticketOpt.resolution = [
    { text: 'Unresolved', value: 'Unresolved'},
    { text: 'Resolved', value: 'Resolved'},
]