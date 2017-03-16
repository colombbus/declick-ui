/* globals $ */

import R from 'ramda'
import store from './store'
import config from 'assets/config/declick'

function getResults (callback) {
  if (!store.state.authenticatedUser) {
    return callback([])
  }
  $.ajax({
    url: `${config.apiUrl}v1/users/${store.state.authenticatedUser.id}/results`,
    success: results => {
      callback(results)
    },
    beforeSend: function (request) {
      request.setRequestHeader(
        'Authorization', `Token ${store.state.authorizations}`
      )
    }
  })
}

function convertNodes (parentNode, nodes, state) {
  let childrenNodes = nodes.filter(node => parseInt(node.parent_id) === parentNode.id)
  let parentStep = {
    position: state.position++,
    id: parentNode.id,
    name: parentNode.name,
    url: parentNode.link,
    visited: false,
    passed: false
  }
  if (childrenNodes.length > 0) {
    parentStep.steps = []
    for (let childNode of childrenNodes) {
      parentStep.steps.push(convertNodes(childNode, nodes, state))
    }
  }
  return parentStep
}

export default {
  retrieveSteps (circuitId, callback) {
    $.ajax({
      url: `${config.apiUrl}v1/circuits/${circuitId}/nodes`,
      success: nodes => {
        let rootNode = nodes.filter(node => node.parent_id === null)[0]
        let tree = convertNodes(rootNode, nodes, { position: 0 }).steps
        getResults(results => {
          let steps = flattenTree(tree, 'steps')
          steps.forEach(step => {
            let result = R.find(R.propEq('step_id', step.id), results)
            if (result) {
              step.visited = true
              step.passed = result.passed !== 0
              step.solution = result.solution
            }
          })
          callback(tree)
        })
      }
    })
  }
}

function flattenTree (tree, key) {
  const level = element => element[key]
    ? [element, element[key].map(level)]
    : element
  return R.flatten(tree.map(level))
}

