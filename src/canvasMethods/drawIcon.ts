function translateToCenter(ctx: CanvasRenderingContext2D) {
    ctx.translate(ctx.canvas.width / 2.0, ctx.canvas.height / 2.0)
}

function colorizeImage(
    image: HTMLImageElement,
    color = '000000'
): HTMLCanvasElement {
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    tempCanvas.width = image.width
    tempCanvas.height = image.height
    if (tempCtx) {
        tempCtx.fillStyle = color
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
        tempCtx.globalCompositeOperation = 'destination-atop'
        if (image.src.includes('svg')) {
            const tempTempCanvas = document.createElement('canvas')
            const tempTempCtx = tempTempCanvas.getContext('2d')
            tempTempCanvas.width = tempCanvas.width
            tempTempCanvas.height = tempCanvas.height
            if (tempTempCtx !== null) {
                tempTempCtx.drawImage(image, 0, 0)
                tempCtx.drawImage(tempTempCanvas, 0, 0)
            }
        } else {
            tempCtx.drawImage(image, 0, 0)
        }
    }
    return tempCanvas
}

function memoize(func: any) {
    const cache = new Map()
    return function (...args: number[]) {
        const stringifiedArgs = JSON.stringify(args)
        if (cache.has(stringifiedArgs)) {
            return cache.get(stringifiedArgs)
        }
        const ret = func(...args)
        cache.set(stringifiedArgs, ret)
        return ret
    }
}

const calculateStrokeCountDivisor = memoize((angleRads: number) =>
    Math.cos(
        Math.abs((angleRads - Math.PI / 4.0) % (Math.PI / 2.0)) - Math.PI / 4.0
    )
)
for (let i = 0; i < 360; i += 1) {
    calculateStrokeCountDivisor((i * 180) / Math.PI)
}

function calculateShadowStrokes(
    image: HTMLImageElement,
    containerSize: number,
    iconSize: number,
    angleDegrees: number,
    xOffset: number,
    yOffset: number
) {
    const angleRads = (angleDegrees * Math.PI) / 180.0
    const measureCanvas = document.createElement('canvas')
    measureCanvas.width = containerSize
    measureCanvas.height = containerSize
    const measureCtx = measureCanvas.getContext('2d')
    if (measureCtx) {
        measureCtx.imageSmoothingEnabled = true
        measureCtx.imageSmoothingQuality = 'high'
        const strokeCount = Math.round(
            iconSize / calculateStrokeCountDivisor(angleRads)
        )
        measureCtx.drawImage(
            image,
            containerSize / 2 - iconSize / 2,
            containerSize / 2 - iconSize / 2,
            iconSize,
            iconSize
        )
        const xStep = Math.sin(angleRads + Math.PI / 2)
        const yStep = Math.cos(angleRads + Math.PI / 2)
        const sina = Math.sin(angleRads)
        const cosa = Math.cos(angleRads)
        const maxLengthFromCenter = (containerSize / 2.0) * Math.sqrt(2)
        const strokes = []
        const imageData = measureCtx.getImageData(
            0,
            0,
            containerSize,
            containerSize
        )
        for (
            let strokeIndex = 0;
            strokeIndex < strokeCount;
            strokeIndex += 0.25
        ) {
            const offsetFromMiddle = strokeIndex - strokeCount / 2
            const centerLineX = sina * offsetFromMiddle
            const centerLineY = cosa * offsetFromMiddle
            const endX = centerLineX + xStep * maxLengthFromCenter
            const endY = centerLineY + yStep * maxLengthFromCenter
            const scanStartX = centerLineX - (iconSize / 2) * xStep
            const scanStartY = centerLineY - (iconSize / 2) * yStep
            let startX = null
            let startY = null
            for (
                let scanIndex = 0;
                scanIndex < iconSize * 1.42;
                scanIndex += 1
            ) {
                const scanX = scanStartX + scanIndex * xStep + containerSize / 2
                const scanY = scanStartY + scanIndex * yStep + containerSize / 2
                const pixelAlpha =
                    imageData.data[
                        Math.round(scanY) * (imageData.width * 4) +
                            Math.round(scanX) * 4 +
                            3
                    ]
                if (pixelAlpha > 200) {
                    startX = scanX + xStep - containerSize / 2 + xOffset
                    startY = scanY + yStep - containerSize / 2 + yOffset
                    break
                }
            }
            if (startX !== null && startY !== null) {
                strokes.push({
                    startX,
                    startY,
                    endX: endX + xOffset,
                    endY: endY + yOffset,
                })
            }
        }
        return strokes
    }
    return []
}

