export const apiPath = () => {
    if (location.hostname === 'localhost') {
        console.log('>>> Determined location.hostname is Local Host: ', location.hostname)
        return 'http://localhost:3000'
    } else {
        console.log('>>> Determined location.hostname is fi-fit: ', location.hostname)
        return 'https://weight-track.vercel.app'
    }
}

export function localTimeDisplay () {
    const d = new Date()
    return d.toLocaleTimeString()
}

export function roundTwoDecimal(num) {
    return (Math.round(num * 100) / 100)
}