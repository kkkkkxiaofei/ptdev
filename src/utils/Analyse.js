const getOwners = (ownerIds) => {
  const owner = {
    '1899170': 'JS',
    '2023503': 'DX',
    '1462606': 'ZZ',
    '1657956': 'XF',
    '1462614': 'JY',
    '1819914': 'YC'
  }
  const owners = ownerIds.map(ownerId => owner[ownerId] || 'Unknow' )
  return owners.join('&')
}

const filterStoriesByState = (stories, currentState) => stories.filter(story => {
	if(currentState.length > 0) {
		return currentState.indexOf(story.current_state) != -1
	}
	return story.current_state == current_state
}) 

const filterStoriesByType = (stories, stroyType) => stories.filter(story => story.story_type == stroyType) 

const filterStoriesByLabel = (stories, labelName) => stories.filter(story => {
	const labels = story.labels
	const iterationNum = labelName.match(/^\d{2}/)
	if(iterationNum) {
		labelName = 'iteration' + iterationNum[0]
	}
	return story.labels.some(label => label.name == labelName)
})

function calcDay(currDate, prevDate) {
	const diff = currDate - prevDate
	if(isNaN(diff)) {
		return 0
	}
	const day = diff/1000/3600/24
	const weekIndex = prevDate.getDay()
	let offsetDay = 0
	let counter = weekIndex
	for(let start = weekIndex;start <= weekIndex + day;start++) {
		if(counter == 7) {
			offsetDay += 2
		} else {
			if(counter > 7) {
				counter = 1
			}
		}
		counter++
	}
	const actualDay = day - offsetDay
	let decimalDay = actualDay % 1
	const integerDay = actualDay - decimalDay
	if(decimalDay <= .5) {
		decimalDay = .5
	} else {
		decimalDay = 1
	}
	return integerDay + decimalDay
}

function reassembleTransitions(transitions) {
  let transitionHash = {}
  transitions.forEach(transition => {
    transitionHash[transition.state] = new Date(transition.occurred_at)
  })
  const finishedDay = calcDay(transitionHash['finished'], transitionHash['started']), 
  deliveredDay = calcDay(transitionHash['delivered'], transitionHash['finished']), 
  acceptedDay = calcDay(transitionHash['accepted'], transitionHash['delivered'])
  return {
  	finishedDay: finishedDay || calcDay(new Date(), transitionHash['started']),
  	deliveredDay: deliveredDay,
  	acceptedDay: acceptedDay
  }
}

const generateStroyCycleTime = (transitions, storyId) => {
	if(transitions.length > 0) {
	  if(storyId == transitions[0].story_id) {
	  	return reassembleTransitions(transitions)
	  }
	}
}

const generateTendencyByType = (stories, storyType) => {
	const typeStories = filterStoriesByType(stories, storyType)
	let dataHash = {}
	typeStories.forEach(story => {
		const labels = story.labels
		const label = labels.find(label => label.name.match(/^iteration/))
		if(label) {
			const result = label.name.match(/\d{2}/)
			if(result) {
				const iterationNum = result[0]
				if(dataHash[iterationNum]) {
					dataHash[iterationNum] += 1
				} else {
					dataHash[iterationNum] = 1
				}
			}
		}
	})
	return dataHash
}

const generateSeverity = (stories) => {
	let dataHash = {}
	stories.forEach(story => {
		const labels = story.labels
		let key = ''
		labels.find(label => {
			const result = label.name.match(/high_priority|medium_priority|low_priority/)
			if(result) {
				key = result[0]
			}
			return result
		})
		if(key) {
			if(dataHash[key]) {
				dataHash[key] += 1
			} else {
				dataHash[key] = 1
			}
		}
	})
	return dataHash
}

const generateBugCategory = (stories, storyType) => {
	const typeStories = filterStoriesByType(stories, storyType)
	let dataHash = {}
	stories.forEach(story => {
		const labels = story.labels
		let bugType = ''
		labels.forEach(function(label){
			const result = label.name.match(/^bug_function-data|^bug_function-logic|^bug_ui|^bug_performance|^bug_function-causedbyotherstory/)
			if(result) {
				bugType = result[0]
				if(bugType){
					var formatType = filterBugTypeByLabelName(bugType)
					if(dataHash[formatType]) {
						dataHash[formatType] += 1
					} else {
						dataHash[formatType] = 1
					}
				}
			}
		});
	})
	return dataHash
}
function getAllPoints(stories, type) {
	var allPoints = 0;
	var featureStories = stories;
	if(type) {
		featureStories = filterStoriesByType(stories, type)
	}
	featureStories.forEach(story => {
		allPoints += story.estimate
	});
	return allPoints
}

function filterBugTypeByLabelName(labelName) {
	if(labelName.includes("bug_function-data")){
		return "Function Data"
	} else if(labelName.includes("bug_function-logic")){
		return "Function Logic"
	}else if((labelName.includes("bug_ui"))){
		return "UI"
	} else if(labelName.includes("bug_performance")){
		return "Performance"
	}else if(labelName.includes("bug_function-causedbyotherstory")){
		return "Caused By Other Story"
	}
}
export {
	filterStoriesByState,
	filterStoriesByType,
	filterStoriesByLabel,
	generateStroyCycleTime,
	generateTendencyByType,
	generateSeverity,
	generateBugCategory,
	getAllPoints,
	getOwners
}