<script setup lang="ts">
const { slug } = useRoute().params;
const { story } = await useAsyncStoryblok(
  slug && slug.length > 0 ? (slug as string[]).join('/') : 'home',
  {
    api: {
      version: 'draft',
    },
  },
);
</script>

<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
