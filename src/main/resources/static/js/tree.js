var text = "";
function f(data) {
    var name = data.methodName;
    var value = data.fullName;
    var children = data.methodNodes;
    if (text.length==0) {
        text += "<li><span class=\"open\"><i class=\"icon-folder-open\"></i>" + name + "</span><i>"+value+"</i>";
    } else if (children.length<1) {
        text += "<li><span class=\"leaf\"><i class=\"icon-leaf\"></i>" + name + "</span><i>"+value+"</i>";
    }else {
        text += "<li><span class=\"sign\"><i class=\"icon-minus-sign\"></i>" + name + "</span><i>"+value+"</i>";
    }
    if (children.length>=1) {
        text += "<ul>";
        for (var i = 0; i < children.length; i++) {
            f(children[i]);
        }
        text += "</ul>";
    }
    text += "</li>"
}

$.ajaxSettings.async = false;
$(".tree").each(function () {
    var that = $(this);
    $.get('/json/projecttree/'+that.attr("id"), function (data) {
        f(data)
        that.html("<ul>"+text+"</ul>")
        text="";
    });
});


<!--树形结构-->
$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
});