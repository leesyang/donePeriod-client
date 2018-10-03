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
    { text: 'Work in progress', value: 'Work in progress'},
    { text: 'Delayed', value: 'Delayed'},
    { text: 'Completed', value: 'Complete'},
    { text: 'Archived', value: 'Archived'},
]

ticketOpt.resolution = [
    { text: 'Unresolved', value: 'Unresolved'},
    { text: 'Resolved', value: 'Resolved'},
]