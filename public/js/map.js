mapboxgl.accessToken = mapToken ;

console.log(coordinates);

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom
}); 



 // Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({color:"red"})
.setLngLat(coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<p>Exact location provided after booking</p>`
        )
)
.addTo(map);
