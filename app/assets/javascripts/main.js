$(document).ready(function(){

smoothScroll.init({offset: 48});

	//transitions
	$(window).scroll(function() {

		var scrollLength = $(this).scrollTop();
    // console.log(scrollLength);

		if (scrollLength > 80) {
			$('.about-title').addClass('appear');
			$('.about-content').addClass('appear-content');
			$('.about-image-wrap').addClass('appear-image');
		}

		if (scrollLength > 500) {
			$('.address-map-container').addClass('appear');
			$('.tram').addClass('move-tram');
		}

		if (scrollLength > 760) {
			$('.speaker-title').addClass('appear');
		}

		if (scrollLength > 1450) {
			$('.speakers-card').each(function(index) {
				setTimeout(function() {
					$('.speakers-card').eq(index).addClass('appear');
				}, 200 * (index + 1));
			});
		}

		if (scrollLength > 2550) {
			$('.schedule-title').addClass('appear-title');

			$('.talk-card').each(function(index) {
				setTimeout(function() {
					$('.talk-card').eq(index).addClass('appear-card');
				}, 200 * (index + 1));
			});

			$('.vertical').each(function(index) {
				setTimeout(function() {
					$('.vertical').eq(index).addClass('appear-title');
				}, 200 * (index + 1));
			});

			// ================
			$('.talk-card').find('p').css('width','70%');
			// =================
		}

		if (scrollLength > 3150) {
			$('.sponsors-title').addClass('appear-title');

			$('.sponsors-content').addClass('appear-sponsors');

			$('.sponsors-img').each(function(index) {
				setTimeout(function() {
					$('.sponsors-img').eq(index).addClass('appear-sponsors');
				}, 200 * (index + 1));
			});
		}


	});

});
