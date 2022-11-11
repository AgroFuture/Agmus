export const InventoryTypes = [
  { key: 'seed',  label: 'Urug' },
  { key: 'growing_medium', label: 'O`sish muhiti' },
  { key: 'agrochemical', label: 'Agrokimyoviy' },
  { key: 'label_and_crop_support', label: 'Qadoq va hosilni qo`llab-quvvatlash' },
  { key: 'seeding_container', label: 'Ekish uchun konteyner' },
  { key: 'post_harvest_supply', label: 'Yig`imdan keyingi ta`minot' },
  { key: 'plant', label: 'O`simlik' },
  { key: 'other', label: 'Boshqa materiallar' },
]

export function FindInventoryType(key) {
  
  var inventoryType = InventoryTypes.find(item => item.key === key.toLowerCase())
  return inventoryType ? inventoryType.label : ''
}

export const QuantityUnits = [
  { key: 'SEEDS',  label: 'Urug`' },
  { key: 'PACKETS', label: 'Idish' },
  { key: 'GRAM', label: 'Gramm' },
  { key: 'KILOGRAM', label: 'Kilogram' },
]

export function FindQuantityUnit(key) {
  var quantityUnit =  QuantityUnits.find(item => item.key === key.toLowerCase())
  return quantityUnit ? quantityUnit.label : ''
}

export const AgrochemicalQuantityUnits = [
  { key: 'PACKETS',  label: 'Idish' },
  { key: 'BOTTLES', label: 'Butilka' },
  { key: 'BAGS', label: 'Sumka' },
]

export function FindAgrochemicalQuantityUnit(key) {
  var quantityUnit =  AgrochemicalQuantityUnits.find(item => item.key === key.toLowerCase())
  return quantityUnit ? quantityUnit.label : ''
}

export const ChemicalTypes = [
  { key: 'DISINFECTANT',  label: 'Dezinfektsiyalash va tozalash vositasi' },
  { key: 'FERTILIZER', label: 'O`g`it' },
  { key: 'HORMONE', label: 'Hormone & Growth Agent' },
  { key: 'MANURE', label: 'Go`ng' },
  { key: 'PESTICIDE', label: 'Pestitsid' },
]

export function FindChemicalType(key) {
  var chemicalType =  ChemicalTypes.find(item => item.key === key.toLowerCase())
  return chemicalType ? chemicalType.label : ''
}

export const GrowingMediumQuantityUnits = [
  { key: 'BAGS',  label: 'Sumka' },
  { key: 'CUBIC_METRE', label: 'Kub metr' },
]

export function FindGrowingMediumQuantityUnit(key) {
  var quantityUnit =  GrowingMediumQuantityUnits.find(item => item.key === key.toLowerCase())
  return quantityUnit ? quantityUnit.label : ''
}


export const PlantUnits = [
  { key: 'UNITS',  label: 'Birlik' },
  { key: 'PACKETS', label: 'Paket' },
]

export function FindPlantUnit(key) {
  var quantityUnit =  PlantUnits.find(item => item.key === key.toLowerCase())
  return quantityUnit ? quantityUnit.label : ''
}
