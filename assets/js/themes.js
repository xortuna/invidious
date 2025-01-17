
var pos = 0;
document.addEventListener('keydown', function(e) {
	if(document.querySelector('video') === null)
	{
		console.log(e.which);
		switch(e.which)
			{
			case 38:
				MoveSelection(-4);
				e.preventDefault(); // prevent the default action (scroll / move caret)
			break;
				case 39:
				MoveSelection(1);
				e.preventDefault(); // prevent the default action (scroll / move caret)
			break;
					case 37:
				MoveSelection(-1);
				e.preventDefault(); // prevent the default action (scroll / move caret)
			break;
				case 40:
				MoveSelection(4);
				e.preventDefault(); // prevent the default action (scroll / move caret)
			break;
			}
    }
});

function MoveSelection(dir)
{
   var t= document.querySelectorAll('#contents > .pure-g > .pure-u-1 > .h-box');
          t[pos].classList.remove('active');
        	pos+= dir;
          if(pos < 0)
          	pos = t.length-1;
          else if(pos >= t.length)
          	pos = 0;
          t[pos].classList.add('active');
          document.querySelectorAll('#contents > .pure-g > .pure-u-1 > .h-box > a')[pos].focus();
          console.log(pos);
}

var toggle_theme = document.getElementById('toggle_theme');
toggle_theme.href = 'javascript:void(0);';

toggle_theme.addEventListener('click', function () {
    var dark_mode = document.body.classList.contains("light-theme");

    var url = '/toggle_theme?redirect=false';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('GET', url, true);

    set_mode(dark_mode);
    window.localStorage.setItem('dark_mode', dark_mode ? 'dark' : 'light');

    xhr.send();
});

window.addEventListener('storage', function (e) {
    if (e.key === 'dark_mode') {
        update_mode(e.newValue);
    }
});

window.addEventListener('DOMContentLoaded', function () {
    window.localStorage.setItem('dark_mode', document.getElementById('dark_mode_pref').textContent);
    // Update localStorage if dark mode preference changed on preferences page
    update_mode(window.localStorage.dark_mode);
	
	//fix player width
	if(document.querySelector('video') != null)
	{
		var v = document.getElementById("contents");
		v.classList.remove('pure-u-md-20-24');
		v.classList.add('pure-u-md-24-24');
		window.scrollBy(0,68);
	}
});


var darkScheme = window.matchMedia('(prefers-color-scheme: dark)');
var lightScheme = window.matchMedia('(prefers-color-scheme: light)');

darkScheme.addListener(scheme_switch);
lightScheme.addListener(scheme_switch);

function scheme_switch (e) {
  // ignore this method if we have a preference set
  if (localStorage.getItem('dark_mode')) {
    return;
  }
  if (e.matches) {
    if (e.media.includes("dark")) {
      set_mode(true);
    } else if (e.media.includes("light")) {
      set_mode(false);
    }
  }
}

function set_mode (bool) {
    if (bool) {
        // dark
        toggle_theme.children[0].setAttribute('class', 'icon ion-ios-sunny');
        document.body.classList.remove('no-theme');
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        // light
        toggle_theme.children[0].setAttribute('class', 'icon ion-ios-moon');
        document.body.classList.remove('no-theme');
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
}

function update_mode (mode) {
    if (mode === 'true' /* for backwards compatibility */ || mode === 'dark') {
        // If preference for dark mode indicated
        set_mode(true);
    }
	else if (mode === 'false' /* for backwards compaibility */ || mode === 'light') {
		// If preference for light mode indicated
		set_mode(false);
	}
    else if (document.getElementById('dark_mode_pref').textContent === '' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no preference indicated here and no preference indicated on the preferences page (backend), but the browser tells us that the operating system has a dark theme
        set_mode(true);
    }
    // else do nothing, falling back to the mode defined by the `dark_mode` preference on the preferences page (backend)
}


