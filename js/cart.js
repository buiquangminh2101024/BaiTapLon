var types = ['All', 'Kẹo', 'Chocolate'];
var wareHouse = [{name: 'Kẹo Ngô', gia: 30, img: 'img/candy_corn.png', donViTinh: 'bịch', soLuong: 500, type: 'Kẹo'},
                {name: 'Kẹo Bơ Caramel', gia: 30, img: 'img/keo_bo_caramel.png', donViTinh: 'bịch', soLuong: 200, type: 'Kẹo'},
                {name: 'Kẹo Bơ Đường', gia: 22, img: 'img/keo_bo_duong.png', donViTinh: 'bịch', soLuong: 250, type: 'Kẹo'},
                {name: 'Thanh Chocolate Sữa Nhân Bánh Kép Và Hạnh Đào', gia: 105, img: 'img/860_beryls-b-crunch-milk-chocolate-with-gaufrette-and-almond-150g.jpg', donViTinh: 'bịch', soLuong: 190, type: 'Chocolate'},
                {name: 'Thanh Chocolate Sữa Nhân Mạch Nha', gia: 105, img: 'img/860_beryls-b-crunch-milk-chocolate-with-malt-mall-150g.jpg', donViTinh: 'bịch', soLuong: 190, type: 'Chocolate'},
                {name: 'Chocolate Đen', gia: 105, img: 'img/860_beryls-dark-chocolate-150g.jpg', donViTinh: 'bịch', soLuong: 190, type: 'Chocolate'},
                {name: 'Chocolate Sữa', gia: 105, img: 'img/860_beryls-milk-chocolate-150g.jpg', donViTinh: 'bịch', soLuong: 190, type: 'Chocolate'},
                {name: 'Chocolate Sữa Nhân Hạnh Đào', gia: 35, img: 'img/860_beryls_almond_milk_chocolate.jpg', donViTinh: 'bịch', soLuong: 190, type: 'Chocolate'},
                {name: 'Chocolate Đen Nhân Hạnh Đào', gia: 35, img: 'img/860_beryls_Almond-Dark-Chocolate.jpg', donViTinh: 'bịch', soLuong: 190, type: 'Chocolate'}];
var p = 'products';
var products = JSON.parse(localStorage.getItem(p));
if(products === null){
    products = wareHouse;
    localStorage.setItem(p, JSON.stringify(products));
}
var c = 'cart';
var cart = JSON.parse(localStorage.getItem(c));
if(cart === null)cart = new Array();
var soLuong = 0;
if(cart.length !== 0){
    for(var cc of cart){
        var flagg = 0;
        for(var p of products){
            if(cc.name === p.name){
                flagg = 1;
                if(p.soLuong < cc.soLuong){
                    cc.soLuong = p.soLuong;
                    soLuong += cc.soLuong;
                }
                else
                    soLuong += cc.soLuong;
                if(cc.soLuong === 0){
                    cart.splice(cart.indexOf(cc), 1);
                }
            }
        }
        if(flagg === 0) cart.splice(cart.indexOf(cc), 1);
    }
}
localStorage.setItem(c, JSON.stringify(cart));
function themHang(p, amount){
    var ca = {name: p.name, gia: p.gia, img: p.img, donViTinh: p.donViTinh, soLuong: amount, type: p.type};
    soLuong += parseInt(amount);
    var flag = 0;
    for(var car in cart){
        if(cart[car].name === ca.name){
            flag = 1;
            cart[car].soLuong += ca.soLuong;
            break;
        }
    }
    if(flag === 0)cart.push(ca);
    $("#amount").show();// trường hợp thêm lần đầu tiên
    if(soLuong > 99)
        $("#amount").text("99+");
    else
        $("#amount").text(soLuong);
    localStorage.setItem(c, JSON.stringify(cart));
}
$(document).ready(function () {
    if(soLuong === 0){
        $("#amount").hide();
    }
    else{
        $("#amount").show();
        if(soLuong > 99)
            $("#amount").text("99+");
        else
            $("#amount").text(soLuong);
    }
    $("#them").click(function(){
        var re = /^\d*$/g;
        var soLuongMua = $("#soLuongMua").val();
        if(!re.test(soLuongMua)){
            $("#tbSoLuongMua").text('Chỉ được nhập số tự nhiên!');
            return;
        }
        $("#tbSoLuongMua").text('');
        themHang(product, parseInt($("#soLuongMua").val()));
    });
});