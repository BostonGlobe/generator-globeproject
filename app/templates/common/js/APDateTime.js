module.exports = {

	// return something like "July 11, 2013"
	date: function(date) {
	  var month = ['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'][date.getMonth()];
	  return month + ' ' + date.getDate() + ', ' + date.getFullYear();
	},

	// return something like "12:24 p.m."
	time: function(date) {
	  var hour = date.getHours();
	  var minutes = ('0' + date.getMinutes().toString()).slice(-2);
	  var suffix = hour > 11 ? 'p.m.' : 'a.m.';
	  var displayHour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
	  var time = (displayHour + ':' + minutes + ' ' + suffix).replace(':00', '');
	  var displayTime = time === '12 p.m.' ? 'noon' : (time === '12 a.m.' ? 'midnight' : time);
	  
	  return displayTime;
	}

};