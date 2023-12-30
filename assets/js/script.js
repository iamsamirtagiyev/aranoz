// ---------------------> DOM <--------------------
const data = 'http://localhost:3000/data/'
const favorites = 'http://localhost:3000/favorites/'

const menuIcon = document.querySelector('.bx-menu')
const menu = document.querySelector('.menu')
const topBtn = document.querySelector('.top')
const productList = document.querySelector('.product-list')
const loadMore = document.querySelector('.load-btn button')
const modal = document.querySelector('.modal')
const form = document.querySelector('form')
const formBtn = form.querySelector('button')
const image = document.querySelector("#image")
const imgLabel = form.querySelector('label img')
const name = document.querySelector('.name')
const price = document.querySelector('.price')
const desc = document.querySelector('.desc')
const addBtn = document.querySelector('.add')
const select = document.querySelector('select')

let page = 1

menuIcon.onclick = () => menu.classList.toggle('active')
window.onscroll = () => {
    if (scrollY > 30) {
        topBtn.style.right = '20px'
        addBtn.style.bottom = '70px'
    }
    else {
        topBtn.style.right = '-200px'
        addBtn.style.bottom = '20px'
    }
}
topBtn.onclick = () => window.scroll({ top: 0, behavior: 'smooth' })

// ---------------------> Show Data <--------------------



const showData = (page) => {
    fetch(`${data}?_page=${page}&_limit=4`).then(response => response.json()).then(data => {
        data.forEach(item => {
            productList.innerHTML += `
            <div class="product">
                <div class="image">
                    <img src=${item.image} alt="product">
                    <div class="overlay">
                        <a href="details.html?id=${item.id}">View Details</a>
                        <button class="update" onclick="update(${item.id})">Update</button>
                        <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
                    </div>
                </div>
                <div class="desc">
                    <h1>${item.name}</h1>
                    <span>${item.price}</span>
                    <div class="action">
                        <span>+ Add To Cart</span>
                        <i class="bx bx-heart" onclick="addFavorite(${item.id})"></i>
                    </div>
                </div>
            </div>`
        })
    })
}

showData(page)
// ---------------------> Select <--------------------



// ---------------------> Load More <--------------------

loadMore.onclick = () => {
    page += 1
    showData(page)
}

// ---------------------> Open Modal <--------------------

const openModal = () => {
    modal.classList.add('active')
    form.classList.add('active')
    modal.onclick = (e) => {
        if (e.target.classList.contains('container') || e.target.classList.contains('modal')) {
            modal.classList.remove('active')
            form.classList.remove('active')
        }
    }
}

image.onchange = () => {
    imgLabel.src = URL.createObjectURL(image.files[0])
}

// ---------------------> Update <--------------------

const update = (id) => {
    openModal()
    formBtn.textContent = 'Update'
    fetch(data + id).then(response => response.json()).then(data => {
        imgLabel.src = data.image
        name.value = data.name
        price.value = data.price
        desc.value = data.description
    })

    form.onsubmit = () => {
        event.preventDefault()
        if (name.value != '' || desc.value != '' || price.value != '') {
            let reader = new FileReader
            reader.readAsDataURL(image.files[0])
            reader.onload = (e) => {
                axios.patch(data + id, {
                    image: e.target.result,
                    name: name.value,
                    price: price.value,
                    description: desc.value
                }).then(res => {
                    window.location.reload()
                })
            }
        }
        else {
            alert('Xanalari Doldurun!!!')
        }
    }
}

// ---------------------> Delete <--------------------

const deleteItem = (id) => {
    axios.delete(data + id).then(res => window.location.reload())
    axios.delete(favorites + id).then(res => window.location.reload())
}

// ---------------------> Add <--------------------

addBtn.onclick = () => {
    openModal()
    formBtn.textContent = 'Add'

    form.onsubmit = () => {
        event.preventDefault()
        if (name.value != '' || desc.value != '' || price.value != '') {
            let reader = new FileReader
            reader.readAsDataURL(image.files[0])
            reader.onload = (e) => {
                axios.post(data, {
                    image: e.target.result,
                    name: name.value,
                    price: price.value,
                    description: desc.value
                }).then(res => {
                    window.location.reload()
                })
            }
        }
        else {
            alert('Xanalari Doldurun!!!')
        }
    }
}

// ---------------------> Add Favotite <--------------------\

const addFavorite = (id) => {
    fetch(data + id).then(response => response.json()).then(data => {
        axios.post(favorites, data).then(res => alert('The product has been successfully added to favorites'))
    })
}