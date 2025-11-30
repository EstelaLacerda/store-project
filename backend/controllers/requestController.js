import Request from '../models/request.js';

export async function create(req, res) {
    try {
        const created = await Request.create(req.body);
        res.json(created);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function list(req, res) {
    const list = await Request.findAll();
    res.json(list);
}

export async function remove(req, res) {
    await Request.destroy({ where: { id: req.params.id } });
    res.json({ message: "Solicitação excluída!" });
}
