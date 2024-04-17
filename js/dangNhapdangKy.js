var taiKhoan = 'taiKhoans';
var taiKhoans = new Array();
var tk_str = 'tk';
var tk = JSON.parse(localStorage.getItem(tk_str));
var data = JSON.parse(localStorage.getItem(taiKhoan));
if(data !== null)
    taiKhoans = taiKhoans.concat(data);
$(document).ready(function () {
    if(tk === null)
        $("#li-signUp").show();
    else{
        $("#li-signIn").show();
        $("#username").text(tk.username);
        $("#email").text(tk.email);
    }
    var state = false;
    $("#mucDangNhap").click(function(){
        if(state){
            $("#tbUsername").text("");
            $("#tbPassword").text("");
            $("#tbDangNhap").text("");
            state = false;
        }
        else state = true;
    });
    $("#dangXuat").click(function(){
        localStorage.removeItem(tk_str);
        $("#li-signUp").show();
        $("#li-signIn").hide();
        $("#username_signin").val("");
        $("#password").val("");
    });
    $("#dangNhap").click(function(){
        var username = $("#username_signin").val();
        var password = $("#password").val();
        if(username === ""){
            $("#tbUsername").text("Bạn chưa nhập tên đăng nhập");
        }
        else{
            $("#tbUsername").text("");
        }
        if(password === ""){
            $("#tbPassword").text("Bạn chưa nhập tên đăng nhập");
        }
        else{
            $("#tbPassword").text("");
        }
        if(username === "" || password === "") return;
        if(taiKhoans.length === 0){
            $("#tbDangNhap").text("Không tìm thấy");
            return;
        }
        for(var t of taiKhoans){
            if(username === t.username && password === t.password){
                tk = t;
                localStorage.setItem(tk_str, JSON.stringify(tk));
                $("#li-signUp").hide();
                $("#li-signIn").show();
                $("#username").text(tk.username);
                $("#email").text(tk.email);
                return;
            }
        }
        $("#tbDangNhap").text("Không tìm thấy");
    });
});