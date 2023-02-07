import { createPinia, defineStore } from 'pinia'
import { AvatarOption } from '../types/index';
import { getRandomAvatarOption } from '../utils/index';
import { WrapperShape } from '../enums/index';
import { SCREEN } from '../utils/constant';
export interface State {
    history: {
        past: AvatarOption[],
        present: AvatarOption,
        future: AvatarOption[]
    }
    isSiderCollapsed: boolean
}
const pinia = createPinia();
export const useStore = defineStore('store', {
    state: (): State => ({
        history: {
            past: [],
            present: getRandomAvatarOption({ wrapperShape: WrapperShape.Squircle }),
            future: []
        },
        isSiderCollapsed: window.innerWidth <= SCREEN.lg
    }),
    actions: {
        SET_SIDER_STATUS(newData: boolean) {
            if (this.isSiderCollapsed !== newData) {
                this.isSiderCollapsed = newData
            }
        }
    }
})
export default pinia;