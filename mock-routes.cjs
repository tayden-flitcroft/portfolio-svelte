const DEFAULT_TIME = 1000

module.exports = (app) => {
	app.post('/oauth/token', (req, res) => {
		setTimeout(() => {
			res.status(200).json({ 'access_token': '2hj31hgk3gk2l1h3kj2hl' })
		}, DEFAULT_TIME)
	})
	app.post('/portfolio/contact', (req, res) => {
		setTimeout(() => {
			res.sendStatus(200)
		}, DEFAULT_TIME)
	})
}
