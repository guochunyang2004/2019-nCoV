<template>
  <div class="container">
    <van-sticky>
      <van-panel title="搜索" desc="" status="">
        <div class="table">
          <div class="row">
            <div class="cell">车次：</div>
            <div class="cell">
              <van-cell-group>
                <van-field  placeholder="车次|航班|公交车|其它场所等" v-model="no"/>
              </van-cell-group>
            </div>
          </div>
          <div class="row">
            <div class="cell">日期：</div>
            <div class="cell">   
              <van-cell-group>           
                  <van-field  readonly  placeholder="日期|可为空" v-model="travelDate" @click="travelDateShow = true" />
              </van-cell-group>
              <van-calendar :min-date="minDate" :default-date="currentDate" v-model="travelDateShow" @confirm="onTravelDateConfirm" />
            </div>
          </div>
          <div class="row">
            <div class="cell"></div>
            <div class="cell">
              <van-button icon="search" round type="primary" @click="localSearch">搜 索</van-button>
              {{searchListLength>0?"结果："+searchListLength:""}}
            </div>
          </div>
        </div>
      </van-panel>
    </van-sticky>
    <div class="search">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onRefresh"
        style="width:100%;"
      >
        <van-cell is-link v-for="(item,index) in list" :key="index" 
        :title="tabArr[item.t_type]+' '+item.t_no+' '+item.t_no_sub"
        @click="(e)=>{ onShowPopup(e,index) }" >
             <div class="content">{{item.t_date}}   </div> 
        </van-cell>

      </van-list>

      <!-- 显示详情 -->
      <van-popup
          v-model="show"
          round closeable lazy-render
          position="bottom"
          :style="{ height: '80%' }"          
        >
          <van-panel v-if="currentShowIndex>-1" 
            :title="tabArr[list[currentShowIndex].t_type]" 
            :desc="list[currentShowIndex].t_no + ' ' + (list[currentShowIndex].t_no_sub||'')"
            class="van-panel"
          >
            <div> <label>日期：</label> {{list[currentShowIndex].t_date}}</div>
            <div v-if="list[currentShowIndex].t_pos_start"> <label>出发站：</label> {{list[currentShowIndex].t_pos_start}}</div>
            <div v-if="list[currentShowIndex].t_pos_end"> <label>到达站：</label> {{list[currentShowIndex].t_pos_end}}</div>
            <div v-if="list[currentShowIndex].t_start"> <label>开始时间：</label> {{list[currentShowIndex].t_start}}</div>
            <div v-if="list[currentShowIndex].t_end"> <label>结束时间：</label> {{list[currentShowIndex].t_end}}</div>
            <div v-if="list[currentShowIndex].t_memo"> <label>备注：</label> <div>{{list[currentShowIndex].t_memo}}</div> </div>
            <div v-if="list[currentShowIndex].updated_at"> <label>提交时间：</label> {{list[currentShowIndex].updated_at}}</div>
            <div> <label>来源：</label><a :href="list[currentShowIndex].source">{{list[currentShowIndex].who}}</a></div>
          </van-panel>
        </van-popup>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
