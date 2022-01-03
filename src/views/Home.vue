<template>
  <div class="flex justify-center flex-col text-center">
    <h1>IP Tracker</h1>
    <div>
    <input v-model="queryIp" class="border outline-none mr-4" type="text" placeholder="track ip">
    <button @click="getIp" class="border-2 rounded-full">ok</button>
     <IPInfo v-if="infoIp" v-bind:infoIp="infoIp"/>
    </div>
   
    <div id="map" class="h-96"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import IPInfo from "../components/IPInfo.vue"
import leaflet from "leaflet"
import axios from 'axios'
import { onMounted, ref } from "vue"

export default {
  name: 'Home',
  components: {
    IPInfo
  }, 
  setup() {
    let maps;

    const queryIp = ref("")
    const infoIp = ref(null)

    onMounted(() => {
      maps = leaflet.map('map').setView([6.1164, 125.1716], 20);

      leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV5ZGVsc2hpdCIsImEiOiJja3h5YW9zc2syYXJoMnhwY3E2Yms3M3h3In0.bhlwUX6oSYPg9rF28Mxjzg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmV5ZGVsc2hpdCIsImEiOiJja3h5YW9zc2syYXJoMnhwY3E2Yms3M3h3In0.bhlwUX6oSYPg9rF28Mxjzg'
    }).addTo(maps);
    })

    const getIp = async () => {
      try {
        const data = await axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_XDkDoMWwKKxJoxxhSXdFhtsvajjBe&ipAddress=${queryIp.value}`)

        const result = data.data
        infoIp.value = {
          address: result.ip,
          location: result.location.region,
          time: result.location.timezone,
          isp: result.isp,
          lat: result.location.lat,
          lng: result.location.lng
        }

        leaflet.marker([infoIp.value.lat, infoIp.value.lng]).addTo(maps);
        maps.setView([infoIp.value.lat, infoIp.value.lng], 13);
      } catch(err){
        alert(err.message)
      }
    } 
    return { queryIp, infoIp, getIp }
  }
}
</script>
