const Notification = require('./../middlewares/notification/prisma.notification');
const Auth = require('../middlewares/auth/auth.basic');
const { PrismaClient } = require('@prisma/client');
const Prisma = new PrismaClient();
const { genSaltSync, compareSync, hashSync } = require('bcryptjs');
const { SignToken,DecodeToken } = new Auth();
const { _error, _success } = new Notification();


class Controller {
    //s'inscrire
    async singUp(req, res) {
        try {
            const { name, email, password, avatar } = req.body;
            //hashage de mot de passe
            const salt = genSaltSync(10);
            const passwordHash = hashSync(password, salt);
            if (!passwordHash) throw "Cryptage crash";
            //verification de l'email existance
            const emailExist = await Prisma.user.findFirst({ where: { email: email } });
            if (emailExist) throw new Error("This email address exists");
            // si l'adress email n'existe pas alors enregistre l'utilisateur
            const model = await Prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                    avatar: avatar
                }
            });
            _success(res, 201, { response: model, tokenKey: SignToken(model.id) });
        } catch (error) {
            console.log(error);
            _error(res, 401, error.message);
        }
    }

    //se connecter
    async logIn(req, res) {
        try {
            const { password, email } = req.body;
            if (!password || !email) throw new Error("Please fill in all fields");
            const emailExist = await Prisma.user.findFirst({ where: { email: email } });
            if (!emailExist) throw new Error("Your password or email is invalid");
            if (!compareSync(password, emailExist.password)) throw new Error("Your password or email is invalid");
            _success(res, 201, { response: emailExist, tokenKey: SignToken(emailExist.id) });
        } catch (error) {
            _error(res, 401, error.message);
        }
    }

    // read all client
    async findAll(req, res) {
        try {
            const model = await Prisma.user.findMany();
            _success(res, 200, model);
        } catch (error) {
            _error(res, 400, error.message);
        }
    }
    // find for id
    async findId(req, res) {
        try {
            const id_user = DecodeToken(req.headers.authorization);
            const model = await Prisma.user.findFirst({ where: { id: id_user} });
            _success(res, 200, model);
        } catch (error) {
            _error(res, 400, error.message);
        }
    }
    //update for id client
    async updateId(req, res) {
        try {
            const model = await Prisma.user.update({ where: { id: req.params.id }, data: req.body });
            _success(res, 200, model);
        } catch (error) {
            _error(res, 400, error.message);
        }
    }
    //delete client for id
    async deleteId(req, res) {
        try {
            const model = await Prisma.user.delete({ where: { id: req.params.id } });
            _success(res, 200, model);
        } catch (error) {
            _error(res, 400, error.message);
        }
    }
}

module.exports = Controller;