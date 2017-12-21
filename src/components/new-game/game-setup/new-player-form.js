import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

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
				<TextInput
					autoCorrect={ false }
					autoFocus
					blurOnSubmit={ false }
					onChangeText={ this.updateName }
					onSubmitEditing={ this.addNewPlayer }
					placeholder="Enter player name..."
					value={ this.state.name } />
				<TouchableOpacity
					onPress={ this.addNewPlayer }>
					<Text>Add</Text>
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
