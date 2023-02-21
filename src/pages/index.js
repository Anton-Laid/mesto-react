import '../pages/index.css';

import {
    buttonOpenPopupUser,
    popupUserInputName,
    popupUserInputJob,
    buttonPlus,
    photoContainer,
    popupFhoto,
    popupUser,
    popupFhotoAdd,
    validationConfig,
    avatarImage,
    buttonUpdateImagePopup,
    popupAvatar,
    api,
    popupDeleteCard,
} from '../utils/constants.js';

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm';

//<--------------------------------- API ------------------------------------>

Promise.all([api.getInfoUser(), api.getCardsList()])
    // тут деструктурируете ответ от сервера
    .then(([userData, cards]) => {
        inputValues.setUserInfo(userData);
        inputValues.getAvatar(userData);
        userId = userData;
        defaultCardList.renderCard(cards);
    })
    .catch((err) => {
        console.log(err);
    })

//<--------------------------------- передача имени и описания  -------------------->

const inputValues = new UserInfo({
    name: '.profile__title',
    job: '.profile__subtitle',
    avatar: '.profile__avatar-image'
});

const popupOpenProfile = new PopupWithForm(popupUser, {
    submitForm: ({ name, profession }) => {
        popupOpenProfile.loadingSubmit(true)
        api.getRedactProfile({ name, profession })
            .then(data => {
                inputValues.setUserInfo(data);
                popupOpenProfile.close();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                popupOpenProfile.loadingSubmit(false)
            })
    },
});

popupOpenProfile.setEventListeners();

//<--------------------------------- renderCards ------------------------------------>

function generateCard(item, template) {
    const card = new Card(item, template, {
        handleCardClick: (link, name) => {
            openPopupFoto.open(link, name);
        },
        handleDeleteClick: (data) => {
            popupDelete.open()
            popupDelete.setSubmitAction(() => {
                api.deleteCard(data._id)
                    .then(() => {
                        card.handleDeleteCard();
                        popupDelete.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        },
        likeCard: (id) => {
            api.addLike(id._id)
                .then((data) => {
                    card.likesAdd()
                    card.sumLike(data.likes.length);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        dislikeCard: (id) => {
            api.removeLike(id._id)
                .then((data) => {
                    card.likesDel()
                    card.sumLike(data.likes.length);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, userId)

    const addCard = card.generateCard();

    return addCard;
}

const popupDelete = new PopupWithConfirm(popupDeleteCard);

popupDelete.setEventListeners();

//<-------------------------- добавление карточек ------------------------>

const defaultCardList = new Section({
    renderer: (item) => defaultCardList.addItem(generateCard(item, '#template'))
}, photoContainer);

//<--------------------------------- открытие карточки  ----------------------------->

const openPopupFoto = new PopupWithImage(popupFhoto);

openPopupFoto.setEventListeners()


//<--------------------------------- передача url и title  ------------------------>

const openAddFoto = new PopupWithForm(popupFhotoAdd, {
    submitForm: ({ popuoTitle, popuoImage }) => {
        openAddFoto.loadingSubmit(true);
        api
            .getNewCard(popuoTitle, popuoImage)
            .then((res) => {
                defaultCardList.prependElement(generateCard(res, '#template'));
                openAddFoto.close();
            })
            .catch((err) => {
                console.log(err.status);
            })
            .finally(() => {
                openAddFoto.loadingSubmit(false)
            })
    },
});

openAddFoto.setEventListeners();

//<--------------------------------- передача изменение аватарки ------------------------>

const openAvatarImage = new PopupWithForm(popupAvatar, {
    submitForm: ({ inputAvatar }) => {
        openAvatarImage.loadingSubmit(true)
        api.getAvatarUser({ inputAvatar })
            .then((data) => {
                inputValues.getAvatar(data);
                openAvatarImage.close();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                openAvatarImage.loadingSubmit(false)
            })
    },
});

openAvatarImage.setEventListeners();

//<--------------------------------- evt на bt  ----------------------------------->

buttonOpenPopupUser.addEventListener('click', () => {
    popupOpenProfile.open();
    const inputList = inputValues.getUserInfo();
    popupUserInputName.value = inputList.name;
    popupUserInputJob.value = inputList.profession;
    validFormUser.resetValidation();
})

buttonPlus.addEventListener('click', () => {
    openAddFoto.open();
    validFormPhoto.resetValidation();
})

buttonUpdateImagePopup.addEventListener('click', () => {
    openAvatarImage.open()
    validFormAvatar.resetValidation();
})

let userId

//<--------------------------------- валидация inputs  ---------------------------->

const validFormUser = new FormValidator(validationConfig, '.form-user');
const validFormPhoto = new FormValidator(validationConfig, '.form-add');
const validFormAvatar = new FormValidator(validationConfig, '.form-avatar')

validFormUser.enableValidation();
validFormPhoto.enableValidation();
validFormAvatar.enableValidation();