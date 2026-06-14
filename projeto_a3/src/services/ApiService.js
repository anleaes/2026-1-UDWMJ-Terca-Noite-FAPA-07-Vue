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

function put(url, body) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        resolve(response.json())
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        resolve(response.json())
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function remove(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        resolve(response.json())
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { get, post, put, remove }
