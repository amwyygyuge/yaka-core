const fs = require('fs')
const path = require('path')
export const readdir = (filePath, options, paths = []) => {
    const exist = fs.statSync(filePath).isDirectory()
    if (!exist) { return }
    const { rex, ignore } = options
    const files = fs.readdirSync(filePath, {})
    files.forEach(file => {
        if (ignore && ignore.test(file)) return false
        if (rex && rex.test(file)) {
            paths.push(path.join(filePath, file))
        } else {
            readdir(path.join(filePath, file), options, paths)
        }
    })
    return paths
}