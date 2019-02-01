function JSV(jsv) {
    let $ = this;
    $.$set = function (obj) {
        if (obj) {
            for (let o of Object.keys(obj)) {
                this[o] = obj[o]
            }
        }
    };
    $.$render = function (el, obj) {
        if (obj) {
            for (let o of obj) {
                renders(el, o);
            }
        }
    };
    $.$eval = function (val) {
        return eval(val);
    };

    function renders(el, obj) {
        if (obj.text) {
            el.append(obj.text);
        } else {
            let nel = document.createElement(obj.tags);
            renderAttr(nel, obj.attr);
            $.$render(nel, obj.child);
            el.append(nel);
        }
    }

    function renderAttr(el, attr) {
        if (attr) {
            for (let a of Object.keys(attr)) {
                if (a.substring(0, 1) === "@") {
                    let event = a.substring(1);
                    el["on" + event] = function () {
                        $.$eval(attr[a])
                    };
                    continue;
                }
                el.setAttribute(a, attr[a]);
            }
        }
    }


    for (let i of Object.keys(jsv.js)) {
        $[i] = jsv.js[i]
    }
    $.$set(this.data);
    $.$set(this.methods);

    let el = document.createElement("div");
    $.$render(el, jsv.el);
    if ($.created) {
        $.created();
    }
    document.body.append(el);
    if ($.mounted) {
        $.mounted();
    }
}

