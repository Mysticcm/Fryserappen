exports.logoClicked = async (req, res) => {
    try {
        req.user.varer = null;
        return res.status(200).json({status: "success"})
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
