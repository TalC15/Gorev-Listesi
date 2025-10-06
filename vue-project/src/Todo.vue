<script setup >
import {ref,h} from 'vue'
import Todo2 from './Todo2.vue'
import {PlusOutlined,DownOutlined,RightOutlined,SmallDashOutlined,SettingOutlined,ExclamationCircleOutlined,BulbTwoTone,AlertTwoTone} from '@ant-design/icons-vue'
import {Modal} from 'ant-design-vue';
import { RouterLink } from 'vue-router';
import {globalDegiskenler} from './store/degiskenler'
import {storeToRefs} from 'pinia'
//sortBy(list, (a) => a.id)

const listShow = ref(true)
const newItem = ref('')
const checked = ref(false)
const {isDark} = storeToRefs(globalDegiskenler()) 
const settingsOpen = ref(false)
const list=ref([
  ...(Object.entries(localStorage).filter(x=>!x[0].includes('v')).map(a=>a[0]).map(b=>localStorage.getItem(b)).map(x=>JSON.parse(x)))
])
const gorevSayaci = Object.entries(localStorage).filter(x=>!x[0].includes('v')).map(a=>a[0]).map(b=>localStorage.getItem(b)).map(x=>JSON.parse(x)).filter(x=>x.isCompleted===true).length
console.log('gorev',gorevSayaci)


function addItem(){
  const newId=Date.now()
  list.value.push({id:newId,description:newItem.value,isCompleted:false,editing:false})
  localStorage.setItem(`key${newId}`,`${JSON.stringify({id:newId,description:newItem.value,isCompleted:false,editing:false})}`)
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

function reload(){
  window.location.reload()
}

function backgroundMode(){
  isDark.value = !isDark.value
}

</script>

<template>
<div id="bigDiv" :class="{'lightMode':isDark}">
  
  <div id="headDiv">
    <h2 @click="reload" class="baslik">TODO</h2>
  <div> 
      <a-switch @click="backgroundMode"  v-model:checked="checked" style="margin-left: 1310px; margin-top: 13px;">
        <template #checkedChildren><font-awesome-icon icon="sun"/></template>
        <template #unCheckedChildren><font-awesome-icon :icon="['fas', 'moon']" /></template>
      </a-switch>
  </div>
    <button @click="settingsOpen = !settingsOpen" :class="settingsOpen ? 'settings-button settings-button-animation-open' : 'settings-button settigs-button-animation-close'"> <SettingOutlined/></button>
    
  </div>


  <div id="bodyDiv">
    <div  class="divBox1">
   
      <div v-if="listShow==true">
        <h3 class="h3Style"><a-button class="listShowButton" shape="circle" @click="listShow=!listShow"><DownOutlined/></a-button>Yapılacaklar Listesi</h3>
      <Todo2 :list="list" @emitList="(e)=>caughtEmittedList(e)" :newItem="newItem"/>
      </div>
      <div v-else>
        <h3 class="h3Style"><a-button class="listShowButton" shape="circle" @click="listShow=!listShow"><RightOutlined/></a-button>Yapılacaklar Listesi</h3>
      <div v-if="list.length==0"> 

      </div>
       <div v-else>
         <h3 class="h3Style" style="margin-left:10px">...</h3>
       </div>
      </div>
    </div>
    
    <div  class="divBox2">
      <a-input class="input" placeholder="buraya yazınız"  @keyup.enter="addItem"  v-model:value="newItem" show-count :maxlength="50" />
      <div>
      <button class="buttonStyle" @click="addItem"><PlusOutlined/></button>
      <a-button :disabled="list.map(x=>x.editing).includes(true)" class="allDeleteButton" type="dashed" @click="showDeleteConfirm">Hepsini Sil</a-button>
      </div>  
      </div>
  </div>

  
</div>
<span class="divBox3">
   
   <ul v-if="settingsOpen" class="routerList">
     <li><RouterLink class="routerStyle" to="/Gorev-Cubugu">Görev Çubuğu</RouterLink> </li>
   </ul>
      
  </span>
</template>
<style>

body{
  background-color:#181818;
}

.lightMode{
  background-color:#ffffff;
  .h3Style{
    color:#181818;
  }
  .listShowButton{
    background-color:#ffffff;
  }
  
}

#bigDiv{
  height:100vh;
  margin:-8px;
}

.settings-button{
  position: absolute;
  right: 10px;
  top: 8px;
  background-color: #483D8B;
  border: none;
  font-size: 30px;
  cursor: pointer;
  height: 32px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
}

.settings-button-animation-open{
  animation-name: settings-open;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

.settigs-button-animation-close{
  animation-name: settings-close;
  animation-duration:1s;
  animation-fill-mode: backwards;
}

@keyframes settings-open {
  from {transform: rotate(0deg);}
  to {transform:rotate(90deg);}
}

@keyframes settings-close {
  from {transform: rotate(90deg);}
  to {transform: rotate(0deg);}
}

.baslik{
  align-items: center;
  font-family: cursive;
  font-weight: 900;
  display: inline-block;
  color:cornsilk;
  margin-top:8px;
  margin-left:15px;
  animation-name:title;
  animation-duration: 15s;
  animation-delay:2s;
  animation-iteration-count:infinite;
  position:relative;
  cursor:pointer;
}

@keyframes title{
 0% {color:cornsilk;}
 20% {color:aquamarine;}
 40% {color:blueviolet;}
 60% {color:cadetblue;}
 80% {color:cornflowerblue;}
 100% {color:antiquewhite;}
}

#headDiv{
  width: 1536px;
  background-color: darkslateblue;
  height: 50px;
  display:flex;
  align-items: normal;
}



.iconStyle{
  height:100px;
  width:200px;
}

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

#bodyDiv{
  display:flex;
  margin-top:125px;
  justify-content:center;
}


.h3Style{
  margin-bottom:10px;
  color:white;
  font-family:cursive;
}

.divBox1{
  border: 1px solid tomato;
  border-style: dotted;
  padding: 7px;
  border-radius: 1cqb;
  display:inline-block;
}

.divBox2{
  margin-left:30px;
}

.buttonStyle{
  margin-top: 15px;
  width: 50px;
  font-family: cursive;
  border-radius: 1cqb;
  cursor:pointer;
}

.routerStyle{
  color: white;
  text-decoration: none !important;
  background: none !important;
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
  
}

.divBox3{
  display: flex;
  justify-content: right;
}

.routerList{
  width: 100px;
  margin-top: -653px;
  height: 100px;
  margin-right: -8px;
  border-radius: 2cqb;
  padding-top: 8px;
  background: #483D8B;
  list-style-type: none;
  font-family: math;
  border-top-left-radius: 0cqb;
  border-top-right-radius: 0cqb;
}

</style>