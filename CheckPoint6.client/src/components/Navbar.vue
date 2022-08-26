<template>

  <div class=" row bg-dark px-3 d-flex justify-content-between text-center">

<div class="col-md-2 my-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="https://th.bing.com/th/id/OIP.qO-F72CwmSsf4EgadJ5mrQHaEK?w=314&h=180&c=7&r=0&o=5&pid=1.7"
          height="45" />
      </div>
    </router-link>
</div>
<div class="col-md-8 my-3">
 <h1>EVENT CENTER</h1>
</div>
<div class="col-md-2 my-3">
<div class="">
      <Login />
    </div>
</div>




  
   

    

  </div>

</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
