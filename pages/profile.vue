<template>
    <ProfileDetails />

    <div class="pl-2">
        <span class="text-sm font-bold text-gray-800">
            Your Posts
        </span>
    </div>

    <ProfileMyPostCard v-for="post in my_posts" :key="post.id" :post="post" @deleted="deletePost" @reacted="reactedPost" @commented="commentedPost" />

</template>

<script setup>
    definePageMeta({
        layout: 'default'
    })

    const { my_posts } = storeToRefs(useProfileStore());
    const profileStore = useProfileStore();

    const { getProfile, getMyPosts } = useProfile();
    
    const deletePost = (id) => {
        my_posts.value = my_posts.value.filter(post => post.post_info.id !== id)
    }

    const reactedPost = (likedPost, id) => {
		profileStore.reactedPost(likedPost, id)
	}

	const commentedPost = (commentedPost, id) => {
		profileStore.commentedPost(commentedPost, id)
	}

    onMounted(() => {
        profileStore.fetchMyPosts()
        getMyPosts()
    })
</script>
