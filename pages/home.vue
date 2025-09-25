<template>
	<div>
		<PostForm :created="createdPost"/>
		<PostCard v-for="post in posts" :key="post.id" :post="post" @reacted="reactedPost" @commented="commentedPost" />
	</div>
</template>

<script setup>
    definePageMeta({
        layout: 'default'
    })

	const { posts } = storeToRefs(usePostStore());
	const postStore = usePostStore();

	const { getPosts } = await usePost();

	onMounted(() => {
		posts.value = postStore.posts
	});

    const createdPost = (post) => {
        posts.value.unshift(post)
    }

    const reactedPost = (likedPost, id) => {
		postStore.reactedPost(likedPost, id)
	}

	const commentedPost = (commentedPost, id) => {
		postStore.commentedPost(commentedPost, id)
	}

	onMounted(() => {
        postStore.fetchPosts()
        getPosts()
    })
</script>
