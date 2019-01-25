<template>
  <div class="main-page">
    <togglePanel :num="0" :con="con" :isOpen="true"/>
    <br>
    <togglePanel :num="1" :con="con+'\r\n'+con"/>
    <br>
    <togglePanel :num="2" :con="con+'\r\n'+con+'\r\n'+con"/>
  </div>
</template>

<script>
import togglePanel from "../../source/TogglePanel";

export default {
  components: { togglePanel },
  data() {
    return {
      con:
        "<b style='color:red'>测试html</b>我们的生命之所以贫瘠，原因往往不是放弃了工作，便是因工作放弃了沉思：要不断地工作，也要不断地沉思。生命原是一个不知来自何处去至何方的奇迹，存在也是一个时空的偶然，我们需要不停的奋斗，来印证我们生命的真正存在。这样我们便须活跃我们的思维，点燃灵台的明灯，照亮我们该走的路，以便我们继续跋涉。生命也是需要不断跋涉的，不管昨日你有多少功绩，不管昨日你园圃里有多少花朵，那是属于昨日；若你一心沉湎于昨日的喜悦，就难享今日更清醇的欢欣。今日，一个新的开始，更需要我们前进，更需要我们去孕育。人生是一条永远走不完的旅程，需要生命的火把，直至成灰而泪尽"
    };
  }
};
</script>