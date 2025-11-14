// Centralized texts for Neighbors feature
export const neighborsText = {
    heading: 'Neighbors',
    intro: 'Browse and manage neighbor related information.',
    table: {
        caption: 'List of neighbors',
        headers: {
            id: 'ID',
            name: 'Name',
            email: 'Email',
            street: 'Street',
            city: 'City',
            zip: 'ZIP Code',
        },
        loading: 'Loading…',
        empty: 'No neighbors to display.',
        errorPrefix: 'Error: ',
    }
} as const;
