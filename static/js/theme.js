jQuery(document).ready(function ()
{
    (function ()
    {
        var $mainNav = $("#navigation").children("ul");
        $mainNav.on("mouseenter", "li", function ()
        {
            var $this = $(this), $subMenu = $this.children("ul");
            if ($subMenu.length) {
                $this.addClass("hover")
            }
            $subMenu.hide().stop(true, true).slideDown("fast")
        }).on("mouseleave", "li", function ()
        {
            $(this).removeClass("hover").children("ul").stop(true, true).slideUp("fast")
        })
    })();
    (function ()
    {
        selectnav("nav", {
            label : "[选择频道]", nested : true, indent : "-"
        })
    })()
});
window.selectnav = (function ()
{
    var selectnav = function (element, options)
    {
        element = document.getElementById(element);
        if (!element) {
            return
        }
        if (!islist(element)) {
            return
        }
        document.documentElement.className += " js";
        var o = options || {}, activeclass = o.activeclass || "active", autoselect = typeof (o.autoselect) === "boolean" ? o.autoselect : true, 
        nested = typeof (o.nested) === "boolean" ? o.nested : true, indent = o.indent || "¡ú", label = o.label || "- Navigation -", 
        level = 0, selected = " selected ";
        element.insertAdjacentHTML("afterend", parselist(element));
        var nav = document.getElementById(id());
        if (nav.addEventListener) {
            nav.addEventListener("change", goTo)
        }
        if (nav.attachEvent) {
            nav.attachEvent("onchange", goTo)
        }
        return nav;
        function goTo(e)
        {
            var targ;
            if (!e) {
                e = window.event
            }
            if (e.target) {
                targ = e.target
            }
            else {
                if (e.srcElement) {
                    targ = e.srcElement;
                }
            }
            if (targ.nodeType === 3) {
                targ = targ.parentNode
            }
            if (targ.value) {
                window.location.href = targ.value;
            }
        }
        function islist(list)
        {
            var n = list.nodeName.toLowerCase();
            return (n === "ul" || n === "ol")
        }
        function id(nextId)
        {
            for (var j = 1; document.getElementById("selectnav" + j); j++) {}
            return (nextId) ? "selectnav" + j : "selectnav" + (j - 1)
        }
        function parselist(list)
        {
            level++;
            var length = list.children.length, html = "", prefix = "", k = level - 1;
            if (!length) {
                return
            }
            if (k) {
                while (k--) {
                    prefix += indent
                }
                prefix += " "
            }
            for (var i = 0; i < length; i++)
            {
                var link = list.children[i].children[0];
                var text = link.innerText || link.textContent;
                var isselected = "";
                if (activeclass)
                {
                    isselected = link.className.search(activeclass) !==- 1 || link.parentElement.className.search(activeclass) !==- 1 ? selected : ""
                }
                if (autoselect && !isselected) {
                    isselected = link.href === document.URL ? selected : ""
                }
                html += '<option value="' + link.href + '" ' + isselected + ">" + prefix + text + "</option>";
                if (nested)
                {
                    var subElement = list.children[i].children[1];
                    if (subElement && islist(subElement)) {
                        html += parselist(subElement)
                    }
                }
            }
            if (level === 1 && label) {
                html = '<option value="">' + label + "</option>" + html
            }
            if (level === 1) {
                html = '<select class="selectnav" id="' + id(true) + '">' + html + "</select>"
            }
            level--;
            return html;
        }
    };
    return function (element, options)
    {
        selectnav(element, options)
    }
})();
jQuery(document).ready(function ()
{
    jQuery('.post_list h2 a').click(function ()
    {
        jQuery(this).text('页面载入中...');
        window.location = jQuery(this).attr('href');
    });
});
