<script setup>
import {RouterLink} from 'vue-router'
import Vue_header from '../components/header.vue'
import Vue_footer from '../components/footer.vue'
</script>


<template>
    <div class="body_vue">
        <div class="content_vue ">
            <Vue_header></Vue_header>
        </div>
          <footer class="footer_vue">
              <Vue_footer></Vue_footer>
          </footer>
    </div>

</template>
<style scoped>
.body_vue{
  border: 0px solid red;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content_vue {
  flex: 1;
}
.footer_vue{
  background-color: #c9ae45;
  color: #fff;
  text-align: center;
  padding: 20px;
  
}
</style>