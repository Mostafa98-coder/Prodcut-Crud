var productNameInp = document.getElementById('productName');
var productPriceInp = document.getElementById('productPrice');
var productCategoryInp = document.getElementById('productCategory');
var productDescInp = document.getElementById('productDesc');
var temp;

var productsContainer = [];
if (localStorage.getItem("todayProducts") != null) {
    productsContainer = JSON.parse(localStorage.getItem("todayProducts"));
    displayProducts();
}

function addProduct() {
    if (validationProductName() && validationProductPrice() && validationProductCategory() && validationProductDescription()) {
        var product = {
            name: productNameInp.value,
            price: productPriceInp.value,
            category: productCategoryInp.value,
            desc: productDescInp.value,
        }
        if (document.getElementById('btn-updated').innerHTML != 'Update Product') {
            productsContainer.push(product);
        } else {
            productsContainer[temp] = product;
            document.getElementById('btn-updated').innerHTML = 'Add Product';
        }
        console.log(productsContainer);
        localStorage.setItem("todayProducts", JSON.stringify(productsContainer));
        displayProducts();
        clearInputsForm();
    } else { alert("Enter a valid Input"); }

}

function displayProducts() {
    var cartona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        cartona += ` <tr>
         <td>${i+1}</td>
         <td>${productsContainer[i].name}</td>
         <td>${productsContainer[i].price}</td>
         <td>${productsContainer[i].category}</td>
         <td>${productsContainer[i].desc}</td>
         <td><button class="btn btn-warning btn-sm" onclick="updateProduct(${i})">Update</button></td>
         <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
     </tr>`
    }


    document.getElementById('tableBody').innerHTML = cartona;
}


function clearInputsForm() {
    productNameInp.value = "";
    productPriceInp.value = "";
    productCategoryInp.value = "";
    productDescInp.value = "";
}

function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem("todayProducts", JSON.stringify(productsContainer))
    displayProducts();
}

function search(term) {
    var cartona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            cartona += ` <tr>
        <td>${i+1}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button class="btn btn-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
    </tr>`
        }

    }
    document.getElementById('tableBody').innerHTML = cartona;
}

function updateProduct(index) {
    productNameInp.value = productsContainer[index].name;
    productPriceInp.value = productsContainer[index].price;
    productCategoryInp.value = productsContainer[index].category;
    productDescInp.value = productsContainer[index].desc;
    document.getElementById('btn-updated').innerHTML = 'Update Product';
    temp = index;

}



function validationProductName() {
    var regx = /^[A-Z][a-zA-Z]{3,8}$/;
    if (regx.test(productNameInp.value)) { return true; } else { return false; };
}

function validationProductPrice() {
    var regx = /^([1-9][0-9]{2}|1000)$/;
    if (regx.test(productPriceInp.value)) { return true; } else { return false; };
}

function validationProductCategory() {
    var regx = /^(mobile|tv|device)$/;
    if (regx.test(productCategoryInp.value)) { return true; } else { return false; };
}

function validationProductDescription() {
    var regx = /^.{0,500}$/;
    if (regx.test(productDescInp.value)) { return true; } else { return false; };}