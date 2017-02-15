<template lang="jade">
pre.bg-primary {{ $route }}
</template>

<script>
export default {
  beforeMount () {
    this.$router.push('/stories/top/1')
  }
}
</script>
