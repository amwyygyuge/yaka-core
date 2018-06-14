import function_templates from './function_templates';
const registerFunctions = (functions = {}, functionTemplates = {}, yakaApis) => {
    const _functions = {}
    Object.assign(function_templates, functionTemplates)
    Object.keys(functions).forEach(key => {
        const { type, definition } = functions[key]
        const template = function_templates[type]
        if (template) {
            _functions[key] = e => {
                template(definition, e, yakaApis)()
            }
        } else {
            _functions[key] = e => { }
            console.error(`Function ${key} templates are not defined!`)
        }
    })
    return _functions
}
export default registerFunctions