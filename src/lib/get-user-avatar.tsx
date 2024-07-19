export default function getUserAvatar(email?: string) {
	if (email) {
		return email.substring(0, 2).toUpperCase()
	}
}
