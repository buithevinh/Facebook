function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    if (response.status === 'connected') {
       Facebook();
     } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1121072544680333',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8',
    oauth: true
  });

  FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function Logout(){
    FB.logout(function(response) {
      $('.fb_iframe_widget').children('span').show();
       $('.status').hide();
    });
  }

  function shareFacbook(){
    var value = window.location.href;
    console.log(value);
    FB.ui({
      method: 'share',
      href: value,
      mobile_iframe: true,
    }, function(response){});
  }


  function Facebook() {
    $('.fb_iframe_widget').children('span').hide();
    $('.status').show();
    FB.api('/me',{fields: 'name, email, picture.width(180).height(180).redirect(1), albums'}, function(response) {
      var url = response.picture.data.url;
      $('.status').find('h1').text(response.name);
      $('.status').find('h2').text(response.email);
      $('.status').find('img').attr('src', url);
    });

    FB.api('/me','GET',{"fields":"albums{photos{picture},id,name}"}, function(response){
       var data = response.albums.data;
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === 'Profile Pictures') {
          console.log(data[i]);
        }
      }
    });
  }

