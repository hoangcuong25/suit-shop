import express from 'express';
import $ from 'jquery';
import request from 'request';
import moment from 'moment';
import config from 'config';
import crypto from 'crypto';
import qs from 'qs';

const paymentRouter = express.Router();

paymentRouter.get('/', (req, res) => {
    res.render('orderlist', { title: 'Danh sách đơn hàng' });
});

paymentRouter.get('/create_payment_url', (req, res) => {
    const amount = req.query.amount || 0
    res.render('order', { title: 'Tạo mới đơn hàng', amount });
});

paymentRouter.get('/querydr', (req, res) => {
    res.render('querydr', { title: 'Truy vấn kết quả thanh toán' });
});

paymentRouter.get('/refund', (req, res) => {
    res.render('refund', { title: 'Hoàn tiền giao dịch thanh toán' });
});

paymentRouter.post('/create_payment_url', (req, res) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');

    const ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket?.remoteAddress;

    const tmnCode = config.get('vnp_TmnCode');
    const secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    const returnUrl = config.get('vnp_ReturnUrl');
    const orderId = moment(date).format('DDHHmmss');
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;
    const locale = req.body.language || 'vn';

    const vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `Thanh toan cho ma GD: ${orderId}`,
        vnp_OrderType: 'other',
        vnp_Amount: amount * 100 * 25190,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate
    };

    if (bankCode) {
        vnp_Params.vnp_BankCode = bankCode;
    }

    const sortedParams = sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    sortedParams.vnp_SecureHash = signed;
    vnpUrl += `?${qs.stringify(sortedParams, { encode: false })}`;

    res.redirect(vnpUrl);
});

paymentRouter.get('/vnpay_return', (req, res) => {
    const vnp_Params = { ...req.query };
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    const sortedParams = sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams, { encode: false });
    const secretKey = config.get('vnp_HashSecret');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    const responseCode = secureHash === signed ? vnp_Params.vnp_ResponseCode : '97';
    res.render('success', { code: responseCode });
});

paymentRouter.get('/vnpay_return', (req, res) => {
    const vnp_Params = { ...req.query };
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    const sortedParams = sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams, { encode: false });
    const secretKey = config.get('vnp_HashSecret');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    const responseCode = secureHash === signed ? vnp_Params.vnp_ResponseCode : '97';
    res.render('success', { code: responseCode });
});

paymentRouter.post('/querydr', (req, res) => {
    const date = new Date();
    const vnp_RequestId = moment(date).format('HHmmss');
    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');
    const vnp_TxnRef = req.body.orderId;
    const vnp_TransactionDate = req.body.transDate;
    const vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket?.remoteAddress;

    const secretKey = config.get('vnp_HashSecret');
    const data = `${vnp_RequestId}|2.1.0|querydr|${config.get('vnp_TmnCode')}|${vnp_TxnRef}|${vnp_TransactionDate}|${vnp_CreateDate}|${vnp_IpAddr}|Truy van GD ma:${vnp_TxnRef}`;

    const hmac = crypto.createHmac('sha512', secretKey);
    const vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest('hex');

    const dataObj = {
        vnp_RequestId,
        vnp_Version: '2.1.0',
        vnp_Command: 'querydr',
        vnp_TmnCode: config.get('vnp_TmnCode'),
        vnp_TxnRef,
        vnp_OrderInfo: `Truy van GD ma: ${vnp_TxnRef}`,
        vnp_TransactionDate,
        vnp_CreateDate,
        vnp_IpAddr,
        vnp_SecureHash
    };

    request.post({ url: config.get('vnp_Api'), json: true, body: dataObj }, (error, response) => {
        console.log(response);
    });
});

const sortObject = (obj) => {
    return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
            acc[key] = encodeURIComponent(obj[key]).replace(/%20/g, '+');
            return acc;
        }, {});
};

export default paymentRouter;
