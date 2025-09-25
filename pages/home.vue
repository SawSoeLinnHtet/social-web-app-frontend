<template>
	<div>
		<PostForm :created="createdPost"/>
		<PostCard v-for="post in posts" :key="post.id" :post="post" :reacted="reactedPost" :commented="commentedPost" />
	</div>
</template>

<script setup>
    definePageMeta({
        layout: 'default'
    })

	const posts = ref();
	const postStore = usePostStore();

	const { getPosts } = await usePost();

	onMounted(() => {
		getPosts()

		posts.value = postStore.getPosts

		console.log(posts.value)
	});

    const createdPost = (post) => {
        posts.value.unshift(post)

		console.log(posts.value)
    }

    const reactedPost = (likedPost) => {
		posts.value.find(post => post.post_info.id == likedPost['post_info'].id).reaction_count = likedPost['reaction_count']
	}

	const commentedPost = (commentedPost) => {
		posts.value.find(post => post.post_info.id == commentedPost['post_info'].id).comment_count = commentedPost['comment_count']
		posts.value.find(post => post.post_info.id == commentedPost['post_info'].id).comments = commentedPost['comments']
	}
</script>
