$(document).ready( function() {
	
	// Accordion 
	// function myAccFunc() {
		// var x = document.getElementById("demoAcc");
		// if (x.className.indexOf("w3-show") == -1) {
			// x.className += " w3-show";
		// } else {
			// x.className = x.className.replace(" w3-show", "");
		// }
	// }

	// Click on the "Jeans" link on page load to open the accordion for demo purposes
	// document.getElementById("myBtn").click();


	// Script to open and close sidebar
	function openMenu() {
		document.getElementById("mySidebar").style.display = "block";
		document.getElementById("myOverlay").style.display = "block";
	}

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
	
	function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.9";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	
});