export class ZipCodeError extends Error {
    constructor (stack: string) {
        super(`Ocurred a error while to load address by zipcode, check if this zipcode is valid (${stack}).`)
        this.name = 'ZipCodeError'
    }
}