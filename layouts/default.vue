<template>
    <div>
        <Navbar />

        <!-- Main content -->
        <main class="max-w-2xl mx-auto mt-6 mb-6 space-y-6">
            <slot />
        </main>
    </div>
</template>

<script setup>
    import { SparklesIcon} from '@heroicons/vue/24/solid';
    import { HomeIcon, UserIcon, ArrowLeftStartOnRectangleIcon, PhotoIcon, VideoCameraIcon, HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon  } from '@heroicons/vue/24/outline';

    import non_pf_logo from '@/assets/images/icons/user.png'

    const authStore = useAuthStore();
    authStore.token = useCookie('access-token').value; // or wherever your token is
    authStore.fetchUser();

    const profileStore = useProfileStore();
    profileStore.fetchMyPosts();

    const postStore = usePostStore();
    postStore.fetchPosts();
    
</script>