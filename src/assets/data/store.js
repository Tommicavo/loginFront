import { reactive } from 'vue';

export const store = reactive({
    isLoggedIn: false,
    accountId: -1,
    isLoading: false
});
