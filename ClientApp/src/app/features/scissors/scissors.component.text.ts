export const scissorsText = {
  heading: 'Neighbors & Stuffs Explorer',
  intro: 'Inspect each neighbor and the stuffs they own. Use expand / collapse for details.',
  controls: {
    expandAll: 'Expand all',
    collapseAll: 'Collapse all'
  },
  state: {
    loading: 'Loading data…',
    errorPrefix: 'Error: ',
    emptyNeighbors: 'No neighbors available.'
  },
  neighbor: {
    stuffsCount: (count: number) => `${count} stuff${count === 1 ? '' : 's'}`,
    noStuffs: 'No stuffs for this neighbor.'
  },
  columns: {
    neighbor: 'Neighbor',
    stuffs: 'Stuffs'
  }
} as const;

