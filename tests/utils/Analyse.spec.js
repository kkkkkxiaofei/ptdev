import expect from 'expect'
import * as Analyse from '../../src/utils/Analyse'

describe('Analyse', () => {
	let stories = []
	beforeEach(() => {
		stories = [
			{story_type: 'bug', labels: [{name: 'a'}, {name: 'b'}], name: 'story1'},
			{story_type: 'bug', labels: [{name: 'a'}, {name: 'iteration65'}], name: 'story2'},
			{story_type: 'feature', labels: [{name: 'iteration65'}, {name: 'd'}], name: 'story3'}
		]
	})

	it('filter stories by type', () => {
		const filteredStories = Analyse.filterStoriesByType(stories, 'bug')

		expect(filteredStories[0].name).toBe('story1')
		expect(filteredStories[1].name).toBe('story2')
	})

	it('filter stories by label', () => {
		const filteredStories = Analyse.filterStoriesByLabel(stories, '65')

		expect(filteredStories[0].name).toBe('story2')
		expect(filteredStories[1].name).toBe('story3')
	})

	it('generate stroy cycle time', () => {
		const transitions = [
			{"kind":"story_transition","state":"unscheduled","story_id":120348113,"project_id":1273842,"project_version":7543,"occurred_at":"2016-05-26T08:55:25Z","performed_by_id":1444202},
			{"kind":"story_transition","state":"started","story_id":120348113,"project_id":1273842,"project_version":8699,"occurred_at":"2016-07-25T06:04:47Z","performed_by_id":2023503},
			{"kind":"story_transition","state":"finished","story_id":120348113,"project_id":1273842,"project_version":8717,"occurred_at":"2016-07-25T08:47:27Z","performed_by_id":2023503},
			{"kind":"story_transition","state":"delivered","story_id":120348113,"project_id":1273842,"project_version":8727,"occurred_at":"2016-07-25T09:58:56Z","performed_by_id":1899172},
			{"kind":"story_transition","state":"accepted","story_id":120348113,"project_id":1273842,"project_version":8729,"occurred_at":"2016-07-25T19:22:18Z","performed_by_id":912083}
		]

		const transitionData = Analyse.generateStroyCycleTime(transitions, 120348113)
		expect(transitionData[0].values[0].x).toBe('Finished')
		expect(transitionData[0].values[0].y).toBe('0.11')
		expect(transitionData[0].values[1].x).toBe('Delivered')
		expect(transitionData[0].values[1].y).toBe('0.05')
		expect(transitionData[0].values[2].x).toBe('Accepted')
		expect(transitionData[0].values[2].y).toBe('0.39')
	})
})