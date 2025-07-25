import {apiService} from './apiService'

export const getCoachByType = async (
  type: string,
  count: number | null,
  location?: number,
  coach?: number
) => {
  let url = `/api/v1/coaches/type?type=${type}`
  if (count) {
    url += `&count=${count}`
  }
  if (location) {
    url += `&location=${location}`
  }
  if (coach) {
    url += `&coach=${coach}`
  }
  const response: any = await apiService.get(url)
  return response.data
}

export const getLocations = async () => {
  const url = `/api/v1/location`
  const response: any = await apiService.get(url)
  return response.data
}

export const getLocation = async (id: string) => {
  const url = `/api/v1/location/${id}`
  const response: any = await apiService.get(url)
  return response.data
}
