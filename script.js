$(document).ready( function() {	

	//Open sidebar
	function openMenu() {
		document.getElementById("mySidebar").style.display = "block";
		document.getElementById("myOverlay").style.display = "block";
	}
	//Close sidebar
	function closeMenu() {
		document.getElementById("mySidebar").style.display = "none";
		document.getElementById("myOverlay").style.display = "none";
	}
	
	$('.openMenu').click( function(){
		openMenu();
	});
	
	$('.closeMenu').click( function(){
		closeMenu();
	});
	
	$('.closeMenu').click( function(){
		closeMenu();
	});

	// Facebook plugin code
	(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.9";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));	
	
});
