import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormInput, FormLabel } from 'react-native-elements';
import { View } from 'react-native';

import styles from './styles/new-player-form';

class NewPlayerForm extends Component {
	constructor() {
		super();

		this.state = {
			name: ''
		};

		this.updateName = this.updateName.bind(this);
		this.addNewPlayer = this.addNewPlayer.bind(this);
	}

	render() {
		return (
			<View>
				<FormLabel>Name</FormLabel>
				<FormInput
					autoCorrect={ false }
					autoFocus
					blurOnSubmit={ false }
					inputStyle={ styles.textInput }
					onChangeText={ this.updateName }
					onSubmitEditing={ this.addNewPlayer }
					placeholder="Enter player name..."
					value={ this.state.name } />
			</View>
		);
	}

	updateName(name) {
		this.setState({
			name
		});
	}

	addNewPlayer() {
		const { name } = this.state;
		const trimmedName = name.trim();

		if (trimmedName) {
			const { playerAdded } = this.props;

			playerAdded(trimmedName);

			this.setState({ name: '' });
		}
	}
}

NewPlayerForm.propTypes = {
	playerAdded: PropTypes.func.isRequired
};

export default NewPlayerForm;
