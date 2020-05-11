const app = document.querySelector('#app');

let users;

const url = 'https://acme-users-api-rev.herokuapp.com/api/users/'



//creating header
const header = document.createElement('h1')
header.innerHTML = 'Acme User Search';

//creating search bar
const searchInput = document.createElement('input');
searchInput.input = 'text'
searchInput.textContent = ''
const log = document.getElementById('values');
const idx = window.location.hash.slice(1);
console.log(idx);
searchInput.addEventListener('change', updateValue)
searchInput.classList.add('searchBar')

//function handler to take in values from search bars and register to URL
function updateValue(e) {
    window.location.hash = `#${e.target.value}`;
    fetchAndRender()
    return e.target.value
}


//creating Clear link
const clearButton = document.createElement('a')
clearButton.innerText = 'Clear'
clearButton.href = 'file:///Users/skwon/coding/AcmeUserSearch/index.html'
clearButton.classList.add('clearButton')

// function to create user containers
const createUserContainer = function (avatar, firstName, lastName, email, title) {
    const userContainer = document.createElement('li');
    // addint firstname
    const avatarContainer = document.createElement('div')
    avatarContainer.classList.add('avatar');
    if (avatar == 'Avatar') {
        avatarContainer.innerHTML = 'Avatar'
        userContainer.append(avatarContainer)
    }
    else {
        
        const imgContainer = document.createElement('IMG');
        imgContainer.setAttribute('src', avatar);
        imgContainer.classList.add('image')
        imgContainer.style['background-image'] = `url('${avatar}')`;
        imgContainer.style['background-size'] = 'cover';
        avatarContainer.append(imgContainer)
        userContainer.append(avatarContainer)
    }
    const firstNameContainer = document.createElement('div')
    firstNameContainer.classList.add('firstName');
    firstNameContainer.append(document.createTextNode(firstName));
    userContainer.append(firstNameContainer)

    const lastNameContainer = document.createElement('div')
    lastNameContainer.classList.add('lastName')
    lastNameContainer.append(document.createTextNode(lastName))
    userContainer.append(lastNameContainer)

    const emailContainer = document.createElement('div')
    emailContainer.classList.add('email')
    emailContainer.append(document.createTextNode(email))
    userContainer.append(emailContainer)

    const titleContainer = document.createElement('div')
    titleContainer.classList.add('title')
    titleContainer.append(document.createTextNode(title))
    userContainer.append(titleContainer)

    return userContainer
}

// renders the Home page without users
const renderHome = function() {
    const ul = document.createElement('ul')
    app.innerHTML = ""
    app.append(header)
    ul.append(searchInput)
    ul.append(clearButton)
    app.append(ul)
}

//renders a User

const render = function (data) {
    const userUl = document.createElement('ul');
    userUl.classList.add('masterList')
    console.log('render triggered')
    avatar = data.avatar
    firstName = data.firstName
    lastName = data.lastName
    email = data.email
    // console.log(email)
    title = data.title
    // console.log(title)
    userUl.append(createUserContainer(avatar, firstName, lastName, email, title))
    app.append(userUl)
}

//
const fetchAndRender = () => {
    const ul = document.createElement('ul')
    app.innerHTML = ""
    app.append(header)
    ul.append(searchInput)
    ul.append(clearButton)
    headerUser = (createUserContainer('Avatar', 'First Name', 'Last Name', 'Email', 'Title'))
    headerUser.classList.add('headUser')
    ul.append(headerUser)
    app.append(ul)
    console.log(window.location.hash)
    const searchedPage = window.location.hash.slice(1).toUpperCase()
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            pages = data.count / 50;
            for (let i = 1; i < pages; i++) {
                fetch(url + i)
                    .then((response) => {
                        return response.json()
                    })
                    .then((subdata) => {
                        subdata.users.forEach(currUser => {
                            str = currUser.fullName + currUser.email + currUser.title
                            str = str.toUpperCase()
                            // console.log(str)
                            // console.log(searchedPage)
                            if (str.includes(searchedPage)) {
                                // console.log(currUser)
                                // console.log(currUser)
                                render(currUser)
                                // console.log(selectedUsers)
                            }
                        })
                    })
            }
        })
}

window.addEventListener('hashchange', fetchAndRender);
renderHome()
