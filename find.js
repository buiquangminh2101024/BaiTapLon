function createDeXuat(data, found){
    var re = new RegExp(found, 'i');
    var f = data.name.search(re);
    var name = data.name.replace(re, '');

    var span = $("<span></span>").css({'color': 'black'}).text(found);

    var a = $("<a></a>").attr({'href' : 'chiTietSanPham.html', 'role': 'button', 'style': 'text-decoration: none; color: rgb(169, 168, 168);'});
    a.append("- "); a.append(name.slice(0, f)); a.append(span); a.append(name.slice(f));
    a.click(function(){
        localStorage.setItem('product', JSON.stringify(data));
    })
    return a;
}
$(document).ready(function () {
    $("#find").on('input', function(){
        $("#recommend").html("");
        var re = new RegExp($(this).val(), 'i');
        if($(this).val() === ""){
            $("#recommend").hide();
            return;
        }
        $("#recommend").show();
        for(var p1 of products){
            if(re.test(p1.name)){
                $("#recommend").append(createDeXuat(p1, p1.name.charAt(p1.name.search(re))))
                $("#recommend").append($("<br>"))
            }
        }
    })
});