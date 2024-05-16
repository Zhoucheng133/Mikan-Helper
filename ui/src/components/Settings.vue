<template>
  <div class="form">
    <a-form :model="stores().formData" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="运行状态">
        <a-tag :color="stores().running?'green':'orange'">{{ stores().running?"运行中":"等待中" }}</a-tag>
        <a-switch style="margin-left: 10px;" v-model:checked="stores().running" @change="stores().toggleRun" />
      </a-form-item>
      <a-form-item label="运行模式">
        <a-radio-group v-model:value="stores().formData.subscribemode" style="user-select: none;" :disabled="stores().running">
          <a-radio-button :value="true">使用订阅模式</a-radio-button>
          <a-radio-button :value="false">使用列表模式</a-radio-button>
        </a-radio-group>
        <a-tooltip placement="bottomLeft" :title="modeTip" arrow-point-at-center>
          <a-button :icon="h(QuestionOutlined)" type="text" style="margin-left: 10px;"></a-button>
        </a-tooltip>
      </a-form-item>
      <a-form-item :label="rssLabel">
        <a-input v-model:value="stores().formData.rsslink" :disabled="!stores().formData.subscribemode || stores().running" />
      </a-form-item>
      <a-form-item label="更新频率">
        <div class="freq">
          <a-input-number v-model:value="stores().formData.updatefreq" style="margin-right: 10px;" :disabled="stores().running" />
          分钟
        </div>
      </a-form-item>
      <a-form-item label="Aria2 地址">
        <a-input v-model:value="stores().formData.arialink" :disabled="stores().running" />
      </a-form-item>
      <a-form-item label="Aria2 密钥">
        <a-input-password v-model:value="stores().formData.ariasecret" placeholder="没有则留空" :disabled="stores().running" />
      </a-form-item>
      <a-form-item label="手动添加" v-show="!stores().formData.subscribemode">
        <a-button style="margin-bottom: 10px;" @click="showBangumiModal" :disabled="stores().running">添加番剧</a-button>
        <a-tooltip placement="bottomLeft" title="仅列表模式可用" arrow-point-at-center>
          <a-button :icon="h(QuestionOutlined)" type="text" style="margin-left: 10px;"></a-button>
        </a-tooltip>
        <a-table :columns="bangumiTable().columns" :data-source="stores().formData.bangumi" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'ass'">
              <a-tag>{{record.ass}}</a-tag>
            </template>
            <template v-if="column.key === 'op'">
              <div class="delButton" @click="delBangumi(record.id)">删除</div>
            </template>
          </template>
        </a-table>
      </a-form-item>
      <a-form-item label="规则">
        <a-button style="margin-bottom: 10px;" @click="showRuleModal" :disabled="stores().running">添加规则</a-button>
        <a-table :columns="ruleTable().columns" :data-source="stores().formData.rules" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'type'">
              <a-tag :color="record.type=='include'?'green':'red'">{{ record.type=='include'?'包含':'排除' }}</a-tag>
            </template>
            <template v-if="column.key === 'op'">
              <div class="delButton" @click="delRuleHandler(record.id)">删除</div>
            </template>
          </template>
        </a-table>
      </a-form-item>
    </a-form>
  </div>
  <a-modal v-model:open="openRuleModal" centered height="300px" okText="添加" title="添加规则" @ok="addRuleHandler">
    <a-form :model="addForm" :label-col="{ style: { width: '80px' } }" :wrapper-col=" { style: { width: '300px' } }">
      <a-form-item label="规则类别">
        <a-select v-model:value="addForm.type">
          <a-select-option value="exclude">排除</a-select-option>
          <a-select-option value="include">包含</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="值">
        <a-input v-model:value="addForm.value" @pressEnter="addRuleHandler"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal v-model:open="openBangumiModal" centered okText="添加" title="添加筛选" @ok="addBangumiHandler">
    <a-form :label-col="{ style: { width: '80px' } }" :wrapper-col=" { style: { width: '300px' } }">
      <a-form-item label="字幕组">
        <a-input v-model:value="bangumiForm.ass"></a-input>
      </a-form-item>
      <a-form-item label="标题">
        <a-input v-model:value="bangumiForm.title" @pressEnter="addBangumiHandler"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import stores from '../stores';
import { computed, h } from 'vue';
import { QuestionOutlined } from '@ant-design/icons-vue';
import ruleTable from '../hooks/ruleTable';
import ruleModal from '../hooks/ruleModal';
import bangumiModal from '../hooks/bangumiModal';
import bangumiTable from '../hooks/bangumiTable';

const {addForm, openRuleModal, showRuleModal, addRuleHandler, delRuleHandler}=ruleModal();
const {openBangumiModal, showBangumiModal, bangumiForm, addBangumiHandler, delBangumi}=bangumiModal();

const modeTip=computed(()=>{
  return stores().formData.subscribemode ? "订阅模式需要在Mikan Project上注册并且选择需要番剧订阅" : "列表模式将会从所有的番剧列表中筛选需要下载的内容进行下载"
})
const rssLabel=computed(()=>{
  return stores().formData.subscribemode ? "订阅的RSS链接" : "列表RSS链接"
})
const labelCol = { style: { width: '150px' } };
const wrapperCol = { style: { width: '800px' } };

</script>

<style scoped>
.freq{
  display: flex;
  align-items: center;
}
.form{
  display: grid;
  justify-content: center;
  user-select: none;
}
.delButton:hover{
  color: darkred;
}
.delButton{
  cursor: pointer;
  color: red;
  transition: color linear .2s;
}
</style>