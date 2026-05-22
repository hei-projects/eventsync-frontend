export const getInitials = (name: string) => {
    if (!name) return ''

    const length = name.length
    if (length < 2) return name

    const words = name.split(' ')
    if (words.length === 1) {
        return name.slice(0, 2).toUpperCase()
    }

    const firstInitial = words[0][0]
    const lastInitial = words[words.length - 1][0]

    return (firstInitial + lastInitial).toUpperCase()
    
}