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
	const result = diff/1000/3600/24
	const decimials = (result % 1)
	const integer = result - decimials
	const day = integer + (decimials > 0.5 ? 1 : .5)
	const weekIndex = currDate.getDay()
	let offsetDay = 0
	let counter = weekIndex
	for(let start = weekIndex;start <= weekIndex + day;start++) {
		if(counter == 7) {
			offsetDay++
		} else {
			if(counter > 7) {
				counter = 1
			}
		}
		counter++
	}
	
	return day - offsetDay
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
  	finishedDay: finishedDay,
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



export {
	filterStoriesByType,
	filterStoriesByLabel,
	generateStroyCycleTime,
	generateTendencyByType,
	generateSeverity
}