import Vue from 'vue'
import moment from 'moment'

Vue.filter('fromNow', time => moment(time * 1000).fromNow())
