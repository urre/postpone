(function ($) {

	"use strict";

	$(function () {

		// Get next coming weekday. 0 = Sunday, 1 = Monday...
		Date.prototype.getNextWeekDay = function (d) {
		    if (d) {
		        var next = this;
		        next.setDate( this.getDate() - this.getDay() + 7 + d );
		        return next;
		    }
		}

		// Prepend leading zero if < 10. i.e 9 -> 09
		function pad(n) {
		    return (n < 10) ? ("0" + n) : n;
		}

		// Add hours
		Date.prototype.addHours= function(h){
		    this.setHours(this.getHours()+h);
		    return this;
		}

		if($('#timestampdiv:visible').length == 0) {

			// Setup fuzzy items
			var fuzzy = ["In 1 hour", "Tomorrow 8am", "Tomorrow after lunch", "Tonight", "Next monday", "Next month", "Reset"];
			
			// Create new select box
			$('<select class="fuzzy-later"><option value="">Publish later...</option></select>').insertBefore(".save-timestamp	");

			// Add the fuzzy options
			for (var i = 0; i < fuzzy.length; i++) {
				$('.fuzzy-later').append('<option value="'+fuzzy[i]+'">'+fuzzy[i]+'</option>');
			}

			// Update date and time when select box changes
			$('.fuzzy-later').on('change', function(e) {

				// Get current date
				var now = new Date();

				e.preventDefault();

				var fuzzyChoice = $('.fuzzy-later').find(":selected").text();

				switch (fuzzyChoice) {
					case "In 1 hour" :
						$('#jj').val(pad(now.getDate()));
						$('#hh').val(now.addHours(1).getHours());
						$('#mn').val(now.addHours(1).getMinutes());
						$('#mm option').eq(now.getMonth()).prop('selected', true);
						break;
					case "Tomorrow 8am" :
						$('#jj').val(pad(parseInt(now.getDate())+1));
						$('#hh').val('08');
						$('#mn').val('00');
						$('#mm option').eq(now.getMonth()).prop('selected', true);
						break;
					case "Tomorrow after lunch" :
						$('#jj').val(pad(now.getDate()+1));
						$('#hh').val('13');
						$('#mn').val('00');
						$('#mm option').eq(now.getMonth()).prop('selected', true);
						break;
					case "Tonight" :
						$('#jj').val(pad(now.getDate()));
						$('#hh').val('22');
						$('#mn').val('00');
						$('#mm option').eq(now.getMonth()).prop('selected', true);
						break;
					case "Next monday" :
						$('#jj').val(pad(now.getNextWeekDay(1).getDate()));
						var nextmondaymonth = pad(now.getNextWeekDay(1).getMonth());
						$('#mm option').eq(nextmondaymonth).prop('selected', true);
						break;
					case "Next month" :
						var nextmonth = $('#mm').find(":selected").index() + 1;
						$('#mm option').eq(nextmonth).prop('selected', true);
						break;
					case "Reset" :						
						$('.cancel-timestamp').trigger('click');
						$('#mm').prop('selectedIndex', 0);
						break;
				}

			});

		}

	});
}(jQuery));