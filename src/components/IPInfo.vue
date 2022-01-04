<template>
  <div class="main__result">
      <div>
          <h3>IP Address</h3>
          <span>{{ infoIp.address }}</span>
      </div>
       <div>
          <h3>Location</h3>
          <span>{{ infoIp.location }}</span>
      </div>
       <div>
          <h3>Time Zone</h3>
          <span>{{ infoIp.time }}</span>
      </div>
       <div>
          <h3>ISP</h3>
          <span>{{ infoIp.isp }}</span>
      </div>
  </div>
</template>

<script>
export default {
    props: ['infoIp']
}
</script>

<style scoped>
.main__result{

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 50rem;
    height: 5rem;
    border: 1px solid #22D3EE;
    background: #22D3EE;
    border-radius: 5px;
    z-index: 9999;
    position: absolute;
    bottom: -2rem;
}

span{
    font-weight: bold;
}


@media screen and (max-width: 688px) {
    .main__result{
        width: 100%;
        bottom: -5rem;
        margin-bottom: 2rem;
    }
}
</style>