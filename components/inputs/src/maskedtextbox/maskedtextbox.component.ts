import { Options } from 'vue-class-component';
import { isUndefined } from '@syncfusion/ej2-base';
import { ComponentBase, EJComponentDecorator, getProps, allVue, gh } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined, getValue } from '@syncfusion/ej2-base';

import { MaskedTextBox } from '@syncfusion/ej2-inputs';


// {{VueImport}}
export const properties: string[] = ['cssClass', 'customCharacters', 'enablePersistence', 'enableRtl', 'enabled', 'floatLabelType', 'htmlAttributes', 'locale', 'mask', 'placeholder', 'promptChar', 'readonly', 'showClearButton', 'value', 'width', 'blur', 'change', 'created', 'destroyed', 'focus'];
export const modelProps: string[] = ['value'];

export const testProp: any = getProps({props: properties});
export const props = testProp[0];
export const watch = testProp[1];

export const emitProbs: any = Object.keys(watch);
emitProbs.push('modelchanged');
for (let props of modelProps) {
    emitProbs.push(
        'update:'+props
    );
}

export const isExecute: any = gh ? false : true;

/**
 * Represents the Essential JS 2 VueJS MaskedTextBox Component
 * ```html
 * <ejs-maskedtextbox v-bind:value='value'></ejs-maskedtextbox>
 * ```
 */
@EJComponentDecorator({
    props: properties,
    model: {
        event: 'modelchanged'
    }
},isExecute)

/* Start Options({
    props: props,
    watch: watch,
    emits: emitProbs
}) End */

export class MaskedTextBoxComponent extends ComponentBase {
    
    public ej2Instances: any;
    public propKeys: string[] = properties;
    public models: string[] = modelProps;
    public hasChildDirective: boolean = false;
    protected hasInjectedModules: boolean = false;
    public tagMapper: { [key: string]: Object } = {};
    public tagNameMapper: Object = {};
    public isVue3: boolean;
    public templateCollection: any;
    constructor() {
        super(arguments);
        this.isVue3 = !isExecute;
        this.ej2Instances = new MaskedTextBox({});        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;

        this.bindProperties();
        this.ej2Instances._setProperties = this.ej2Instances.setProperties;
        this.ej2Instances.setProperties = this.setProperties;
        this.ej2Instances.clearTemplate = this.clearTemplate;
    }

 public clearTemplate(templateNames?: string[]): any {
    if (!templateNames){
       templateNames = Object.keys(this.templateCollection || {});
    }
    if (templateNames.length &&  this.templateCollection) {
    for (let tempName of templateNames){
       let elementCollection: any = this.templateCollection[tempName];
       if(elementCollection && elementCollection.length) {
       for(let ele of elementCollection) {
           let destroy: any = getValue('__vue__.$destroy', ele);
           if (destroy) {
               ele.__vue__.$destroy();
           }
           if (ele.innerHTML){
               ele.innerHTML = '';
           }
       }
       delete this.templateCollection[tempName];
       }
    }
}
 }



    public setProperties(prop: any, muteOnChange: boolean): void {
        if(this.isVue3) {
            this.models = !this.models ? this.ej2Instances.referModels : this.models;
        }
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && this.models.length) {
            Object.keys(prop).map((key: string): void => {
                this.models.map((model: string): void => {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        if (this.isVue3) {
                            this.ej2Instances.vueInstance.$emit('update:' + key, prop[key]);
                        } else {
                            (this as any).$emit('update:' + key, prop[key]);
                            (this as any).$emit('modelchanged', prop[key]);
                        }
                    }
                });
            });
        }
    }
    public trigger(eventName: string, eventProp: {[key:string]:Object}, successHandler?: Function): void {
        if(!isExecute) {
            this.models = !this.models ? this.ej2Instances.referModels : this.models;
        }
        if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
            let key: string[] = this.models.toString().match(/checked|value/) || [];
            let propKey: string = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                if (!isExecute) {
                    this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                    this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                } else {
                    (this as any).$emit('update:'+ propKey, eventProp[propKey]);
                    (this as any).$emit('modelchanged', eventProp[propKey]);
                }
            }
        } else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
            let key: string[] = this.models.toString().match(/currentView|selectedDate/) || [];
            let propKey: string = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                if (!isExecute) {
                    this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                    this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                } else {
                    (this as any).$emit('update:'+ propKey, eventProp[propKey]);
                    (this as any).$emit('modelchanged', eventProp[propKey]);
                }
            }
        }
        if ((this.ej2Instances && this.ej2Instances._trigger)) {
            this.ej2Instances._trigger(eventName, eventProp, successHandler); 
        }
    }

    public render(createElement: any) {
        let h: any = gh || createElement;
        let slots: any = null;
        if(!isNullOrUndefined((this as any).$slots.default)) {
            slots = gh ? (this as any).$slots.default() : (this as any).$slots.default;
        }
        return h('input', slots);
    }
    
    public focusIn(): void {
        return this.ej2Instances.focusIn();
    }

    public focusOut(): void {
        return this.ej2Instances.focusOut();
    }

    public getMaskedValue(): string {
        return this.ej2Instances.getMaskedValue();
    }
}

export const MaskedTextBoxPlugin = {
    name: 'ejs-maskedtextbox',
    install(Vue: any) {
        Vue.component(MaskedTextBoxPlugin.name, MaskedTextBoxComponent);

    }
}
