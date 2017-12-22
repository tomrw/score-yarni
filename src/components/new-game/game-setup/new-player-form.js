import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

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
			<View style={ styles.container }>
				<TextInput
					autoCorrect={ false }
					autoFocus
					blurOnSubmit={ false }
					onChangeText={ this.updateName }
					onSubmitEditing={ this.addNewPlayer }
					placeholder="Enter player name..."
					style={ styles.textInput }
					value={ this.state.name } />
				<TouchableOpacity
					activeOpacity={ 0.8 }
					onPress={ this.addNewPlayer }
					style={ styles.button }>
					<Text style={ styles.buttonText }>Add</Text>
				</TouchableOpacity>
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
