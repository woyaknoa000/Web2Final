<template>
  <div>
    <h1 class="text-center">My Game Collection</h1>
    <ListComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListComponent from '@/components/ListComponent.vue'

@Options({
  components: {
    ListComponent
  }
})
export default class HomeView extends Vue {
}
</script>
