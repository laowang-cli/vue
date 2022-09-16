const namespace = "__00__"

export const getItem = <T>(key: string): T | undefined => {
  key = namespace + key
  let result
  const string = localStorage.getItem(key)
  if (string) {
    const data: { value: T; expireAt: number | null } = JSON.parse(string)
    const { value, expireAt } = data
    if (expireAt && expireAt < Date.now()) {
      localStorage.removeItem(key)
    } else {
      result = value
    }
  }
  return result
}

export const setItem = (key: string, value: any, expire?: number) => {
  key = namespace + key
  const data = {
    expireAt: expire ? Date.now() + expire * 1000 : null,
    value
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export const removeItem = (key: string) => {
  key = namespace + key
  localStorage.removeItem(key)
}
