<template>
  <div class="flex justify-center gap-4 flex-row">
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