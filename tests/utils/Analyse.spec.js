import expect from 'expect'
import * as Analyse from '../../src/utils/Analyse'

describe('Analyse', () => {
	let stories = []
	beforeEach(() => {
		stories = [
			{story_type: 'bug', labels: [{name: 'a'}, {name: 'b'}], name: 'story1'},
			{story_type: 'bug', labels: [{name: 'a'}, {name: 'c'}], name: 'story2'},
			{story_type: 'feature', labels: [{name: 'c'}, {name: 'd'}], name: 'story3'}
		]
	})

	it('filter stories by type', () => {
		const filteredStories = Analyse.filterStoriesByType(stories, 'bug')

		expect(filteredStories[0].name).toBe('story1')
		expect(filteredStories[1].name).toBe('story2')
	})

	it('filter stories by label', () => {
		const filteredStories = Analyse.filterStoriesByLabel(stories, 'c')

		expect(filteredStories[0].name).toBe('story2')
		expect(filteredStories[1].name).toBe('story3')
	})
})