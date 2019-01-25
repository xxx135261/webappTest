<template>
<table cellspacing="0" cellpadding="0" border="0" class="du-pont">
  <tr>
    <td class="lineB" colspan="18"><duPontItem name="净资产收益率" :n1="d[0][0]" :n2="d[0][1]" /></td>
  </tr>
  <tr>
    <td colspan="18"></td>
  </tr>
  <tr>
    <td class="lineL lineB" colspan="9"><duPontItem name="销售净利率*(%)" :n1="d[1][0]" :n2="d[1][1]" /></td>
    <td class="mark"><div>×</div></td>
    <td class="lineM lineB" colspan="3"><duPontItem name="资产周转率(次)" :n1="d[2][0]" :n2="d[2][1]" /></td>
    <td class="mark"><div>×</div></td>
    <td class="lineR lineB" colspan="3"><duPontItem name="权益乘数*" :n1="d[3][0]" :n2="d[3][1]" /></td>
    <td></td>
  </tr>
  <tr>
    <td colspan="18"></td>
  </tr>
  <tr>
    <td colspan="5" class="lineL lineB"><duPontItem name="资产净利率(%)" :n1="d[4][0]" :n2="d[4][1]" /></td>
    <td class="mark"><div>×</div></td>
    <td colspan="3" class="lineR lineB"><duPontItem name="归属母公司股东净利润占比(%)" :n1="d[5][0]" :n2="d[5][1]" /></td>
    <td></td>
    <td class="lineL"><duPontItem name="营业总收入" :n1="d[6][0]" :n2="d[6][1]" /></td>
    <td class="mark"><div>÷</div></td>
    <td class="lineR"><duPontItem name="平均总资产" :n1="d[7][0]" :n2="d[7][1]" /></td>
    <td></td>
    <td class="lineL"><duPontItem name="平均总资产" :n1="d[8][0]" :n2="d[8][1]" /></td>
    <td class="mark"><div>÷</div></td>
    <td class="lineR"><duPontItem name="平均归属母公司股东利益" :n1="d[9][0]" :n2="d[9][1]" /></td>
    <td><div style="width:45px;"></div></td>
  </tr>
  <tr>
    <td colspan="18"></td>
  </tr>
  <tr>
    <td class="lineL"><duPontItem name="经营利润率(%)" :n1="d[10][0]" :n2="d[10][1]" /></td>
    <td class="mark"><div>×</div></td>
    <td class="lineM"><duPontItem name="考虑赋税因素" :n1="d[11][0]" :n2="d[11][1]" /></td>
    <td class="mark"><div>×</div></td>
    <td class="lineR"><duPontItem name="考虑利息负担" :n1="d[12][0]" :n2="d[12][1]" /></td>
    <td></td>
    <td class="lineL"><duPontItem name="归属母公司股东净利润" :n1="d[13][0]" :n2="d[13][1]" /></td>
    <td class="mark"><div>÷</div></td>
    <td class="lineR"><duPontItem name="净利润" :n1="d[14][0]" :n2="d[14][1]" /></td>
    <td colspan="5"></td>
    <td colspan="2" class="l2" style="text-align:right"><duPontItem name="期末总资产" :n1="d[15][0]" :n2="d[15][1]" /></td>
    <td colspan="2" class="l2" style="text-align:right"><duPontItem name="期末归属母公司股东利益" :n1="d[16][0]" :n2="d[16][1]" /></td>
  </tr>
  <tr>
    <td colspan="18"></td>
  </tr>
  <tr>
    <td colspan="2" class="l2" style="text-align:right"><duPontItem name="EBIT" :n1="d[17][0]" :n2="d[17][1]" /></td>
    <td colspan="2" class="l2" style="text-align:right"><duPontItem name="净利润" :n1="d[18][0]" :n2="d[18][1]" /></td>
    <td colspan="2" class="l2" style="text-align:right"><duPontItem name="利润总额" :n1="d[19][0]" :n2="d[19][1]" /></td>
    <td colspan="8"></td>
    <td colspan="2" class="lb" style="text-align:right"><duPontItem name="期初总资产" :n1="d[20][0]" :n2="d[20][1]" /></td>
    <td colspan="2" class="lb" style="text-align:right"><duPontItem name="期初归属母公司股东利益" :n1="d[21][0]" :n2="d[21][1]" /></td>
  </tr>
  <tr>
    <td colspan="2" class="mark2" style="text-align:right"><div>÷</div></td>
    <td colspan="2" class="mark2" style="text-align:right"><div>÷</div></td>
    <td colspan="2" class="mark2" style="text-align:right"><div>÷</div></td>
    <td colspan="12"></td>
  </tr>
  <tr>
    <td colspan="2" class="lb" style="text-align:right"><duPontItem name="营业总收入" :n1="d[22][0]" :n2="d[22][1]" /></td>
    <td colspan="2" class="lb" style="text-align:right"><duPontItem name="利润总额" :n1="d[23][0]" :n2="d[23][1]" /></td>
    <td colspan="2" class="lb" style="text-align:right"><duPontItem name="EBIT" :n1="d[24][0]" :n2="d[24][1]" /></td>
    <td colspan="12"></td>
  </tr>
