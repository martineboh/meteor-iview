<template>
    <div>
        <!-- Native -->
        <!-- <div id="map"></div> -->

        <!-- Vue Googlemaps -->
        <googlemaps-map id="map" :center.sync="center" :zoom.sync="zoom">
        </googlemaps-map>
    </div>
</template>

<script>
export default {
    data() {
        return {
            center: { lat: 13.090618, lng: 103.208516 },
            zoom: 8,
        };
    },
    mounted(){
        // let uluru = {lat: 13.090618, lng: 103.208516};
        // let map = new google.maps.Map(document.getElementById('map'), {
        //   center: uluru,
        //   zoom: 16
        // });
    },
    methods: {
    }
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 500px;
    background-color: grey;
}
</style>