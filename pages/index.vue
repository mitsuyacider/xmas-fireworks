<template>
  <div class="container">
    <h1>Merry X'mas</h1>
    <div class="xmax-container" >
      <div 
        id="canvas" 
        ref="canvas" 
        class="d-flex justify-content-center" />      
    </div>    
  </div>
</template>

<script>
if (process.browser) {
  var p5Canvas = require('@/js/p5Canvas.js')
}

export default {
  data () {
    return {
      p5js: {}
    }
  },
  mounted () {
    // tetris.setDelegate(this.callbackOnTetris)
    const P5 = require('p5')
    this.p5js = new P5(p5Canvas.mainCanvas)
  }
}
</script>

<style>

body {
  /* 画像ファイルの指定 */
  background-image: url(../assets/img/background.png);   
  /* 画像を常に天地左右の中央に配置 */
  background-position: center center;   
  /* 画像をタイル状に繰り返し表示しない */
  background-repeat: no-repeat;   
  /* コンテンツの高さが画像の高さより大きい時、動かないように固定 */
  background-attachment: fixed;   
  /* 表示するコンテナの大きさに基づいて、背景画像を調整 */
  background-size: cover;   
  /* 背景画像が読み込まれる前に表示される背景のカラー */
  background-color: #464646;
}

</style>
