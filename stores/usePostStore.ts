import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [],
    }),

    getters: {
        getPosts: (state) => state.posts,
    },

    actions: {
        setPosts(posts: any) {
            this.posts = posts;
        },
        addPost(post: any) {
            this.posts.unshift(post)
        },
        reactedPost(reactedPost: any, id: number) {
            this.posts.find(post => post.post_info.id == id).reaction_count = reactedPost.reaction_count
        },
        commentedPost(commentedPost: any, id: number) {
            this.posts.find(post => post.post_info.id == id).comment_count = commentedPost.comment_count
            this.posts.find(post => post.post_info.id == id).comments = commentedPost.comments
        },
        async fetchPosts() {
            const config = useRuntimeConfig();
            const token = useAuthStore().token;
            const { data: response, error } = await useFetch(`${config.public.apiURL}posts`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            this.setPosts(response.value.data);
        }
    },
})