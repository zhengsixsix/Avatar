import { computed } from "vue";
import { useStore } from '@/store/index'
import { AvatarOption } from '../types/index';
export default function useAvatarOption() {
    const store = useStore()
    const avatarOption = computed(() => store.history.present)
    const setAvatarOption = (newOption: AvatarOption) => {
        store.SET_AVATAR_OPTION(newOption)
    }
    return [avatarOption, setAvatarOption] as const
}