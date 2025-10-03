            var i = 0;
            var hoshi = "★"
            var pic = document.getElementsByTagName("pic");
            let pd = new Array();
            let co = new Array();
            let n = pic.length;
            var bd = document.getElementsByTagName("bug-data")[0];
            for (let j = 0; j < n; j++) {
                pd[j] = pic[j].getAttribute("pdata");
                console.log(pd);
                co[j] = pic[j].getAttribute("content");
                console.log(co);
            }
            for (let k = 0; k < n; k++) {
                bd.removeChild(pic[0]);         
            }
            var jn = document.getElementsByTagName("ja-name")[0];
            var sn = document.getElementsByTagName("sci-name")[0];
            var whr = document.getElementsByTagName("where")[0];
            var rr = document.getElementsByTagName("rare")[0];
            var mt = document.getElementsByTagName("meta")[0];
            var img = document.createElement("img");
            var h1 = document.createElement("h1");
            var ita = document.createElement("i");
            var p = document.createElement("p");
            var cp = p.cloneNode();
            var ttl = document.createElement("title");
            var br = document.createElement("br");
            var css = document.createElement("link");
            var a = document.createElement("a");
            var hr = document.createElement("hr");
            var div = document.createElement("div");
            var cdi = div.cloneNode();
            var st = Number(rr.textContent)-1;
            var ifrm = window.parent.document.location;
            function tt(c) {
                if (n <= 5)  {
                    if (n == 1) {
                        i = 0;
                    } else if (n == 2) {
                        if (i % 2 == 0) {
                            i = 0;
                        } else {
                            i = 1;
                        }
                    } else if(n == 3) {
                        if (i % 3 == 0) {
                            i = 0;
                        } else if (i % 3 == 1) {
                            i = 1;
                        } else {
                            i = 2
                        }
                    } else if(n == 4) {
                        if (i % 4 == 0) {
                            i = 0;
                        } else if (i % 4 == 1) {
                            i = 1;
                        } else if (i % 4 == 2) {
                            i = 2;
                        } else {
                            i = 3;
                        }
                    } else if (n == 5) {
                        if (i % 5 == 0) {
                            i = 0;
                        } else if (i % 5 == 1) {
                            i = 1;
                        } else if (i % 5 == 2) {
                            i = 2;
                        } else if (i % 5 == 3) {
                            i = 3;
                        } else {
                            i = 4;
                        }
                    }
                    img.src = pd[i];
                    img.style.width = "400px";
                    img.alt = jn.textContent + "の" + co[i];
                    jn.before(img);
                    i++;
                    console.log(pd);
                }
            }
            bd.onload = tt();
            img.setAttribute("onclick","tt();");
            h1.textContent = jn.textContent;
            ita.textContent = sn.textContent;
            p.textContent = whr.textContent;
            ttl.textContent = jn.textContent;
            for (let j = 0; j < st; j++) {
                hoshi = hoshi.concat("★");
            }
            cp.textContent = hoshi;
            css.rel = "stylesheet";
            css.href = "https://tensyaku.github.io/creatures/base.css";
            div.style.height = "30px";
            div.style.backgroundColor = "green";
            cdi.style.height = "30px";
            cdi.style.backgroundColor = "cyan";
            bd.appendChild(a);
            bd.appendChild(cdi);
            bd.appendChild(div);
            img.before(br);
            a.before(hr);
            bd.replaceChild(cp,rr);
            bd.replaceChild(h1,jn);
            bd.replaceChild(ita,sn);
            bd.replaceChild(p,whr);
            bd.before(ttl);
            mt.before(css);
            a.className = "notop"
            a.href = "https://tensyaku.github.io/creatures/"
            a.textContent = "TOPPAGE"