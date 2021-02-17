$(document).ready(function () {

    $("#search-button").on("click", function () {
        var searchValue = $("search-value").val();

        // clearing input
        $("search-value").val("");

        searchWeather(searchValue);
    })
});