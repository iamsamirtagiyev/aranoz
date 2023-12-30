const data = 'http://localhost:3000/data/'
const favorites = 'http://localhost:3000/favorites/'

const productList = document.querySelector('.product-list')

fetch(favorites).then(response => response.json()).then(data => {
    data.forEach(item => {
        productList.innerHTML += `
        <div class="product">
            <div class="image">
                <img src=${item.image} alt="product">
                <div class="overlay">
                    <a href="details.html?id=${item.id}">View Details</a>
                    <button class="update" onclick="update(${item.id})">Update</button>
                    <button class="delete" onclick="deleteFavorite(${item.id})">Delete</button>
                </div>
            </div>
            <div class="desc">
                <h1>${item.name}</h1>
                <span>${item.price}</span>
                <div class="action">
                    <span>+ Add To Cart</span>
                    <i class="bx bx-heart" onclick="deleteFavorite(${item.id})"></i>
                </div>
            </div>
        </div>`
    })
})

const deleteFavorite = (id) => {
    axios.delete(favorites+id).then(response => {
        alert('The product has been successfully removed from favorites')
        window.location.reload()
    })
}

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
    fetch(favorites+id).then(response => response.json()).then(data => {
        imgLabel.src = data.image
        name.value = data.name
        price.value = data.price
        desc.value = data.description
    })

    form.onsubmit = () => {
        event.preventDefault()
        if(name.value != '' || desc.value != '' || price.value != ''){
            let reader = new FileReader
            reader.readAsDataURL(image.files[0])
            reader.onload = (e) => {
                axios.patch(favorites+id, {
                    image: e.target.result,
                    name: name.value,
                    price: price.value,
                    description: desc.value
                }).then(res => {
                    window.location.reload()
                })
            }
        }
        else{
            alert('Xanalari Doldurun!!!')
        }
    }
}