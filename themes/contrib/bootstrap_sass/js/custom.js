/**
 * @file
 * Global utilities.
 *
 */


(function($, Drupal) {

  'use strict';

  Drupal.behaviors.bootstrap_sass = {
    attach: function(context, settings) {

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
