var len;

var results = '';

function apiSearch() {
    results = ''

    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "b98069e046f24a7dbae94331c1b3e27e");
        },
        type: "GET",
    })
        .done(function (data) {
            len = data.webPages.value.length;

            for (i = 0; i < len; i++) {
                results += "<div class='search-result'>" +
                    "<a href='" + data.webPages.value[i].url + "' target='_blank' class='search-link'>" + data.webPages.value[i].name + "</a>" +
                    "<p class='search-snippet'>" + data.webPages.value[i].snippet + "</p>" +
                    "</div>";
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog({
                height: 500,
                width: 700,
                modal: true,
                title: `Search Results`,
                show: {
                    effect: "fade",
                    duration: 300
                },
                hide: {
                    effect: "fade",
                    duration: 300
                }
            });
            $('.ui-dialog-titlebar').css({
                'background-color': 'crimson',
                'color': 'white',
                'font-weight': 'bold'
            });
        }).fail(function () {
            alert("error");
    });
}

let currentBackground = true;
function backgroundImageChanger() {
    document.body.style.backgroundImage = currentBackground
        ? 'url("../assets/bds2.jpg")'
        : 'url("../assets/bds.jpg")';
    currentBackground = !currentBackground;
}


function ChangeElementResultsVibility(elementName) {

    let visibilityCheck = document.getElementById(`${elementName}`).style.visibility

    if (visibilityCheck == 'hidden') {
        document.getElementById(`${elementName}`).style.visibility = 'visible'
    } else {
        document.getElementById(`${elementName}`).style.visibility = 'hidden'
    }
}

function QuerySearch() {
    ChangeElementResultsVibility("searchResults")
    apiSearch()
    document.getElementById("query").value = ''
    ChangeElementResultsVibility("searchResults")
}

// get time
function updateTimeTextBox() {
    ChangeElementResultsVibility("time")

    const currentTimeString = new Date().toLocaleTimeString();

    $('#time').text(currentTimeString);

    $('#time').dialog({
        title: "Current Time",
        modal: true,
    });

    ChangeElementResultsVibility("time")
}
   
function findANaysayer() {
    let randomChance = Math.floor(Math.random() * 10) + 1;

    if (randomChance === 7) {
        window.open("../assets/saban.png", "Window Title", "width=500, height=500")
    }
    else {
        var params = {
            "q": $("#query").val(),
            "count": "50",
            "offset": "0",
            "mkt": "en-us"
        };

        $.ajax({
            url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "b98069e046f24a7dbae94331c1b3e27e");
            },
            type: "GET",
        }).done(function (data) {
            window.open(data.webPages.value[0].url, '_blank')
        }).fail(function () {
            alert("error");
        });
    }
}

$(document).ready(function () {
    const football = $('#football');
    let angle = 0;
    let velocityX = 0;
    let velocityY = 0;
    let interval;

    const screenWidth = $(window).width();
    const screenHeight = $(window).height();
    const footballWidth = football.width();
    const footballHeight = football.height();
    const bounceFactor = 0.8;

    function stopFootball() {
        clearInterval(interval);
    }

    function moveFootball() {
        const position = football.position();
        let newLeft = position.left + velocityX;
        let newTop = position.top + velocityY;

        if (newLeft < -footballWidth) {
            newLeft = screenWidth;
        } else if (newLeft > screenWidth) {
            newLeft = -footballWidth;
        }

        if (newTop < -footballHeight) {
            newTop = screenHeight;
        } else if (newTop > screenHeight) {
            newTop = -footballHeight;
        }

        football.css({
            left: newLeft + 'px',
            top: newTop + 'px',
            transform: 'rotate(' + angle + 'deg)'
        });

        angle += 5;
        velocityX *= 0.98;
        velocityY *= 0.98;

        if (Math.abs(velocityX) < 0.5) velocityX = velocityX < 0 ? -0.5 : 0.5;
        if (Math.abs(velocityY) < 0.5) velocityY = velocityY < 0 ? -0.5 : 0.5;
    }

    football.on('mouseenter', function (event) {
        const offset = football.offset();
        const centerX = offset.left + football.width() / 2;
        const centerY = offset.top + football.height() / 2;
        const mouseX = event.pageX;
        const mouseY = event.pageY;

        velocityX = (centerX - mouseX) / 10;
        velocityY = (centerY - mouseY) / 10;

        clearInterval(interval);
        interval = setInterval(moveFootball, 20);
        setTimeout(stopFootball, 500);
    });

    football.on('click', function () {
        clearInterval(interval);
        football.css({
            left: (screenWidth - footballWidth) / 2 + 'px',
            top: (screenHeight - footballHeight) / 2 + 'px',
            transform: 'rotate(0deg)'
        });
        velocityX = 0;
        velocityY = 0;
        angle = 0;
    });
});


