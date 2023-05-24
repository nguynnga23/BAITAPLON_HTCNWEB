$("#addToCart").click(function(event){
    event.preventDefault();
    // Lấy thông tin từ các trường input
    let imgProduct = $("#imgProduct").val();
    let nameProduct = $("#nameProduct").val();
    let priceProduct = $("#priceProduct").val();
    let quantityProduct = $("#quantityProduct").val();
   
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    //Tạo 1 đối tượng JSON chứa thông tin đăng kí của người dùng:
    let sp = {
       imgProduct: imgProduct,
       nameProduct: nameProduct,
       priceProduct: priceProduct,
       quantityProduct: quantityProduct
    };
    products.push(sp);
    localStorage.setItem("products",JSON.stringify(products));
    alert("Thành công!")
});
