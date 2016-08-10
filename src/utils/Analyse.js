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
	if(typeof diff == 'number') {
		return new Number(diff/1000/3600/24).toFixed(2)
	}
	return 0
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

export {
	filterStoriesByType,
	filterStoriesByLabel,
	generateStroyCycleTime
}