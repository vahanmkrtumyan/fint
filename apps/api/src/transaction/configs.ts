import axios from 'axios'

export async function getCashInConfig() {
  const config = await axios.get('https://developers.paysera.com/tasks/api/cash-in')
  return config.data
}

export async function getCashOutNaturalConfig() {
  const config = await axios.get('https://developers.paysera.com/tasks/api/cash-out-natural')
  return config.data
}

export async function getCashOutJuridicalConfig() {
  const config = await axios.get('https://developers.paysera.com/tasks/api/cash-out-juridical')
  return config.data
}
