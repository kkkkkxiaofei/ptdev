import expect from 'expect'
import * as Analyse from '../../utils/Analyse'

describe('Analyse', () => {
	it('filter stories by type', () => {
		const stories = [
			{story_type: 'bug', name: 'story1'},
			{story_type: 'bug', name: 'story2'},
			{story_type: 'feature', name: 'story3'}
		]

		const filteredStories = Analyse.filterStoriesByType(stories, 'bug')

		expect(filteredStories[0].name).toBe('story1')
		expect(filteredStories[1].name).toBe('story2')
	})
})