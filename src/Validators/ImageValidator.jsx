export default function ImageValidator(e) {
    let pics = e.target.files
    if (!pics)
        return "Pic Field is Mendatory"
    else if (pics.length === 1) {
        let pic = pics[0]
        if (!(pic.type === "image/jpeg" || pic.type === "image/jpg" || pic.type === "image/png" || pic.type === "image/gif" || pic.type === "image/svg"))
            return "Invalid Pic Format, Please Upload an Image of .jpeg,.jpg,.png,.gif,.svg format only"
        else if (pic.size > 1048576)
            return "Invlid Pic Size, Please Upload an Image upto 1 MB"
        else
            return ""
    }
    else {
        let error = []
        Array.from(e.target.files).forEach((pic, index) => {
            if (!(pic.type === "image/jpeg" || pic.type === "image/jpg" || pic.type === "image/png" || pic.type === "image/gif" || pic.type === "image/svg"))
                error.push(`Invalid Pic${index + 1} Format, Please Upload an Image of .jpeg,.jpg,.png,.gif,.svg format only | `)
            else if (pic.size > 1048576)
                error.push(`Invlid Pic${index + 1} Size, Please Upload an Image upto 1 MB | `)
        })
        return error.length === 0 ? "" : error
    }
}