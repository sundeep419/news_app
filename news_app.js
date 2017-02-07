$(document).ready(function(){
	var newTable;
	var idChannel;
	var clicked = [];
	var urlString =  "https://newsapi.org/v1/sources?language=en";
	console.log(urlString);
	$.ajax({
		url: urlString,
		success: function(info){
			console.log(info.sources.length);
			for (var i = 0; i < info.sources.length; i++) {
				var nameChannel = info.sources[i].name;
				idChannel=info.sources[i].id;
				// newTable='<input type="checkbox" id="myCheckbox" class="filled-in" /><label  for="myCheckbox"></label>'
				newTable='<tr><td><input type="checkbox" id="'+ info.sources[i].id+'" name="'+ nameChannel +'" value="'+ info.sources[i].id +'"/> <label for="'+info.sources[i].id+'">'+nameChannel+'</label></td></tr>' ;
				$("#box").append(newTable);
			}
			$('form').change(function(){
				clicked = [];
				$.each($("input[type='checkbox']:checked"), function(){
					clicked.push($(this).val());
				});
				$('.card').empty();
				for(var k = 0; k<clicked.length; k++){
					var indUrl= "https://newsapi.org/v1/articles?source="+clicked[k]+"&sortBy=top&apiKey=e90c70d754bc433e897fcb3c83336f02";
					$.ajax({
						url : indUrl,
						success : function(main){
							for(var j = 0; j < main.articles.length; j++){
								var description = main.articles[j].description;
								var image = main.articles[j].urlToImage;
								var descriptionTable='<p class="card-content">' + description + '</p>';
								var imageTable='<img src=' + image + ' class="card-image" width="100px" height="50px">';
								var data = "<div class='newData'>"+imageTable+descriptionTable+"</div>"
								$(".card").append(data);
							}
						}
					});	
				}
			});
		},
		error: function(info){
			console.log("Err",info);
		}
	});
});
	// $('form').change(function(){
	// 	console.log($('input[type=checkbox]:checked'));
	// 	console.log($('input[type=checkbox]:checked').length);
	// 	// console.log($('input[type=checkbox]:checked')[0].value);
	// });

	// 	console.log($( "input:checked"));
	// 	$.each($("input[name='select']:checked"), function(){
	// 		channel = [];
	// 		channel.push($(this).val());
	// 		console.log(channel);
	// 	});
	// 	var htmlTable='<ul><li>' +channel+ '</li></ul>';
	// 	$("#selected").append(htmlTable);


	// };
	// $( "input[type=checkbox]" ).on( "click", countChecked )
	// channel.pop($(this).val());



		// idChannel=info.sources[i].url;
		// console.log(idChannel);