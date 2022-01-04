<template>
  <div class="main">     
    <div class="top__container">
      <h1 class="main__tt">IP Tracker</h1>
      <div class="yow">
        <input v-model="queryIp" class="main__search" type="text" placeholder="track ip">
        <button @click="getIp" class="main__search__btn"><i class="fas fa-search"></i></button>
      </div>
    
     <IPInfo v-if="infoIp" v-bind:infoIp="infoIp"/>
    </div>
   
    <div id="map" class="main__map"></div>
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
        const data = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_XDkDoMWwKKxJoxxhSXdFhtsvajjBe&ipAddress=${queryIp.value}`)

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


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

.main {
  height: 100vh;
  
}

.top__container{

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 15rem;
  position: relative;
}

.yow{
  margin-bottom: 2rem;
}

.top__container .main__tt{
  font-size: 4rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #22D3EE;
}

.main__search{
  width: 30rem;
  height: 3rem;
  margin-right: 2rem;
  border-radius: 5px;
  padding: 0 2em;
  outline: none;
  border: 1px solid #22D3EE;
}

.main__search__btn {

  border: 1px solid #22D3EE;
  padding: 0.7rem 0.8rem;
  border-radius: 10px;
  color: #22D3EE;
}

.main__map{

  height: 80%;
  border: 1px solid #22D3EE;
}

@media screen and (max-width: 688px) {
  .main__search{
      width: 100%;
  }

  .yow{
    display: flex;
  }

  .top__container .main__tt{
    font-size: 3rem;
  }

  .main__map{
    margin-top: 2rem;
  }
}

</style>