<template>
    <div class="bg-white rounded-xl border-1 border-gray-100 shadow-md p-5">
        <div class="flex items-center gap-2 mb-5">
            <span class="text-sm text-gray-800 font-bold">Profile</span>
        </div>
        <div class="flex gap-3">
            <div class="flex items-center gap-4">
                <div class="bg-gray-300 rounded-full p-4">
                    <img :src="non_pf_logo" alt="no-pf" class="w-15"/>
                </div>
                <div class="flex flex-col">
                    <span class="text-lg text-gray-800 font-bold">
                        {{ profile.name }}
                    </span>
                    <span class="text-sm mt-1 text-gray-500">
                        {{ profile.email }}
                    </span>
                    <div class="flex gap-4 mt-3">
                        <div class="flex flex-col items-center">
                            <span class="text-xs font-bold">
                                {{ profile.post_count }}
                            </span>
                            <span class="text-xs text-gray-500">Posts</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-xs font-bold">
                                {{ profile.reaction_count }}
                            </span>
                            <span class="text-xs text-gray-500">Likes</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-xs font-bold">
                                {{ profile.comment_count }}
                            </span>
                            <span class="text-xs text-gray-500">Comments</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import non_pf_logo from '@/assets/images/icons/user.png'

    const { profile } = storeToRefs(useProfileStore());
</script>
    