export const AreaTypes = [
  { key: 'SEEDING', label: 'Ko`chat' },
  { key: 'GROWING', label: 'O`sib borayotgan' },
];

export const AreaLocations = [
  { key: 'OUTDOOR', label: 'Dala (Tashqi)' },
  { key: 'INDOOR', label: 'Issiqxona (Ichki)' },
];

export const AreaSizeUnits = [
  { key: 'Ha', label: 'Ga' },
  { key: 'm2', label: 'm2' },
];

export function FindAreaType(key) {
  return AreaTypes.find(item => item.key === key);
}

export function FindAreaLocation(key) {
  return AreaLocations.find(item => item.key === key);
}

export function FindAreaSizeUnit(key) {
  return AreaSizeUnits.find(item => item.key === key);
}
