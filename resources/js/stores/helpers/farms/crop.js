export const Containers = [
  { key: 'POT',  label: 'Tuvak' },
  { key: 'TRAY',  label: 'Tepsis' },
]


export function FindContainer(key) {
  return Containers.find(item => item.key === key)
}

export function AddClicked(data) {
  for (var i = 0; i < data.length; i++) {
    data[i].clicked = false
  }
  return data
}
