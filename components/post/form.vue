<template>
    <div class="bg-white rounded-xl border-1 border-gray-100 shadow-md p-5 mb-6">
        <div class="flex items-center gap-2 mb-5">
            <div class="bg-black px-1 py-1 border-1 rounded-md">
                <SparklesIcon class="size-3 text-amber-200" />
            </div>
            <span class="text-sm text-gray-600 font-medium">Create a post</span>
        </div>
        <div class="mb-6">
            <textarea v-model="form.content" rows="4" maxlength="500" placeholder="What's happening in your world?" class="w-full resize-none border-1 border-gray-200 placeholder:text-xs text-sm rounded-md p-3 focus:ring-1 focus:ring-indigo-200 outline-none"></textarea>
            <div class="flex justify-between">
                <p class="text-right mr-1 mt-1 text-xs text-gray-400 font-medium">
                    {{ form.content.length }}/500
                </p>
                <p v-if="content_error" class="text-left mr-1 mt-1 text-xs text-red-500 font-medium">
                    'You cannot exceed 500 characters.'
                </p>
            </div>
                
        </div>
        <div class="flex gap-2 items-center mt-3">
            <button class="flex items-center justify-center gap-2 px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer">
                <PhotoIcon class="size-4" />
                <span class="text-xs font-semibold text-gray-600">
                    Photo
                </span>
            </button>
            <button class="flex items-center justify-center gap-2 px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer">
                <VideoCameraIcon class="size-4" />
                <span class="text-xs font-semibold text-gray-600">
                    Video
                </span>
            </button>
        </div>
        <div>
            <button @click="handleSubmit" class="w-full bg-gray-700 text-white mt-4 px-5 py-2 cursor-pointer shadow rounded-md hover:bg-gray-800 text-xs">Share Post</button>
        </div>
    </div>
</template>

<script setup>
    import { SparklesIcon} from '@heroicons/vue/24/solid';
    import { HomeIcon, UserIcon, ArrowLeftStartOnRectangleIcon, PhotoIcon, VideoCameraIcon, HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon  } from '@heroicons/vue/24/outline';
    import non_pf_logo from '@/assets/images/icons/user.png'

    const emit = defineEmits(['created'])

    const form = ref({
        content: '',
    })

    const toast = useToast()

    const { createPost } = usePost()
    const content_error = ref(false)
    const checkLength = () => {
        if (form.content.length > 500) {
            content_error.value = true
            form.content = form.content.slice(0, 500)
        } else {
            error.value = ''
        }
    }

    const handleSubmit =  async() => {
        const { newPost, response } = await createPost(form.value)

        if (response && response.status == 200) {
            emit('created', newPost)
            form.value.content = ''
            toast.success(response.message)
        }
    }

</script>
