var chart = echarts.init(document.getElementById('ncov-map'), 'white', {renderer: 'canvas'});

$(
    function () {
        updateOverall();
        updateNews();
        fetchData(chart);
        setInterval(updateNews, 60 * 1000);
        setInterval(updateOverall, 60 * 1000);
        setInterval(fetchData, 30 * 60 * 1000);
    }
);

function updateOverall(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/overall",
        dataType: 'json',
        success: function (result) {
            var t = new Date()
            overall_html = '<li class="text-muted"><i class="fa fa-bug pr-2"></i>病毒：' + result['results'][0]['virus'] + '</li><li class="text-muted"><i class="fa fa-bolt pr-2"></i>源头：' + result['results'][0]['infectSource'] + '</li><li class="text-muted"><i class="fa fa-hospital-o pr-2"></i>  疑似病例：' + result['results'][0]['suspect'] + '</li><li class="text-muted"><i class="fa fa-heartbeat pr-2"></i>确诊病例：' + result['results'][0]['confirmed'] + '</li><li class="text-muted"><i class="fa fa-hospital-o pr-2"></i>死亡病例：' + result['results'][0]['death'] + '</li><li class="text-muted"><i class="fa fa-clock-o pr-2"></i>更新时间：' + result['time'] + '</li>'
            $('#overall').html(overall_html)
        }
    });
}

function updateNews(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/news",
        dataType: 'json',
        success: function (result) {
            news_html = ""
            for(var i = 0, len = result.length; i < len; i++){
                news_html += "<li><div class='base-timeline-info'><a href=" + result[i]['sourceUrl'] + ">" + result[i]['title'] + "</a></div><small class='text-muted'>" + result[i]['infoSource'] + '</small></li>'
            }
            $('#newslist').html(news_html)
        }
    });
}

function fetchData() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/map",
        dataType: 'json',
        success: function (result) {
            chart.setOption(result);
        }
    });
}