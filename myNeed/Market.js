/**
 * 行情
 * @type {*|exports|module.exports}
 */
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const common = require('../../../webServer/modules/common/Common');
const config = require('../../../webServer/config/env/index');
const configure = require('../../../webServer/config/Configure');
const klineCache = require('../../../webServer/modules/cache/Kline');

/**
 * kline 数据
 * since 为null时查询所有，否则查询最新一条
 * size 默认查询前size条数据
 * symbol
 */
router.post('/kline', function (req, res) {
    req.checkBody('symbol', "IN_59").notEmpty().lowerLetter().withMessage("IF_49").equals(config.btc.code).withMessage('IF_49');
    req.checkBody('type', "IN_60").notEmpty().letterNum().withMessage("IF_48");
    var size = req.body["size"];
    if (!_.isUndefined(size)) {
        req.checkBody('size', "IN_58").notEmpty().isInt().withMessage("IF_42");
    }
    if (common.valid(req, res)) {
        var period = req.body["type"];
        if (_.indexOf(configure.periods, period) == -1) {
            res.json(common.getErrorJson(req, 'IN_60'));
        } else {
            var data = [];
            if (!_.isUndefined(size)) {
                data = klineCache.getBySize(config.btc.code, period, size > configure.kline.maxSize ? configure.kline.maxSize : size);
            } else {
                data = klineCache.getBySize(config.btc.code, period, 1);
            }
            if (!_.isNull(data) && !_.isEmpty(data)) {
                klineCache.updateData(config.btc.code, period, new Date(data[0][0]).getTime());
            }
            res.json({'data': JSON.stringify(data)});
        }
    }
});

/**
 * 24小时分钟线数据
 */
router.get('/kline/min/24', function (req, res) {
    // console.log(req.query['timestamp']); // 根据时间戳获取数据，更新用户本地缓存，待优化
    var data = [];
    data = klineCache.getBySize(config.btc.code, 'MIN1', 1440);
    res.json(data);
});

module.exports = router;
