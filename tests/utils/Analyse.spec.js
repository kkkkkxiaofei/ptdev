import expect from 'expect'
import * as Analyse from '../../src/utils/Analyse'

describe('Analyse', () => {
	let stories = []
	beforeEach(() => {
		stories = [
			{
				story_type: 'bug', 
				labels: [
					{name: 'a'},
					{name: 'b'}, 
					{name: 'iteration64'},
					{name: 'high_priority'}
				],
				name: 'story1'
			},
			{
				story_type: 'bug',
				labels: [
					{name: 'a'}, 
					{name: 'iteration65'},
					{name: 'medium_priority'}
				], 
				name: 'story2'
			},
			{
				story_type: 'feature',
				labels: [
					{name: 'iteration65'},
					{name: 'd'},
					{name: 'low_priority'}
				],
				name: 'story3'
			}
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
			{"kind":"story_transition","state":"finished","story_id":120348113,"project_id":1273842,"project_version":8717,"occurred_at":"2016-08-08T08:47:27Z","performed_by_id":2023503},
			{"kind":"story_transition","state":"delivered","story_id":120348113,"project_id":1273842,"project_version":8727,"occurred_at":"2016-08-08T09:58:56Z","performed_by_id":1899172},
			{"kind":"story_transition","state":"accepted","story_id":120348113,"project_id":1273842,"project_version":8729,"occurred_at":"2016-08-08T19:22:18Z","performed_by_id":912083}
		]

		const transitionData = Analyse.generateStroyCycleTime(transitions, 120348113)

		expect(transitionData.finishedDay).toBe(10.5)
		expect(transitionData.deliveredDay).toBe(0.5)
		expect(transitionData.acceptedDay).toBe(0.5)
	})
	
	it('generate story tendency', () => {
		const dataHash = Analyse.generateTendencyByType(stories, 'bug')

		expect(dataHash["64"]).toBe(1)
		expect(dataHash["65"]).toBe(1)
	})

	it('generate story severity', () => {
		const dataHash = Analyse.generateSeverity(stories)

		expect(dataHash["high_priority"]).toBe(1)
		expect(dataHash["medium_priority"]).toBe(1)
		expect(dataHash["low_priority"]).toBe(1)
	})
	
})