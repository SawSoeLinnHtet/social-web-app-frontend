export const useProfile = () => {
    const { token } = storeToRefs(useAuthStore());

    const profileStore = useProfileStore();
    const authStore = useAuthStore();

    const getProfile = async () => {
        authStore.fetchUser();

        profileStore.setProfile(authStore.authUser);
    }

    const getMyPosts = async () => {
        const config = useRuntimeConfig();
        const response = await $fetch(`${config.public.apiURL}my-posts`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });

        if (response && response.status == 200) {
            profileStore.setMyPosts(response.data);
        }
    }

    const deletePost = async (post_id: number) => {
        const config = useRuntimeConfig();
        const response = await $fetch(`${config.public.apiURL}posts/${post_id}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });

        if (response && response.status == 200) {
            profileStore.setMyPosts(profileStore.my_posts.filter(post => post.post_info.id !== post_id))
        }
    }

    const reactPost = async (id: number) => {
        const config = useRuntimeConfig();

        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        } as any
    
        if (token.value) {
            headers["Authorization"] = `Bearer ${token.value}`;
        }

        const data = {
            "type": "like",
        }

        const response = await $fetch(`${config.public.apiURL}posts/${id}/reaction`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: data,
        });

        if (response && response.status == 200) {
            const likedPost = response.data;
            const id = response.data.post_info.id

            profileStore.reactedPost(likedPost, id)
    
            return likedPost
        }
    }

    const commentPost = async (id: number, data: any) => {
        const config = useRuntimeConfig();

        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        } as any
    
        if (token.value) {
            headers["Authorization"] = `Bearer ${token.value}`;
        }

        const response = await $fetch(`${config.public.apiURL}posts/${id}/comment`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: data,
        });

        if (response && response.status == 200) {
            const commentedPost = response.data;
            const id = response.data.post_info.id

            profileStore.commentedPost(commentedPost, id)
    
            return commentedPost
        }
    }

    return {
        getProfile,
        getMyPosts,
        deletePost,
        reactPost,
        commentPost,
    }
}
