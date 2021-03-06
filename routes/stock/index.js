const router = require("express").Router();
const { sendMessage } = require("../../services/rabbit");

router.post("/", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "POST", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Read
router.get("/", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "GET", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Read
router.get("/:id", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "GET", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Update
router.put("/:id", async (req, res) => {
	const { id: _id } = req.params;
	try {
		sendMessage(req.baseUrl, "PUT", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Delete
router.delete("/:id", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "DELETE", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