function drawShadow(
    image: HTMLImageElement,
    containerSize: number,
    iconSize: number,
    outCtx: CanvasRenderingContext2D,
    angleDegrees: number,
    color: string,
    xOffset: number,
    yOffset: number
) {
    outCtx.save()
    const strokes = calculateShadowStrokes(
        image,
        containerSize * 2,
        iconSize,
        angleDegrees,
        xOffset,
        yOffset
    )
    translateToCenter(outCtx)
    /* eslint no-param-reassign: "error" */
    outCtx.strokeStyle = color

    if (strokes) {
        strokes.forEach(({ startX, startY, endX, endY }) => {
            outCtx.beginPath()
            outCtx.moveTo(startX, startY)
            outCtx.lineTo(endX, endY)
            outCtx.stroke()
        })
    }
    outCtx.restore()
}

const imageCache = new Map()

function loadImage(src: string, cache = true): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        if (cache && imageCache.has(src)) {
            resolve(imageCache.get(src))
            return
        }
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
            if (cache) imageCache.set(src, img)
            resolve(img)
        }
        img.onerror = (e) => reject(e)
        img.src = src
    })
}

export default async function drawIcon(
    canvas: HTMLCanvasElement,
    iconDisabled: boolean,
    iconScale: number,
    shadowState: boolean,
    iconShadowAngle: number,
    backgroundColor: string,
    shadowColor: string,
    horizontalPositionIcon: number,
    verticalPositionIcon: number,
    iconColor?: string
) {
    const ctx = canvas.getContext('2d')
    const iconBgcWidth = canvas.height
    const canvasHeight = canvas.height
    if (ctx && !iconDisabled) {
        ctx.clearRect(0, 0, iconBgcWidth, ctx.canvas.height)
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.height, canvas.height)
        ctx.save()
        const superSample = 2
        const iconRatio = (iconScale / 100.0) * 0.75
        const iconSize =
            canvasHeight * superSample * iconRatio + canvasHeight * 0.125
        let containerSize = canvasHeight * superSample
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = containerSize
        tempCanvas.height = containerSize
        const tempCtx = tempCanvas.getContext('2d')
        if (tempCtx) {
            tempCtx.imageSmoothingEnabled = true
            tempCtx.imageSmoothingQuality = 'high'
            const extraShadowRoom = Math.abs(0) + Math.abs(0)
            containerSize += extraShadowRoom
            // let angleDegrees = 130;
            const imgSrc = './icons/ExtraLife.png'
            const image = await loadImage(imgSrc, true)
            if (shadowState) {
                drawShadow(
                    image,
                    containerSize,
                    iconSize,
                    tempCtx,
                    iconShadowAngle,
                    shadowColor,
                    horizontalPositionIcon,
                    verticalPositionIcon
                )
            }

            // tempCtx.drawImage(image, (h / 2) * superSample - iconSize / 2 + settings.iconOffsetX, (h / 2) * superSample - iconSize / 2 - settings.iconOffsetY, iconSize, iconSize);
            let colorImage
            if (iconColor) {
                colorImage = colorizeImage(image, iconColor)
            }

            tempCtx.drawImage(
                colorImage || image,
                (canvasHeight / 2) * superSample -
                    iconSize / 2 +
                    horizontalPositionIcon,
                (canvasHeight / 2) * superSample -
                    iconSize / 2 +
                    verticalPositionIcon,
                iconSize,
                iconSize
            )
            ctx.globalCompositeOperation = 'source-atop'
            ctx.drawImage(tempCanvas, 0, 0, canvasHeight, canvasHeight)

            ctx.restore()
            // ctx.drawImage(tempCanvas, settings.alignment == "right" ? w - h : 0, 0, h, h);
        }
    }
}
