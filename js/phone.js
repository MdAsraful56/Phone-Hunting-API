const loadData = async(searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    // for (const phone of phones) {
    //     console.log(phone);
    // }

    const container = document.getElementById('container');
    container.textContent = '';

    const showAll = document.getElementById('showAll');
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove('hidden');
    } else {
        showAll.classList.add('hidden');
    }



    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }




    phones.forEach(phone => {
        // console.log(phone);
        
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-100 p-4 shadow-xl';
        phoneCard.innerHTML = `
        <figure>
            <img
            src="${phone.image}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary mt-3">Show details</button>
            </div>
        </div>
        `;
        container.appendChild(phoneCard);
    });

    // remove loader
    toggleLoading(false);
}

const handleShowDetails = async(id) => {
    // console.log('click', id);
    // load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;

    showPhoneDetails(phone);
}



const showPhoneDetails = (phone) => {
    // console.log(phone);
    show_details_modal.showModal();

    const details = document.getElementById('details');
    // details.textContent = '';
    const img = document.createElement('img');
    img.id = 'imgId'
    const imgSrc = `${phone.image}`;
    img.src = imgSrc;
    details.append(img);
    details.prepend(img);

    const details_title = document.getElementById('details_title');
    details_title.innerText = phone.name;


    const storage = document.getElementById('storage');
    storage.innerText = `${phone?.mainFeatures?.storage || 'No Available'}`;

    const display = document.getElementById('display');
    display.innerText = `${phone?.mainFeatures?.displaySize || 'No Available'}`;

    const chipset = document.getElementById('chipset');
    chipset.innerText = `${phone?.mainFeatures?.chipSet || 'No Available'}`;

    const memory= document.getElementById('memory');
    memory.innerText = `${phone?.mainFeatures?.memory|| 'No Available'}`;

    const slug = document.getElementById('slug');
    slug.innerText = `${phone?.slug || 'No Available'}`;

    const release = document.getElementById('release');
    release.innerText = `${phone?.releaseDate || 'No Available'}`;

    const brand = document.getElementById('brand');
    brand.innerText = `${phone?.brand || 'No Available'}`;

    const GPS = document.getElementById('GPS');
    GPS.innerText = `${phone?.others?.GPS|| 'No Available'}`;




}


document.getElementById('closeBtn').addEventListener('click', function(){
    const img = document.getElementById('imgId');
    img.remove();
})


const handleSearch = (isShowAll) => {
    // add loader 
    toggleLoading(true);
    const searchField =document.getElementById('search-field');
    const searchText = searchField.value;
    loadData(searchText, isShowAll);
}



const toggleLoading = (isloading) => {
    const loader = document.getElementById('loader');

    if (isloading) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}




const handleShowAll = () => {
    handleSearch(true);
}



loadData();