import Request from "../models/request.js";

export async function create(req, res) {
    try {
        const created = await Request.create(req.body);
        return res.status(201).json(created);
    } catch (err) {
        console.error("Erro ao criar solicitação:", err);
        return res.status(400).json({ error: err.message });
    }
}

export async function list(req, res) {
    const list = await Request.findAll();
    return res.json(list);
}

export async function remove(req, res) {
    await Request.destroy({ where: { id: req.params.id } });
    return res.json({ message: "Solicitação excluída!" });
}
