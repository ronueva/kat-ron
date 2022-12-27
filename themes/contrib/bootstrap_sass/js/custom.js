/**
 * @file
 * Global utilities.
 *
 */


(function($, Drupal) {

  'use strict';

  Drupal.behaviors.bootstrap_sass = {
    attach: function(context, settings) {
      let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      let triggeredAutoScrollDown = false;

      if (drupalSettings.path.isFront) {
        new fullpage('#full_page', {
          licenseKey: "76JKK-Q57N6-H960H-64MEJ-WZWUQ",
          normalScrollElements: '#map',
          responsiveHeight: 410,
          scrollOverflow: true,
          fitToSection: false
        });
      }

      $(".field--name-field-landing-image").slick({
        infinite: true,
        speed: 0,
        useCSS: true,
        autoplay: true,
        autoplaySpeed: 900,
        useTransform: true,
        arrows: false,
        swipe: false,
        swipeToSlide: false,
        touchMove: false,
        draggable: false,
        accessibility: false,
      })

      $("#submit-rsvp").on("click", function () {
        if ($(this).prop("disabled")) {
          return false;
        }

        $(this).prop("disabled", true)

        let invitees = $(".invitee");
        let responses = [];
        let groupId = $(this).parent("div.content").data("id")

        invitees.map((key, invitee) => {
          responses[key] = {
            id: $(invitee).data("id"),
            response: invitee.checked
          }
        })

        fetch("/api/katron-invitation", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            group: groupId,
            invitees: responses
          })
        })

      })

      let video = $(".hero-video video")

      if (isSafari) {
        video.get(0).controls = true
        video.get(0).muted = false
      } else {
        video.get(0).controls = false
        video.get(0).muted = true
        video.get(0).autoplay = true
      }

      setTimeout(() => {
        $(".scroll-down").show()
      }, 10000)

      $(".scroll-down").on("click", function () {
        console.log("here")
        $([document.documentElement, document.body]).animate({
          scrollTop: $("#title-area").offset().top
        });
        triggeredAutoScrollDown = true
      })

      video.on("ended", function () {
        if (!triggeredAutoScrollDown) {
          $([document.documentElement, document.body]).animate({
            scrollTop: $("#title-area").offset().top
          }, 1000);
          triggeredAutoScrollDown = true
        }
        this.play();
      })

    }
  };

})(jQuery, Drupal);

function initMap() {
  var mapProp= {
    center: new google.maps.LatLng(14.301414716867429,121.4899881756956),
    zoom: 16,
    mapId: "b7ec0f1216905946",
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  };
  var map = new google.maps.Map(document.getElementById("map"),mapProp);

  var marker = new google.maps.Marker({
    position: {lat: 14.301414716867429, lng: 121.4899881756956},
    map,
    title: "Spacio Caliraya",
    icon: drupalSettings.katron.mapIconPath
  });

  marker.addListener("click", () => {
    window.open("https://goo.gl/maps/SPutr8EdeqRGzN1H7")
  });
}
