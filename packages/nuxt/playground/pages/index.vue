<script setup lang="ts">
const { story, error } = await useAsyncStoryblok('home', {
  api: {
    version: 'draft',
  },
});

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
  });
}
</script>

<template>
  <div>
    <pre>{{ story.slug }}</pre>
    <StoryblokComponent v-if="story && !error" :blok="story.content" />
    <div v-else-if="error">Error: {{ error.message }}</div>
  </div>
</template>
