import { ComponentBase, EJComponentDecorator, allVue, gh, isExecute } from '@syncfusion/ej2-vue-base';
import * as Vue3 from 'vue-class-component';
import { Options } from 'vue-class-component';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import Vue from 'vue';
// {{VueImport}}

let vueImport: any;
if (!isExecute || parseInt(allVue.version) < 3) {
    vueImport = (Vue3 as any).Vue;
} else {
    vueImport = Vue;
}

@EJComponentDecorator({}, isExecute)
/* Start Options({
    inject: {
        custom: {
            default: null
        }
    }
}) End */

export class CustomCursorsDirective extends vueImport {
    constructor() {
        super(arguments);
    }
    public render(createElement: any): void {
        if (!isExecute) {
            let h: any = !isExecute ? gh : createElement;
            let slots: any = null;
            if(!isNullOrUndefined((this as any).$slots.default)) {
                slots = !isExecute ? (this as any).$slots.default() : (this as any).$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    }
    public updated(): void {
        if (!isExecute && this.custom) {
            this.custom();
        }
    }
    public getTag(): string {
        return 'e-cursormaps';
    }
}
export const CustomCursorsPlugin = {
    name: 'e-cursormaps',
    install(Vue: any) {
        Vue.component(CustomCursorsPlugin.name, CustomCursorsDirective);
    }
}

/**
 * `e-custormaps` directive represent a layers of the vue diagram. 
 * It must be contained in a Diagram component(`ejs-diagram`). 
 * ```vue
 * <ejs-diagram>
 * <e-custormaps>
 * <e-custormap>
 * </e-custormap>
 * </e-custormaps>
</ejs-diagram>
 * ```
 */
@EJComponentDecorator({}, isExecute)
export class CustomCursorDirective extends vueImport {
    public render(): void {
        return;
    }
    public getTag(): string {
        return 'e-cursormap';
    }
}
export const CustomCursorPlugin = {
    name: 'e-cursormap',
    install(Vue: any) {
        Vue.component(CustomCursorPlugin.name, CustomCursorDirective);
    }
}