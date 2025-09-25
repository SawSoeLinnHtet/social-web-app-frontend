import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {

    state: () => ({
        profile: ref({}),
        my_posts: ref([]),
    }),

    getters: {
        getProfile: (state) => state.profile,
        getMyPosts: (state) => state.my_posts,
    },

    actions: {
        setProfile(profile: any) {
            this.profile = profile;
        },
        setMyPosts(my_posts: any) {
            this.my_posts = my_posts;
        },
        addPost(post: any) {
            this.my_posts.unshift(post)
        },
        reactedPost(reactedPost: any, id: number) {
            this.my_posts.find(post => post.post_info.id == id).reaction_count = reactedPost['reaction_count']

            return this.getMyPosts
        },
        commentedPost(commentedPost: any, id: number) {
            this.my_posts.find(post => post.post_info.id == id).comment_count = commentedPost['comment_count']
            this.my_posts.find(post => post.post_info.id == id).comments = commentedPost['comments']

            return this.getMyPosts
        },
        async fetchProfile() {
            const config = useRuntimeConfig();
            const token = useAuthStore().token;
            const response = await $fetch(`${config.public.apiURL}profile`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            this.setProfile(response.data);
        },
        async fetchMyPosts() {
            const config = useRuntimeConfig();
            const token = useAuthStore().token;
            const response = await $fetch(`${config.public.apiURL}my-posts`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            this.setMyPosts(response.data);
        },
    },
})