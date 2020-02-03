<template>
  <div>
    <div class="container">
      <div class="content"></div>
      <div class="content"></div>
      <div class="content"></div>
      <div class="clear"></div>
    </div>
    <div class="container">
      <div class="content exciting-text">2</div>
      <div class="content"></div>
      <div class="content">
        <div class="table">
          <div class="row">
            <div class="cell">张三</div>
            <div class="cell">李四</div>
            <div class="cell">王五</div>
          </div>
          <div class="row">
            <div class="cell">张三</div>
            <div class="cell">李四</div>
            <div class="cell">王五</div>
          </div>
        </div>
      </div>
      <br clear="all" />
    </div>
    <div class="container fix">
      <div class="content"></div>
      <div class="content"></div>
      <div class="content"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.container {
  border: 1px solid rgb(237, 109, 100);
  margin:3px;
}
.content {
  float: left;
  border: 1px solid skyblue;
  width: 200px;
  height: 200px;
  margin:3px;
}
.clear {
  clear: both;
}
.exciting-text::after {
  content: "<- 让人兴兴兴奋!";
  color: green;
}
/* -----------clear:both-------------- */
.fix::after {
  content: "";
  display: table;
  clear: both;
}
/* ------------------------- */
.table {
  display: table;
  border: 1px solid #cccccc;
  margin: 5px;
  /*display: table时padding会失效*/
}
.row {
  display: table-row;
  border: 1px solid #cccccc;
  /*display: table-row时margin、padding同时失效*/
}
.cell {
  display: table-cell;
  border: 1px solid #cccccc;
  padding: 5px;
  /*display: table-cell时margin会失效*/
}
</style>