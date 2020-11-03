function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.setRequestHeader('Access-Control-Allow-Origin', '*');
    rawFile.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == "200") {
            callback(this.response);
        }
    }
    rawFile.send(null);
}

//load json local:
var packagesSection = {};
var url = "data.json?v=" + new Date().getMinutes() ;
readTextFile(url, function(text){
   data = JSON.parse(text).data;
   //---------------------------------
   for (var key_section in data) {
		var danhmuc = data[key_section].category;
		
			if(danhmuc==null) {
				danhmuc = "Unknown";
			}
			if(packagesSection[danhmuc] == null) {
				packagesSection[danhmuc] = [];
			}
		packagesSection[danhmuc].push(data[key_section]);
	};
	//---------------------------------
	lastUpdate();
    segment_content_item();
});

function lastUpdate(){
	
	var last_update = document.createElement("div");
		last_update.className = 'danhmuc';
		last_update.id = 'danhmuc_last';
	document.querySelector('.main').appendChild(last_update);
  
	var htmlnews = "";
	var count = 0;
  	for (var last in data) {
		//console.log(last);
		count++;
		if(count > 10) {
			break;
		}
		htmlnews += '<a class="content_item" target="_blank" href="mota.html#'+last+'">';
		htmlnews += '<div class="image"><img src="'+data[last].thumbnail+'"></div>';
		htmlnews += '<div class="text_wrapper">';
		htmlnews += '<div class="title">'+data[last].title+'</div>';
		htmlnews += '<div class="desc">'+data[last].description.substr(0, 30) + "..." +'</div>';
		htmlnews += '<div class="start">Updates : '+data[last].update+ '</div>';
		htmlnews += '</div>';
		htmlnews += '</a>';
	}

	var header_last = document.createElement("div");
		header_last.className = 'header_danhmuc';
	last_update.appendChild(header_last);

	var title_last = document.createElement("div");
		title_last.className = 'title_danhmuc';
		title_last.textContent = 'Last_Update';
	header_last.appendChild(title_last);


	var last_carousel_div = document.createElement("div");
		last_carousel_div.className = 'content_carousel';
  
	last_carousel_div.innerHTML = htmlnews;
	
	last_update.appendChild(last_carousel_div);
}

function create_sections(id_category) {
	var total_packages = Object.keys(data).length;
	document.getElementById('total').textContent = 'Total : ' + total_packages + ' packages';
	var total_category = packagesSection[id_category].length;

	var div_danhmuc = document.createElement("div");
		div_danhmuc.className = 'danhmuc';
		div_danhmuc.id = 'danhmuc_' + id_category;
	document.querySelector('.main').appendChild(div_danhmuc);

	var header_danhmuc = document.createElement("div");
		header_danhmuc.className = 'header_danhmuc';
	div_danhmuc.appendChild(header_danhmuc);
  
	var title_danhmuc = document.createElement("div");
		title_danhmuc.className = 'title_danhmuc';
		title_danhmuc.textContent = id_category + ' ('+total_category+')';
	header_danhmuc.appendChild(title_danhmuc);

	var content_carousel_div = document.createElement("div");
		content_carousel_div.className = 'content_carousel';
	div_danhmuc.appendChild(content_carousel_div);
}

function segment_content_item() {
	for (item_key in data) {
    var item = data[item_key];
	var id_category = item.category;
	
    if (document.getElementById('danhmuc_' + id_category) == null) {
		create_sections(id_category);
    }
    var parent_location = document.querySelector('#danhmuc_' + id_category + ' .content_carousel');
    create_content_item(
		item_key,
		parent_location,
		item.title,
		item.thumbnail,
		item.description,
		item.update,
		item.category,
    );
  }
	
};

//hiện danh sách ngoài home 
function create_content_item(content_id, parent_location, title, thumbnail, description, update) {

	var content_item_a = document.createElement("a");
		content_item_a.className = 'content_item';
		content_item_a.setAttribute('target', '_blank');
		content_item_a.href = "mota.html#" +content_id;
		
	var thumbnail_div = document.createElement("div");
		thumbnail_div.className = 'image';
	content_item_a.appendChild(thumbnail_div);
  
	var thumbnail_img = document.createElement("img");
		thumbnail_img.src = thumbnail;
	thumbnail_div.appendChild(thumbnail_img);

	var text_wrapper_div = document.createElement("div");
		text_wrapper_div.className = 'text_wrapper';
	content_item_a.appendChild(text_wrapper_div);
  
	var title_div = document.createElement("div");
		title_div.className = 'title';
		title_div.textContent = title;
	text_wrapper_div.appendChild(title_div);
  
	var desc_div = document.createElement("div");
		desc_div.className = 'desc';
		desc_div.textContent = description.substr(0, 30) + " ...";
	text_wrapper_div.appendChild(desc_div);
  
	var update_div = document.createElement("div");
		update_div.className = 'start';
		update_div.textContent = 'Updates : ' + update;
	text_wrapper_div.appendChild(update_div);
	
	parent_location.appendChild(content_item_a);
}
//--------end--------------------------------------------------

//scroll nav
window.onscroll = function() {
	if (window.pageYOffset > 50) {
		document.getElementById("header").classList.add('sticky-header');

	} else {
		document.getElementById("header").classList.remove('sticky-header');
	}
};

//link header click active
// var link = document.getElementsByClassName("link");
	// for(var i = 0; i < link.length; i++){
		// link[i].addEventListener("click", function(){
		// var current = document.getElementsByClassName(" active");
		// current[0].className = current[0].className.replace(" active", "");
		// this.className += " active";
	// });
// }
(function(l){var i,s={touchend:function(){}};for(i in s)l.addEventListener(i,s)})(document); // sticky hover fix in iOS