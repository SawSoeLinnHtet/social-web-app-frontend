<template>
	<div>
		<PostForm :created="createdPost"/>
		<PostCard v-for="post in posts" :key="post.id" :post="post" @reacted="reactedPost" @commented="commentedPost" />
	</div>
</template>

<script setup>
    import PostCard from '~/components/post/card.vue'
    
    definePageMeta({
        layout: 'default'
    })

	const { posts } = storeToRefs(usePostStore());
	const postStore = usePostStore();

	const { getPosts } = usePost();

    const createdPost = (post) => {
        postStore.addPost(post)
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
