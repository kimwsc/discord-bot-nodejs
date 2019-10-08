var data = '';

$( document ).ready(function() {
  
$.ajax({
  type: 'GET',
  url: 'https://hisako-dev.glitch.me/json',
  data: data,
  dataType: 'json',
  success: function (data) {

      console.log(data);
      var command = '';

			$.each(data, function(cmd) {
        
          command += "<tr>"
          command += "<td scope='row'>" + data[cmd] + "</td>";
          command += "</tr>"
              
      });
    	$('#commandList tbody').append(command);

  }

});

});