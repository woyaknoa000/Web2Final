<template>
    <div>
        <DxButton text="Add Game" @click="showModal"/>
        <DxPopup :visible="modalVisible" @hiding="hideModal" title="Add Game" width="50%" height="400px">
            <DxForm :form-data="formData" ref="addForm">
                <DxSimpleItem editor-type="dxTextBox" data-field="title">
                    <DxRequiredRule message="Game Title Required"/>
                </DxSimpleItem>
                <DxSimpleItem editor-type="dxSelectBox" data-field="console" :editor-options="{items: consoles, searchEnabled: true, searchTimeout: 0}">
                    <DxRequiredRule message="Console Required"/>
                </DxSimpleItem>
                <DxGroupItem :col-count="4">
                    <DxEmptyItem />
                    <DxSimpleItem editor-type="dxCheckBox" data-field="manual"/>
                    <DxSimpleItem editor-type="dxCheckBox" data-field="case"/>
                    <DxEmptyItem />
                </DxGroupItem>
                <DxButtonItem :buttonOptions="{text: 'Add', onClick: submit}"/>
            </DxForm>
        </DxPopup>
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DxPopup from 'devextreme-vue/popup';
import {DxForm, DxGroupItem, DxSimpleItem, DxEmptyItem, DxButtonItem, DxRequiredRule} from 'devextreme-vue/form';
import DxButton from 'devextreme-vue/button';
import { Game } from '@/model/Game';
import dxForm from 'devextreme/ui/form';
import axios from 'axios';
import notify from 'devextreme/ui/notify';

@Options({
    components: {
        DxPopup,
        DxButton,
        DxForm,
        DxGroupItem,
        DxSimpleItem,
        DxEmptyItem,
        DxButtonItem,
        DxRequiredRule
    }
})
export default class AddModal extends Vue {
    public $refs: Vue['$refs'] & {
        addForm?: dxForm
    } = {}

    visible = false;
    formData = {manual: false, case: false} as Game;

    consoles: string[] = ['NES', 'Super Nintendo', 'Nintendo 64', 'Gamecube', 'Wii', 'Wii U', 'Nintendo Switch', 'Gameboy', 'Gameboy Color',
    'Gameboy Advance', 'Nintendo DS', 'Nintendo 3DS', 'Playstation', 'Playtstation 2', 'Playstation 3', 'Playstation 4', 'Playstation 5',
    'PSP', 'PS Vita', 'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series', 'Sega Master System', 'Sega Genesis', 'Sega Saturn', 'Sega Dreamcast', 'Atari 2600'];

    get modalVisible(): boolean {
        return this.visible;
    }

    get addForm(): dxForm {
        return this.$refs.addForm?.instance as unknown as dxForm;
    }

    submit(): void {
        let result = this.addForm.validate();
        if (result.status == 'valid'){
            axios.post('http://localhost:3000/api/Games', this.formData).then((response) => {
                this.$emit('refresh');
                this.hideModal();
            }).catch((error) => {
                notify(error.response.data, 'error');
            })
        }
    }
    
    showModal(): void {
        this.visible = true;
    }

    hideModal(): void {
        this.visible = false;
        this.formData = {manual: false, case: false} as Game;
    }
}
</script>
  