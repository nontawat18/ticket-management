<template>
  <div  >
    <v-app-bar app elevation="0" color="#fafbfd" height="auto">
      <h1 style="font-weight: bold; color: #3c4166">{{ namePage }}</h1>
      <v-spacer></v-spacer>

        <v-avatar size="40">
          <v-img :src="require('@/assets/images/bogum.jpg')"></v-img>
        </v-avatar>
        <strong style="padding-left: 10px;">Park Bogum</strong>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  props: ["namePage"],
};
</script>
