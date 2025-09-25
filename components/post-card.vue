<template>
    <div class="bg-white rounded-xl border-1 border-gray-100 shadow-md p-5 mb-3">
        <!-- Post header -->
            <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 mb-3">
                <div class="bg-gray-300 rounded-full p-2">
                    <img :src="non_pf_logo" alt="no-pf" class="w-5"/>
                </div>
                <div class="flex flex-col justify-between">
                    <p class="text-sm font-medium">{{ post.author_info.name }}</p>
                    <span class="text-xs text-gray-500">{{ timeAgo(post.post_info.created_at) }}</span>
                </div>
            </div>
            <!-- <button class="mb-2 text-red-500 cursor-pointer">
                <TrashIcon v-if="post.author_info.id == authStore.authUser.id" @click="deletePost(post.post_info.id)" class="size-5" />
            </button> -->
            </div>
        <!-- Post content -->
        <p class="text-gray-500 text-sm mb-3 tracking-wide leading-6">
            {{ post.post_info.content }}
        </p>
        <!-- <img src="https://images.unsplash.com/photo-1598300053380-29886a68259f?auto=format&fit=crop&w=800&q=80" class="rounded-lg" alt="office"> -->

        <!-- Post actions -->
        <div class="flex items-center gap-6 text-sm text-gray-600 mb-5">
            <button class="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                <HeartIcon @click="reactionPost(post.post_info.id)" class="size-4" /> <span class="text-sm">{{ post.reaction_count }}</span>
            </button>
            <button class="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                <ChatBubbleOvalLeftIcon class="size-4" /> <span class="text-sm">{{ post.comment_count }}</span>
            </button>
        </div>

        <!-- Comment input -->
        <div class="flex items-center gap-2">
            <div class="bg-gray-300 rounded-full p-2">
                <img :src="non_pf_logo" alt="no-pf" class="w-5"/>
            </div>
            <input v-model="comment" type="text" placeholder="Write a comment..." class="w-full border border-gray-200 placeholder:text-xs text-sm shadow rounded-lg px-3 py-2 focus:ring-1 focus:ring-indigo-200 outline-none"></input>
            <button @click="commentedPost(post.post_info.id)" class="bg-gray-500 px-2 py-2 rounded-md cursor-pointer hover:bg-gray-700">
                <PaperAirplaneIcon class="size-5 text-gray-50 -rotate-45 mb-1 ml-1" />
            </button>
        </div>

        <!-- Comment -->
        <div class="mt-5" :class="post.comments.length > 3 ? 'h-[200px] overflow-y-scroll' : ''">
            <div v-for="comment in post.comments" :key="comment.id">
                <div class="flex items-start gap-2 mt-3">
                    <div class="bg-gray-300 rounded-full p-2 mt-2 shadow">
                        <img :src="non_pf_logo" alt="no-pf" class="w-4"/>
                    </div>
                    <div class="w-full flex flex-col items-start gap-2 shadow border border-gray-200 rounded-lg px-3 py-3 text-sm">
                        <div class="flex items-center gap-2">
                            <a href="#" class="font-semibold">{{ comment.author_info.name }}</a>
                            <span class="text-xs text-gray-600">{{ timeAgo(comment.created_at) }}</span>
                        </div>
                        <div>
                            <span class="text-sm text-gray-500">
                                {{ comment.content }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, TrashIcon } from '@heroicons/vue/24/outline';
    import non_pf_logo from '@/assets/images/icons/user.png'

    const profileStore = useProfileStore();
    const authStore = useAuthStore();
    const postStore = usePostStore();

    const { commentPost, reactPost } = usePost();

    const comment = ref('');
    
    const emit = defineEmits(['reacted', 'commented']);
    
    const { post } = defineProps({
        post: Object,
    });

    const timeAgo = (date) => {
        const now = new Date()
        const past = new Date(date)
        const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

        if (seconds < 60) return `${seconds}s ago`

        const minutes = Math.floor(seconds / 60)
        if (minutes < 60) return `${minutes}m ago`

        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours}h ago`

        const days = Math.floor(hours / 24)
        return `${days}d ago`
    }

    const reactionPost = (id) => {
        const likedPost = reactPost(id);
        
        emit('reacted', likedPost, id);
    }

    const commentedPost = (id) => {

        const commentedPost = commentPost(id, { content: comment.value });
        
        emit('commented', commentedPost, id); 
        comment.value = '';
    }
</script>
    