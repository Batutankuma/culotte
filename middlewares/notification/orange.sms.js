const https = require("https");
const request = require("request");

class OrangeSMS {
    /**
     * 
     * @param {+243 000000000} desinateur Number Phone Customer
     * @param {Mbote Mokili} message Message For Customer
     */
    sender(phoneCustomer, message) {
        credentials = process.env.TOKENBASIC;
        var postData = "";
        postData += "grant_type=client_credentials";
        var options = {
            host: 'api.orange.com',
            path: '/oauth/v3/token'
        };
        options['method'] = 'POST';
        options['headers'] = {
            'Authorization': credentials,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        };
        var req = https.request(options, function (response) {
            response.setEncoding('utf8');
            var responseData = '';
            response.on('data', function (data) { responseData += data; });
            response.on('end', function () {
                var result = JSON.parse(responseData);
                this._send(result.access_token, phoneCustomer, message);
            });
        })
            .on('error', function (e) { });
        req.write(postData);
        req.end();
    }

    _send(token, phone, messagee) {
        var receveirr = "tel:" + phone;
        var senders = "tel:" + process.env.PHONENUMBER;
        var headers = {
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        };
        var body = {
            outboundSMSMessageRequest: {
                address: receveirr,
                senderAddress: senders,
                outboundSMSTextMessage: {
                    message: messagee
                }
            }
        };
        var options = {
            uri: `https://api.orange.com/smsmessaging/v1/outbound/tel:${process.env.PHONENUMBER}/requests`,
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 201) {
                return response.statusCode;
            }
            else {
                console.error(error);
            }
        })
    }
}


module.exports =  OrangeSMS;