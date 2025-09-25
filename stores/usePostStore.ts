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
        deletePost(post_id: number) {
            this.setPosts(this.posts.filter((post : any) => post.post_info.id !== post_id))
        },
        getSinglePost(post_id: number) {
            return this.posts.find((post : any) => post.post_info.id == post_id)
        },
        reactedPost(reactedPost: any, id: number) {
            const post = this.getSinglePost(id);
            if (post) {
                post.reaction_count = reactedPost.reaction_count;
                post.user_liked = reactedPost.user_liked;
            }
            return this.getPosts;
        },
        commentedPost(commentedPost: any, id: number) {
            const post = this.getSinglePost(id);
            if (post) {
                post.comment_count = commentedPost.comment_count;
                post.comments = commentedPost.comments;
            }
            return this.getPosts;
        },
        async fetchPosts() {
            const config = useRuntimeConfig();
            const token = useAuthStore().token;
            const response = await $fetch(`${config.public.apiURL}posts`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            this.setPosts(response.data);
        }
    },
})