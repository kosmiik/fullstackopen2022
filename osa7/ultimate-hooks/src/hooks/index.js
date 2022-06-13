import {useState, useEffect} from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
    return response.data
  }

  useEffect(() =>
  // eslint-disable-next-line react-hooks/exhaustive-deps 
    {getAll()}, [])

  const create = async (resource) => {
    const cfg = {headers: {Authorization: token}}
    const response = await axios.post(baseUrl, resource, cfg)
    setResources(resources.concat(response.data))
    return response.data
  }

  const service = {
    getAll, 
    create
  }

  return [
    resources, service, setToken
  ]
}