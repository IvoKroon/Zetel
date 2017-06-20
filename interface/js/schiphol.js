var base = "https://api.schiphol.nl/public-flights/";
var appKey = "233e26170d45498dadb2e9814257ed8b";
var appID = "7d660492";
var IATA;
var ICAO;
var mainFlight;

function flightInput() {
    mainFlight = ($("#flight").val().toUpperCase());

    if(mainFlight == "") {

    } else {
        $(".flight-input").css('display', 'none');
        $(".travelling-info").css('display', 'block');
        $("#loading").css('display', 'block');
        apiCall();
    }

}

function apiCall() {
    $.ajax({
        url: base + "flights?app_id=" + appID + "&app_key=" + appKey + "&flightdirection=D",
        type: 'GET',
        dataType: 'json',
        headers: {'resourceversion': 'v3'},
        success: function (data) {
            findFlight(data);
            setValues(data)
        }
    });

    function findFlight(data) {
        var flights = data.flights;

        $(flights).each(function (index) {
            if(this.mainFlight == mainFlight) {
                setValues(flights[index]);
            } else {
                $("#destination").text("Geen vlucht gevonden");
                $("#loading").css('display', 'none');
            }
        })
    }

    function setValues(data) {
        var time = data.scheduleTime;
        var send = false;
        var departure = time.substr(0, 5);
        IATA = data.route.destinations[0];
        mainFlight = data.mainFlight;
        ICAO = data.prefixICAO;

        var checkTimeInterval = window.setInterval(checkTime, 1000);

        function checkTime() {
            let curr_date = new Date;
            let curr_hours = curr_date.getHours();
            if(curr_hours < 10) {
                curr_hours = '0'+ curr_hours;
            }
            let curr_time = curr_hours + ":" + curr_date.getMinutes();

            if (curr_time == departure && send === false) {
                checkTimeInterval.clear();
                console.log(curr_time + "+" + departure);
                send = true;
                $.ajax({
                    url: "http://192.168.43.37/",
                    type: 'GET',
                    dataType: 'text/plain',
                    data: {location: 'Gate'},
                    success: function (data) {
                        console.log('done' + data)
                    }
                });
            }
        }

        if(data.terminal == null) {
            $("#terminal").text("-");
        } else {
            $("#terminal").text(data.terminal);
        }

        $("#departure").text(departure);

        if(data.gate == null) {
            $("#gate").text("-");
        } else {
            $("#gate").text(data.gate);
        }

        getDestination();
        getAirline();
    }

    function getDestination() {
        $.ajax({
            url: base + "destinations/" + IATA + "?app_id=" + appID + "&app_key=" + appKey,
            type: 'GET',
            dataType: 'json',
            headers: {'resourceversion': 'v1'},
            success: function (data) {
                $("#destination").text(data.city + " " + "(" + IATA + ")");
                $("#loading").css('display', 'none');
            }
        });
    }

    function getAirline() {
        console.log(ICAO);
        $.ajax({
            url: base + "airlines/" + ICAO + "?app_id=" + appID + "&app_key=" + appKey,
            type: 'GET',
            dataType: 'json',
            headers: {'resourceversion': 'v1'},
            success: function (data) {
                console.log(data);
                $("#airline").text(data.publicName + " " + "(" + mainFlight + ")");
            }
        });
    }
}



