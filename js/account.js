const sign_in_btn = document.querySelector("#sign_in_btn");
const sign_up_btn = document.querySelector("#sign_up_btn");
const main = document.querySelector(".main");

sign_up_btn.addEventListener("click",() => {
    main.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    main.classList.remove("sign-up-mode");
})


//Regex

$(document).ready(function(){

    //Kiểm tra tên đăng ký
    var txtUser = $("#txtUser");
    var errorUser = $("#errorUser");
    function ValidUser(){
        var re = /^\w{3,}$/;
        if(txtUser.val() == ""){
            errorUser.html("Bắt buộc nhập!");
            return false;
        }

        if(!re.test(txtUser.val())){
            errorUser.html("Chứa các ký tự chữ cái,số và có độ dài ít nhất là 3 ký tự.");
            return false;
        }
        errorUser.html(" ");
        return true;
    }
    txtUser.blur(ValidUser);

    //Kiểm tra mật khẩu
    var txtPassword = $("#txtPassword");
    var errorPassword = $("#errorPassword");
    function ValidPassword(){
        var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if(txtPassword.val() == ""){
            errorPassword.html("Bắt buộc nhập!");
            return false;
        }

        if(!re.test(txtPassword.val())){
            errorPassword.html("Ít nhất 8 ký tự (bao gồm chữ, số, ký tự đặc biệt)");
            return false;
        }
        errorPassword.html(" ");
        return true;
    }
    txtPassword.blur(ValidPassword);

    //Kiểm tra xác nhận mật khẩu
    var txtPassword = $("#txtPassword");
    var txtCFPassword = $("#txtCFPassword");
    var errorCFPassword = $("#errorCFPassword");
    function ValidCFPassword(){

        if(txtCFPassword.val() == ""){
            errorCFPassword.html("Bắt buộc nhập!");
            return false;
        }

        if(txtPassword.val() != txtCFPassword.val()){
            errorCFPassword.html("Mật khẩu không khớp!");
            return false;
        }
        errorCFPassword.html(" ");
        return true;
    }
    txtCFPassword.blur(ValidCFPassword);

    // Kiểm tra email:

        // [^\s@]+: Bất kỳ ký tự nào không phải là khoảng trắng hoặc ký tự '@', xuất hiện một hoặc nhiều lần.
        // @: Ký tự '@'.
        // [^\s@]+: Bất kỳ ký tự nào không phải là khoảng trắng hoặc ký tự '@', xuất hiện một hoặc nhiều lần.
        // .: Ký tự dấu chấm '.'. Lưu ý rằng dấu chấm này được bọc trong dấu backslash để đánh dấu rằng đây là một ký tự đặc biệt.
        // [^\s@]+: Bất kỳ ký tự nào không phải là khoảng trắng hoặc ký tự '@', xuất hiện một hoặc nhiều lần.
    
    var txtEmail = $("#txtEmail");
    var errorEmail = $("#errorEmail");
    function ValidEmail(){
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(txtEmail.val() == ""){
            errorEmail.html("Bắt buộc nhập!");
            return false;
        }

        if(!re.test(txtEmail.val())){
            errorEmail.html("Email không hợp lệ!");
            return false;
        }
        errorEmail.html(" ");
        return true;
    }
    txtEmail.blur(ValidEmail);

    //Kiểm tra họ tên
    var txtFullName = $("#txtFullName");
    var errorFullName = $("#errorFullName");
    function ValidFullName(){
        var re = /^[\w\dÀ-ỹ ]+$/;
        if(txtFullName.val() == ""){
           errorFullName.html("Bắt buộc nhập!");
            return false;
        }

        if(!re.test(txtFullName.val())){
            errorFullName.html("Gồm nhiều từ ngăn cách bởi khoảng trắng và không chứa kí tự đặc biệt!");
            return false;
        }
        errorFullName.html(" ");
        return true;
    }
    txtFullName .blur(ValidFullName);

    //Kiểm tra số điện thoại
    var txtNumber = $("#txtNumber");
    var errorNumber = $("#errorNumber");
    function ValidNumberPhone(){
        var re = /^(03|07|09|02|05|08)\d{8}$/;
        if(txtNumber.val() == ""){
            errorNumber.html("Bắt buộc nhập!");
            return false;
        }

        if(!re.test(txtNumber.val())){
            errorNumber.html("03|07|09|02x (x: 7-8 kí số)!");
            return false;
        }
        errorNumber.html(" ");
        return true;
    }
    txtNumber.blur(ValidNumberPhone);


//LƯU THÔNG TIN ĐĂNG KÝ VÀO LOCAL STORAGE

$("#btnSignUp").click(function(event){
    event.preventDefault();
    var error = $("#error");
    
if(!ValidUser() || !ValidPassword() || !ValidCFPassword() || !ValidEmail() || !ValidFullName() || !ValidNumberPhone()){
    error.html("Vui lòng nhập đầy đủ và chính xác thông tin!");
    return false;
}
else{
    error.html("");
    // Lấy thông tin từ các trường input
    let username = $("#txtUser").val();
    let password = $("#txtPassword").val();
    let email = $("#txtEmail").val();
    let fullname = $("#txtFullName").val();
    let phonenumber = $("#txtNumber").val();
    let address = $("#txtAddress").val();
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
    //Tạo 1 đối tượng JSON chứa thông tin đăng kí của người dùng:
    let user = {
        username: username,
        password: password,
        email: email,
        fullname: fullname,
        phonenumber: phonenumber,
        address: address
    };
    accounts.push(user);
    localStorage.setItem("accounts",JSON.stringify(accounts));
    alert("Đăng ký thành công!")
}
});

//ĐĂNG NHẬP:
$("#btnLogin").click(function(event){
    event.preventDefault();
   
    let username = $("#txtUsername-login").val();
    let password = $("#txtPassword-login").val();
    let user_info = $("#user-info");
let accounts =JSON.parse(localStorage.getItem("accounts"),) || [];
let user = accounts.find(user => user.username === username && user.password === password);
if(user){
    // alert("Valid");
    // window.location.href = "index.html";
    let fullname = user.fullname;
    let username = user.username;
    let email = user.email;
    let address = user.address;
    let phonenumber = user.phonenumber;

    localStorage.setItem('loggedInFullName', fullname);
    localStorage.setItem('loggedInUser', username);
    localStorage.setItem('loggedInEmail', email);
    localStorage.setItem('loggedInAddress', address);
    localStorage.setItem('loggedInPhone', phonenumber);
    alert("Đăng nhập thành công!")
    window.location.href = "index.html";
}
else{
    alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin đăng nhập!");
}
});

});

