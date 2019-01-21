<template>
  <div class="main-container">
    <div class="xmax-container fixed-top w-100" >
      <div 
        id="p5Canvas" 
        ref="canvas" 
        class="d-flex justify-content-center" />      
    </div>    
    <div 
      class="main-container__posenet" 
      style="d-flex justify-content-center">
      <video 
        id="video" 
        width="640px" 
        height="480px" 
        style="position:absolute;" />
      <!-- <canvas :class="{show : $store.state.isCameraPreview }" id="canvas" width="640px" height="480px" style="position:absolute;"></canvas> -->
      <canvas 
        id="canvas" 
        width="640px" 
        height="480px" 
        style="position:absolute;" />
    </div>   
    <div class="main-container__message">
      <h1>Merry X'mas🎉</h1>    
      <h1>Let's Clap Your Hands!!</h1> 
      <h1>Something will happen!!</h1>    
    </div> 
  </div>
</template>

<script>
if (process.browser) {
  var p5Canvas = require('@/js/p5Canvas.js')
  var posenet = require('@/js/PosenetSample.js')
}

export default {
  data () {
    return {
      p5js: {}
    }
  },
  mounted () {
    // navigator.getUserMedia = navigator.getUserMedia || 
    //                           navigator.webkitGetUserMedia || 
    //                           navigator.mozGetUserMedia;

    // navigator.getUserMedia(
    //   { video: true, audio: false },
    //   function(stream) {
    //     var v = document.getElementById('myvideo');
    //     v.src = URL.createObjectURL(stream);
    //   },
    //   function(error) {
    //     console.log(error);
    //   }
    // );       
      // tetris.setDelegate(this.callbackOnTetris)

    posenet.setDelegate(this.callbackDelegate);
    posenet.startPosenet();    

    const P5 = require('p5')
    this.p5js = new P5(p5Canvas.mainCanvas)
  },
  methods: {
    callbackDelegate(keypoints, score) {
      p5Canvas.setKeyPoints(keypoints);
    }
  }
}
</script>

<style>
.xmax-container {
  z-index: -1;
}
.main-container__message {
  margin-top: 100px;
  margin-left: 100px;
}

h1 {
  color: red;
}

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

video {
  /* opacity: .65; */
  display: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* width: 100%;
  height: 100%; */
}

.show {
  opacity:.65;
}

.main-container__posenet canvas {
  opacity: 0;
  /* opacity:.65; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
}

</style>
