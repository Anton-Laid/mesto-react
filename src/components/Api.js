class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._response);
  }

  getCardsList() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._response);
  }

  getRedactProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.profession,
      }),
    }).then(this._response);
  }

  getAvatarUser(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.inputAvatar,
      }),
    }).then(this._response);
  }

  getNewCard(popuoTitle, popuoImage) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: popuoTitle,
        link: popuoImage,
      }),
    }).then(this._response);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._response);
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._response);
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._response);
  }
}

export default Api;
