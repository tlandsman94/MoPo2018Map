'use strict';

(function ($) {
  // console.log("Hello Galaxy");

  var map = L.map('map').setView([34.88593094075317, 5.097656250000001], 5);
  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors • <a href="//350.org">350.org</a>'
  // }).addTo(map);

  var renderLink = function renderLink(office) {
    return office['affiliate website'] ? '<a href=\'' + office['affiliate website'] + '\' class=\'btn btn-primary\' target=\'_blank\' role="button"><i class="fa fa-link" aria-hidden="true"></i> Visit Website</a>' : '';
  };
  var getOffices = function getOffices() {
    return $.ajax({
      dataType: 'json',
      url: 'https://d3n8a8pro7vhmx.cloudfront.net/fairvote/pages/6778/attachments/original/1536332413/list.json?1536332413'
    });
  };
  var mapCentroid = function mapCentroid(offices) {
    return $.ajax({
      dataType: 'json',
      url: 'https://d3n8a8pro7vhmx.cloudfront.net/fairvote/pages/6778/attachments/original/1536332617/state-centroids.geojson?1536332617',
      success: function success(geojson) {
        var states = L.geoJson(geojson, {
          pointToLayer: function pointToLayer(feature, latlng) {
            // console.log(feature);
            // const eventType = feature.properties.eventProperties.event_type;
            if (!offices[feature.properties.name]) return null;

            var geojsonMarkerOptions = {
              radius: 6,
              fillColor: "#19b2cc",
              color: "#553285",
              weight: 2,
              opacity: 0.9,
              fillOpacity: 0.2,
              className: 'event-item-popup'
            };
            return L.circleMarker(latlng, geojsonMarkerOptions);
          },

          onEachFeature: function onEachFeature(feature, layer) {
            console.log(offices[feature.properties.name]);
            if (!offices[feature.properties.name]) return;

            var office = offices[feature.properties.name];
            if (office && feature.properties.name) {
              layer.bindPopup('\n                      <div class=\'popup-item\'>\n                        <h2>' + (office['affiliate group'] || feature.properties.name + ' office') + '</h2>\n                        <h4>' + renderLink(office) + ' <a href=\'mailto:' + office.email + '\' class=\'btn btn-primary\' role="button"><i class="fa fa-envelope-o" aria-hidden="true"></i> Email</a></h4>\n                      </div>\n                    ');
            }
          }
        }).addTo(map);
        console.log(states.getBounds());
        map.fitBounds(states.getBounds());
      } //end of geoJson
    });
  }; // end of mapCentroid

  getOffices().then(mapCentroid);
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwibWFwIiwiTCIsInNldFZpZXciLCJtYXBib3hUaWxlcyIsInRpbGVMYXllciIsIm1heFpvb20iLCJhdHRyaWJ1dGlvbiIsImFkZFRvIiwicmVuZGVyTGluayIsIm9mZmljZSIsImdldE9mZmljZXMiLCJhamF4IiwiZGF0YVR5cGUiLCJ1cmwiLCJtYXBDZW50cm9pZCIsIm9mZmljZXMiLCJzdWNjZXNzIiwiZ2VvanNvbiIsInN0YXRlcyIsImdlb0pzb24iLCJwb2ludFRvTGF5ZXIiLCJmZWF0dXJlIiwibGF0bG5nIiwicHJvcGVydGllcyIsIm5hbWUiLCJnZW9qc29uTWFya2VyT3B0aW9ucyIsInJhZGl1cyIsImZpbGxDb2xvciIsImNvbG9yIiwid2VpZ2h0Iiwib3BhY2l0eSIsImZpbGxPcGFjaXR5IiwiY2xhc3NOYW1lIiwiY2lyY2xlTWFya2VyIiwib25FYWNoRmVhdHVyZSIsImxheWVyIiwiY29uc29sZSIsImxvZyIsImJpbmRQb3B1cCIsImVtYWlsIiwiZ2V0Qm91bmRzIiwiZml0Qm91bmRzIiwidGhlbiIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFVBQUNBLENBQUQsRUFBTztBQUNOOztBQUVBLE1BQUlDLE1BQU1DLEVBQUVELEdBQUYsQ0FBTSxLQUFOLEVBQWFFLE9BQWIsQ0FBcUIsQ0FBQyxpQkFBRCxFQUFvQixpQkFBcEIsQ0FBckIsRUFBNkQsQ0FBN0QsQ0FBVjs7QUFFQSxNQUFJQyxjQUFjRixFQUFFRyxTQUFGLENBQVksOEVBQVosRUFBNEY7QUFDeEdDLGFBQVMsRUFEK0Y7QUFFeEdDLGlCQUFhO0FBRjJGLEdBQTVGLEVBR1hDLEtBSFcsQ0FHTFAsR0FISyxDQUFsQjs7QUFLRTtBQUNBO0FBQ0E7O0FBRUYsTUFBTVEsYUFBYSxTQUFiQSxVQUFhLENBQUNDLE1BQUQ7QUFBQSxXQUFZQSxPQUFPLG1CQUFQLG1CQUEwQ0EsT0FBTyxtQkFBUCxDQUExQyxvSUFBaU0sRUFBN007QUFBQSxHQUFuQjtBQUNBLE1BQU1DLGFBQWEsU0FBYkEsVUFBYSxHQUFNO0FBQ3ZCLFdBQU9YLEVBQUVZLElBQUYsQ0FBTztBQUNaQyxnQkFBVSxNQURFO0FBRVpDLFdBQUs7QUFGTyxLQUFQLENBQVA7QUFJRCxHQUxEO0FBTUEsTUFBTUMsY0FBYyxTQUFkQSxXQUFjLENBQUNDLE9BQUQsRUFBYTtBQUMvQixXQUFPaEIsRUFBRVksSUFBRixDQUFPO0FBQ1pDLGdCQUFVLE1BREU7QUFFWkMsV0FBSywrQkFGTztBQUdaRyxlQUFTLGlCQUFDQyxPQUFELEVBQWE7QUFDaEIsWUFBSUMsU0FBU2pCLEVBQUVrQixPQUFGLENBQVVGLE9BQVYsRUFDWDtBQUNJRyx3QkFBYyxzQkFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ2pDO0FBQ0E7QUFDQSxnQkFBSSxDQUFDUCxRQUFRTSxRQUFRRSxVQUFSLENBQW1CQyxJQUEzQixDQUFMLEVBQXVDLE9BQU8sSUFBUDs7QUFFdkMsZ0JBQUlDLHVCQUF1QjtBQUN2QkMsc0JBQVEsQ0FEZTtBQUV2QkMseUJBQVksU0FGVztBQUd2QkMscUJBQU8sU0FIZ0I7QUFJdkJDLHNCQUFRLENBSmU7QUFLdkJDLHVCQUFTLEdBTGM7QUFNdkJDLDJCQUFhLEdBTlU7QUFPdkJDLHlCQUFXO0FBUFksYUFBM0I7QUFTQSxtQkFBTy9CLEVBQUVnQyxZQUFGLENBQWVYLE1BQWYsRUFBdUJHLG9CQUF2QixDQUFQO0FBQ0QsV0FoQkw7O0FBa0JFUyx5QkFBZSx1QkFBQ2IsT0FBRCxFQUFVYyxLQUFWLEVBQW9CO0FBQ2pDQyxvQkFBUUMsR0FBUixDQUFZdEIsUUFBUU0sUUFBUUUsVUFBUixDQUFtQkMsSUFBM0IsQ0FBWjtBQUNBLGdCQUFJLENBQUNULFFBQVFNLFFBQVFFLFVBQVIsQ0FBbUJDLElBQTNCLENBQUwsRUFBdUM7O0FBRXZDLGdCQUFNZixTQUFTTSxRQUFRTSxRQUFRRSxVQUFSLENBQW1CQyxJQUEzQixDQUFmO0FBQ0EsZ0JBQUlmLFVBQVVZLFFBQVFFLFVBQVIsQ0FBbUJDLElBQWpDLEVBQXVDO0FBQ3JDVyxvQkFBTUcsU0FBTix1RkFFVTdCLE9BQU8saUJBQVAsS0FBNkJZLFFBQVFFLFVBQVIsQ0FBbUJDLElBQW5CLEdBQTBCLFNBRmpFLDRDQUdVaEIsV0FBV0MsTUFBWCxDQUhWLDBCQUdnREEsT0FBTzhCLEtBSHZEO0FBTUQ7QUFDRjtBQS9CSCxTQURXLEVBaUNSaEMsS0FqQ1EsQ0FpQ0ZQLEdBakNFLENBQWI7QUFrQ0VvQyxnQkFBUUMsR0FBUixDQUFZbkIsT0FBT3NCLFNBQVAsRUFBWjtBQUNBeEMsWUFBSXlDLFNBQUosQ0FBY3ZCLE9BQU9zQixTQUFQLEVBQWQ7QUFDSCxPQXhDTyxDQXdDTjtBQXhDTSxLQUFQLENBQVA7QUEwQ0MsR0EzQ0gsQ0FyQk0sQ0FnRUQ7O0FBRUg5QixlQUFhZ0MsSUFBYixDQUFrQjVCLFdBQWxCO0FBQ0gsQ0FuRUQsRUFtRUc2QixNQW5FSCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoKCQpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJIZWxsbyBXb3JsZFwiKTtcblxuICB2YXIgbWFwID0gTC5tYXAoJ21hcCcpLnNldFZpZXcoWzM0Ljg4NTkzMDk0MDc1MzE3LCA1LjA5NzY1NjI1MDAwMDAwMV0sIDIpO1xuXG4gIHZhciBtYXBib3hUaWxlcyA9IEwudGlsZUxheWVyKCdodHRwczovL2NhcnRvZGItYmFzZW1hcHMte3N9Lmdsb2JhbC5zc2wuZmFzdGx5Lm5ldC9saWdodF9hbGwve3p9L3t4fS97eX0ucG5nJywge1xuICAgICAgICBtYXhab29tOiAxOCxcbiAgICAgICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHA6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4sICZjb3B5OzxhIGhyZWY9XCJodHRwczovL2NhcnRvLmNvbS9hdHRyaWJ1dGlvblwiPkNBUlRPPC9hPidcbiAgICAgIH0pLmFkZFRvKG1hcCk7XG5cbiAgICAvLyBMLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICAgIC8vICAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzIOKAoiA8YSBocmVmPVwiLy8zNTAub3JnXCI+MzUwLm9yZzwvYT4nXG4gICAgLy8gfSkuYWRkVG8obWFwKTtcblxuICBjb25zdCByZW5kZXJMaW5rID0gKG9mZmljZSkgPT4gb2ZmaWNlWydhZmZpbGlhdGUgd2Vic2l0ZSddID8gYDxhIGhyZWY9JyR7b2ZmaWNlWydhZmZpbGlhdGUgd2Vic2l0ZSddfScgY2xhc3M9J2J0biBidG4tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIHJvbGU9XCJidXR0b25cIj48aSBjbGFzcz1cImZhIGZhLWxpbmtcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IFZpc2l0IFdlYnNpdGU8L2E+YCA6ICcnO1xuICBjb25zdCBnZXRPZmZpY2VzID0gKCkgPT4ge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHVybDogJy9kYXRhL2xpc3QuanNvbidcbiAgICB9KTtcbiAgfTtcbiAgY29uc3QgbWFwQ2VudHJvaWQgPSAob2ZmaWNlcykgPT4ge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHVybDogJy9kYXRhL3N0YXRlLWNlbnRyb2lkcy5nZW9qc29uJyxcbiAgICAgIHN1Y2Nlc3M6IChnZW9qc29uKSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RhdGVzID0gTC5nZW9Kc29uKGdlb2pzb24sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHBvaW50VG9MYXllcjogKGZlYXR1cmUsIGxhdGxuZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhmZWF0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgZXZlbnRUeXBlID0gZmVhdHVyZS5wcm9wZXJ0aWVzLmV2ZW50UHJvcGVydGllcy5ldmVudF90eXBlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9mZmljZXNbZmVhdHVyZS5wcm9wZXJ0aWVzLm5hbWVdKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZ2VvanNvbk1hcmtlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDYsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6ICBcIiMxOWIyY2NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM1NTMyODVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlaWdodDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuOSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdldmVudC1pdGVtLXBvcHVwJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTC5jaXJjbGVNYXJrZXIobGF0bG5nLCBnZW9qc29uTWFya2VyT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgb25FYWNoRmVhdHVyZTogKGZlYXR1cmUsIGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvZmZpY2VzW2ZlYXR1cmUucHJvcGVydGllcy5uYW1lXSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIW9mZmljZXNbZmVhdHVyZS5wcm9wZXJ0aWVzLm5hbWVdKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgIGNvbnN0IG9mZmljZSA9IG9mZmljZXNbZmVhdHVyZS5wcm9wZXJ0aWVzLm5hbWVdO1xuICAgICAgICAgICAgICAgICAgaWYgKG9mZmljZSAmJiBmZWF0dXJlLnByb3BlcnRpZXMubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBsYXllci5iaW5kUG9wdXAoYFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3BvcHVwLWl0ZW0nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPiR7b2ZmaWNlWydhZmZpbGlhdGUgZ3JvdXAnXSB8fCBmZWF0dXJlLnByb3BlcnRpZXMubmFtZSArICcgb2ZmaWNlJ308L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PiR7cmVuZGVyTGluayhvZmZpY2UpfSA8YSBocmVmPSdtYWlsdG86JHtvZmZpY2UuZW1haWx9JyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5JyByb2xlPVwiYnV0dG9uXCI+PGkgY2xhc3M9XCJmYSBmYS1lbnZlbG9wZS1vXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBFbWFpbDwvYT48L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXRlcy5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoc3RhdGVzLmdldEJvdW5kcygpKTtcbiAgICAgICAgICB9IC8vZW5kIG9mIGdlb0pzb25cbiAgICAgIH0pO1xuICAgIH07IC8vIGVuZCBvZiBtYXBDZW50cm9pZFxuXG4gICAgZ2V0T2ZmaWNlcygpLnRoZW4obWFwQ2VudHJvaWQpO1xufSkoalF1ZXJ5KTtcbiJdfQ==
