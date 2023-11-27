export const checkMatchBetweenCultureFarmAndCultures = (culturesFarmList: number[], culturesDBList: number[]): {allMatch: boolean, indexOfWrong: number | null} => {
    for (const culture of culturesFarmList) {
        if (!culturesDBList.includes(culture)) return { allMatch: false, indexOfWrong: culturesFarmList.indexOf(culture)}
    }

    return {allMatch: true, indexOfWrong: null  }
}