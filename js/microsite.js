$(document).ready(function() {			
	//Animations for the main menu
	$("#main_menu li").each(function()
	{
		$(this).hover(
		function()
		{
			$(this).find("span").animate({
				opacity: 1.0,
				top: -17 // how far up the text within the menu will animate
			}, 350, "easeOutBack");
			$(this).find("img").animate({
				top: -8 // how far up the image within the menu will animate
			}, 250, "easeOutBack");
		},
		function()
		{
			$(this).find("span").animate({
				opacity: 0.0,
				top: 0
			}, 100);
			$(this).find("img").animate({
				top: 0
			}, 350, "easeOutBack");
		});
	});
				
	// Coda Slider Effect			
	$("#scroll").scrollable({ circular: true, mousewheel: true, keyboard: "static" }).navigator({
		navi: "#main_menu", // defining main_menu as the navigation.
		naviItem: "a",		
		activeClass: "current", // adds "current" to the active element class
		history: true // enables the history to be stored
	});
				
	// Search Input Slider Effect
	$("#search_icon").toggle(
		function()
		{
			// Animating the width of all menu items
			$("#main_menu li").each(
			function()
			{
				// Animating the width of each menu item
				$(this).animate(
				{
					width: 55 // Change this to a smaller number if you need more space for the search bar
				}, 350, "easeOutSine");
			});	
			
			// Animating in the search field itself
			$("#search_wrapper input").animate(
			{
				opacity: 1.0,
				width: 194 // change this if you nedd a smaller or larger search input field
			}, 300, "easeOutSine");
		},
		function()
		{
			// Animating the menu items back to normal
			$("#main_menu li").each(
			function()
			{
				$(this).animate(
				{
					
					width: 70
				}, 350, "easeOutSine");
			});	
			
			// Hiding the search field
			$("#search_wrapper input").animate(
			{
				opacity: 0.0,
				width: 0
			}, 350, "easeOutSine");
		}
	);
	
	// Search Help Text Animation search_hover. Remove this whole block if you dont want the search help text to appear
	$("#search_icon").hover(
		function()
		{
			$("#search_hover").fadeIn(250);
		},
		function()
		{
			$("#search_hover").fadeOut(250);
		}
	);
	
	// Gallery slider
	$("#gallery_wrapper").cycle({ 
	    prev:   '#prev_gallery_page', 
	    next:   '#next_gallery_page', 
	    timeout: 0 
	});	
	//horizontal.eq(0).data("#gallery_wrapper").focus();
	
	
	//Image Overlay Effect with a mask color
	$(".gallery a[rel]").overlay({mask: '#333'});
	
	//Contact Form Ajax
	$("form#ajax_form").validator().submit(function(e) {

	var form = $(this);

	// client-side validation OK.
	if (!e.isDefaultPrevented()) {

		// submit with AJAX
		$.getJSON("contact.php?" + form.serialize(), function(json) {

			// everything is ok. (server returned true)
			if (json === true)  {
				// Add message to the flash box
				$("#flash_message .content_container").text("Thanks for reaching out!");
				
				// Clear the form input fields
				$(":input","form#ajax_form")
					.not(":button, :submit, :reset, :hidden")
					.val("")	
											
				// Animating in the flash message
				$("#flash_message").fadeIn("slow");
				setTimeout(function(){
					$("#flash_message").fadeOut("slow", function () {
				  		$("#flash_message").remove();
				  		$("#flash_message .content_container").text("");
				    }); }, 5000); // Change the duration of the flash message to make if fade out faster of slower. This value is in miliseconds
			
			// server-side validation failed. use invalidate() to show errors
			} else {
				form.data("validator").invalidate(json);
			}
		});

		// prevent default form submission logic
		e.preventDefault();
		}
	});	
});
