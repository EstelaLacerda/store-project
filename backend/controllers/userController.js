// controllers/userController.js
import User from "../models/user.js";

export async function register(req, res) {
    try {
        const user = await User.create(req.body);
        return res.status(201).json(user);
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        return res.status(400).json({ error: err.message });
    }
}

export async function list(req, res) {
    const users = await User.findAll();
    return res.json(users);
}

export async function get(req, res) {
    const user = await User.findByPk(req.params.id);
    return res.json(user);
}

export async function update(req, res) {
    await User.update(req.body, { where: { id: req.params.id } });
    return res.json({ message: "Atualizado!" });
}

export async function remove(req, res) {
    await User.destroy({ where: { id: req.params.id } });
    return res.json({ message: "Removido!" });
}
