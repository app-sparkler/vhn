<template lang="jade">

div.text-center
  nav(style="background-color:white")
    ul.pagination
      
      // PREVIOUS BUTTON
      li(:class="{disabled: ($route.params.pageNo <= 1) }")
        router-link(:to="($route.params.pageNo > 1) ?  routePrefix  + (+$route.params.pageNo - 1) : $route.path ")
          | &laquo;
      
      // PAGE NAVIGATION
      li(v-for="n in 9", :class="{active:(n - 5 + +$route.params.pageNo == $route.params.pageNo)}")
        router-link(
        @click.native="pageClicked"
        v-bind:to=" routePrefix + (n - 5 + +$route.params.pageNo) ",
        v-show="(n - 5 + +$route.params.pageNo > 0) && (n - 5 + +$route.params.pageNo <= maxPage)")
          | {{ n - 5 + +$route.params.pageNo }}
      
      // NEXT BUTTON
      li(:class="{disabled: ($route.params.pageNo == maxPage) }")
        router-link(:to=" $route.params.pageNo < maxPage ? routePrefix + (+$route.params.pageNo + 1) : $route.path ")
          | &raquo;
        
</template> 

<script>
  export default {
    name: 'bs-pagination',
    props: [ 'maxPage', 'routePrefix' ],
    methods: {
      pageClicked (evt) {
        evt.target.blur()
      }
    }
  }
</script>
