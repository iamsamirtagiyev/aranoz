let id = new URLSearchParams(window.location.search).get('id')

const detailWrapper = document.querySelector('.detail-wrapper')

fetch(`http://localhost:3000/data/${id}`).then(response => response.json()).then(data => {
    detailWrapper.innerHTML += `
    <div class="image">
        <img src=${data.image} alt="product">
    </div>
    <div class="info">
        <h1>${data.name}</h1>
        <p>${data.description}</p>
        <span>${data.price}</span>
        <a href="index.html">Ana Səhifə</a>
    </div>`
})