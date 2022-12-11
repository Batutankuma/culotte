class NotificationPrisma {
    //send success message
    async _success(res, status = 200, message) {
        return res.status(200).json({ status: status, message: message });
    }

    //send error message 
    async _error(res, status = 400, message) {
        if(message.meta){
            return res.status(400).json({ status: status, message: message.meta.target });
        }else if (message.message) {
            return res.status(400).json({ status: status, message: message.message });
        }
        return res.status(400).json({ status: status, message: message });
    }
}

module.exports = NotificationPrisma;
