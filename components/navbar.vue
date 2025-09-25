<template>
    <div>
        <header class="bg-white shadow-md sticky top-0 z-10">
            <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-2">
                        <div class="bg-black px-3 py-1 border-1 rounded-lg">
                            <span class="text-gray-50 text-sm font-bold">S</span>
                        </div>
                        <span class="text-black font-bold">Social</span>
                    </div>
                    <nav class="flex items-center gap-3">
                        <a @click="changeTab('/home')" class="flex items-center gap-2 px-3 py-2 rounded-md" :class="tab == '/home' ? 'bg-gray-900 text-white text-gray-800' : 'text-gray-800'">
                            <HomeIcon class="size-4"/>
                            <span class="text-xs font-bold">Home</span>
                        </a>
                        <a @click="changeTab('/profile')" class="flex items-center gap-2 px-3 py-2 rounded-md" :class="tab == '/profile' ? 'bg-gray-900 text-white text-gray-800' : 'text-gray-800'">
                            <UserIcon class="size-4"/>
                            <span class="text-xs">Profile</span>
                        </a>
                    </nav>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <div class="bg-gray-300 rounded-full p-1">
                            <img :src="non_pf_logo" alt="no-pf" class="w-4"/>
                        </div>
                        <span class="text-xs font-semibold">{{ authStore.authUser.name }}</span>
                    </div>
                    <button @click="logout" class="flex items-center gap-1 cursor-pointer text-sm text-gray-600 hover:text-red-500">
                        <ArrowLeftStartOnRectangleIcon class="size-4 scale-x-[-1]" />
                        <span class="text-xs">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </header>
    </div>
</template>

<script setup>
    import { SparklesIcon} from '@heroicons/vue/24/solid';
    import { HomeIcon, UserIcon, ArrowLeftStartOnRectangleIcon, PhotoIcon, VideoCameraIcon, HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon  } from '@heroicons/vue/24/outline';

    import non_pf_logo from '@/assets/images/icons/user.png'

    const authStore = useAuthStore()
    const { handleLogout } = await useAuth();

    const route = useRoute()
    const tab = ref(route.path)

    const changeTab = (path) => {
        tab.value = path
        navigateTo(path)
    }

    const logout = () => {
        handleLogout()
    }

</script>