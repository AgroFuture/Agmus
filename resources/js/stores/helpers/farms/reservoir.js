export const ReservoirTypes = [
  { key: "TAP", label: "Jo`mrak / Kran" },
  { key: "BUCKET", label: "Suv hovuzi / Sisterna" }
]

export function FindReservoirType(key) {
  return ReservoirTypes.find(item => item.key === key)
}
