import { CALL_API, Schemas } from '../middleware/api'

export const FETCH_STORY_REQUEST = 'FETCH_STORY_REQUEST'
export const FETCH_STORY_SUCCESS = 'FETCH_STORY_SUCCESS'
export const FETCH_STORY_FAILURE = 'FETCH_STORY_FAILURE'
export const STORY_ENTITY_UPDATE = 'STORY_ENTITY_UPDATE'

export function fetchStory(projectId, token, storyLabel) {
  return {
    [CALL_API]: {
      types: [ FETCH_STORY_REQUEST, [FETCH_STORY_SUCCESS, STORY_ENTITY_UPDATE], FETCH_STORY_FAILURE ],
      endpoint: '/stories?with_label=' + storyLabel + '&limit=200',
      schema: Schemas.NO_FORMAT_ARRAY,
      param: { 
      	projectId: projectId,
       	token: token
   		}
    }
  }
}
