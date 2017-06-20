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
            $('html, body').animate({
                    scrollTop: $("#googleMaps").offset().top - 140},
                'slow');

        });

        $("#infoButton").on("click", function () {
            $(".icons").slideToggle(400);
            $("#googleMaps").css('display', 'none');
            $(".info").css('display', 'block');
            console.log($(".info").offset().top);
            $('html, body').animate({
                    scrollTop: $(".info").offset().top - 150},
                'slow');
        });

        $("#foodButton").on("click", function () {

            $(".icons").slideToggle(400);
            $("#googleMaps").css('display', 'none');
            $(".info").css('display', 'none');
            $(".food").css('display', 'block');

            $('html, body').animate({
                    scrollTop: $(".food").offset().top - 140},
                'slow');

        });

        $("#food").on("click", function () {
            $.ajax({
                url: "http://192.168.43.37/",
                type: 'GET',
                dataType: 'text/plain',
                data: {location: 'McDonalds'},
                success: function (data) {
                    console.log('done' + data)
                }
            });

            emit("button");
            $("#food").css('display', 'none');
            $("#arrive").css('display', 'block');

        });

    });

});