import { Toast } from "vant";
export default {
  
  data() {
    const defaultPageSize = 10;
    var minDate = new Date(2019, 9, 1);
    var currentDate = new Date();
    const tabArr = ['全部','飞机','火车','地铁','长途客车','公交车','出租车','轮船','其它场所']
    return {
      no: "",
      area: "",
      mode: "top",
      count: 0,

      //列表组件
      isLoading: false,
      loading: false,
      finished: false,
      //列表组件结束

      //日期选择
      travelDateShow:false,
      travelDate:'',
      minDate,
      currentDate,
      //日期选择结束

      tabArr,
      //数据
      defaultPageSize,
      pageIndex:0,
      allList:[],
      allListLength:0,
      allListFinish:false,
      searchList:[],
      searchListLength:0,
      list:[],
      listLength:0,
      //数据结束
      //弹出层
      show: false,
      currentShowIndex:-1,
      
    }
  },
  computed: {
    conditions() {
      return this.conditionChange();
    }
  },
  created(){
    this.getReq();
  },
  methods: {
    conditionChange() {
      const arr = [];
      if (this.no) {
        arr.push(this.no);
      }
      if (this.travelDate) {
        arr.push(this.travelDate);
      }
      if (this.area) {
        arr.push(this.area);
      }
      return arr.join("、");
    },
    onRefresh() {
        if (this.allListFinish){
          this.pageIndex++;
          //console.log('onRefresh')
          this.pageData(this.defaultPageSize,this.pageIndex); 
        }               
    },
    //日期选择
    formatDate(date) {
      //console.log(date)
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      return year + '-'+(month>9?month:'0'+month)+ '-'+(day>9?day:'0'+day);
    },
    onTravelDateConfirm(date) {
      this.travelDateShow = false;
      this.travelDate = this.formatDate(date);
      //console.log(this.travelDate);
    },
    //日期选择结束
    getReq() {
      this.pageIndex = 1;
      request({
        url: "http://2019ncov.nosugartech.com/data.json?439046",
        //url: '/dashboard/analysis1',
        method: "get"
        //params: { ID: 12345}
      }).then(response => {
        //console.log(response.data);
        if (response.data.code===0){
          this.allList = response.data.data;
          this.allListLength = response.data.data.length;
          this.listLength = 0;
          this.allListFinish = true;
          this.localSearch();
          //this.pageData(this.defaultPageSize,this.pageIndex);
        }
        else {
          Toast(response.data.msg);
        }
      });
    },
    localSearch(){
      this.pageIndex = 1;
      this.searchList = [];
      this.searchListLength = 0;
      this.list = [];
      this.listLength = 0;      
      var allList = this.allList;
      for(var i=0;i<this.allListLength;i++){
        var isFound = true;
        if (this.no){
          isFound &= (allList[i].t_no||"").toLowerCase().indexOf(this.no.toLowerCase()) > -1;
        }
        if (this.travelDate) {
          isFound &= (allList[i].t_date||"").toLowerCase().indexOf(this.travelDate.toLowerCase()) > -1;
        }
        if (isFound){
          this.searchList.push(allList[i]);
          this.searchListLength++;
        }
      }
      this.pageData(this.defaultPageSize,this.pageIndex);
    },
    pageData(pageSize,pageIndex) {
      for(var i=(pageIndex-1)*pageSize;i<pageIndex*pageSize && i<this.searchListLength;i++){
        this.list.push(this.searchList[i]);
        this.listLength++;
      }
       // 加载状态结束
      this.loading = false;
       // 数据全部加载完成
      if (this.listLength >= this.searchListLength) {
        this.finished = true;
        //console.log(pageIndex,this.listLength ,this.searchListLength)
      }
      
    },
    ///
    onShowPopup(e,index) {      
      //console.log(e.currentTarget,index);
      // e.target 是你当前点击的元素
      // e.currentTarget 是你绑定事件的元素
      this.currentShowIndex = index;
      this.show = true;
    },
    /**88888888888888888888888
     * 使用test方法实现模糊查询
     * @param  {Array}  list     原数组
     * @param  {String} keyWord  查询的关键词
     * @return {Array}           查询的结果
     */
    fuzzyQuery(list, keyWord) {
      var reg =  new RegExp(keyWord);
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        if (reg.test(list[i])) {
          arr.push(list[i]);
        }
      }
      return arr;
    }
  }
};
</script>

<style scoped>
.container {
}
/* -----------table-------------- */
.table {
  display: table;
  border: 0px solid #cccccc;
  margin: 5px;
  /*display: table时padding会失效*/
  flex-grow: 2;
}
.row {
  display: table-row;
  border: 0px solid #cccccc;
  /*display: table-row时margin、padding同时失效*/
}
.cell {
  display: table-cell;
  border: 0px solid #cccccc;
  padding: 5px;
  /*display: table-cell时margin会失效*/
}
/* -----------table end-------------- */
.search {
  flex-grow: 1;
  display: flex;
  width:100%;
}
.search-button {
  width: 100px;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 18px;
  background-color: #009688;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  font-size: 14px;
  border: none;
  border-radius: 2px;
}
.van-list .van-cell__title {
  text-align:left;
}
/* 弹出层 */
.van-popup .van-cell__title {
  text-align:left;
}
.van-popup .van-cell__title span {
  font-size:16px;
  font-weight:bold;
}
.van-cell__label {
  font-size:16px;
}
.van-panel__content div {
  text-align: left;
  padding-left:20px;
}
.van-panel__content label {
  width:100px;
  display: inline-block;
  text-align: left;
  /* margin-left: 20px; */
  line-height: 35px;
}
</style>