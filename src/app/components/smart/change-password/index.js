'use strict';

import { actionCreators } from '../../../actions/user';
import { userDataSelector } from '../../../selectors/user';

function component () {
	let directive = {
		restrict: 'E',
		controller: ChangePassword,
		controllerAs: 'ctrl',
		scope: {},
		template: require('./view.html')
	};

	return directive;
}

// @ngInject
function ChangePassword ($ngRedux, $scope, debounce) {
	let scope = this;

	const unsubscribe = $ngRedux.connect(userDataSelector)(this);
	$scope.$on('$destroy', unsubscribe);

	this.checkPasswords = debounce.func(() => {
		let action = actionCreators.checkPasswords(scope.inputs.password1, scope.inputs.password2);
		$ngRedux.dispatch(action);
	}, 500);

	this.savePassword = () => {
		$ngRedux.dispatch(actionCreators.savePasswordThunk(scope.inputs.password1));
	};
}

export default component;