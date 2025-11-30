import User from "../models/user.js";

export async function login(req, res) {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        if (user.senha !== senha) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        return res.json({ message: "Login autorizado!", user });
    } catch (err) {
        return res.status(500).json({ error: "Erro no servidor" });
    }
}
