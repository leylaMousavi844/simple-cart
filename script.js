let products = [
    { title: "گوشی سامسونگA2", price: 1200000, count: 1, src: "./images/samsungA2.jpg", id: "product1" },
    { title: "محافظ صفحه نمایش گوشی", price: 200000, count: 2, src: "./images/gelass.jpg", id: "product2" }
]
let numberOfRessult = 3
let total = 0
let countInput = 0
products.forEach(item => {
    let lists = document.querySelector(".product-list");

    // ساختن لیست مورد نظر
    let newli = document.createElement("li");
    newli.style.display = "flex";
    newli.style.justifyContent = "space-between";
    lists.appendChild(newli);

    // ساختن خط زیر هرآیتم
    let newHr = document.createElement("hr");
    lists.appendChild(newHr);

    // ساختن واضافه کردن آیکون حذف 
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "./images/delete.png";
    deleteIcon.style.width = "15px"
    deleteIcon.style.height = "15px"
    deleteIcon.style.marginLeft = "7px"
    newli.appendChild(deleteIcon);

  

    deleteIcon.addEventListener("click", (e) => {
        let itemElement = e.target.parentElement.parentElement;
        let hrElement = itemElement.nextSibling;
        let inputElement = itemElement.querySelector('input[type="number"]');
        if (inputElement) {
        let itemId = inputElement.getAttribute('data-id');
        let item = products.find(p => p.id === itemId);
        let itemCount = parseInt(inputElement.value);
        removeItemTotal(item, itemCount);
        itemElement.remove();
        if (hrElement && hrElement.tagName === 'HR') {
        hrElement.remove();
        }
        updateTotal();
        updateCartTotal();
        } else {
        console.error('Input element not found');
        }
        });
        
    

    // ساختن واضافه کردن عکس محصولات
    let img = document.createElement("img");
    img.style.width = "70px";
    img.style.marginLeft = "7px";
    img.src = item.src;
    newli.appendChild(img);

    // ساختن واضافه کردن اطلاعات هرمحصول
    let product = document.createElement("div");
    product.style.display = "flex";
    product.style.flexDirection = "column";
    let productName = document.createElement("span");
    productName.innerText = item.title;
    let productPrice = document.createElement("span");
    productPrice.innerText = item.price
    newli.appendChild(product)
    product.appendChild(productName)
    product.appendChild(productPrice);

    // ساختن دیو برای آیکون حذف و عکس ونام هرمحصول
    let productDidv = document.createElement("div");
    productDidv.style.width = "247px";
    productDidv.style.display = "flex";
    productDidv.style.alignItems = "center"
    newli.appendChild(productDidv)
    productDidv.appendChild(deleteIcon)
    productDidv.appendChild(img)
    productDidv.appendChild(product)



    // ساختن واضافه کردن دیو برای تعدادمحصولات
    let productCount = document.createElement("div")
    productCount.style.width = "30px";
    productCount.style.display = "flex";
    productCount.style.flexDirection = "column";
    productCount.style.position = "absolute";
    productCount.style.left = "676px";

    // inputساختن
    let count = document.createElement("input")
    count.style.border = "none"
    count.value = item.count
    let countValue = count.value;
    count.type = "number";

    // ساختن واضافه کردن آیکون بالابرنده ی تعدادمحصول

    let upperIcon = document.createElement("img");
    upperIcon.src = "images/upper.png"
    count.min = 0;
    count.setAttribute("data-id", item.id)
    upperIcon.addEventListener("click", () => {
        count.value = parseInt(count.value) + 1;
        let totalPriceForItem = updateItemTotal(item, count.value);
        result.innerText = `${totalPriceForItem} تومان`
        updateTotal();
        updateCartTotal();
    })




    // ساختن واضافه کردن آیکون کم کننده ی تعدادمحصول
    let downerIcon = document.createElement("img");
    downerIcon.src = "./images/downer.png";
    downerIcon.style.width = "16px";
    downerIcon.style.border = "3px #9b9292 solid";
    downerIcon.style.borderRadius = "50%"
    newli.appendChild(productCount);
    productCount.appendChild(upperIcon)
    productCount.appendChild(count)
    productCount.appendChild(downerIcon);
    downerIcon.addEventListener("click", () => {
        count.value = Math.max(parseInt(count.value) - 1, 0);
        let totalPriceForItem = updateItemTotal(item, count.value);
        result.innerText = `${totalPriceForItem} تومان`
        updateTotal();
        updateCartTotal();
    })




    //  نمایش مجموع قیمت هرمحصول
    let result = document.createElement("span");
    result.style.position = "relative";
    result.style.top = "20px";
    let totalPriceForItem = item.count * item.price;
    result.innerText = `${totalPriceForItem} تومان`;
    newli.appendChild(result);
    total += totalPriceForItem;
    numberOfRessult += countValue


})




// تابع کاهش قیمت محصول از مجموع کل
function removeItemTotal(item, count) {
    let totalPriceForItem = count * item.price;
    total -= totalPriceForItem; // کاهش از مجموع کل
    document.querySelector(".result").innerText = `مجموع کل: ${total} تومان`;
}

// تابع به روز رسانی  قیمت هرمحصول
function updateItemTotal(item, count) {
    let totalPriceForItem = count * item.price;
    return totalPriceForItem;
}






// تابع  بروزرسانی مجموع قیمتها
function updateTotal() {
    total = 0;
    let productElements = document.querySelectorAll('.product-list li');
    if (productElements.length === 0) {
        total = 0;
    } else {
        products.forEach(item => {
            let quantity = parseInt(document.querySelector(`[data-id='${item.id}']`).value);
            total += item.price * quantity;
        });
    }
    document.querySelector(".result").innerText = `مجموع کل: ${total} تومان`;
}


// نمایش  مجموع قیمت همه ی محصولات انتخابی در دام 
let result = document.querySelector(".result");
result.style.display = "flex";
result.style.justifyContent = "end"
result.innerText = `مجموع کل: ${total} تومان`



// حذف کردن کل محصولات
document.querySelector(".remove-all").addEventListener("click", () => {
    let productList = document.querySelector('.product-list');
    while (productList.firstChild) {
        productList.removeChild(productList.firstChild);
    }
    let deleteText = document.createElement("span");
    deleteText.innerText = "شماهیچ کالایی را انتخاب نکرده اید"
    productList.appendChild(deleteText)
})


// تابع محاسبه و بهروزرسانی تعداد کل محصولات
function updateCartTotal() {
    let totalItems = 0;
    products.forEach(item => {
        totalItems += parseInt(document.querySelector(`[data-id='${item.id}']`).value);
    });
    document.querySelector(".cart-icon span").innerText = totalItems;
}

updateCartTotal();




// آیکون ماه وخورشید
document.addEventListener('DOMContentLoaded', (event) => {
    const moonImg = document.querySelector('.moon-img');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        moonImg.src = currentTheme === 'dark-theme' ? './images/sun.jpg' : './images/moon.jpg';
    }

    moonImg.addEventListener('click', function () {
        body.classList.toggle('dark-theme');

        if (body.classList.contains('dark-theme')) {
            moonImg.src = './images/sun.jpg';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            moonImg.src = './images/moon.jpg';
            localStorage.removeItem('theme');
        }
    });
});






