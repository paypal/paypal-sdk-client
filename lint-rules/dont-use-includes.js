module.exports = {
    create(context) {
        return {
            CallExpression(node) {
                if (node.callee.property && node.callee.property.name === 'includes') {
                    context.report({
                        node: node,
                        message: 'Please, use array.indexOf() !== -1 instead of array.includes() for compatibility with IE11'
                    })
                }
            }
        }
    }
}
