/**
 * 
 * Main attendance index
 */

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	checkInRT: [],
	attendance: [],
	notifications: [],
	
}

export default {
	state,
	actions,
	mutations,
	getters
}

