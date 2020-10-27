var baseURL = "http://ajax.frontend.itheima.net"



$.ajaxPrefilter(function(opstions) {
    opstions.url = baseURL + opstions.url
})