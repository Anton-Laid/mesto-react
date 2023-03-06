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
        about: data.about,
      }),
    }).then(this._response);
  }

  getAvatarUser(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._response);
  }

  getNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._response);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._response);
  }

  changeLikeCardStatus(id, isLiked) {
    isLiked ? (this._method = 'PUT') : (this._method = 'DELETE');

    return fetch(`${this._url}/cards/${id}/likes`, {
      method: this._method,
      headers: this._headers,
      body: JSON.stringify({
        likes: {},
      }),
    }).then(this._response);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '7799ba30-cb0c-4e3e-9e29-b1e6d91978b5',
    'Content-Type': 'application/json',
  },
});

export default api;
