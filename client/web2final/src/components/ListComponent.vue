<template>
    <div>
        <AddModal @refresh="getData" class="margin-top"/>
        <DxList width="60%" class="margin-top" :data-source="games" :allow-item-deleting="true" @item-deleting="deleteItem"
        @itemClick="detailsModal" :searchEnabled="true" :searchExpr="['title', 'console']">
            <template #item="{data}">
                <div>
                    <div>{{data.title}}</div>
                    <div>{{data.console}}</div>
                </div>
            </template>
        </DxList>
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {DxList} from 'devextreme-vue/list';
import DxButton from 'devextreme-vue/button';
import { Game } from '@/model/Game';
import AddModal from './AddModal.vue';
import axios from 'axios'
import { ItemDeletingEvent } from 'devextreme/ui/list';
import {confirm} from 'devextreme/ui/dialog';

@Options({
    components: {
        DxList,
        DxButton,
        AddModal
    }
})

export default class ListComponent extends Vue {
    games: Game[] = [];

    getData(): void {
        axios.get("http://localhost:3000/api/Games").then((response) => {
            this.games = response.data
        })
    }

    mounted(): void {
        this.getData();
    }

    deleteItem(e: ItemDeletingEvent): void {
        e.cancel = true;
        let result = confirm(`Are you sure you want to remove ${e.itemData.title}?`, "Confirm Item Delete");
        result.then((result) => {
            if (result){
                axios.delete(`http://localhost:3000/api/Games/${e.itemData._id}`).then(() => {
                    this.getData();
                });
            }
        })
    }
}
</script>

<style lang="scss">
.margin-top {
    margin-top: 20px !important;
}
</style>