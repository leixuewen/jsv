function JSV(jsv) {
    let _this = this;
    this.$set = function (obj) {
        if (obj) {
            for (let o of Object.keys(obj)) {
                this[o] = obj[o]
            }
        }
    };
    this.$render = function (el, obj) {
        if (obj) {
            for (let o of obj) {
                renders(el, o);
            }
        }
    };
    this.$eval = function (val) {
        return eval(val);
    };

    function renders(el, obj) {
        if (obj.text) {
            el.append(obj.text);
        } else {
            let nel = document.createElement(obj.tags);
            renderAttr(nel, obj.attr);
            _this.$render(nel, obj.child);
            el.append(nel);
        }
    }

    function renderAttr(el, attr) {
        if (attr) {
            for (let a of Object.keys(attr)) {
                if (a.substring(0, 1) === "@") {
                    let event = a.substring(1);
                    el["on" + event] = function () {
                        _this.$eval(attr[a])
                    };
                    continue;
                }
                el.setAttribute(a, attr[a]);
            }
        }
    }


    for (let i of Object.keys(jsv.js)) {
        this[i] = jsv.js[i]
    }
    this.$set(this.data);
    this.$set(this.methods);

    let el = document.createElement("div");
    this.$render(el, jsv.el);
    if (this.created) {
        this.created();
    }
    document.body.append(el);
    if (this.mounted) {
        this.mounted();
    }
}

