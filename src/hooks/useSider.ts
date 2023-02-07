import { computed } from "vue";
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/index'
export default function useSider() {
    const store = useStore()
    const { isSiderCollapsed } = storeToRefs(store)

    const isCollapsed = computed(() => isSiderCollapsed.value)

    const openSider = () => {
        store.SET_SIDER_STATUS(false)
    }
    const closeSider = () => {
        store.SET_SIDER_STATUS(true)

    }
    return { isCollapsed, openSider, closeSider }
}