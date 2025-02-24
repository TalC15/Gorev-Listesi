<script  setup  >
import { ref,watch} from "vue";
import { message } from 'ant-design-vue';
import {FormOutlined,DeleteOutlined} from '@ant-design/icons-vue';

const props = defineProps({
  list: Object,
  newItem: String,
});

const emit = defineEmits(['emitList'])
const editItem= ref("")
const editMode = ref(false)

function remove(i) {
  const removeIndex = `key${i?.id}`;
  localStorage.removeItem(removeIndex)
  const emitList2 = props?.list.filter((value) => value?.id !== i?.id);
  emit("emitList",emitList2)
}

const change=(i)=>{ 

 if(i.editing==true && i.description!==editItem.value){
  i.description = editItem.value
  const editKey = `key${i.id}`
  const editedItem = JSON.stringify({...i,description:editItem.value,editing:false})
  localStorage.setItem(editKey,editedItem)
  i.editing = !i.editing
  editItem.value = ""
  message.success('Değişiklik yapıldı!')
  editMode.value=false
 }
 else if(i.editing==true && i.description==editItem.value){
  i.editing = !i.editing
  editItem.value = ""
  message.warning('Herhangi bir değişiklik yapılmadı!')
  editMode.value=false
 }
 
 else if(editMode.value==false){
   i.editing = !i.editing
   editMode.value = true
 }  

 else{
  message.loading("Aynı anda iki düzenleme yapılamaz!")
 }
};

const cancel = (i) => {
  if(i.editing==true && i.description==i.description){
    i.editing=false
    message.error('Değişiklik yapılmadı!');
    editItem.value = ""
    editMode.value = false
  }
};

function ustunuCiz(i){
  const ustuTiklanan = !i.isCompleted
  const updateIndex = `key${i?.id}`;
  const updatedItem = JSON.stringify({...i,isCompleted:ustuTiklanan})
  localStorage.setItem(updateIndex,updatedItem)
  i.isCompleted=!i.isCompleted

  //const tempDegisken=degisken.value.filter(v=>v.id==i.id)[0]
  //const tempDegisken2=degisken.value.filter(v=>v.id!==i.id)
  //degisken.value=[...tempDegisken2,{...tempDegisken,isCompleted:ustuTiklanan}]
}



</script>

<template>
  <TransitionGroup tag="ul" name="fade" class="container">
    <li :key="index" v-for="(i, index) in list" :class="i.isCompleted ? 'completedBackStyle item' : 'item'">
      <span v-if="!i.editing" :class="i.isCompleted ? 'completed pointer' : 'pointer'" @click="ustunuCiz(i)">{{ i?.description }}</span>
      <input class="editInput" v-else v-model="editItem"/>

      <a-popconfirm 
      :title="i.editing ? 'Burayı değiştirmek istediğinizden emin misiniz?' : 'Buradan verinizi değiştirebilirsiniz.'"
      :ok-text="i.editing ? 'evet' : 'değiştir'"
      :cancel-text="i.editing ? 'Hayır' : 'değiştirme'"
      @confirm="change(i)"
      @cancel="cancel(i)"
      >
      <button class="editButtonStyle"><FormOutlined/></button>
      </a-popconfirm>  
      <button :disabled="i.editing" :class="i.editing ? 'disabledButton removeButton' : 'notDisabledButton removeButton '" @click="remove(i)"> <DeleteOutlined/> </button>
     
    </li>
  </TransitionGroup>
</template>

<style>


.notDisabledButton{
  cursor:pointer;
}

.disabledButton{
  cursor:not-allowed;
}

.editInput{
  border-radius: 1cqb;
  margin-left: -6px;
  border: 1px solid tomato;
}

.completedBackStyle{
  mix-blend-mode: overlay;
}

.completed{
  text-decoration: line-through;
  text-decoration-color:red;
  text-decoration-style:wavy;
  color:#949494;
  mix-blend-mode: overlay;
}

.pointer{
  cursor:pointer;
}

.editButtonStyle{
  margin-left: auto;
  border-radius: 1cqb;
  margin-right:auto;
  margin-left:5px;
  cursor:pointer;
}

.container {
  position: relative;
  padding: 0;
  list-style-type: none;
}

.item {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border: 2px solid tomato;
  background-color: #124942;
  color: white;
  border-radius: 1cqb;
  margin-bottom: 5px;
  padding-left: 5px;
  display: flex;
  font-family: system-ui;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

.removeButton {
  margin-left: auto;
  height: 28px;
  border: 1px solid tomato;
  border-radius: 1cqb;
  margin-top: -1px;
  font-family: cursive;
  color: red;
  font-weight: bold;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>
