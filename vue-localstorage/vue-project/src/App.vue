<script setup>
import {ref,onUnmounted,onMounted} from 'vue'
import Todo from './Todo.vue'
import Child from './child.vue'
import {PlusOutlined,DownOutlined,RightOutlined,SmallDashOutlined,ExclamationCircleOutlined} from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue';
import { h } from 'vue';
//sortBy(list, (a) => a.id)

const degisken = ref(true)
const listShow=ref(true)

const list=ref([
  ...(Object.entries(localStorage).filter(x=>!x[0].includes('vue')).map(a=>a[0]).map(b=>localStorage.getItem(b)).map(x=>JSON.parse(x)))
])
const newItem= ref('')

function addItem(){
  const newId=Date.now()
  list.value.push({id:newId,description:newItem.value,isCompleted:false})
  localStorage.setItem(`key${newId}`,`${JSON.stringify({id:newId,description:newItem.value,isCompleted:false})}`)
  newItem.value=""



}

function caughtEmittedList(e){
  list.value=e
}

const showDeleteConfirm = () => {
  Modal.confirm({
    title: 'Hepsini silmek istediğine emin misin?',
    icon: h(ExclamationCircleOutlined),
    content: 'bak bu işin dönüşü yok',
    okText: 'evet',
    okType: 'danger',
    cancelText: 'hayır',
    onOk() {
      list.value=[]
      localStorage.clear()

      Modal.success({
    title: 'Tüm veriler silinmiştir',
    content: h('div', {}, []),
   });

    },
    onCancel() {
      
    },
  });
};


</script>

<template>

<div class="bigDiv">
 <div  class="divBox1">
   
    <div v-if="listShow==true">
      <h3 class="h3Style"><a-button class="listShowButton" shape="circle" @click="listShow=!listShow"><DownOutlined/></a-button>Yapılacaklar Listesi</h3>
     <Todo :list="list" @emitList="(e)=>caughtEmittedList(e)" :newItem="newItem" @emitUpdateItem="(e)=>newItem=e"/>
    </div>
    <div v-else>
      <h3 class="h3Style"><a-button class="listShowButton" shape="circle" @click="listShow=!listShow"><RightOutlined/></a-button>Yapılacaklar Listesi</h3>
       <div v-if="list.length==0"> 

       </div>
       <div v-else>
         <h3 style="margin-left:10px"><SmallDashOutlined/></h3>
       </div>
    </div>
 </div>
    
 <div  class="divBox2">
   <a-input placeholder="buraya yazınız"  @keyup.enter="addItem"  v-model:value="newItem" show-count :maxlength="20" />
   <div>
     <button class="buttonStyle" @click="addItem"><PlusOutlined/></button>
     <a-button class="allDeleteButton" type="dashed" @click="showDeleteConfirm">Hepsini Sil</a-button>
   </div>  
 </div>
</div>




<div v-if="degisken">
  <Child></Child>
</div>

<button class="button" @click="degisken=!degisken">{{ degisken ? "gizle" : "göster" }}</button>

</template>

<style>

.button{
  position:fixed;
  top : 0;
  left : 0;
  
}


.listShowButton{
  border: none;
  background: #181818;
  color:unset;
}

.allDeleteButton{
  padding:0px;
  padding-left:5px;
  padding-right:5px;
  margin-left:10px;
  height:24px;
}

.bigDiv{
  display:flex;
}


.h3Style{
  margin-bottom:10px;
}

.divBox1{
  border: 1px solid tomato;
  border-style: dotted;
  padding: 7px;
  border-radius: 1cqb;
}

.divBox2{
  margin-left:30px;
}

.buttonStyle{
  margin-top: 15px;
  width: 50px;
  font-family: cursive;
  border-radius: 1cqb;
}

</style>