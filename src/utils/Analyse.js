const filterStoriesByType = (stories, stroyType) => stories.filter(story => story.story_type == stroyType) 
const filterStoriesByLabel = (stories, labelName) => stories.filter(story => {
	const labels = story.labels
	return story.labels.some(label => label.name == labelName)
})

export {
	filterStoriesByType,
	filterStoriesByLabel
}