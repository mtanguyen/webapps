var vote = (event) => {
    event.preventDefault();
    v1 = $('#rank1')[0].value;
    v2 = $('#rank2')[0].value;
    v3 = $('#rank3')[0].value;
    data = {v1, v2, v3};
    
    $.ajax({
        type: 'POST',
        url: '/vote',
        data: JSON.stringify(data),
        success: function(response) {
            console.log(response);
            if (response.succeed === true) {
                $("#voteSuccess").show();
                $("#voteFail").hide();
            } else {
                $("#voteSuccess").hide();
                $("#voteFail").show();
            }
        },
        error: function(response) {
            $("#voteSuccess").hide();
                $("#voteFail").show();
        }
    });
}

// $(function() {
    $("#vote-form").submit(vote);
    
    $.ajax({
        type: 'GET',
        url: '/websites',
        success: function(response) {
            if (response.succeed === true) {
                var sites = response.websites;
                sites = sites.map(v => v.username);
                $("#sitePreview").attr('src', "/sites/" + sites[0] + "/index.html");
                sites.forEach(n => {
                    $(".vote-select").append($("<option>" + n + "</option>"));
                });
            } else {
                console.log(response);
            }
        }
    });
// });
