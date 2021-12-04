window.addEventListener('load', function () {
    var arrow_r = document.querySelector('.arrow-r');
    var arrow_l = document.querySelector('.arrow-l');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function () {
        arrow_r.style.display = 'block';
        arrow_l.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_r.style.display = 'none';
        arrow_l.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        },2000)
    
    })
    var focusWidth = focus.offsetWidth;
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        ul.children[i].style.width = focus.offsetWidth + 'px';
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        ol.children[i].addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            var target = -index * focusWidth;
            animate(ul, target);
        })
    }
    ol.children[0].className = 'current';
    
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    
    var circle = 0;
    var num = 0;
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            circle++;
            var target = -num * focusWidth;
            animate(ul, target, function () {
                flag = true;
            });
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length -1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            circle--;
            var target = -num * focusWidth;
            animate(ul, target, function () {
                flag = true;
            });
            if (circle < 0) {
                circle = ol.children.length-1;
            }
            circleChange();
        }
    });
    
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    var timer = setInterval(function () {
        arrow_r.click();
    },2000)

})