</table>
</template>

<script>
import duPontItem from "./duPontItem";

export default {
  components: { duPontItem },
  props: ["d"]
};
</script>

<style lang="less">
.du-pont {
  @lineW: 1px;
  td {
    position: relative;
    text-align: center;
    height: 40px;
    z-index: 2;
    // 连接线
    .after {
      content: "";
      position: absolute;
      z-index: -1;
      border-style: solid;
      border-color: #ccc;
      height: 40px;
    }
    // 横向排列
    // 左
    &.lineL::after {
      .after;
      top: -20px;
      left: 50%;
      right: 0;
      border-width: @lineW 0 0 @lineW;
    }
    // 中
    &.lineM::before {
      .after;
      top: -20px;
      left: 50%;
      border-width: 0 @lineW 0 0;
    }
    &.lineM::after {
      .after;
      top: -20px;
      left: 0;
      right: 0;
      border-width: @lineW 0 0 0;
    }
    // 右
    &.lineR::after {
      .after;
      top: -20px;
      left: 0;
      right: 50%;
      border-width: @lineW @lineW 0 0;
    }
    // 下
    &.lineB::before {
      .after;
      bottom: -20px;
      left: 50%;
      border-width: 0 @lineW 0 0;
    }
    &.lineM.lineB::before {
      .after;
      top: -20px;
      bottom: -20px;
      height: auto;
      left: 50%;
      border-width: 0 @lineW 0 0;
    }
    // 纵向排列
    &.l2::after {
      .after;

      left: 30px;
      top: -50px;
      bottom: -60px;
      width: 20px;
      height: auto;

      border-width: 0 0 0 @lineW;
    }
    &.l2::before,
    &.lb::after {
      .after;

      left: 30px;
      top: 0;
      bottom: 50%;
      width: 20px;
      height: auto;

      border-width: 0 0 @lineW @lineW;
    }
    // 运算符
    &.mark {
      font-size: 18px;
      padding: 0 10px;
      div {
        @w: 26px;
        border: 1px solid #aaa;
        height: @w;
        width: @w;
        line-height: @w;
        text-align: center;
        border-radius: @w;
      }
      &::after {
        .after;

        top: -20px;
        left: 0;
        right: 0;
        height: 40px;

        border-width: @lineW 0 0 0;
      }
    }
    &.mark2 {
      font-size: 18px;
      padding: 0 10px;
      div {
        @w: 26px;
        display: inline-block;
        margin-right: 36px;
        border: 1px solid #aaa;
        height: @w;
        width: @w;
        line-height: @w;
        text-align: center;
        border-radius: @w;
      }
    }
  }
}
</style>