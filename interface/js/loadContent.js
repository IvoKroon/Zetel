$(document).ready(function () {
    var socket = io();
    //load sockets
    function emit(tag) {
        socket.emit(tag,"mac");
    }

    let content = $(".content");

    $(".icon-div").load("html/home.html", function () {

        //Toggles icons, clears all other content
        $('.arrow').click(function () {
            $('.icons').slideToggle(400);
            $('.content').empty();
            $("#googleMaps").css('display', 'none');
            $(".info").css('display', 'none');
            $(".food").css('display', 'none');
        });

        //Handles the map button
        $("#mapButton").on("click", function () {
            $(".icons").slideToggle(400);
            $("#googleMaps").css('display', 'block');
            google.maps.event.trigger(map, 'resize');

        });

        $("#infoButton").on("click", function () {
            $(".icons").slideToggle(400);
            $("#googleMaps").css('display', 'none');
            $(".info").css('display', 'block');

        });

        $("#foodButton").on("click", function () {

            $(".icons").slideToggle(400);
            $("#googleMaps").css('display', 'none');
            $(".info").css('display', 'none');
            $(".food").css('display', 'block');

        });

        $("#food").on("click", function () {
            emit("button");
            $("#food").css('display', 'none');
            $("#arrive").css('display', 'block');

        });

    });

});
