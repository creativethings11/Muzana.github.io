// jscountdown.js
// CountDown Clock
// Version   : 1.0.4 (English labels)
// Developer : Ekrem KAYA, modified for live countdown
// Website   : https://e-piksel.com
// GitHub    : https://github.com/epiksel/countdown

(function ($) {
  $.fn.countdown = function (options, callback) {
    var settings = $.extend({
      date: null,       // Target date for countdown
      offset: 0,        // Timezone offset in hours (e.g., 5.5 for IST)
      day: 'Day',
      days: 'Days',
      hour: 'Hour',
      hours: 'Hours',
      minute: 'Minute',
      minutes: 'Minutes',
      second: 'Second',
      seconds: 'Seconds'
    }, options);

    if (!settings.date) {
      $.error('Date is not defined.');
    }

    if (!Date.parse(settings.date)) {
      $.error('Incorrect date format, it should look like this: 12/24/2012 12:00:00');
    }

    var container = this;

    // Get client's current date with timezone offset
    function currentDate() {
      var date = new Date();
      var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      return new Date(utc + (3600000 * settings.offset));
    }

    // Main countdown function
    function countdown() {
      var target_date = new Date(settings.date);
      var now = currentDate();
      var difference = target_date - now;

      if (difference < 0) {
        clearInterval(interval);
        if (callback && typeof callback === 'function') callback();
        container.html("<li><p>Event Started!</p></li>");
        return;
      }

      var _second = 1000,
          _minute = _second * 60,
          _hour = _minute * 60,
          _day = _hour * 24;

      var days = Math.floor(difference / _day),
          hours = Math.floor((difference % _day) / _hour),
          minutes = Math.floor((difference % _hour) / _minute),
          seconds = Math.floor((difference % _minute) / _second);

      // Format numbers to two digits
      days = days < 10 ? '0' + days : days;
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      // Update DOM
      container.find('.days').text(days);
      container.find('.hours').text(hours);
      container.find('.minutes').text(minutes);
      container.find('.seconds').text(seconds);

      // Update text labels
      container.find('.days_text').text(days == 1 ? settings.day : settings.days);
      container.find('.hours_text').text(hours == 1 ? settings.hour : settings.hours);
      container.find('.minutes_text').text(minutes == 1 ? settings.minute : settings.minutes);
      container.find('.seconds_text').text(seconds == 1 ? settings.second : settings.seconds);
    }

    // Initial call
    countdown();

    // Update countdown every second
    var interval = setInterval(countdown, 1000);
  };
})(jQuery);
