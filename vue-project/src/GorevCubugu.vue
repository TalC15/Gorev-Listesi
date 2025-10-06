<script setup>
import {ref} from 'vue';
import {DownOutlined,RightOutlined,CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons-vue'
import {globalDegiskenler} from './store/degiskenler'
import {storeToRefs} from 'pinia'
const list = ref(Object.entries(localStorage).filter(x=>!x[0].includes('v')).map(a=>a[0]).map(b=>localStorage.getItem(b)).map(x=>JSON.parse(x)))
const gorevSayaci = ref(Object.entries(localStorage).filter(x=>!x[0].includes('v')).map(a=>a[0]).map(b=>localStorage.getItem(b)).map(x=>JSON.parse(x)).filter(x=>x.isCompleted===true).length)
const gorevSayisi = ref(Object.entries(localStorage).filter(x=>!x[0].includes('v')).map(a=>a[0]).map(b=>localStorage.getItem(b)).map(x=>JSON.parse(x)).length)
const sayi = 100/gorevSayisi.value
const defaultPercent = gorevSayaci.value*sayi
const status = ref('active');
const tamamlananGorevlerGoster = ref(false)
const {isDark} = storeToRefs(globalDegiskenler())
</script>

<template>
<div id="biggestDiv" :class="{'lightMod' : isDark }">  
  <div id="Div1">
      <a-progress type="circle" 
        :percent="parseFloat(defaultPercent.toFixed(1))"
        :status="status"
        :stroke-color="{
          '0%': '#108ee9',
          '100%': '#87d068',
        }"
        class="progressStyle"
      />
    <div class="tamamlanan-gorev-list" v-if="tamamlananGorevlerGoster">
        <span class="sayac words-light-mod"><a-button class="button-dark-mod button-light-mod" @click="tamamlananGorevlerGoster = !tamamlananGorevlerGoster" shape="circle" ><DownOutlined/></a-button>{{ gorevSayaci }} Görev Tamamlandı</span>

      <div>
          <ul class="tamamlanan-gorevler list-light-mod">
            <li :class="item.isCompleted ? 'item-style item-color-true item-light-mod' : 'item-style item-color-false item-light-mod' " v-for="item of list">
              <span  v-if="item.isCompleted === true"><CheckCircleOutlined/></span>
              <span  v-if="item.isCompleted === false"><CloseCircleOutlined/></span>
              {{ item.description }}</li>
          </ul>
      </div>
    </div>
  
    <div class="tamamlanan-gorev-list-else" v-else-if="tamamlananGorevlerGoster===false">
      <span class="sayac words-light-mod"><a-button class="button-dark-mod button-light-mod" @click="tamamlananGorevlerGoster = !tamamlananGorevlerGoster" shape="circle"><RightOutlined/></a-button>{{ gorevSayaci }} Görev Tamamlandı</span>
    </div>
  </div> 
</div>  
</template>

<style>

#biggestDiv{
  height:95vh;
  padding-left: 30px;
  padding-top: 35px;
  margin: -8px;
}

.lightMod{
  background-color: #ffffff;
  .words-light-mod{
    color:#181818;    
  }
  .button-light-mod{
   color:#181818;
   background-color: #ffffff;
   border-color:#ffffff;
  }
  .list-light-mod{
    border-color:#181818;
  }
  .item-light-mod{
    border-color:#181818;
  }
}

.sayac{
  align-items:center;
  gap:10px;
  color:white;
  margin-left:180px;
  font-family:fantasy;
  font-size:35px;
  display:flex;
  margin-top:-80px;
}

.progressStyle{
    background-color: white;
    border-radius: 16cqb;
}

.tamamlanan-gorevler{
  color: wheat;
  margin-left: 195px;
  font-size: 20px;
  border: 2px white solid;
  width: 262px;
  list-style-type: none;
  font-family:monospace;
}

.item-style{
  border: 1px solid white;
  margin: 6px;
  margin-left: -34px;
  overflow-wrap:anywhere;
  display:flex;
  gap:4px;
  line-height:1.2;
}

.item-color-true{
  background-color: #2f832f; 
}

.item-color-false{
  background-color: #9c0000;
}

.button-dark-mod{
  color:#ffffff;
  background-color: #181818;
  border-color:#181818;
}
</style>