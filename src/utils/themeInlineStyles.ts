export const themeInlineStyles = (themeStylesObj: object) => {
    const keys = Object.keys(themeStylesObj)
    keys.forEach((key) => {
        document.documentElement.style.setProperty(
            String([key as any]),
            themeStylesObj[key as keyof object]
        )
    })

    const removeChanges = () => {
        keys.forEach((key) => {
            document.documentElement.style.setProperty(String([key as any]), '')
        })
    }

    return removeChanges
}
