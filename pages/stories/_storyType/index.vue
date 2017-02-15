<template lang="jade">

</template>

<script>
export default {
  beforeCreate () {
    const { $route, $router } = this
    $router.replace($route.path + '/1')
  }
}
</script>
