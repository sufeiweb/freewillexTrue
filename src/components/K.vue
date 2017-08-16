<template>
  <div class="K">
    <div class="chart_option" style="width: 1042px">
      <div id="chart_container" class="dark" style="width: 1042px">
        <div id="chart_dom_elem_cache"></div>
        <div id="chart_toolbar">
          <div class="chart_toolbar_minisep"></div>
          <!--<div class=chart_dropdown id=chart_toolbar_periods_vert><div class="chart_dropdown_t hide"><a class=chart_str_period>周期</a></div><div class=chart_dropdown_data><table><tr><td><ul><li id=chart_period_1m_v name=1m><a class=chart_str_period_1m>1分钟</a><li id=chart_period_5m_v name=5m><a class=chart_str_period_5m>5分钟</a><li id=chart_period_15m_v name=15m><a class=chart_str_period_15m>15分钟</a><li id=chart_period_30m_v name=30m><a class=chart_str_period_30m>30分钟</a><li id=chart_period_1h_v name=1h><a class=chart_str_period_1h>1小时</a><li id=chart_period_4h_v name=4h><a class=chart_str_period_4h>4小时</a><li id=chart_period_6h_v name=6h><a class=chart_str_period_6h>6小时</a><li id=chart_period_12h_v name=12h><a class=chart_str_period_12h>12小时</a><li id=chart_period_1d_v name=1d><a class=chart_str_period_1d>日线</a><li id=chart_period_1w_v name=1w><a class=chart_str_period_1w>周线</a></ul></table></div></div>-->
          <div id="chart_toolbar_periods_horz">
            <ul class="chart_toolbar_tabgroup">
              <li id="chart_period_line_h" name="line" style="display: inline-block;">
                <a class="chart_str_period_line selected">分时</a>
              </li>
              <li id="chart_period_1m_h" name="1m" style="display: inline-block;">
                <a class="chart_str_period_1m">1分钟</a>
              </li>
              <li id="chart_period_5m_h" name="5m" style="display: inline-block;">
                <a class="chart_str_period_5m">5分钟</a>
              </li>
              <li id="chart_period_15m_h" name="15m" style="display: inline-block;">
                <a class="chart_str_period_15m">15分钟</a>
              </li>
              <li id="chart_period_30m_h" name="30m" style="display: inline-block;">
                <a class="chart_str_period_30m">30分钟</a>
              </li>
              <li id="chart_period_1h_h" name="1h" style="display: inline-block;">
                <a class="chart_str_period_1h">1小时</a>
              </li>
              <li id="chart_period_4h_h" name="4h" style="display: inline-block;">
                <a class="chart_str_period_4h">4小时</a>
              </li>
              <li id="chart_period_6h_h" name="6h" style="display: inline-block;">
                <a class="chart_str_period_6h">6小时</a>
              </li>
              <li id="chart_period_12h_h" name="12h" style="display: inline-block;">
                <a class="chart_str_period_12h">12小时</a>
              </li>
              <li id="chart_period_1d_h" name="1d" style="display: inline-block;">
                <a class="chart_str_period_1d">日线</a>
              </li>
              <li id="chart_period_1w_h" name="1w" style="display: inline-block;">
                <a class="chart_str_period_1w">周线</a>
              </li>
            </ul>
          </div>
          <!--<div id="chart_show_tools" class="chart_toolbar_button chart_str_tools_cap">画线工具</div>-->
          <div id="chart_show_indicator" class="chart_toolbar_button chart_str_indicator_cap selected">技术指标</div>
          <div class="chart_dropdown" id="chart_dropdown_settings">
            <div class="chart_dropdown_t">
              <a class="chart_str_settings">更多</a>
            </div>
            <div class="chart_dropdown_data">
              <table>
                <tbody>
                <tr id="chart_select_main_indicator">
                  <td class="chart_str_main_indicator">主指标</td>
                  <td>
                    <ul>
                      <li>
                        <a name="MA" class="selected">MA</a>
                      </li>
                      <li>
                        <a name="EMA" class="">EMA</a>
                      </li>
                      <li>
                        <a name="BOLL" class="">BOLL</a>
                      </li>
                      <li>
                        <a name="SAR" class="">SAR</a>
                      </li>
                      <li>
                        <a name="NONE" class="">None</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr id="chart_select_chart_style">
                  <td class="chart_str_chart_style">主图样式</td>
                  <td>
                    <ul>
                      <li>
                        <a class="selected">CandleStick</a>
                      </li>
                      <li>
                        <a class="">OHLC</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <ul>
                      <li>
                        <a id="chart_btn_parameter_settings"
                           class="chart_str_indicator_parameters">指标参数设置</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="chart_zoom" class="icon_zoom"></div>
        </div>
        <div id="chart_toolpanel" style="display: inline;">
          <div class="chart_toolpanel_separator"></div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_Cursor" name="Cursor"></div>
            <div class="chart_toolpanel_tip chart_str_cursor">光标</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_CrossCursor" name="CrossCursor"></div>
            <div class="chart_toolpanel_tip chart_str_cross_cursor">十字光标</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_SegLine" name="SegLine"></div>
            <div class="chart_toolpanel_tip chart_str_seg_line">线段</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_StraightLine" name="StraightLine"></div>
            <div class="chart_toolpanel_tip chart_str_straight_line">直线</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_RayLine" name="RayLine"></div>
            <div class="chart_toolpanel_tip chart_str_ray_line">射线</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_ArrowLine" name="ArrowLine"></div>
            <div class="chart_toolpanel_tip chart_str_arrow_line">箭头</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_HoriSegLine" name="HoriSegLine"></div>
            <div class="chart_toolpanel_tip chart_str_horz_seg_line">水平线段</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_HoriStraightLine" name="HoriStraightLine"></div>
            <div class="chart_toolpanel_tip chart_str_horz_straight_line">水平直线</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_HoriRayLine" name="HoriRayLine"></div>
            <div class="chart_toolpanel_tip chart_str_horz_ray_line">水平射线</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_VertiStraightLine" name="VertiStraightLine"></div>
            <div class="chart_toolpanel_tip chart_str_vert_straight_line">垂直直线</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_PriceLine" name="PriceLine"></div>
            <div class="chart_toolpanel_tip chart_str_price_line">价格线</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_TriParallelLine" name="TriParallelLine"></div>
            <div class="chart_toolpanel_tip chart_str_tri_parallel_line">价格通道线</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_BiParallelLine" name="BiParallelLine"></div>
            <div class="chart_toolpanel_tip chart_str_bi_parallel_line">平行直线</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_BiParallelRayLine" name="BiParallelRayLine"></div>
            <div class="chart_toolpanel_tip chart_str_bi_parallel_ray">平行射线</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_DrawFibRetrace" name="DrawFibRetrace"></div>
            <div class="chart_toolpanel_tip chart_str_fib_retrace">斐波纳契回调</div>
          </div>
          <div class="chart_toolpanel_button">
            <div class="chart_toolpanel_icon" id="chart_DrawFibFans" name="DrawFibFans"></div>
            <div class="chart_toolpanel_tip chart_str_fib_fans">斐波纳契扇形</div>
          </div>
          <!--<div style="padding-left: 3px;padding-top: 10px;"><button style="color: red;" id="clearCanvas" title="Clear All">X</button></div>-->
        </div>
        <div id="chart_canvasGroup" class="chart_canvasGroup">
          <!--{{#compare data.lang '===' 'zh-cn'}}-->
          <!--<div class="fw_market_logo"><img src="../../../static/img/market_bg_logo.png" width="50%"></div>-->
          <!--{{else}}-->
          <!--<div class="fw_market_logo"><img src="../../../static/img/market_bg_logo_en.png" width="50%"></div>-->
          <!--{{/compare}}-->
          <canvas class="chart_canvas" id="chart_mainCanvas"></canvas>
          <canvas class="chart_canvas" id="chart_overlayCanvas"></canvas>
        </div>
        <div id="chart_tabbar">
          <ul>
            <li><a name="MACD" class="selected">MACD</a></li>
            <li><a name="KDJ" class="">KDJ</a></li>
            <li><a name="StochRSI" class="">StochRSI</a></li>
            <li><a name="RSI" class="">RSI</a></li>
            <li><a name="DMI" class="">DMI</a></li>
            <li><a name="OBV" class="">OBV</a></li>
            <li><a name="BOLL" class="">BOLL</a></li>
            <li><a name="SAR" class="">SAR</a></li>
            <li><a name="DMA" class="">DMA</a></li>
            <li><a name="TRIX" class="">TRIX</a></li>
            <li><a name="BRAR" class="">BRAR</a></li>
            <li><a name="VR" class="">VR</a></li>
            <li><a name="EMV" class="">EMV</a></li>
            <li><a name="WR" class="">WR</a></li>
            <li><a name="ROC" class="">ROC</a></li>
            <li><a name="MTM" class="">MTM</a></li>
            <li><a name="PSY">PSY</a></li>
          </ul>
        </div>
        <div id="chart_parameter_settings">
          <h2 class="chart_str_indicator_parameters">指标参数设置</h2>
          <table>
            <tbody>
            <tr>
              <th>MA</th>
              <td>
                <input name="MA">
                <input name="MA">
                <input name="MA">
                <input name="MA">
                <br>
                <input name="MA">
                <input name="MA"></td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>

              <th>DMA</th>
              <td>
                <input name="DMA">
                <input name="DMA">
                <input name="DMA"></td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>

            <tr>
              <th>EMA</th>
              <td>
                <input name="EMA">
                <input name="EMA">
                <input name="EMA">
                <input name="EMA">
                <br>
                <input name="EMA">
                <input name="EMA">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>

              <th>TRIX</th>
              <td>
                <input name="TRIX">
                <input name="TRIX">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>

            <tr>
              <th>VOLUME</th>
              <td>
                <input name="VOLUME">
                <input name="VOLUME">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>

              <th>BRAR</th>
              <td>
                <input name="BRAR">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>

            <tr>
              <th>MACD</th>
              <td>
                <input name="MACD">
                <input name="MACD">
                <input name="MACD">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>

              <th>VR</th>
              <td>
                <input name="VR">
                <input name="VR">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>

            <tr>
              <th>KDJ</th>
              <td>
                <input name="KDJ">
                <input name="KDJ">
                <input name="KDJ">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>

              <th>EMV</th>
              <td>
                <input name="EMV">
                <input name="EMV">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>

            <tr>
              <th>StochRSI</th>
              <td>
                <input name="StochRSI">
                <input name="StochRSI">
                <input name="StochRSI">
                <input name="StochRSI">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>

              <th>WR</th>
              <td>
                <input name="WR">
                <input name="WR">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>

            <tr>
              <th>RSI</th>
              <td>
                <input name="RSI">
                <input name="RSI">
                <input name="RSI">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>

              <th>ROC</th>
              <td>
                <input name="ROC">
                <input name="ROC">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>

            <tr>
              <th>DMI</th>
              <td>
                <input name="DMI">
                <input name="DMI">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>

              <th>MTM</th>
              <td>
                <input name="MTM">
                <input name="MTM">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>

            <tr>
              <th>OBV</th>
              <td>
                <input name="OBV">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>

              <th>PSY</th>
              <td>
                <input name="PSY">
                <input name="PSY">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>
            <tr>
              <th>BOLL</th>
              <td>
                <input name="BOLL">
              </td>
              <td>
                <button class="chart_str_default">默认值</button>
              </td>
            </tr>
            </tbody>
          </table>
          <div id="close_settings">
            <a class="chart_str_close">关闭</a>
          </div>
        </div>
        <div id="chart_loading" class="chart_str_loading">正在读取数据</div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
//  import '../../static/js/kline.draw';
  export default {
    mounted() {
      {
        $("body").addClass("market-body");
        $("body").append('<script src="../../static/js/kline.draw.js"><\/script>');
        $(".market-content").removeClass("hide");
      }
    },
    methods: {

    }
  }
</script>
<style>
  @import "../../static/css/marketK.css";
</style>
