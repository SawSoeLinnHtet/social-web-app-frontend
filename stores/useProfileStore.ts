import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {

    state: () => ({
        profile: {},
        my_posts: [],
    }),

    getters: {
        getProfile: (state) => state.profile,
        getMyPosts: (state) => state.my_posts,
    },

    actions: {
        setProfile(profile: any) {
            this.profile = profile
        },
        setMyPosts(my_posts: any) {
            this.my_posts = my_posts
        },
        addPost(post: any) {
            this.my_posts.unshift(post)
        },
        deletePost(post_id: number) {
            this.setMyPosts(this.my_posts.filter((post: any) => post.post_info.id !== post_id))
        },
        getSinglePost(post_id: number) {
            return this.my_posts.find((post : any) => post.post_info.id == post_id)
        },
        reactedPost(reactedPost: any, id: number) {
            const post = this.getSinglePost(id);
            if (post) {
                post.reaction_count = reactedPost.reaction_count;
                post.user_liked = reactedPost.user_liked;
            }
            return this.getMyPosts;
        },
        commentedPost(commentedPost: any, id: number) {
            const post = this.getSinglePost(id);
            if (post) {
                post.comment_count = commentedPost.comment_count;
                post.comments = commentedPost.comments;
            }
            return this.getMyPosts;
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