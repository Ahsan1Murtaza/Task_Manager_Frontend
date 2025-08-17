export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return ""

    const [integerPart, fractionPart] = num.toString().split('.')
    const formattedInetger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return fractionPart ? `${formattedInetger}.${fractionPart}` : formattedInetger
}