function trackInfoElements() {
    let props = {
        geometry: ['clientLeft', 'clientTop', 'clientWidth', 'clientHeight', 'offsetWidth', 'offsetHeight', 'scrollWidth', 'scrollHeight'],
        scroll: ['scrollLeft', 'scrollTop'],
        offsetParent: ['offsetParent', 'offsetLeft', 'offsetTop']
    };

    trackInfo.innerHTML += '<h3>Click to see the value:</h3>';
    for (let k in props) {
        trackInfo.innerHTML += `<h4>${k}</h4>`;
        let prop = props[k];
        for (let i = 0; i < prop.length; i++) {
            trackInfo.innerHTML += "<span class='key'>" + prop[i] + '</span>: <span id="' + prop[i] + '">&nbsp;</span>' + " "
            i++;
            if (i < prop.length) {
                trackInfo.innerHTML += "<span class='key'>" + prop[i] + '</span>: <span id="' + prop[i] + '">&nbsp;</span>';
            }
            i++;
            if (i < prop.length) {
                trackInfo.innerHTML += "<span class='key'>" + prop[i] + '</span>: <span id="' + prop[i] + '">&nbsp;</span>';
            }
            trackInfo.innerHTML += "<br/>";

        }
    }

    events();
}

function events() {
    document.body.querySelector('.track #trackExample').onmousemove = function(event) {
        document.getElementById('mouseCoords').innerHTML = Math.round(event.clientX) + ':' + Math.round(event.clientY);
    };

    document.getElementById('trackInfo').onclick = function(event) {
        let target = event.target;
        if (!target.classList.contains('key')) return;

        let prop = target.innerHTML;
        let value = trackExample[prop];
        value = value.tagName || value;
        document.getElementById(prop).innerHTML = value + " ";
    };
}

trackInfoElements()