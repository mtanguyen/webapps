var vote = () => {
    event.preventDefault();
    v1 = $('#rank1')[0].value;
    v2 = $('#rank2')[0].value;
    v3 = $('#rank3')[0].value;
    data = {v1, v2, v3};
    
    $.ajax({
        type: 'POST',
        url: '/vote',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log("success");
            if (response.succeed === true) {
                $("#voteFail").hide();
                $("#voteSuccess").show();
            } else {
                $("#voteSuccess").hide();
                $("#voteFail").show();
            }
        },
        error: function(response) {
            $("#voteSuccess").hide();
            $("#voteFail").show();
        },
    });
}

$(function() {
    $("#vote-form").on("submit", vote);
    
    $.ajax({
        type: 'GET',
        url: '/websites',
        contentType: 'application/json',
        success: function(response) {
            if (response.succeed === true) {
                var sites = response.websites;
                sites = sites.map(v => v.username);
                sites.forEach(n => {
                    $(".vote-select").append($("<option>" + n + "</option>"));
                });
            } else {
                console.log(response);
            }
        }
    });
    
    $("#iframeSelect").on("change", function(event) {
        $("iframe").attr('src', '/sites/' + event.target.value + '/index.html')
    });
});
