function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        resolve(response.json())
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { get }
