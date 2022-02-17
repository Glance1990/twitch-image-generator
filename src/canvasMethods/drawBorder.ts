type radiusObj = {
    tl: number
    tr: number
    br: number
    bl: number
}

function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    borderWidth: number,
    fill: boolean,
    stroke: boolean,
    radius?: radiusObj | 0
) {
    const strokeVar = stroke || true
    if (radius && radius.tl && radius.tr && radius.br && radius.bl) {
        ctx.beginPath()
        ctx.moveTo(x + radius.tl, y)
        ctx.lineTo(x + width - radius.tr, y)
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
        ctx.lineTo(x + width, y + height - radius.br)
        ctx.quadraticCurveTo(
            x + width,
            y + height,
            x + width - radius.br,
            y + height
        )
        ctx.lineTo(x + radius.bl, y + height)
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
        ctx.lineTo(x, y + radius.tl)
        ctx.quadraticCurveTo(x, y, x + radius.tl, y)
        ctx.closePath()
        ctx.strokeStyle = 'orange'
        if (fill) ctx.fill()
        if (borderWidth < 1) return
        if (strokeVar) ctx.stroke()
    }
}

export default function drawBorder(
    canvas: HTMLCanvasElement,
    borderWidth: number,
    borderRadius: number,
    borderColor: string
) {
    const ctx = canvas.getContext('2d')
    const maxBorderRadiusScalar = 0.84 / 200.0
    if (!ctx) return
    ctx.save()
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const bw = borderWidth
    const br = borderRadius * canvasHeight * maxBorderRadiusScalar
    const cp = 0
    ctx.strokeStyle = borderColor
    ctx.lineWidth = bw
    const radius = {
        tl: br,
        tr: br,
        br,
        bl: br,
    }
    roundRect(
        ctx,
        cp + bw / 2,
        cp + bw / 2,
        canvasWidth - cp * 2 - bw,
        canvasHeight - cp * 2 - bw,
        borderWidth,
        false,
        true,
        radius
    )
    ctx.restore()
}
