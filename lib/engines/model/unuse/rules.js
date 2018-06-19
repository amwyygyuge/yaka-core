const rulesWalk = layouts => {
    if (!Array.isArray(layouts)) {
        throw Error('children must be an array!')
    }
    const rules = {}
    layouts.forEach(ele => {
        if (ele.rules) {
            rules[ele.name] = {
                component: ele.component,
                rules: ele.rules
            }
            return
        }
        if (ele.component === 'Form') {
            ele.children.forEach(col => {
                rules[col.name] = {
                    component: col.component,
                    rules: col.rules
                }
            })
            return
        }

        if (ele.component === 'EditTable') {
            const tableRules = {}
            ele.props.columns.forEach(col => {
                tableRules[col.name] = {
                    component: col.component,
                    rules: col.rules
                }
            })
            rules[ele.name] = tableRules
            return
        }
        if (ele.children) {
            Object.assign(rules, rulesWalk(ele.children))
        }
    })
    return rules
}
export default rulesWalk