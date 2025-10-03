var flug = 0;
var nothing = 0;
var fir = 0;
var frm = document.getElementsByTagName("form")[0];
var select = document.getElementsByName("bugPoG")[0];
var btn = document.createElement("input");
var pog = ["","a","c","w"];
var n = new Array();
var rd = new Array();
var data;
var re_ul = document.createElement("ul");
var de_ul = document.getElementsByTagName("ul");
var re_li = new Array();
var re_data = new Array();
var re_val = new Array();
var listop = new Array();
btn.type = "button";
btn.value = "検索";
var n = new Array();
fetch("https://tensyaku.github.io/creatures/bugdata.json")
    .then(Response => Response.json())
    .then(data => {
        var map = new Map(Object.entries(data));
        var it = map.entries()
        for (let i = 0; i < map.size; i++) {
            n[i] = it.next().value;
            rd[i] = document.createElement("label");
            rd[i].innerHTML = '<input type="radio" name="rbug" value='+ i +'>' + n[i][0] +"<br>"
            frm.appendChild(rd[i]);
        }
        frm.appendChild(btn);
    });
btn.onclick = function formget() {
    var ch = new Array(document.bugre.rbug.length);
    for (let i = 0; i < document.bugre.rbug.length; i++) {
        ch.push(document.bugre.rbug[i].checked)
        if(document.bugre.rbug[i].checked) {
            re_data = (n[i][1][0] == undefined) ? Object.keys(n[i][1]) : n[i][1];
            re_val = (n[i][1][0] == undefined) ? Object.values(n[i][1]) : undefined;
            nothing = 1;
        }
        
    }
    frm.appendChild(re_ul);
        re_data = re_data.filter(
            function(f){
                if (f.indexOf(pog[select.value]) != -1) {
                    return true;
                } else {
                    if (re_val != undefined) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        )
        if (re_data.length == 0) {
            re_data.push("sないもんはない。");
        }
        re_li.length = re_data.length;
        re_li.fill(document.createElement("li"));
    for (let j = 0; j < re_li.length; j++) {
        if ((document.getElementsByTagName("a").length >= 3 && re_val != undefined) || fir >= 1) {
            re_ul.innerHTML = "<p>もう一度ボタンを押してください</p>"
            fir = 0;
            break;
        } else if (nothing == 0) {
            nothing = 1;
            break;
        }
        var d = re_data[j].slice(1);
        re_li[j].innerHTML = (re_val == undefined) ? "<a href=https://tensyaku.github.io/creatures/"+d+".xhtml >"+ d +"</a>" : '<a>' + re_data[j] +"</a>";
        re_ul.innerHTML = re_ul.innerHTML + re_li[j].outerHTML;
        if (re_val != undefined) {
            document.getElementsByTagName("a")[j].href = "javascript:val("+j+");";
        }
        
    }
    listop.push(re_ul.innerHTML);
    if (listop.length >= 2) {
        listop[2] = listop[1].replace(listop[0],"");
        re_ul.innerHTML = listop[2];
        listop.splice(0,2);
        flug = 0;
    }
}
function val(dom) {
    var a = document.getElementsByTagName("a")[dom + flug]
    re_val[dom] = re_val[dom].filter(
        function (f) {
            if (f.indexOf(pog[select.value]) != -1) {
                return true;
            } else {
                return false;
            }
        }
    )
    if (re_val[dom].length == 0) {
        re_val[dom].push("sないもんはない。");
    }
    re_val[dom].forEach(function(v){a.innerHTML = a.innerHTML +"<ul style="+"text-align:left;"+"><li><a href=https://tensyaku.github.io/creatures/"+v.slice(1)+".xhtml >"+v.slice(1)+"</a></li></ul>"});
    if (dom == 0) {flug = re_val[dom].length;}
    a.removeAttribute("href");
    listop.pop();
    listop.push(re_ul.innerHTML);
    fir++;
}
