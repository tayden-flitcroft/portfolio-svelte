export default (): string => {
	return (process.env.API_URL as string) !== undefined ? process.env.API_URL as string : 'https://api.taydenflitcroft.com'
}
