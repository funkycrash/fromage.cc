var myCenter=new google.maps.LatLng(30.249796, -97.754667);

            function initialize()
            {
            var mapProp = {
              center:myCenter,
              scrollwheel: false,
              zoom:17,
              mapTypeId:google.maps.MapTypeId.ROADMAP
              };

            var map=new google.maps.Map(document.getElementById("map2"),mapProp);

            var marker=new google.maps.Marker({
              position:myCenter,
                animation:google.maps.Animation.BOUNCE,
              icon:'img/map-marker.png',
                map: map,
              });

            marker.setMap(map);
            }

            google.maps.event.addDomListener(window, 'load', initialize);