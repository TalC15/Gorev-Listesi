<script  setup  >
import { ref,watch} from "vue";
import { message } from 'ant-design-vue';
import {FormOutlined,DeleteOutlined} from '@ant-design/icons-vue';

const props = defineProps({
  list: Object,
  newItem: String,
});

const emit = defineEmits(['emitList','emitUpdateItem',"emitListChange"])
const degisken = ref(props.list)


function remove(i) {
  const removeIndex = `key${i?.id}`;
  localStorage.removeItem(removeIndex)
  const emitList2 = props?.list.filter((value) => value?.id !== i?.id);
  emit("emitList",emitList2)
}

const change=(i)=>{
  i.description=props.newItem
  const updateIndex = `key${i?.id}`;
  const updatedItem = JSON.stringify({...i,description:props.newItem})
  localStorage.setItem(updateIndex,updatedItem)
  emit('emitUpdateItem',"")
  message.success('Değişiklik yapıldı')
 
};

const cancel = (e) => {
  message.error('Değişiklik yapılmadı');
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

watch(degisken,(newItem, oldItem) => {
  console.log('aaa',degisken,newItem,oldItem)
})

</script>

<template>
  <TransitionGroup tag="ul" name="fade" class="container">
    <li
      :key="karpuz"
      v-for="(i, karpuz) in list"
      :class="i.isCompleted ? 'completedBackStyle item' : 'item'"
    >
      <span :class="i.isCompleted ? 'completed' : ''" @click="ustunuCiz(i)">{{ i?.description }}</span>
      
      <a-popconfirm
      title="Burayı değiştirmek istediğinden emin misin?"
      ok-text="Evet"
      cancel-text="Hayır"
      @confirm="change(i)"
      @cancel="cancel"
      >
      <button class="editButtonStyle" > <FormOutlined/> </button>
        </a-popconfirm>
      <button class="removeButton" @click="remove(i)"> <DeleteOutlined/> </button>
     
    </li>
  </TransitionGroup>
</template>

<style>

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


.editButtonStyle{
  margin-left: auto;
  border-radius: 1cqb;
  margin-right:auto;
  margin-left:5px;
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
