//check ios version
function iOSVersion() {
	var match = (navigator.appVersion).split('OS ');
	if (match.length > 1) {
		return match[1].split(' ')[0].split('_').join('.');
	}
	return false;
}

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

//load json local and get id
var urlhash = window.location.hash.split('#');
var link_url = decodeURIComponent(urlhash[1]);//decodeURIComponent remove space(%20)
//console.log(link_url);
var url = "data.json?v=" + new Date().getMinutes() ;
readTextFile(url, function(text){
	data = JSON.parse(text).data;
	var obj = data[link_url];

	if(obj != null){
		var div_err = document.getElementById('error');
		document.body.removeChild(div_err);
		//add title
		document.title = link_url;
		//add get on cydia
		var get = document.getElementById('get');
			//get.href = 'cydia://url/https://cydia.saurik.com/api/share#?source=https://yourRepo.github.io' + obj.link; //link in json data is bundleid (com.example.package)
			get.href = obj.link;
		//add title------------------------------------------------
		var title_div = document.querySelector(".show .title");
			title_div.innerHTML = "<b>Name : </b>" + obj.title;
		  
		//add version-----------------------------------------------
		var version_div = document.querySelector(".show .version");
			version_div.innerHTML = "<b>Version : </b>" + obj.version;
		  
	  //add support-----------------------------------------------	  
	  var support_div = document.querySelector(".show .support");
		  support_div.innerHTML = "<b>Support iOS : </b>" + obj.support;
		  
	  //add version check-----------------------------------------------	  
	  var vercheck_div = document.querySelector(".show .vercheck");
		  vercheck_div.style.color = "#1ecc83";
		  vercheck_div.innerHTML = "<b>iOS devices : </b>" + iOSVersion();
		  
		//add category----------------------------------------------------
		var section_div = document.querySelector(".show .category");
			section_div.innerHTML = "<b>Category : </b>" + obj.category;
		  
		//add description------------------------------------------------
		var desc_div = document.querySelector(".show .desc");
			if(obj.opensource == "" || obj.opensource == null){
				desc_div.innerHTML = "<b>Mô Tả : </b>" + obj.description;
			}else{
				desc_div.innerHTML = "<b>Mô Tả : </b>" + obj.description + " <br> <a target='_blank' href='" + obj.opensource + "'>Open source!</a> ";
			}
		
		//loop screenshots--------------------------------------------
		for(var img_arr in obj.screenshots) {
			var img_screenshots = obj.screenshots;
			var link_img = document.createElement("a");
				link_img.setAttribute('target', '_blank');
				link_img.href = img_screenshots[img_arr];
			var content_images = document.createElement("img");
				content_images.className = 'content_image';
				content_images.src = img_screenshots[img_arr];
				link_img.appendChild(content_images);
			document.querySelector(".show .content_show").appendChild(link_img);
		}
		
		//add changelog--------------------------------------------
		var changelog_div = document.querySelector(".show .changelog");
			changelog_div.innerHTML = "<b>Changelog : </b>" + obj.changelog;
		
		//add video--------------------------------------------------
		var iframe_div = document.querySelector(".show .video");
			iframe = document.createElement("iframe");
			var url_video = obj.videos;
			iframe.src = url_video;
			iframe.setAttribute('allowFullScreen', '');
			  if(url_video !== "" || url_video == null){
				iframe_div.appendChild(iframe);
			  }else{
				//document.querySelector('.show .video').textContent = "Không có video mô tả cho nội dung này !";
				document.querySelector('.show .video').hidden = true ;
			  }
	}
	else{
		var show = document.getElementsByClassName('show')[0];
		document.body.removeChild(show);
		document.getElementById('error').removeAttribute("hidden");
		document.getElementsByClassName('error_url')[0].textContent = link_url;
	}

});

//scroll nav
const hd = document.getElementById("head");
const hdHeight = hd.offsetHeight;
window.onscroll = function () {
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	const newhdHeight = hdHeight - scrollTop;
	hd.style.height = newhdHeight > 0 ? newhdHeight + "px" : 0;
	hd.style.opacity = newhdHeight / hdHeight;
};
