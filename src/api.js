/* globals $ */

import config from 'assets/config/declick'

var apiUrl = config.url.api.slice(0, -1)

function convertNodes (parentNode, nodes) {
  let childrenNodes = nodes.filter(node => node.parent_id === parentNode.id)
  let parentStep = {
    id: parentNode.link,
    name: parentNode.name,
    passed: false
  }
  if (childrenNodes.length > 0) {
    parentStep.steps = []
    for (let childNode of childrenNodes) {
      parentStep.steps.push(convertNodes(childNode, nodes))
    }
  }
  return parentStep
}

export default {
  retrieveSteps (circuitId, callback) {
    $.ajax({
      url: `${apiUrl}/circuits/${circuitId}/nodes`,
      success: nodes => {
        let rootNode = nodes.filter(node => node.parent_id === null)[0]
        let tree = convertNodes(rootNode, nodes).steps
        callback(tree)
      }
    })
  }
}
