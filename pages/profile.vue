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
    import { SparklesIcon} from '@heroicons/vue/24/solid';
    import { HomeIcon, UserIcon, ArrowLeftStartOnRectangleIcon, PhotoIcon, VideoCameraIcon, HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon  } from '@heroicons/vue/24/outline';
    import non_pf_logo from '@/assets/images/icons/user.png'

    definePageMeta({
        layout: 'default'
    })

    const { my_posts } = storeToRefs(useProfileStore());
    const profileStore = useProfileStore();

    const { getProfile, getMyPosts } = useProfile();
    
    const deletePost = (id) => {
        console.log("hello");
        my_posts.value = my_posts.value.filter(post => post.post_info.id !== id)
    }

    const reactedPost = (likedPost, id) => {
		my_posts.value.find(post => post.post_info.id == id).reaction_count = likedPost.reaction_count
	}

	const commentedPost = (commentedPost, id) => {
		my_posts.value.find(post => post.post_info.id == id).comment_count = commentedPost.comment_count
		my_posts.value.find(post => post.post_info.id == id).comments = commentedPost.comments
	}

    onMounted(() => {
        getMyPosts()
    })
</script>
