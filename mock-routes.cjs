module.exports = (app) => {
	app.post('/oauth/token', (req, res) => {
		res.status(200).json({ 'access_token': '2hj31hgk3gk2l1h3kj2hl' })
	})
	app.post('/portfolio/contact', (req, res) => {
		res.sendStatus(200)
	})
}
