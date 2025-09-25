<template>
    <ProfileDetails />

    <div class="pl-2">
        <span class="text-sm font-bold text-gray-800">
            Your Posts
        </span>
    </div>

    <ProfileMyPostCard v-for="post in myPosts" :key="post.id" :post="post" @deleted="deletePost" @reacted="reactedPost" @commented="commentedPost" />
</template>

<script setup>
    import { SparklesIcon} from '@heroicons/vue/24/solid';
    import { HomeIcon, UserIcon, ArrowLeftStartOnRectangleIcon, PhotoIcon, VideoCameraIcon, HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon  } from '@heroicons/vue/24/outline';
    import non_pf_logo from '@/assets/images/icons/user.png'

    definePageMeta({
        layout: 'default'
    })

    const myPosts = ref([])
    const posts = ref([])
    const profileStore = useProfileStore();

    const { getProfile, getMyPosts } = useProfile();
    
    const deletePost = (id) => {
        console.log("hello");
        myPosts.value = myPosts.value.filter(post => post.post_info.id !== id)
    }

    const reactedPost = (likedPost, id) => {
		myPosts.value.find(post => post.post_info.id == id).reaction_count = likedPost.reaction_count
	}

	const commentedPost = (commentedPost, id) => {
		myPosts.value.find(post => post.post_info.id == id).comment_count = commentedPost.comment_count
		myPosts.value.find(post => post.post_info.id == id).comments = commentedPost.comments
	}

    onMounted(() => {
        getProfile();
        getMyPosts();

        myPosts.value = profileStore.getMyPosts;
    })
</script>
