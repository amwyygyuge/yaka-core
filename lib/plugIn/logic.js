const logic = ({ Element, config, key }, { debug, formCreatFunc, yakaApis }) => {
    if (config.hide) {
        const { formValueGettingFunction } = yakaApis
        if (formValueGettingFunction('name') === "fuck") {
            return null
        }
    }
    return Element
}
export default logic
