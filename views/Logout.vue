<template>
  <div>Mohon tunggu...</div>
</template>

<script>
export default {
  mounted() {
    localStorage.removeItem('token')
    localStorage.removeItem('full_name')
    this.$router.push({path: '/login'})
  }
};
</script>
